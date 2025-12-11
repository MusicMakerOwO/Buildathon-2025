import {RoomController} from "../RoomController";
import {Crack} from "../GameObjects/Crack";
import {Bookshelf} from "../GameObjects/Bookshelf";
import {Lantern} from "../GameObjects/Lantern";
import {Clock} from "../GameObjects/Clock";
import {Rock} from "../Items/Rock";

export class PrisonCell extends RoomController {
	constructor() {
		super(
			'A dark and damp prison cell with cold stone walls. The air is thick with the smell of mildew and despair. A small barred window lets in a sliver of light, casting eerie shadows on the floor. There is a simple cot against one wall and a rusty toilet in the corner.',
			[Crack],
			[Bookshelf, Lantern, Clock],
			[Rock]
		);
	}
}