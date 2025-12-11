import {Item} from "../Item";
import {StorageObstacle} from "../StorageObstacle";

export class ToolBox extends StorageObstacle {
	constructor(isLocked: boolean, contents: Item[]) {
		isLocked = false;
		super(
			'Tool Box',
			'A metal toolbox with a stiff handle. The latch looks a bit rusty but it should open fine.',
			isLocked,
			contents
		);
	}
}