const Obstacle = require("../Obstacle");

class BrokenTestTubes extends Obstacle {
	constructor() {
		super(
			'Broken Test Tubes',
			'Shattered glass litters the floor. Chemical residue stains the surface.'
		);
	}
}

module.exports = BrokenTestTubes;