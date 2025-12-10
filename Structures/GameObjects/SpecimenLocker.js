const StorageObstacle = require("../StorageObstacle");

class SpecimenLocker extends StorageObstacle {
	constructor(isLocked, contents) {
		super(
			'Specimen Locker',
			'A tall, temperature-controlled locker containing labeled sample containers.',
			isLocked,
			contents
		);
	}
}

module.exports = SpecimenLocker;