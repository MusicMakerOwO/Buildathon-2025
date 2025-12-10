const Obstacle = require("../Obstacle");

class SnowdriftBlockage extends Obstacle {
	constructor() {
		super(
			'Snowdrift Blockage',
			'A mound of packed snow blocking part of the room. Cold air seeps through a nearby window making the snow hard and icy.'
		);
	}
}

module.exports = SnowdriftBlockage;