import {Obstacle, ObstaclePositions} from '../Obstacle';

const WALL_MOUNT_OPTIONS: [name: string, description: string][] = [
	[
		'Mounted Deer Head',
		'A taxidermy deer head mounted on a wooden plaque. Its glass eyes seem to follow you.'
	],
	[
		'Ancient Sword',
		'An old sword mounted on the wall, its blade tarnished but still sharp.'
	],
	[
		'Decorative Shield',
		'A beautifully crafted shield with intricate designs, hanging proudly on the wall.'
	],
	[
		'Mounted Fish',
		'A large fish mounted on a wooden plaque, its scales shimmering in the light.'
	],
	[
		'Wall Tapestry',
		'A colorful tapestry depicting a historical battle scene, hanging on the wall.'
	]
]

export class WallMount extends Obstacle {
	constructor() {
		super(
			... WALL_MOUNT_OPTIONS[ Math.floor(Math.random() * WALL_MOUNT_OPTIONS.length) ],
			ObstaclePositions.WALL,
			'hanging on the wall'
		);
	}
}