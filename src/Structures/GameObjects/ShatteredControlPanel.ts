import {Obstacle, ObstaclePositions} from '../Obstacle';

export class ShatteredControlPanel extends Obstacle {
	constructor() {
		super(
			'Shattered Control Panel',
			'A control panel with its screen cracked and buttons missing. Sparks occasionally fly from exposed wiring.',
			ObstaclePositions.WALL,
			'mounted to the wall, barely functional'
		);
	}
}