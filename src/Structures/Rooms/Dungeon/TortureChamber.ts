import {RoomController} from "../../RoomController";
import {BloodStains, Chest, IronMaiden, Locker, RustedChains} from "../../GameObjects";

export class TortureChamber extends RoomController {
	constructor() {
		super(`
The air is thick with the scent of rust and decay. \
Dim light filters through narrow, barred windows, casting eerie shadows on the stone walls. \
Various implements of torture are scattered around the room, including a menacing iron maiden standing ominously in one corner. \
Dried blood splatters the floor and walls, a grim reminder of the suffering that has taken place here.
You pray that you will not be the next victim in this dreadful place.
`.trim(),
			[Chest, Locker],
			[RustedChains, BloodStains, IronMaiden],
			[]
		);
	}
}