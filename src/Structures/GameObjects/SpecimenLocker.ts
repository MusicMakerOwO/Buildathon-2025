import {StorageObstacle} from "../StorageObstacle";
import {Item} from "../Item";

export class SpecimenLocker extends StorageObstacle {
	constructor(isLocked: boolean, contents: Item[]) {
		super(
			'Specimen Locker',
			'A tall, temperature-controlled locker containing labeled sample containers.',
			isLocked,
			contents
		);
	}
}