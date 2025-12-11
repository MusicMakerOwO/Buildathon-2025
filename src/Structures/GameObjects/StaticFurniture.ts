import {Obstacle, ObstaclePositions} from '../Obstacle'

const FURNITURE_OPTIONS: [name: string, description: string][] = [
	[
		'Couch',
		'A worn-out couch with faded upholstery. It looks surprisingly comfortable despite its age.'
	],
	[
		'Armchair',
		'A plush armchair with intricate wooden carvings on its arms and legs.'
	],
	[
		'Table',
		'A sturdy wooden table, scarred from years of use but still solid.'
	],
	[
		'Coffee Table',
		'A low coffee table with a glass top, surrounded by a few scattered magazines.'
	],
	[
		'Lamp',
		'A tall floor lamp with a decorative shade, casting a warm glow in the room.'
	],
	[
		'Rug',
		'A large, ornate rug with intricate patterns and vibrant colors, adding warmth to the floor.'
	]
]

// This is for furniture that cannot be interacted with, only observed
// For interactable furniture, use ./StorageFurniture.js instead
export class StaticFurniture extends Obstacle {
	constructor() {
		super(
			... FURNITURE_OPTIONS[ Math.floor(Math.random() * FURNITURE_OPTIONS.length) ],
			ObstaclePositions.ROOM,
			'placed roughly in the middle of the room for no apparent reason',
		);
	}
}