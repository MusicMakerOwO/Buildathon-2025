import {Obstacle, ObstaclePositions} from '../Obstacle';

export class Bookshelf extends Obstacle {
	constructor() {
		super(
			'Bookshelf',
			'A tall wooden bookshelf filled with dusty old books.',
			ObstaclePositions.WALL,
			'standing against the wall'
		);
	}
}