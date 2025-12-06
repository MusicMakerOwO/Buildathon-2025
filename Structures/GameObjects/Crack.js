const StorageObstacle = require('../StorageObstacle');

class Crack extends StorageObstacle {
	/**
	 * The crack is always unlocked, items are still optional.
	 * @param {false} isLocked
	 * @param {Item[]} contents
	 */
	constructor(isLocked, contents) {
		isLocked = false;
		super(
			'Crack',
			'A narrow crack in the wall, just wide enough to fit your hand inside.',
			isLocked,
			contents
		);
	}
}

module.exports = Crack;