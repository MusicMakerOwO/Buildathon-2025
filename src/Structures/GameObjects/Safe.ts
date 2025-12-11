import {Item} from "../Item";
import {StorageObstacle} from "../StorageObstacle";
import {ObstaclePositions} from "../Obstacle";

export class Safe extends StorageObstacle {
	constructor(isLocked: boolean, contents: Item[]) {
		super(
			'Safe',
			'A heavy metal safe with little bits of rust along the edges. Its dial sticks slightly when turned but it refuses to open.',
			ObstaclePositions.FLOOR,
			'sitting securely bolted to the floor',
			isLocked,
			contents
		);
	}
}