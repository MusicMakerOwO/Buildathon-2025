const StorageObstacle = require("../StorageObstacle");

class Crate extends StorageObstacle {
	constructor(isLocked, contents) {
		super(
			'Crate',
			'A heavy crate marked with faded symbols. The wood is weathered and aged from years of use.',
			isLocked,
			contents
		);
	}
}

module.exports = Crate;