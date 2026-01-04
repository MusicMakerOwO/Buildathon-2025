import {Class} from "../Typings/Helpers";
import {Entity, Item} from "./CoreStructs";

export class PlayerController extends Entity {

	inventory: Map<Class<Item>, Item>;

	constructor() {
		super('Player', 'Hey look, it\'s you :D', 100, {min: 5, max: 10});
		this.inventory = new Map(); // Class -> Class instance
	}

	hasItem(itemClass: Class<Item>) {
		if (this.inventory.has(itemClass)) {
			return this.inventory.get(itemClass)!.count;
		}
		return false;
	}

	addItem(item: Item) {
		if (this.inventory.has(item.constructor as Class<Item>)) {
			this.inventory.get(item.constructor as Class<Item>)!.count += item.count;
		} else {
			this.inventory.set(item.constructor as Class<Item>, item);
		}
		return this.inventory.get(item.constructor as Class<Item>)!.count;
	}

	removeItem(itemClass: Class<Item>, amount = 1) {
		amount = Number(amount) || 1;
		if (amount <= 0) {
			throw new RangeError('Amount to remove must be a positive number');
		}
		if (!this.inventory.has(itemClass)) {
			throw new Error(`No items of type ${itemClass.name} found in inventory`);
		}
		const item = this.inventory.get(itemClass)!;
		if (item.count < amount) {
			throw new Error(`Not enough items of type ${itemClass.name} to remove. Requested: ${amount}, Available: ${item.count}`);
		}
		item.count -= amount;
		if (item.count === 0) {
			this.inventory.delete(itemClass);
		}
		return item.count;
	}

	listInventory() {
		if (this.inventory.size === 0) {
			return 'Your inventory is empty.';
		}
		const inventoryList = [];
		for (const itemInstance of this.inventory.values()) {
			inventoryList.push(`- ${itemInstance.name} (x${itemInstance.count})`);
		}
		return `Your inventory contains:\n${inventoryList.join('\n')}`;
	}
}