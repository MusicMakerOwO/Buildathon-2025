import {Log} from '../Utils/Log';
import {PlayerController} from "./PlayerController";
import {RoomController} from "./RoomController";
import {Key} from "./Items/Key";

export type InteractionResult = {
	message: string;
}

export type InteractionCallback = (room: RoomController, player: PlayerController) => InteractionResult;

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

	constructor(name: string, description: string, contents?: Item[], additionalActions?: PropInteractionMap) {
		this.name = name;
		this.description = description;
		this.contents = contents ?? [];
		this.actions = {};

		// setup default actions
		this.actions['Examine'] = (room, player) => {
			return { message: this.description };
		};
	}

	get availableActions(): Capitalize<string>[] {
		return Object.keys(this.actions) as Capitalize<string>[];
	}

	interact(room: RoomController, player: PlayerController, action: Capitalize<string>) {
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
			'Examine': (room, player) => {
				return { message: this.description };
			},
			... additionalActions
		};
	}

	interact(room: RoomController, player: PlayerController, action: Capitalize<string>): InteractionResult {
		// check if action is defined
		if (action in this.actions) {
			return this.actions[action as Capitalize<string>](room, player);
		}

		// default unhandled action
		Log('ERROR', `Unhandled interaction action "${action}" on item "${this.name}".`);
		return { message: `You can't ${action} the ${this.name}.` };
	}

	use(target: unknown) {
		throw new Error('Use method not implemented for this item');
	}

	get totalWeight() {
		return this.weight * this.count;
	}
}