const Obstacle = require("../Obstacle");

class IronBars extends Obstacle {
	constructor() {
		super(
			'Iron Bars',
			'Thick iron bars block your way. They are cold and slightly rusted.'
		);
	}
}

module.exports = IronBars;