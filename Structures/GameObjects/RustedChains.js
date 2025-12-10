const Obstacle = require("../Obstacle");

class RustedChains extends Obstacle {
	constructor() {
		super(
			'Rusted Chains',
			'Old chains hang from the wall, rattling slightly when touched.'
		);
	}
}

module.exports = RustedChains;