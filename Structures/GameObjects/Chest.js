const StorageObstacle = require("../StorageObstacle");

class Chest extends StorageObstacle {
	constructor(isLocked, contents) {
		super(
			'Chest',
			'A sturdy wooden chest reinforced with iron bands.',
			isLocked,
			contents
		);
	}
}

module.exports = Chest;