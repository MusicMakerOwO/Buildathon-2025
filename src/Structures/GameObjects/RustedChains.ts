import {Obstacle, ObstaclePositions} from '../Obstacle';

export class RustedChains extends Obstacle {
	constructor() {
		super(
			'Rusted Chains',
			'Old chains hang from the wall, rattling slightly when touched.',
			ObstaclePositions.WALL,
			'hanging loosely from the wall'
		);
	}
}