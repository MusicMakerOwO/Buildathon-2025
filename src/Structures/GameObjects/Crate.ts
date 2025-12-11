import {Item} from "../Item";
import {StorageObstacle} from "../StorageObstacle";

export class Crate extends StorageObstacle {
	constructor(isLocked: boolean, contents: Item[]) {
		super(
			'Crate',
			'A heavy crate marked with faded symbols. The wood is weathered and aged from years of use.',
			isLocked,
			contents
		);
	}
}