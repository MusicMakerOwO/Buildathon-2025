const Item = require('./Item');
const Obstacle = require('./Obstacle');
const IsClass = require('../Utils/IsClass');
const StorageObstacle = require('./StorageObstacle');
const Key = require("./Items/Key");

class RoomController {
	/**
	 * @param {string} description
	 * @param {StorageObstacle[]} storageObstacles
	 * @param {Obstacle[]} obstacles
	 * @param {Item[]} items
	 */
	constructor(description, storageObstacles, obstacles, items) {

		for (const storageObstacleClass of storageObstacles) {
			this.#VerifySubclass(storageObstacleClass, StorageObstacle);
		}
		for (const obstacleClass of obstacles) {
			this.#VerifySubclass(obstacleClass, Obstacle);
		}
		for (const itemClass of items) {
			this.#VerifySubclass(itemClass, Item);
		}
		if (storageObstacles.length === 0) {
			throw new Error('At least one StorageObstacle subclass must be provided in obstacles array');
		}

		this.description = String(description);
		this.items = new Map(); // Item class -> Item instance
		this.obstacles = new Map(); // Obstacle class -> Obstacle instance

		this.#InitializeProps(storageObstacles, obstacles, items);
	}

	#InitializeProps(storageObstacles, obstacles, items) {
		// select 1 storage obstacle randomly to contain a key item
		const randomIndex = Math.floor(Math.random() * storageObstacles.length);
		const keyItem = new Key();
		for (let i = 0; i < storageObstacles.length; i++) {
			const StorageObject = i === randomIndex ? new storageObstacles[i]() : new storageObstacles[i](keyItem);
			this.obstacles.set(storageObstacles[i], StorageObject); // class -> instance
		}
		for (const ObstacleClass of obstacles) {
			const obstacleInstance = new ObstacleClass();
			this.obstacles.set(ObstacleClass, obstacleInstance); // class -> instance
		}
		for (const ItemClass of items) {
			const itemInstance = new ItemClass();
			if (this.items.has(ItemClass)) {
				const existingItem = this.items.get(ItemClass);
				existingItem.count += itemInstance.count;
			} else {
				this.items.set(ItemClass, itemInstance); // class -> instance
			}
		}
	}

	#VerifySubclass(targetClass, baseClass) {
		if (!IsClass(targetClass)) {
			throw new TypeError('targetClass must be a class definition');
		}
		if (!IsClass(baseClass)) {
			throw new TypeError('baseClass must be a class definition');
		}
		if (!(targetClass.prototype instanceof baseClass)) {
			throw new TypeError(`targetClass must be a subclass of ${baseClass.name}`);
		}
		if (targetClass === baseClass) {
			throw new Error(`Cannot use base ${baseClass.name} class, must specify a subclass`);
		}
	}

	listItemsOnFloor() {
		if (this.items.size === 0) {
			return 'There are no items on the floor.';
		} else {
			const itemsList = Array.from(this.items.values()).map(item => `- ${item.name} (x${item.count})`).join('\n');
			return `Items on the floor:\n${itemsList}`;
		}
	}
	listObstacles() {
		if (this.obstacles.size === 0) {
			return 'There are no objects in the room.';
		} else {
			const obstaclesList = Array.from(this.obstacles.values()).map(obstacle => `- ${obstacle.name}`).join('\n');
			return `Objects in the room:\n${obstaclesList}`;
		}
	}
	listAvailableActions() {
		const actionsSet = new Set(['use', 'take', 'examine']); // base actions
		// Use - `use {item} on {obstacle}`
		// Take - `take {item}` (from room's floor)
		// Examine - `examine {item}` or `examine {obstacle}`
		for (const obstacle of this.obstacles.values()) {
			for (const action of obstacle.availableActions) {
				actionsSet.add(action);
			}
		}
		return Array.from(actionsSet);
	}
}

module.exports = RoomController;