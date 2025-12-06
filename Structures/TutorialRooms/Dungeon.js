const RoomController = require("../RoomController");
const Lantern = require("../GameObjects/Lantern");
const Crack = require("../GameObjects/Crack");
const Key = require("../Items/Key");

class Dungeon extends RoomController {
	constructor() {
		super(
			`
You wake up in a dimly lit dungeon room. The cold stone walls are damp to the touch, and the air is thick with the scent of moss and mildew.
You have been throw down here for your crimes against the kingdom, left to rot and wither away.
A single flickering lantern hangs from a rusty chain in the center of the room, casting eerie shadows that dance across the walls.
In one corner, you notice a narrow crack in the wall, just wide enough to fit your hand inside.
`,
			[Lantern, Crack],
			[Key],
			2,
			1,
		);
	}
}

module.exports = Dungeon;