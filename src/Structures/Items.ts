import {InteractionResult, Item, Prop} from "./CoreStructs";
import {Room} from "./Room";

//////////////////////////
// Keys and Tools
// These items are used to unlock or bypass obstacles
//////////////////////////
export class Key extends Item {
	constructor() {
		super('Key', 'A small rusted key. I wonder where it goes?', 0.1, 1);
	}
}

export class LockPick extends Item {
	constructor() {
		super('Lock Pick', 'A thin piece of metal used to pick locks.', 0.05, 1);
	}
}

export class Crowbar extends Item {
	constructor() {
		super('Crowbar', 'A sturdy metal crowbar. Useful for prying things open or as a makeshift weapon.', 2.5, 1);
	}
}


//////////////////////////
// Information Items
// These items reveal information in some way
//////////////////////////
export class Match extends Item {
	constructor() {
		super('Match', 'A small wooden matchstick. Might be handy to provide light or start a fire.', 0.02, 1);
	}

	use(target: Prop): InteractionResult {
		// TODO: light up dark areas or ignite flammable objects
		throw new Error("Method not implemented.");
	}
}

///////////////////////////
// Special Items
// These items have unique uses or effects
//////////////////////////

export class Journal extends Item {
	constructor() {
		super('Journal', 'An old leather-bound journal filled with handwritten notes and sketches.', 0.5, 1);
	}

	use(target: Room): InteractionResult {
		// TODO: stabilize the room's environment to prevent modifications
		throw new Error("Method not implemented.");
	}
}