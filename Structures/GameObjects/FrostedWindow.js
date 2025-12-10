const Obstacle = require("../Obstacle");

class FrostedWindow extends Obstacle {
	constructor() {
		super(
			'Frosted Window',
			'A small window completely fogged and frozen over. No light passes through.'
		);
	}
}

module.exports = FrostedWindow;