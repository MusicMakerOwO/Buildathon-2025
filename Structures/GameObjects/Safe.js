const StorageObstacle = require("../StorageObstacle");

class Safe extends StorageObstacle {
	constructor(isLocked, contents) {
		super(
			'Safe',
			'A heavy metal safe with little bits of rust along the edges. Its dial sticks slightly when turned.',
			isLocked,
			contents
		);
	}
}

module.exports = Safe;