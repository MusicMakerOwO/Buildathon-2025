import {Dungeon} from "./TutorialRooms/Dungeon";
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

const TUTORIAL_ROOMS_BY_THEME: Record<ObjectValues<typeof THEMES>, Class<Room> | null> = {
	[THEMES.Dungeon]: Dungeon,
	[THEMES.HauntedHouse]: null, // coming soon
	[THEMES.AbandonedLab]: null,
	[THEMES.SnowyCabin]: null
}

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

	constructor(theme: ObjectValues<typeof THEMES>, roomCount = 5) {
		this.possibleRooms = ROOMS_BY_THEME[theme];
		if (!this.possibleRooms || this.possibleRooms.length === 0) {
			throw new Error(`Invalid theme: ${theme}, no rooms available`);
		}
		const tutorialRoomClass = TUTORIAL_ROOMS_BY_THEME[theme];
		if (!tutorialRoomClass) {
			throw new Error(`No tutorial room defined for theme: ${theme}`);
		}

		// inventory management
		this.player = new PlayerController();

		this.roomsCleared = 0;
		this.currentRoom = new tutorialRoomClass();

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
		if (this.roomsCleared >= 5) {
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
	interact(action: Capitalize<string>, propString: string) {
		if (this.gameOver) throw new Error('Game is over, no further interactions allowed.');
		if (this.currentRoom === null) throw new Error('No current room, game is likely over');

		if (action === 'Inventory') {
			this.addLog('You check your inventory.');
			this.addLog(this.player.listInventory());
			return;
		}

		this.addBlankLog();
		this.addLog(`You ${action} the ${propString}.`);

		const response = this.currentRoom.interact(this.player, action, propString);
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