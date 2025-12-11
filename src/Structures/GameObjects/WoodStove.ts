import {Item} from "../Item";
import {StorageObstacle} from "../StorageObstacle";

export class WoodStove extends StorageObstacle {
	constructor(isLocked: boolean, contents: Item[]) {
		isLocked = false;
		super(
			'Wood Stove',
			'An old-fashioned wood stove with a small oven compartment below the burners.',
			isLocked,
			contents
		);
	}
}