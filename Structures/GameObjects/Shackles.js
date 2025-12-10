const Obstacle = require("../Obstacle");

class Shackles extends Obstacle {
	constructor() {
		super(
			'Shackles',
			'Metal shackles bolted to the wall. Long abandoned, yet unsettling.'
		);
	}
}

module.exports = Shackles;