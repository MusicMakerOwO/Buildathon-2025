import {Log} from '../Utils/Log';
import {PlayerController} from "./PlayerController";

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

// bad name, I know, but "object" is taken in JS
export class Prop {

	name: string;
	description: string;
	availableActions: string[];

	constructor(name: string, description: string, additionalActions?: string[]) {
		this.name = name;
		this.description = description;
		const actionsSet = new Set( ['examine'].concat(additionalActions || []) );
		this.availableActions = Array.from(actionsSet);
	}

	interact(player: PlayerController, action: string) {
		if (action === 'examine') {
			return this.description;
		}

		// default unhandled action
		Log('ERROR', `Unhandled interaction action "${action}" on obstacle "${this.name}".`);
		return `You can't ${action} the ${this.name}.`;
	}
}

export class Item {
	name: string;
	description: string;
	weight: number;
	count: number;

	constructor(name: string, description: string, weight: number, count?: number) {
		this.name        = name;
		this.description = description;
		this.weight      = weight || 0;
		this.count       = count  || 1;
	}

	use(target: unknown) {
		throw new Error('Use method not implemented for this item');
	}

	get totalWeight() {
		return this.weight * this.count;
	}
}