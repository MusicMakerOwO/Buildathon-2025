const StorageObstacle = require("../StorageObstacle");

class Locker extends StorageObstacle {
	constructor(isLocked, contents) {
		super(
			'Locker',
			'A tall metal locker with a combination lock on the door.',
			isLocked,
			contents
		);
	}
}

module.exports = Locker;