const StorageObstacle = require('../StorageObstacle');

class Dresser extends StorageObstacle {
	/**
	 * @param {boolean} isLocked
	 * @param {Item[]} contents
	 */
	constructor(isLocked, contents) {
		super(
			'Dresser',
			contents.length > 0
				? 'An old wooden dresser with several drawers. It seems one of the drawers is slightly ajar, revealing some items inside.'
				: 'An old wooden dresser with several drawers. All of the drawers seem to be stuck and cannot be opened.',
			isLocked,
			contents
		);
	}
}

module.exports = Dresser;