import {StorageObstacle} from "../StorageObstacle";
import {Item} from "../Item";
import {ObstaclePositions} from "../Obstacle";

export class SpecimenLocker extends StorageObstacle {
	constructor(isLocked: boolean, contents: Item[]) {
		super(
			'Specimen Locker',
			'A tall, temperature-controlled locker containing labeled sample containers.',
			ObstaclePositions.WALL,
			'standing upright against the wall',
			isLocked,
			contents
		);
	}
}