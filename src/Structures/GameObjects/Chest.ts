import {Item} from "../Item";
import {StorageObstacle} from "../StorageObstacle";

export class Chest extends StorageObstacle {
	constructor(isLocked: boolean, contents: Item[]) {
		super(
			'Chest',
			'A sturdy wooden chest reinforced with iron bands.',
			isLocked,
			contents
		);
	}
}