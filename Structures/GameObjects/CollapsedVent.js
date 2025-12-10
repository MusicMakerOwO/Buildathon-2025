const Obstacle = require("../Obstacle");

class CollapsedVent extends Obstacle {
	constructor() {
		super(
			'Collapsed Vent',
			'A ventilation shaft that has caved in, scattering dust and twisted metal.'
		);
	}
}

module.exports = CollapsedVent;