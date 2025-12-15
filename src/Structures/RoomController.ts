import {Class} from "../Typings/Helpers";
import {Key} from "./Items/Key";
import {PlayerController} from "./PlayerController";
import {InteractionResult, Item, Prop} from "./CoreStructs";

const BASE_ACTIONS: Capitalize<string>[] = ['Inventory', 'Grab', 'Examine'] as const;

export class RoomController {

	description: string;
	items: Map<Class<Item>, Item>;
	obstacles: Map<Class<Prop>, Prop>;
	isUnlocked: boolean;

	constructor(description: string, props: Class<Prop>[], items: Class<Item>[]) {
		this.description = description;
		this.items = new Map(); // Item class -> Item instance
		this.obstacles = new Map(); // Obstacle class -> Obstacle instance

		this.isUnlocked = true;

		this.#InitializeProps(props, items);
	}


	#InitializeProps(props: Class<Prop>[], items: Class<Item>[]) {

		// select 1 prop randomly to contain a key item
		const randomIndex = Math.floor(Math.random() * props.length);
		const keyItem = new Key();
		for (let i = 0; i < props.length; i++) {
			const PropClass = props[i];
			const propInstance: Prop = i === randomIndex ? new PropClass(keyItem) : new PropClass();
			this.obstacles.set(PropClass, propInstance); // class -> instance
		}
		for (const ItemClass of items) {
			const itemInstance = new ItemClass();
			if (this.items.has(ItemClass)) {
				const existingItem = this.items.get(ItemClass)!;
				existingItem.count += itemInstance.count;
			} else {
				this.items.set(ItemClass, itemInstance); // class -> instance
			}
		}
	}

	/**
	 * Handles player interaction with props in the room (items/obstacles/inventory).
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

		// Next check obstacles
		for (const obstacle of this.obstacles.values()) {
			if (obstacle.name.toLowerCase() === propString) {
				return obstacle.interact(this, player, action);
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
		for (const obstacle of this.obstacles.values()) {
			if (obstacle.name.toLowerCase() === propName) {
				return obstacle;
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
		for (const obstacle of this.obstacles.values()) {
			for (const action of obstacle.availableActions) {
				if (action in actionMap) {
					actionMap[action].push(obstacle);
				} else {
					actionMap[action] = [obstacle];
				}
			}
		}
		return actionMap;
	}

	get itemsOnFloor(): Item[] {
		return Array.from( this.items.values() );
	}
}