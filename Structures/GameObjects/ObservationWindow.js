const Obstacle = require("../Obstacle");

class ObservationWindow extends Obstacle {
	constructor() {
		super(
			'Observation Window',
			'A reinforced glass window looking into a sealed chamber. A series of cracks run along it like a spiderweb.'
		);
	}
}

module.exports = ObservationWindow;