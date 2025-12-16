import {Class} from "../Typings/Helpers";
import {Key} from "./Items";
import {PlayerController} from "./PlayerController";
import {InteractionResult, Item, Prop, PropPositions} from "./CoreStructs";

const BASE_ACTIONS: Capitalize<string>[] = ['Inventory', 'Examine'] as const;

class FloorProp extends Prop {
	constructor() {
		super(
			'Floor',
			'A dusty old floor. Nothing special about it.',
			PropPositions.FLOOR
		);
	}
}

export class Room {

	description: string;
	items: Map<Class<Item>, Item>;
	props: Map<Class<Prop>, Prop>;
	isUnlocked: boolean;

	constructor(description: string, props: Class<Prop>[], items: Class<Item>[]) {
		this.description = description;
		this.items = new Map(); // class -> instance
		this.props = new Map(); // class -> instance

		this.isUnlocked = true;

		this.#InitializeProps(props, items);
	}


	#InitializeProps(props: Class<Prop>[], items: Class<Item>[]) {

		// select 1 prop randomly to contain a key item
		const randomIndex = Math.floor(Math.random() * props.length);
		const keyItem = new Key();
		for (let i = 0; i < props.length; i++) {
			const PropClass = props[i];
			const propInstance = new PropClass();
			if (i === randomIndex) {
				// add key item to this prop's contents
				propInstance.addItem(keyItem);
			}
			this.props.set(PropClass, propInstance); // class -> instance
		}
		const itemList = new Map();
		for (const ItemClass of items) {
			const itemInstance = new ItemClass();
			if (!this.items.has(ItemClass)) {
				this.items.set(ItemClass, itemInstance);
			} else {
				// if item already exists (multiple of same type), increase quantity
				const existingItem = this.items.get(ItemClass)!;
				existingItem.count += itemInstance.count;
			}
		}
		const floorInstance = new FloorProp();
		for (const itemInstance of itemList.values()) {
			floorInstance.addItem(itemInstance);
		}
		this.props.set(FloorProp, floorInstance);
	}

	/**
	 * Handles player interaction with props in the room (items/props/inventory).
	 */
	interact(player: PlayerController, action: Capitalize<string>, propString: string): InteractionResult {
		propString = String(propString).toLowerCase();

		// Check items on floor first
		for (const item of this.items.values()) {
			if (item.name.toLowerCase() === propString) {
				if (action === 'Grab') {
					player.addItem(item);
					this.items.delete(item.constructor as Class<Item>);
					return { message: `You take the ${item.name} and put it in your pocket.` };
				}

				return item.interact(this, player, action);
			}
		}

		// Next check props
		for (const prop of this.props.values()) {
			if (prop.name.toLowerCase() === propString) {
				return prop.interact(this, player, action);
			}
		}

		// Then player inventory
		for (const item of player.inventory.values()) {
			if (item.name.toLowerCase() === propString) {
				return item.interact(this, player, action);
			}
		}

		// And finally, 404 error
		return { message: `There is no ${propString} here to interact with.` };
	}

	resolvePropByName(propName: string): Prop | null {
		propName = String(propName).toLowerCase();
		for (const prop of this.props.values()) {
			if (prop.name.toLowerCase() === propName) {
				return prop;
			}
		}
		return null;
	}

	/**
	 * Returns a mapping of all available actions in the room to the props that support them.
	 */
	get availableActions(): Record<Capitalize<string>, Prop[]> {
		const actionMap: Record<Capitalize<string>, Prop[]> = Object.fromEntries(
			BASE_ACTIONS.map(action => [action, []])
		);
		for (const prop of this.props.values()) {
			for (const action of prop.availableActions) {
				if (action in actionMap) {
					actionMap[action].push(prop);
				} else {
					actionMap[action] = [prop];
				}
			}
		}
		return actionMap;
	}

	get itemsOnFloor(): Item[] {
		return Array.from( this.items.values() );
	}
}