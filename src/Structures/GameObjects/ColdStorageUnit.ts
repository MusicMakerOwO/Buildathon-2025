import {Item} from "../Item";
import {StorageObstacle} from "../StorageObstacle";
import {ObstaclePositions} from "../Obstacle";

export class ColdStorageUnit extends StorageObstacle {
	constructor(isLocked: boolean, contents: Item[]) {
		super(
			'Cold Storage Unit',
			'A frost-covered storage unit. The door seal crackles with ice.',
			ObstaclePositions.WALL,
			'positioned against the far wall',
			isLocked,
			contents
		);
	}
}