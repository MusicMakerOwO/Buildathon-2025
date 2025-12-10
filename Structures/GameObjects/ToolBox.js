const StorageObstacle = require("../StorageObstacle");

class ToolBox extends StorageObstacle {
	/**
	 * @param {false} isLocked
	 * @param {Item[]} contents
	 */
	constructor(isLocked, contents) {
		isLocked = false;
		super(
			'Tool Box',
			'A metal toolbox with a stiff handle. The latch looks a bit rusty but it should open fine.',
			isLocked,
			contents
		);
	}
}

module.exports = ToolBox;