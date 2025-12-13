import {Item} from "../Item";
import {StorageObstacle} from "../StorageObstacle";

export class ColdStorageUnit extends StorageObstacle {
	constructor(isLocked: boolean, contents: Item[]) {
		super(
			'Cold Storage Unit',
			'A frost-covered storage unit. The door seal crackles with ice.',
			isLocked,
			contents
		);
	}
}