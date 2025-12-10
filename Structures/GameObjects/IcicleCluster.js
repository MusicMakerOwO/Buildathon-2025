const Obstacle = require("../Obstacle");

class IcicleCluster extends Obstacle {
	constructor() {
		super(
			'Icicle Cluster',
			'A cluster of long icicles hanging from the ceiling beams.'
		);
	}
}

module.exports = IcicleCluster;