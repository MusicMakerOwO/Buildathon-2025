import {Class} from "../Typings/Helpers";
import {Item} from "./Item";
import {Obstacle} from "./Obstacle";
import {StorageObstacle} from "./StorageObstacle";
import {Key} from "./Items/Key";
import {IsClass} from "../Utils/IsClass";
import {PlayerController} from "./PlayerController";
import {Door} from "./GameObjects/Door";

const BASE_ACTIONS = ['inventory', 'grab', 'take', 'examine'];

export class RoomController {

	description: string;
	items: Map<Class<Item>, Item>;
	obstacles: Map<Class<Obstacle>, Obstacle>;

	constructor(description: string, storageObstacles: Class<StorageObstacle>[], obstacles: Class<Obstacle>[], items: Class<Item>[]) {

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

		this.description = description;
		this.items = new Map(); // Item class -> Item instance
		this.obstacles = new Map(); // Obstacle class -> Obstacle instance

		this.#InitializeProps(storageObstacles, obstacles, items);
	}


	#InitializeProps(storageObstacles: Class<StorageObstacle>[], obstacles: Class<Obstacle>[], items: Class<Item>[]) {

		// select 1 storage obstacle randomly to contain a key item
		const randomIndex = Math.floor(Math.random() * storageObstacles.length);
		const keyItem = new Key();
		for (let i = 0; i < storageObstacles.length; i++) {
			const StorageObject = i === randomIndex ? new storageObstacles[i](false, [keyItem]) : new storageObstacles[i]();
			this.obstacles.set(storageObstacles[i], StorageObject); // class -> instance
		}
		for (const ObstacleClass of obstacles) {
			const obstacleInstance = new ObstacleClass();
			this.obstacles.set(ObstacleClass, obstacleInstance); // class -> instance
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

	#VerifySubclass(targetClass: Class<unknown>, baseClass: Class<unknown>) {
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
	 */
	interact(player: PlayerController, action: string, propString: string) {
		propString = String(propString).toLowerCase();
		action = String(action).toLowerCase();

		// Check items on floor first
		for (const item of this.items.values()) {
			if (item.name.toLowerCase() === propString) {
				if (action === 'take' || action === 'grab') {
					player.addItem(item);
					this.items.delete(item.constructor as Class<Item>);
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
		return Array.from( this.items.values() ).map(item => item.name);
	}
	listObstacles() {
		return Array.from( this.obstacles.values() ).map(obstacle => obstacle.name);
	}
	listAvailableActions() {
		const actionsSet = new Set(BASE_ACTIONS);
		for (const obstacle of this.obstacles.values()) {
			for (const action of obstacle.availableActions) {
				actionsSet.add(action);
			}
		}
		return Array.from(actionsSet);
	}

	getObstaclesForAction(action: string) {
		action = String(action).toLowerCase();
		const matchingObstacles: Obstacle[] = [];
		for (const obstacle of this.obstacles.values()) {
			if (obstacle.availableActions.includes(action)) {
				matchingObstacles.push(obstacle);
			}
		}
		return matchingObstacles;
	}
	getActionsForObstacle(obstacleName: string) {
		obstacleName = String(obstacleName).toLowerCase();
		for (const obstacle of this.obstacles.values()) {
			if (obstacle.name.toLowerCase() === obstacleName) {
				return obstacle.availableActions;
			}
		}
		return [];
	}
}