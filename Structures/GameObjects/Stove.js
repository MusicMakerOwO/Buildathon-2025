const StorageObstacle = require('../StorageObstacle');

class Stove extends StorageObstacle {
	/**
	 * The stove is always unlocked, items are still optional.
	 * @param {false} isLocked
	 * @param {Item[]} contents
	 */
	constructor(isLocked, contents) {
		isLocked = false;
		super(
			'Stove',
			'An old-fashioned stove with a small oven compartment below the burners.',
			isLocked,
			contents
		);
	}
}

module.exports = Stove;