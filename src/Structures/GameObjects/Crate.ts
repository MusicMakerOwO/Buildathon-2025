import {Item} from "../Item";
import {StorageObstacle} from "../StorageObstacle";
import {ObstaclePositions} from "../Obstacle";

export class Crate extends StorageObstacle {
	constructor(isLocked: boolean, contents: Item[]) {
		super(
			'Crate',
			'A heavy crate marked with faded symbols. The wood is weathered and aged from years of use.',
			ObstaclePositions.FLOOR,
			'resting heavily on the ground',
			isLocked,
			contents
		);
	}
}