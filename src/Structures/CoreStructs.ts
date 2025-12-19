import {Log} from '../Utils/Log';
import {PlayerController} from "./PlayerController";
import {Room} from "./Room";
import {ObjectValues} from "../Typings/Helpers";
import {GameController} from "./GameController";

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
	itemPickupMessage: string | undefined;

	constructor(
		name: string,
		description: string,
		position: ObjectValues<typeof PropPositions>,
		itemPickupMessage: string | undefined,
		additionalActions?: PropInteractionMap
	) {
		this.name = name;
		this.description = description;
		this.position = position;
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
${this.itemPickupMessage ?? 'You spot an item inside:'}
- ${itemList[0]}
You pick it up and add it to your inventory.
`.trim()
					};
				}

				return {
					message: `
${this.description}
${this.itemPickupMessage ?? 'You spot several items inside:'}
${itemList.map(item => '- ' + item).join('\n')}
You pick them up and add them to your inventory.
`.trim()
				}
			},
			... additionalActions
		}

		this.contents = [];
		this.itemPickupMessage = itemPickupMessage;
	}

	get canHoldItems(): boolean {
		return this.itemPickupMessage !== undefined;
	}

	addItem(item: Item) {
		if (!this.canHoldItems) {
			throw new Error(`Prop "${this.name}" cannot hold items. Make sure you set an itemPickupMessage when creating it.`);
		}
		const existingIndex = this.contents.findIndex(existingItem => existingItem.constructor === item.constructor);
		if (existingIndex !== -1) {
			this.contents[existingIndex].count += item.count;
		} else {
			this.contents.push(item);
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
	use(game: GameController, room: Room, player: PlayerController): InteractionResult {
		return { message: `You can't use this ${this.name}.` };
	}

	get display() {
		return `${this.name} (x${this.count})`;
	}

	get totalWeight() {
		return this.weight * this.count;
	}
}