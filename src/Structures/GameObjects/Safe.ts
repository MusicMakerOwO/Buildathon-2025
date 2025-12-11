import {Item} from "../Item";
import {StorageObstacle} from "../StorageObstacle";

export class Safe extends StorageObstacle {
	constructor(isLocked: boolean, contents: Item[]) {
		super(
			'Safe',
			'A heavy metal safe with little bits of rust along the edges. Its dial sticks slightly when turned.',
			isLocked,
			contents
		);
	}
}