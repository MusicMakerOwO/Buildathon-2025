import {InteractionResult, Item} from "./CoreStructs";
import {Crowbar, Key, LockPick} from "./Items";
import {Class} from "../Typings/Helpers";
import {PlayerController} from "./PlayerController";
import {Room} from "./Room";

type TransitionPropCallback = (room: Room, player: PlayerController, itemUsed?: Item) => InteractionResult;
type TransitionPropInteractionMap = Record<Capitalize<string>, TransitionPropCallback>;

type UnlockItemInfo = {
	/**
	 * Whether the item is consumed on use
	 * @default true
	 */
	consume: boolean
	/**
	 * Whether the item must be used forcefully (e.g., breaking a lock)
	 * This will typically destroy the item regardless of the `consume` flag
	 * and may have additional consequences in-game.
	 * @default false
	 */
	forceful: boolean
};

type UnlockItemsMap = Map<Class<Item>, UnlockItemInfo>;

/**
 * Props that represent transitions between rooms that can be traveled through.
 * These may need to be unlocked or opened in some capacity before they can be used.

 * See the specific prop implementations for more details
 *
 * Default actions:
 * - Open: Attempts to open the transition. If locked, will inform the player they need to unlock it first.
 * - Unlock: (if locked) Attempts to unlock the transition using specified items.
 *
 * A TransitionProp can be locked or unlocked. If locked, the player must use an item from the `unlockItems` map to unlock it.
 */
export class TransitionProp {

	name: string;
	description: string;
	actions: TransitionPropInteractionMap;

	isLocked: boolean;
	unlockItems: UnlockItemsMap;

	constructor(name: string, description: string, locked: boolean, unlockItems: UnlockItemsMap) {
		this.name = name;
		this.description = description;
		this.actions = {
			'Examine': () => {
				return { message: this.description };
			},
			'Open': () => {
				if (this.isLocked) {
					return { message: `The ${this.name} is locked. You must unlock it first.` };
				} else {
					return {
						message: `You open the ${this.name} and pass through.`,
						nextRoom: true
					}
				}
			}
		}

		this.isLocked = locked;
		this.unlockItems = unlockItems ?? new Map([[Key, { consume: true, forceful: false }]]);

		if (this.isLocked) {
			this.actions['Unlock'] = (room, player, itemUsed) => {
				if (!itemUsed) {
					return { message: `You need to use an item to unlock the ${this.name}.` };
				}

				const itemInfo = this.unlockItems.get(itemUsed.constructor as Class<Item>);
				if (!itemInfo) {
					return { message: `You can't use a ${itemUsed.name} to unlock the ${this.name}.` };
				}

				if (itemInfo.forceful || itemInfo.consume) {
					player.removeItem(itemUsed.constructor as Class<Item>, 1);
				}

				this.isLocked = false;

				return { message: `You use the ${itemUsed.name} to unlock the ${this.name}. You hear a soft click and can now open it.` };
			}
		} else {
			this.actions['Unlock'] = () => {
				return { message: `The ${this.name} is already unlocked.` };
			};
		}
	}

	get availableActions(): Capitalize<string>[] {
		return Object.keys(this.actions) as Capitalize<string>[];
	}

	interact(room: Room, player: PlayerController, action: Capitalize<string>): InteractionResult {
		if (action in this.actions) {
			return this.actions[action as Capitalize<string>](room, player);
		}

		// default unhandled action
		return { message: `You can't ${action} the ${this.name}.` };
	}

	useItem(room: Room, player: PlayerController, item: Item): InteractionResult {
		if (this.isLocked && 'Unlock' in this.actions) {
			return this.actions['Unlock'](room, player, item);
		}
		return { message: `You can't use the ${item.name} on the ${this.name}.` };
	}
}

export class Door extends TransitionProp {
	constructor(locked: boolean) {
		super(
			'Door',
			'A sturdy wooden door. It looks like it can be opened to pass through.',
			locked,
			new Map([
				[Key,		{ consume: true,  forceful: false }],
				[LockPick,	{ consume: true,  forceful: true  }],
				[Crowbar,	{ consume: false, forceful: true  }]
			])
		);
	}
}

export class Vent extends TransitionProp {
	constructor(locked: boolean) {
		super(
			'Vent',
			'A small ventilation duct. It looks like you can crawl through it to get to the next room.',
			locked,
			new Map([
				[Crowbar,	{ consume: false, forceful: true  }]
			])
		);
	}
}

export class Hatch extends TransitionProp {
	constructor(locked: boolean) {
		super(
			'Hatch',
			'A metal hatch on the floor. It seems to lead to another area below.',
			locked,
			new Map([
				[Crowbar,	{ consume: false, forceful: true  }]
			])
		);
	}
}