// const Item = require('./Item');
// const IsClass = require('../Utils/IsClass');

import {IsClass} from "../Utils/IsClass";
import {Item} from "./Item";
import {Class} from "../Typings/Helpers";

export class PlayerController {

	inventory: Map<Class<Item>, Item>;

	constructor() {
		this.inventory = new Map(); // Class -> Class instance
	}

	/**
	 * Checks if the player has an item of the specified class in their inventory.
	 * Returns the quantity if found, otherwise returns false.
	 */
	hasItem(itemClass: Class<Item>) {
		if (this.inventory.has(itemClass)) {
			return this.inventory.get(itemClass)!.count;
		}
		return false;
	}

	/**
	 * Adds an item to the player's inventory.
	 * If the item type already exists, increments the count.
	 * Returns the new count of the item type.
	 */
	addItem(item: Item) {
		if (this.inventory.has(item.constructor as Class<Item>)) {
			this.inventory.get(item.constructor as Class<Item>)!.count += item.count;
		} else {
			this.inventory.set(item.constructor as Class<Item>, item);
		}
		return this.inventory.get(item.constructor as Class<Item>)!.count;
	}

	/**
	 * Removes a specified amount of an item type from the player's inventory.
	 * Throws an error if not enough items are present.
	 * Returns the new count of the item type after removal.
	 */
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