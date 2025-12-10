const StorageObstacle = require('../StorageObstacle');

class WoodStove extends StorageObstacle {
	/**
	 * The stove is always unlocked, items are still optional.
	 * @param {false} isLocked
	 * @param {Item[]} contents
	 */
	constructor(isLocked, contents) {
		isLocked = false;
		super(
			'Wood Stove',
			'An old-fashioned wood stove with a small oven compartment below the burners.',
			isLocked,
			contents
		);
	}
}

module.exports = WoodStove;