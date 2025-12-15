import {RoomController} from "../RoomController";
import {Candle, Crack} from "../GameObjects";

export class Dungeon extends RoomController {
	constructor() {
		super(`
You wake up in a dimly lit dungeon room. The cold stone walls are damp to the touch, and the air is thick with the scent of moss and mildew. \
You have been thrown down here for your crimes against the kingdom, left to rot and wither away. \
A single flickering lantern hangs from a rusty chain in the center of the room, casting eerie shadows that dance across the walls. \
In one corner, you notice a narrow crack in the wall, just wide enough to fit your hand inside.
`.trim(),
			[Crack],
			[Candle],
			[]
		);
	}
}