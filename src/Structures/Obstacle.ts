// bad name, I know, but "object" is taken in JS
import { Log } from '../Utils/Log';
import {PlayerController} from "./PlayerController";

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