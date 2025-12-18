import {Prop, PropPositions} from "./CoreStructs";
import {Key} from "./Items";

export class Door extends Prop {
	isLocked: boolean;

	constructor(locked: boolean) {
		super(
			'Door',
			'A sturdy wooden door that leads to the next room.',
			PropPositions.WALL,
			undefined
		);


		this.isLocked = locked;

		super.overrideAction('Open', (room, player) => {
			if (this.isLocked) {
				if (player.hasItem(Key)) {
					player.removeItem(Key, 1);
					this.isLocked = false;
					return {
						message: `You use a key to unlock the door. You hear a soft click and it swings open.`,
						nextRoom: true
					}
				} else {
					return { message: `The door is locked. You need a key to open it.` }
				}
			} else {
				return {
					message: `The door is already unlocked. You open it and step through to the next room.`,
					nextRoom: true
				}
			}
		});
	}
}