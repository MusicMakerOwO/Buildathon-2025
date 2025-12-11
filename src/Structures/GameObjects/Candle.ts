import {Obstacle, ObstaclePositions} from '../Obstacle';

export class Candle extends Obstacle {
	constructor() {
		super(
			'Candle',
			'A flickering candle mounted on the wall, casting eerie shadows around the room. There is a puddle of melted wax beneath it.',
			ObstaclePositions.WALL,
			'mounted on the wall'
		);
	}
}