import {StorageObstacle} from "../StorageObstacle";
import {Item} from "../Item";
import {ObstaclePositions} from "../Obstacle";

export class Dresser extends StorageObstacle {
	constructor(isLocked: boolean, contents: Item[]) {
		super(
			'Dresser',
			contents.length > 0
				? 'An old wooden dresser with several drawers. It seems one of the drawers is slightly ajar, revealing some items inside.'
				: 'An old wooden dresser with several drawers. All of the drawers seem to be stuck and cannot be opened.',
			ObstaclePositions.WALL,
			'standing along the wall',
			isLocked,
			contents
		);
	}
}