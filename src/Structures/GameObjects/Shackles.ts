import {Obstacle, ObstaclePositions} from '../Obstacle';

export class Shackles extends Obstacle {
	constructor() {
		super(
			'Shackles',
			'Metal shackles bolted to the wall. Long abandoned, yet unsettling.',
			ObstaclePositions.WALL,
			'bolted to the wall'
		);
	}
}