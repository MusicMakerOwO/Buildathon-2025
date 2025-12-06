const StorageObstacle = require('../StorageObstacle');

class Bookshelf extends StorageObstacle {
	/**
	 * @param {boolean} isLocked
	 * @param {Item[]} contents
	 */
	constructor(isLocked, contents) {
		super(
			'Bookshelf',
			contents.length > 0
				? 'A tall wooden bookshelf filled with dusty old books. You notice a drawer at the bottom that seems to be part of the bookshelf.'
				: 'A tall wooden bookshelf filled with dusty old books.',
			isLocked,
			contents
		);
	}
}

module.exports = Bookshelf;