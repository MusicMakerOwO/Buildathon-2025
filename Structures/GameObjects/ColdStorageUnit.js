const StorageObstacle = require("../StorageObstacle");

class ColdStorageUnit extends StorageObstacle {
	constructor(isLocked, contents) {
		super(
			'Cold Storage Unit',
			'A frost-covered storage unit. The door seal crackles with ice.',
			isLocked,
			contents
		);
	}
}

module.exports = ColdStorageUnit;