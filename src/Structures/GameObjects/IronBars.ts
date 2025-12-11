import {Obstacle, ObstaclePositions} from '../Obstacle';

export class IronBars extends Obstacle {
	constructor() {
		super(
			'Iron Bars',
			'A set of sturdy iron bars, cold to the touch and unyielding.',
			ObstaclePositions.WALL,
			'embedded in the wall'
		);
	}
}