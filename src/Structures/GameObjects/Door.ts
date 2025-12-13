import {PlayerController} from "../PlayerController";
import {Obstacle} from "../Obstacle";
import {Key} from "../Items/Key";

export class Door extends Obstacle {
	isLocked: boolean;

	constructor() {
		super(
			'Door',
			'A sturdy wooden door with iron hinges. It looks like it can be locked or unlocked.',
			['open', 'unlock'],
		);
		this.isLocked = true;
	}

	interact(player: PlayerController, action: string) {
		if (action === 'open') {
			if (this.isLocked) {
				return `The door is locked. You must unlock it first.`;
			} else {
				return `You open the door and pass through.`;
			}
		}

		if (action === 'unlock') {
			if (!this.isLocked) {
				return `The door is already unlocked. You can open it.`;
			} else {
				if (player.hasItem(Key)) {
					player.removeItem(Key, 1);
					this.isLocked = false;
					return `You use a key to unlock the door. You hear a loud click and can now open it.`;
				} else {
					return `You need a key to unlock the door.`;
				}
			}
		}

		return super.interact(player, action);
	}
}