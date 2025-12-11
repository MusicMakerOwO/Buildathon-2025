import {Item} from "../Item";
import {StorageObstacle} from "../StorageObstacle";
import {ObstaclePositions} from "../Obstacle";

export class WoodStove extends StorageObstacle {
	constructor(isLocked: boolean, contents: Item[]) {
		isLocked = false;
		super(
			'Wood Stove',
			'An old-fashioned wood stove with a small oven compartment below the burners.',
			ObstaclePositions.ROOM,
			'sitting against the wall with a chimney pipe extending upward',
			isLocked,
			contents
		);
	}
}