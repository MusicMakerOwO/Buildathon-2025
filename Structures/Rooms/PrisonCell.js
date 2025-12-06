const RoomController = require('../RoomController');
const Bookshelf = require("../GameObjects/Bookshelf");
const Lantern = require("../GameObjects/Lantern");
const Clock = require("../GameObjects/Clock");
const Crack = require("../GameObjects/Crack");
const Rock = require("../Items/Rock");

class PrisonCell extends RoomController {
	constructor() {
		super(
			'A dark and damp prison cell with cold stone walls. The air is thick with the smell of mildew and despair. A small barred window lets in a sliver of light, casting eerie shadows on the floor. There is a simple cot against one wall and a rusty toilet in the corner.',
			[Bookshelf, Lantern, Clock, Crack],
			[Rock],
			5,
			3
		);
	}
}

module.exports = PrisonCell;