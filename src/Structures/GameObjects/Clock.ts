import {Obstacle, ObstaclePositions} from '../Obstacle';
import {ObjectValues} from "../../Typings/Helpers";

const RANDOM_DESCRIPTIONS: [description: string, position: ObjectValues<typeof ObstaclePositions>, placement: string][] = [
	[
		'An antique clock with intricate carvings and a pendulum that swings rhythmically. The hands move slowly, marking the passage of time in this forgotten place.',
		ObstaclePositions.WALL,
		'siting atop a dusty shelf',
	],
	[
		'A massive grandfather clock standing tall against the wall. Its deep chimes echo through the room, creating an eerie atmosphere as the minutes tick by.',
		ObstaclePositions.WALL,
		'standing against the wall',
	],
	[
		'A small mantel clock with a delicate face and ornate hands. The ticking sound is oddly comforting, yet there is something unsettling about its presence here.',
		ObstaclePositions.ROOM,
		'sitting on a cracked mantelpiece',
	],
	[
		'A vintage wall clock with faded numbers and a cracked glass cover. The hands seem to move erratically, as if time itself is distorted in this location.',
		ObstaclePositions.WALL,
		'hanging crookedly on the wall',
	],
	[
		'A peculiar clock with no numbers, only symbols that glow faintly in the dim light. Its mysterious design suggests it may not measure time in a conventional way.',
		ObstaclePositions.ROOM,
		'resting on an old wooden stool',
	],
	[
		'A broken clock lying on the floor, its hands frozen at midnight. The silence it brings contrasts sharply with the usual ticking of timepieces, adding to the room\'s eerie stillness.',
		ObstaclePositions.FLOOR,
		'lying broken on the floor',
	],
]

export class Clock extends Obstacle {
	constructor() {
		super(
			'Clock',
			... RANDOM_DESCRIPTIONS[ Math.floor(Math.random() * RANDOM_DESCRIPTIONS.length) ],
		);
	}
}