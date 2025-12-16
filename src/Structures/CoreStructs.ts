import {Log} from '../Utils/Log';
import {PlayerController} from "./PlayerController";
import {Room} from "./Room";
import {Key} from "./Items";
import {ObjectValues} from "../Typings/Helpers";

export const PropPositions = {
	/** The object is either in the middle of the room (furniture) or spans floor to ceiling (pillars) */
	ROOM: 0,
	/** Usually smaller objects located on the floor, like rugs or floorboards */
	FLOOR: 1,
	/** Objects attached to or part of the walls, like paintings or shelves */
	WALL: 2,
	/** Objects that are attached or hanging from the ceiling, ie chandeliers */
	CEILING: 3
} as const;

export type InteractionResult = {
	message: string;
	/** Move the player to the next room after this interaction */
	nextRoom?: boolean;
}

export type InteractionCallback = (room: Room, player: PlayerController) => InteractionResult;
export type PropInteractionMap = Record<Capitalize<string>, InteractionCallback>;

export class Entity {

	name: string;
	description: string;
	max_health: number;
	current_health: number;
	damage: {min: number, max: number} | number;

	constructor(name: string, description: string, health: number, damage: {min: number, max: number} | number) {
		this.name = name;
		this.description = description;
		this.max_health = this.current_health = health;
		this.damage = damage;
	}

	getDamage(): number {
		if (typeof this.damage === 'number') {
			return this.damage;
		} else {
			const min = this.damage.min;
			const max = this.damage.max;
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	}

	get isAlive(): boolean {
		return this.current_health > 0;
	}

	hurt(amount: number): void {
		this.current_health -= amount;
		if (this.current_health < 0) {
			this.current_health = 0;
		}
	}

	heal(amount: number, capHealth = true): void {
		const prevHealth = this.current_health;
		this.current_health += amount;
		if (capHealth && this.current_health > this.max_health) {
			this.current_health = prevHealth;
		}
	}
}

export class Prop {

	name: string;
	description: string;
	contents: Item[];
	actions: PropInteractionMap;
	position: ObjectValues<typeof PropPositions>;

	constructor(
		name: string,
		description: string,
		position: ObjectValues<typeof PropPositions>,
		contents?: Item[],
		additionalActions?: PropInteractionMap
	) {
		this.name = name;
		this.description = description;
		this.position = position;
		this.contents = contents ?? [];
		this.actions = {
			'Examine': (room, player) => {
				if (this.contents.length === 0) {
					return { message: this.description };
				}

				const itemList = this.contents.map(item => item.display);
				for (let i = 0; i < this.contents.length; i++) {
					player.addItem(this.contents[i]);
				}
				this.contents = [];

				if (this.contents.length === 1) {
					return {
						message: `
	${this.description}
	You spot something inside: ${itemList[0]}.
	You pick it up and add it to your inventory.
	`.trim()
					};
				}

				return {
					message: `
	${this.description}
	You spot several items inside:
	${itemList.map(item => '- ' + item).join('\n')}
	You pick them up and add them to your inventory.
	`.trim()
				}
			},
			... additionalActions
		}
	}

	overrideAction(actionName: Capitalize<string>, callback: InteractionCallback) {
		this.actions[actionName] = callback;
	}

	get availableActions(): Capitalize<string>[] {
		return Object.keys(this.actions) as Capitalize<string>[];
	}

	interact(room: Room, player: PlayerController, action: Capitalize<string>) {
		// check if action is defined
		if (action in this.actions) {
			return this.actions[action as Capitalize<string>](room, player);
		}

		// default unhandled action
		Log('ERROR', `Unhandled interaction action "${action}" on prop "${this.name}".`);
		return { message: `You can't ${action} the ${this.name}.` };
	}
}

export class LockableProp extends Prop {
	isLocked: boolean;

	constructor(
		name: string,
		description: string,
		position: ObjectValues<typeof PropPositions>,
		isLocked: boolean,
		contents: Item[]
	) {

		const additionalActions: PropInteractionMap = {
			Open: (room, player) => {
				if (this.contents.length === 0) {
					return { message: `You open the ${this.name}, but find nothing of interest.` };
				} else {
					if (this.isLocked) {
						return { message: `The ${this.name} is locked. You must unlock it first.` };
					} else {
						const itemsList = this.contents.map(item => `- ${item.name} (x${item.count})`).join('\n');
						this.contents.forEach(item => player.addItem(item));
						this.contents = [];
						return { message: `You open the ${this.name} and find:\n${itemsList}\nThe items have been added to your inventory.` };
					}
				}
			}
		};

		if (isLocked) {
			additionalActions['Unlock'] = (room, player) => {
				if (player.hasItem(Key) !== false) {
					player.removeItem(Key, 1);
					this.isLocked = false;
					return { message: `You use a key to unlock the ${this.name}. You hear a soft click and can now open it.` };
				} else {
					return { message: `You need a key to unlock the ${this.name}.` };
				}
			};
		}

		super(
			name,
			description,
			position,
			contents,
			additionalActions
		);

		this.isLocked = Boolean(isLocked);
	}
}

export class Item {
	name: string;
	description: string;
	weight: number;
	count: number;
	actions: PropInteractionMap;

	constructor(
		name: string,
		description: string,
		weight: number,
		count: number,
		additionalActions?: PropInteractionMap
	) {
		this.name        = name;
		this.description = description;
		this.weight      = weight || 0;
		this.count       = count  || 1;
		this.actions     = {
			'Examine': () => {
				return { message: this.description };
			},
			... additionalActions
		};
	}

	interact(room: Room, player: PlayerController, action: Capitalize<string>): InteractionResult {
		// check if action is defined
		if (action in this.actions) {
			return this.actions[action as Capitalize<string>](room, player);
		}

		// default unhandled action
		Log('ERROR', `Unhandled interaction action "${action}" on item "${this.name}".`);
		return { message: `You can't ${action} the ${this.name}.` };
	}

	// Override on children
	use(target: Room | PlayerController | Prop): InteractionResult {
		return { message: `You can't use the ${this.name}.` };
	}

	get display() {
		return `${this.name} (x${this.count})`;
	}

	get totalWeight() {
		return this.weight * this.count;
	}
}