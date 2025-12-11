import {StorageObstacle} from '../StorageObstacle';
import {Item} from "../Item";
import {ObstaclePositions} from "../Obstacle";

export class Crack extends StorageObstacle {
	constructor(isLocked: boolean, contents: Item[]) {
		isLocked = false;
		super(
			'Crack',
			'A narrow crack in the wall, just wide enough to fit your hand inside.',
			ObstaclePositions.WALL,
			'running along the wall near the floor',
			isLocked,
			contents
		);
	}
}