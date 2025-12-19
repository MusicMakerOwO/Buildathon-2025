import {Class} from "../Typings/Helpers";
import {Key} from "./Items";
import {PlayerController} from "./PlayerController";
import {InteractionResult, Item, Prop, PropPositions} from "./CoreStructs";
import {Door} from "./TransitionProps";

const BASE_ACTIONS: Capitalize<string>[] = ['Inventory', 'Examine'] as const;

class FloorProp extends Prop {
	constructor() {
		super(
			'Floor',
			'A dusty old floor. Nothing special about it.',
			PropPositions.FLOOR,
			'You spot something glinting in the corner.',
		);
	}
}

export class Room {

	description: string;
	items: Map<Class<Item>, Item>;
	props: Map<Class<Prop>, Prop>;
	door: Door;
	floor: FloorProp;
	isUnlocked: boolean;

	constructor(description: string, props: Class<Prop>[], items: Class<Item>[]) {
		this.description = description;
		this.items = new Map(); // class -> instance
		this.props = new Map(); // class -> instance
		this.door = new Door(true);
		this.floor = new FloorProp();

		this.isUnlocked = true;

		this.#InitializeProps(props, items);
	}


	#InitializeProps(props: Class<Prop>[], items: Class<Item>[]) {

		const propInstances = props.map(PropClass => new PropClass());

		let randomIndex: number;
		do {
			randomIndex = Math.floor(Math.random() * props.length);
		} while (!propInstances[randomIndex].canHoldItems);

		const keyItem = new Key();
		propInstances[randomIndex].addItem(keyItem);

		for (const propInstance of propInstances) {
			this.props.set(propInstance.constructor as Class<Prop>, propInstance);
		}

		for (const ItemClass of items) {
			const itemInstance = new ItemClass();
			this.items.set(ItemClass, itemInstance);
		}
	}

	/** Handles player interaction with props in the room */
	interact(player: PlayerController, action: Capitalize<string>, propString: string): InteractionResult {
		propString = String(propString).toLowerCase();

		if (propString === 'floor') {
			return this.floor.interact(this, player, action);
		}

		if (propString === 'door') {
			return this.door.interact(this, player, action);
		}

		// Check props
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

		if (propString === 'door') {
			return this.door.interact(this, player, action);
		}

		// And finally, 404 error
		return { message: `There is no ${propString} here to interact with.` };
	}

	resolvePropByName(propName: string): Prop | null {
		propName = String(propName).toLowerCase();
		if (propName === 'door') return this.door;
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
		for (const action of this.door.availableActions) {
			if (action in actionMap) {
				actionMap[action].push(this.door);
			} else {
				actionMap[action] = [this.door];
			}
		}
		return actionMap;
	}

	get itemsOnFloor(): Item[] {
		return Array.from( this.items.values() );
	}
}