import {StorageObstacle} from '../StorageObstacle';
import {Item} from "../Item";
import {ObstaclePositions} from "../Obstacle";

export class ChemicalCabinet extends StorageObstacle {
	constructor(isLocked: boolean, contents: Item[]) {
		super(
			'Chemical Cabinet',
			'A heavy steel cabinet meant for storing hazardous chemicals. A greenish-yellow liquid slowly drips from a small crack in the door and sizzles as it hits the floor.',
			ObstaclePositions.WALL,
			'standing formly against the wall',
			isLocked,
			contents
		);
	}
}