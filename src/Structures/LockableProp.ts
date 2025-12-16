import {ObjectValues} from "../Typings/Helpers";
import {Key} from "./Items";
import {Prop, PropInteractionMap, PropPositions} from "./CoreStructs";

export class LockableProp extends Prop {
	isLocked: boolean;

	constructor(
		name: string,
		description: string,
		position: ObjectValues<typeof PropPositions>,
		isLocked: boolean,
	) {

		const additionalActions: PropInteractionMap = {
			Open: (room, player) => {
				if (this.contents.length === 0) {
					return { message: `You open the ${this.name}, but find nothing of interest.` };
				} else {
					if (this.isLocked) {
						return { message: `The ${this.name} is locked. You must unlock it first.` };
					} else {
						const itemsList = this.contents.map(item => `- ${item.name} (x${item.count})`).join('\n');
						this.contents.forEach(item => player.addItem(item));
						this.contents = [];
						return { message: `You open the ${this.name} and find:\n${itemsList}\nThe items have been added to your inventory.` };
					}
				}
			}
		};

		if (isLocked) {
			additionalActions['Unlock'] = (room, player) => {
				if (player.hasItem(Key) !== false) {
					player.removeItem(Key, 1);
					this.isLocked = false;
					return { message: `You use a key to unlock the ${this.name}. You hear a soft click and can now open it.` };
				} else {
					return { message: `You need a key to unlock the ${this.name}.` };
				}
			};
		}

		super(
			name,
			description,
			position,
			additionalActions
		);

		this.isLocked = Boolean(isLocked);
	}
}