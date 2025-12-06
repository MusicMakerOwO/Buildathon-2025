const Entity = require('./Entity');
const Item = require('./Item');
const Obstacle = require('./Obstacle');
const IsClass = require('../Utils/IsClass');

class PlayerController extends Entity {
	constructor(name = 'Player', health = 100, defense = 5) {
		super(name, health, 10, defense, "Hey look, it's you! :D");

		this.inventory = new Map(); // Class -> Class instance
	}

	#VerifyItemSubclass(itemClass) {
		if (!IsClass(itemClass)) {
			throw new TypeError('itemClass must be a class definition');
		}
		if (!(itemClass.prototype instanceof Item)) {
			throw new TypeError('itemClass must be a subclass of Item');
		}
		if (itemClass === Item) {
			throw new Error('Cannot use base Item class, must specify a subclass');
		}
	}

	/**
	 * Checks if the player has an item of the specified class in their inventory.
	 * Returns the quantity if found, otherwise returns false.
	 * @param itemClass
	 * @returns {number|false}
	 */
	hasItem(itemClass) {
		this.#VerifyItemSubclass(itemClass);
		if (this.inventory.has(itemClass)) {
			return this.inventory.get(itemClass).count;
		}
		return false;
	}

	/**
	 * Adds an item to the player's inventory.
	 * If the item type already exists, increments the count.
	 * Returns the new count of the item type.
	 * @param item
	 * @returns {number}
	 */
	addItem(item) {
		if (!(item instanceof Item)) {
			throw new TypeError('Can only add instances of Item to inventory');
		}
		if (this.inventory.has(item.constructor)) {
			this.inventory.get(item.constructor).count += item.count;
		} else {
			this.inventory.set(item.constructor, item);
		}
		return this.inventory.get(item.constructor).count;
	}

	/**
	 * Removes a specified amount of an item type from the player's inventory.
	 * Throws an error if not enough items are present.
	 * Returns the new count of the item type after removal.
	 * @param itemClass
	 * @param amount
	 * @return {number}
	 */
	removeItem(itemClass, amount = 1) {
		this.#VerifyItemSubclass(itemClass);
		amount = Number(amount) || 1;
		if (amount <= 0) {
			throw new RangeError('Amount to remove must be a positive number');
		}
		if (!this.inventory.has(itemClass)) {
			throw new Error(`No items of type ${itemClass.name} found in inventory`);
		}
		const item = this.inventory.get(itemClass);
		if (item.count < amount) {
			throw new Error(`Not enough items of type ${itemClass.name} to remove. Requested: ${amount}, Available: ${item.count}`);
		}
		item.count -= amount;
		if (item.count === 0) {
			this.inventory.delete(itemClass);
		}
		return item.count;
	}

	/**
	 * Interacts with an obstacle using the specified action.
	 * Recommended you interact with items here rather than directly calling `Obstacle.interact()` but either work.
	 * @param {Obstacle} obstacle
	 * @param {string} action
	 * @returns {string}
	 */
	interactWith(obstacle, action) {
		if (!(obstacle instanceof Obstacle)) {
			throw new TypeError('Can only interact with instances of Obstacle');
		}
		if (typeof action !== 'string') {
			throw new TypeError('Action must be a string');
		}
		if (!obstacle.availableActions.includes(action)) {
			throw new Error(`Action "${action}" is not a valid action: ${obstacle.availableActions.join(', ')}`);
		}
		return obstacle.interact(this, action);
	}

	/**
	 * Lists the contents of the player's inventory in a human-readable format.
	 * @returns {string}
	 */
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

module.exports = PlayerController;