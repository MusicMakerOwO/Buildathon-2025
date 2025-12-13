import {Obstacle} from '../Obstacle';

const RANDOM_DESCRIPTIONS: string[] = [
	'An antique clock with intricate carvings and a pendulum that swings rhythmically. The hands move slowly, marking the passage of time in this forgotten place.',
	'A massive grandfather clock standing tall against the wall. Its deep chimes echo through the room, creating an eerie atmosphere as the minutes tick by.',
	'A small mantel clock with a delicate face and ornate hands. The ticking sound is oddly comforting, yet there is something unsettling about its presence here.',
	'A vintage wall clock with faded numbers and a cracked glass cover. The hands seem to move erratically, as if time itself is distorted in this location.',
	'A peculiar clock with no numbers, only symbols that glow faintly in the dim light. Its mysterious design suggests it may not measure time in a conventional way.',
	'A broken clock lying on the floor, its hands frozen at midnight. The silence it brings contrasts sharply with the usual ticking of timepieces, adding to the room\'s eerie stillness.',
]

export class Clock extends Obstacle {
	constructor() {
		super(
			'Clock',
			RANDOM_DESCRIPTIONS[ Math.floor(Math.random() * RANDOM_DESCRIPTIONS.length) ],
		);
	}
}