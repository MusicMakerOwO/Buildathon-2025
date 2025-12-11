import {Item} from "../Item";
import {StorageObstacle} from "../StorageObstacle";
import {ObstaclePositions} from "../Obstacle";

export class Locker extends StorageObstacle {
	constructor(isLocked: boolean, contents: Item[]) {
		super(
			'Locker',
			'A tall metal locker with a combination lock on the door.',
			ObstaclePositions.WALL,
			'standing upright against the wall',
			isLocked,
			contents
		);
	}
}