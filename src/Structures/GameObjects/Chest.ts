import {Item} from "../Item";
import {StorageObstacle} from "../StorageObstacle";
import {ObstaclePositions} from "../Obstacle";

export class Chest extends StorageObstacle {
	constructor(isLocked: boolean, contents: Item[]) {
		super(
			'Chest',
			'A sturdy wooden chest reinforced with iron bands.',
			ObstaclePositions.CORNER,
			'sitting on the floor near the corner',
			isLocked,
			contents
		);
	}
}