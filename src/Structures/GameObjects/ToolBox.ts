import {Item} from "../Item";
import {StorageObstacle} from "../StorageObstacle";
import {ObstaclePositions} from "../Obstacle";

export class ToolBox extends StorageObstacle {
	constructor(isLocked: boolean, contents: Item[]) {
		isLocked = false;
		super(
			'Tool Box',
			'A metal toolbox with a stiff handle. The latch looks a bit rusty but it should open fine.',
			ObstaclePositions.FLOOR,
			'sitting on the floor',
			isLocked,
			contents
		);
	}
}