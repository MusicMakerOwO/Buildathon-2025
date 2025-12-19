import {TutorialRooms} from "./TutorialRooms";
import {Class, ObjectValues} from "../Typings/Helpers";
import {Room} from "./Room";
import {PlayerController} from "./PlayerController";
import {MessHall} from "./Rooms/Dungeon/MessHall";
import {TortureChamber} from "./Rooms/Dungeon/TortureChamber";
import {Item, Prop} from "./CoreStructs";

export const THEMES = {
	Dungeon: 'dungeon',
	HauntedHouse: 'haunted_house',
	AbandonedLab: 'abandoned_lab',
	SnowyCabin: 'snowy_cabin'
} as const;

const ROOMS_BY_THEME: Record<ObjectValues<typeof THEMES>, Array<Class<Room>>> = {
	[THEMES.Dungeon]: [
		TortureChamber,
		MessHall,
	],
	[THEMES.HauntedHouse]: [
	],
	[THEMES.AbandonedLab]: [
	],
	[THEMES.SnowyCabin]: [
	]
}

export class GameController {

	possibleRooms: Array<Class<Room>>;
	player: PlayerController;
	logs: string[];
	gameOver: boolean;
	roomsCleared: number;
	currentRoom: Room | null;
	roomCount: number;

	constructor(theme: ObjectValues<typeof THEMES>, roomCount: number) {
		this.possibleRooms = ROOMS_BY_THEME[theme];
		if (!this.possibleRooms || this.possibleRooms.length === 0) {
			throw new Error(`Invalid theme: ${theme}, no rooms available`);
		}
		const tutorialRoomClass = TutorialRooms[theme];
		if (!tutorialRoomClass) {
			throw new Error(`No tutorial room defined for theme: ${theme}`);
		}

		// inventory management
		this.player = new PlayerController();

		this.roomCount = roomCount;
		this.roomsCleared = 0;
		this.currentRoom = new tutorialRoomClass();

		console.log(this.currentRoom);

		this.logs = [];

		this.gameOver = false;

		this.addLog(this.currentRoom!.description);
	}

	addBlankLog() {
		this.logs.push(''); // blank line
	}

	addLog(entry: string) {
		this.logs.push(entry);
	}

	canMoveToNextRoom() {
		if (this.gameOver) return false;
		if (this.currentRoom === null) return false;

		return this.currentRoom.isUnlocked;
	}

	moveToNextRoom() {
		if (!this.canMoveToNextRoom()) {
			throw new Error('Cannot move to next room, door is locked or no next room exists');
		}
		this.roomsCleared += 1;

		// check if we have cleared enough rooms to end the game
		if (this.roomsCleared >= this.roomCount) {
			this.currentRoom = null; // signifies game over
			return;
		}

		// pick a new random room, do not repeat the same room consecutively
		let nextRoomClass: Class<Room>;
		do {
			const randomIndex = Math.floor(Math.random() * this.possibleRooms.length);
			nextRoomClass = this.possibleRooms[randomIndex];
		} while (this.currentRoom && nextRoomClass === this.currentRoom.constructor);

		this.currentRoom = new nextRoomClass();
	}

	/**
	 * Handles player interaction with props in the current room.
	 * All outputs are written to `GameController.logs`.
	 * This function returns nothing, you are expected to read from the logs after each interaction.
	 */
	interact(action: Capitalize<string>, target: string) {
		if (this.gameOver) throw new Error('Game is over, no further interactions allowed.');
		if (this.currentRoom === null) throw new Error('No current room, game is likely over');

		if (action === 'Inventory') {
			this.addLog('You check your inventory.');
			this.addLog(this.player.listInventory());
			return;
		}

		if (action === 'Use') {
			for (const item of this.player.inventory.values()) {
				if (item.name.toLowerCase() === target.toLowerCase()) {
					this.addBlankLog();
					this.addLog(`You use the ${target} from your inventory.`);
					const response = item.use(this, this.currentRoom, this.player);
					this.addLog(response.message);
					return;
				}
			}

			// if no item found
			this.addBlankLog();
			this.addLog(`You do not have a ${target} in your inventory to use.`);
		}

		this.addBlankLog();
		this.addLog(`You ${action.toLowerCase()} the ${target}.`);

		const response = this.currentRoom.interact(this.player, action, target);
		this.addLog(response.message);
	}

	// bubble up RoomController methods for convenience and game boundary handling
	get availableActions(): Record<Capitalize<string>, Prop[]> | null {
		if (this.gameOver || this.currentRoom === null) return null;
		return this.currentRoom.availableActions;
	}

	get itemsOnFloor(): Item[] | null {
		if (this.gameOver || this.currentRoom === null) return null;
		return this.currentRoom.itemsOnFloor;
	}

	resolvePropByName(propName: string): Prop | null {
		if (this.gameOver || this.currentRoom === null) return null;
		return this.currentRoom.resolvePropByName(propName);
	}
}