const Obstacle = require("../Obstacle");

class ShatteredControlPanel extends Obstacle {
	constructor() {
		super(
			'Shattered Control Panel',
			'A control panel with its screen cracked and buttons missing. Sparks occasionally fly from exposed wiring.'
		);
	}
}

module.exports = ShatteredControlPanel;