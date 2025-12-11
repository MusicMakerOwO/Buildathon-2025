import {Obstacle, ObstaclePositions} from '../Obstacle';

export class ObservationWindow extends Obstacle {
	constructor() {
		super(
			'Observation Window',
			'A reinforced glass window looking into a sealed chamber. A series of cracks run along it like a spiderweb.',
			ObstaclePositions.WALL,
			'set into the wall'
		);
	}
}