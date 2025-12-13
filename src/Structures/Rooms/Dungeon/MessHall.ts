import {RoomController} from "../../RoomController";
import {Chest} from "../../GameObjects/Chest";
import {Lantern} from "../../GameObjects/Lantern";
import {Crate} from "../../GameObjects/Crate";
import {Table} from "../../GameObjects/Table";
import {Bench} from "../../GameObjects/Bench";

export class MessHall extends RoomController {
	constructor() {
		super(`
Tables and benches are arranged in neat rows. \
No one is present at the moment but you hear faint voices echoing from the other room. \
The smell of stale food lingers in the air, mixed with the scent of damp stone walls. \
Wooden crates and chests are stacked against the walls, some slightly ajar as if recently rummaged through. \
A single lantern hangs from a hook on the wall, its dim light casting long shadows across the room.
`.trim(),
			[Chest, Crate],
			[Lantern, Bench, Table],
			[]
		);
	}
}