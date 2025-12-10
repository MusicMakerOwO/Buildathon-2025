const StorageObstacle = require("../StorageObstacle");

class ChemicalCabinet extends StorageObstacle {
	constructor(isLocked, contents) {
		super(
			'Chemical Cabinet',
			'A heavy steel cabinet meant for storing hazardous chemicals. A greenish-yellow liquid slowly drips from a small crack in the door and sizzles as it hits the floor.',
			isLocked,
			contents
		);
	}
}

module.exports = ChemicalCabinet;