import {Obstacle, ObstaclePositions} from '../Obstacle';

export class IcicleCluster extends Obstacle {
	constructor() {
		super(
			'Icicle Cluster',
			'A cluster of long icicles hanging from the ceiling beams.',
			ObstaclePositions.CEILING,
			'hanging from the ceiling'
		);
	}
}