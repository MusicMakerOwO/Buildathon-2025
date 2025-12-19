import {InteractionResult, Item} from "./CoreStructs";
import {Room} from "./Room";
import {PlayerController} from "./PlayerController";
import {GameController} from "./GameController";

//////////////////////////
// Keys and Tools
// These items are used to unlock or bypass obstacles
//////////////////////////
export class Key extends Item {
	constructor() {
		super('Key', 'A small rusted key. I wonder where it goes?', 0.1, 1);
	}
}

//////////////////////////
// Information Items
// These items reveal information in some way
//////////////////////////


///////////////////////////
// Special Items
// These items have unique uses or effects
//////////////////////////
export class Journal extends Item {
	constructor() {
		super('Journal', 'An old leather-bound journal filled with handwritten notes and sketches.', 0.5, 1);
	}

	use(game: GameController, room: Room, player: PlayerController): InteractionResult {
		// TODO: stabilize the room's environment to prevent modifications
		throw new Error("Method not implemented.");
	}
}

export class Chalk extends Item {
	constructor() {
		super('Chalk', 'A piece of white chalk. Useful for marking surfaces or drawing symbols.', 0.1, 1);
	}

	use(game: GameController, room: Room, player: PlayerController): InteractionResult {
		// TODO: mark surfaces or create symbols that have special effects
		throw new Error("Method not implemented.");
	}
}