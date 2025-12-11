// bad name, I know, but "object" is taken in JS
import { Log } from '../Utils/Log';
import {PlayerController} from "./PlayerController";
import {ObjectValues} from "../Typings/Helpers";

export const ObstaclePositions = {
	WALL: 0,
	CEILING: 1,
	FLOOR: 2,
	ROOM: 3,
	CORNER: 4
} as const;

export class Obstacle {

	name: string;
	description: string;
	position: number;
	placementDescription: string;
	availableActions: string[];

	constructor(name: string, description: string, position: ObjectValues<typeof ObstaclePositions>, placementDescription: string, additionalActions?: string[]) {
		this.name = name;
		this.description = description;
		this.position = position;
		this.placementDescription = placementDescription;

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