import {Log} from '../Utils/Log';
import {PlayerController} from "./PlayerController";

// bad name, I know, but "object" is taken in JS
export class Obstacle {

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