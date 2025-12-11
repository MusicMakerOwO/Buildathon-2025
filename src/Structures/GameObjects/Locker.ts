import {Item} from "../Item";
import {StorageObstacle} from "../StorageObstacle";

export class Locker extends StorageObstacle {
	constructor(isLocked: boolean, contents: Item[]) {
		super(
			'Locker',
			'A tall metal locker with a combination lock on the door.',
			isLocked,
			contents
		);
	}
}