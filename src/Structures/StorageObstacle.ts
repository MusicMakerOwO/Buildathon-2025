import {Item} from "./Item";
import {Obstacle} from "./Obstacle";
import {PlayerController} from "./PlayerController";
import {Key} from "./Items/Key";

export class StorageObstacle extends Obstacle {
	contents: Item[];
	isLocked: boolean;

	constructor(
		name: string,
		description: string,
		isLocked: boolean,
		contents: Item[],
		additionActions?: string[]
	) {
		super(
			name,
			description,
			(
				isLocked ? ['unlock', 'open'] : ['open']
			).concat(additionActions || [])
		);

		this.contents = Array.isArray(contents) ? contents : [];
		this.isLocked = Boolean(isLocked);
	}

	interact(player: PlayerController, action: string) {
		if (action === 'open') {
			if (this.contents.length === 0) {
				return `You open the ${this.name}, but find nothing of interest.`;
			} else {
				if (this.isLocked) {
					return `The ${this.name} is locked. You must unlock it first.`;
				} else {
					const itemsList = this.contents.map(item => `- ${item.name} (x${item.count})`).join('\n');
					this.contents.forEach(item => player.addItem(item));
					this.contents = [];
					return `You open the ${this.name} and find:\n${itemsList}\nThe items have been added to your inventory.`;
				}
			}
		}

		if (action === 'unlock') {
			if (player.hasItem(Key) !== false) {
				player.removeItem(Key, 1);
				return `You use a key to unlock the ${this.name}. You hear a soft click and can now open it.`;
			} else {
				return `You need a key to unlock the ${this.name}.`;
			}
		}

		// handles base actions, error if action not recognized
		return super.interact(player, action);
	}
}