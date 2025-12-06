const Item = require('./Item');
const Obstacle = require('./Obstacle');
const IsClass = require('../Utils/IsClass');

class RoomController {
	/**
	 * @param {string} description
	 * @param {Obstacle[]} possibleObstacles - array of Obstacle classes to choose from
	 * @param {Item[]} possibleItems - array of Item classes to choose from
	 * @param {number} obstacleCount - how many obstacles to place in the room
	 * @param {number} itemCount - how many items to place in the room
	 */
	constructor(description, possibleObstacles, possibleItems, obstacleCount, itemCount) {

		for (const obstacleClass of possibleObstacles) {
			this.#VerifySubclass(obstacleClass, Obstacle);
		}
		for (const itemClass of possibleItems) {
			this.#VerifySubclass(itemClass, Item);
		}

		this.description = String(description);
		this.items = new Map(); // Item class -> Item instance
		this.obstacles = new Map(); // Obstacle class -> Obstacle instance

		// Randomly populate automatically on creation
		this.RandomizeContents(possibleObstacles, possibleItems, obstacleCount, itemCount);
	}

	RandomizeContents(possibleObstacles, possibleItems, obstacleCount, itemCount) {
		// TODO: Select random obstacles and items to populate the room
		// Be careful that the room remains solvable!
		// ie a locked door must have a key somewhere
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