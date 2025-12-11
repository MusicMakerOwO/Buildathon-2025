import {Obstacle, ObstaclePositions} from '../Obstacle';

export class FrostedWindow extends Obstacle {
	constructor() {
		super(
			'Frosted Window',
			'A small window completely fogged and frozen over. No light passes through.',
			ObstaclePositions.WALL,
			'set high in the wall'
		);
	}
}