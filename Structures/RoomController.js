const Item = require('./Item');
const Obstacle = require('./Obstacle');
const IsClass = require('../Utils/IsClass');
const StorageObstacle = require('./StorageObstacle');
const Key = require("./Items/Key");
const Door = require("./GameObjects/Door");
const PlayerController = require("./PlayerController");

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
			if (obstacleClass === Door) {
				throw new Error('Doors cannot be used as regular obstacles in a room. They will be added for you automatically.');
			}
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

	/**
	 * Handles player interaction with props in the room (items/obstacles/inventory).
	 * @param {PlayerController} player
	 * @param {string} action
	 * @param {string} propString
	 * @returns {string}
	 */
	interact(player, action, propString) {
		if (!(player instanceof PlayerController)) {
			throw new TypeError('Player must be an instance of PlayerController');
		}
		propString = String(propString).toLowerCase();
		action = String(action).toLowerCase();

		// Check items on floor first
		for (const item of this.items.values()) {
			if (item.name.toLowerCase() === propString) {
				if (action === 'take' || action === 'grab') {
					player.addItem(item);
					this.items.delete(item.constructor);
					return `You take the ${item.name} and put it in your pocket.`;
				} else if (action === 'examine') {
					return `It's a ${item.name}. You can't quite make out the details from here, try grabbing it first.`;
				} else {
					return `You can't ${action} the ${item.name}. You can only grab it.`;
				}
			}
		}

		// Next check obstacles
		for (const obstacle of this.obstacles.values()) {
			if (obstacle.name.toLowerCase() === propString) {
				if (obstacle.availableActions.includes(action)) {
					return obstacle.interact(player, action);
				} else {
					return `You can't ${action} the ${obstacle.name}. Available actions are: ${obstacle.availableActions.join(', ')}.`;
				}
			}
		}

		// Then player inventory
		for (const item of player.inventory.values()) {
			if (item.name.toLowerCase() === propString) {
				if (action === 'examine') {
					return item.description;
				} else {
					return `You can't ${action} the ${item.name} in your inventory. You can only 'examine' it.`;
				}
			}
		}

		// And finally, 404 error
		return `There is no ${propString} here to interact with.`;
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
		const actionsSet = new Set(['grab', 'take', 'examine']); // base actions
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