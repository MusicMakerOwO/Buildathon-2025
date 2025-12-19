import {Room} from "./Room";
import {Candle, ChemicalCabinet, Chest, Crack, Fireplace, Table} from "./GameObjects";
import {Class, ObjectValues} from "../Typings/Helpers";
import {THEMES} from "../Typings/GameTypes";

class Dungeon extends Room {
	constructor() {
		super(`
You wake up in a dimly lit dungeon room. The cold stone walls are damp to the touch, and the air is thick with the scent of moss and mildew. \
You have been thrown down here for your crimes against the kingdom, left to rot and wither away. \
A single flickering lantern hangs from a rusty chain in the center of the room, casting eerie shadows that dance across the walls. \
In one corner, you notice a narrow crack in the wall, just wide enough to fit your hand inside.
`.trim(),
			[new Crack(), new Candle()],
			[]
		);
	}
}

class HauntedHouse extends Room {
	constructor() {
		super(`
You find yourself in a decrepit room of a haunted house. The wallpaper is peeling, and the floorboards creak under your weight. \
A cold breeze brushes past you, carrying with it faint whispers that seem to come from nowhere. \
In the corner of the room, an old, dusty mirror hangs crookedly on the wall, its surface cracked and fogged. \
You feel an unsettling presence, as if unseen eyes are watching your every move.
`.trim(),
			[new Candle(), new Table()],
			[]
		);
	}
}

class AbandonedLab extends Room {
	constructor() {
		super(`
You awaken in a sterile, abandoned laboratory. The walls are lined with empty shelves and broken equipment. \
Flickering fluorescent lights cast a sickly glow, illuminating the scattered papers and shattered glass on the floor. \
In one corner, a toppled-over microscope lies among the debris, its lenses cracked and useless. \
The air is thick with the smell of chemicals and decay, and you can't shake the feeling that something went terribly wrong here.
`.trim(),
			[new Table(), new ChemicalCabinet()],
			[]
		);
	}
}

class SnowyCabin extends Room {
	constructor() {
		super(`
You find yourself in a small, cozy cabin surrounded by a snowy wilderness. The wooden walls are adorned with rustic decorations, and a warm fire crackles in the stone fireplace. \
Outside, the snow falls gently, blanketing the landscape in a serene white. \
In one corner of the room, a wooden chest sits partially buried under a pile of blankets and winter gear. \
The air is filled with the comforting scent of pine and burning wood, but you can't help but feel a sense of isolation in this remote location.
`.trim(),
			[new Chest(), new Fireplace()],
			[]
		);
	}
}

export const TutorialRooms: { [key in ObjectValues<typeof THEMES>]: Class<Room> } = {
	[THEMES.Dungeon]: Dungeon,
	[THEMES.HauntedHouse]: HauntedHouse,
	[THEMES.AbandonedLab]: AbandonedLab,
	[THEMES.SnowyCabin]: SnowyCabin
};