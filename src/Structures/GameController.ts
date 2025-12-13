import {Dungeon} from "./TutorialRooms/Dungeon";
import {Class, ObjectValues} from "../Typings/Helpers";
import {RoomController} from "./RoomController";
import {Door} from "./GameObjects/Door";
import {PlayerController} from "./PlayerController";
import {MessHall} from "./Rooms/Dungeon/MessHall";
import {TortureChamber} from "./Rooms/Dungeon/TortureChamber";

export const THEMES = {
	Dungeon: 'dungeon',
	HauntedHouse: 'haunted_house',
	AbandonedLab: 'abandoned_lab',
	SnowyCabin: 'snowy_cabin'
} as const;

const TUTORIAL_ROOMS_BY_THEME: Record<ObjectValues<typeof THEMES>, Class<RoomController> | null> = {
	[THEMES.Dungeon]: Dungeon,
	[THEMES.HauntedHouse]: null, // coming soon
	[THEMES.AbandonedLab]: null,
	[THEMES.SnowyCabin]: null
}

const ROOMS_BY_THEME: Record<ObjectValues<typeof THEMES>, Array<Class<RoomController>>> = {
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

	possibleRooms: Array<Class<RoomController>>;
	rooms: RoomController[];
	doors: Door[];
	player: PlayerController;
	currentRoomIndex: number;
	logs: string[];
	gameOver: boolean;

	constructor(theme: ObjectValues<typeof THEMES>, roomCount = 5) {
		this.possibleRooms = ROOMS_BY_THEME[theme];
		if (!this.possibleRooms || this.possibleRooms.length === 0) {
			throw new Error(`Invalid theme: ${theme}, no rooms available`);
		}
		const tutorialRoomClass = TUTORIAL_ROOMS_BY_THEME[theme];
		if (!tutorialRoomClass) {
			throw new Error(`No tutorial room defined for theme: ${theme}`);
		}

		this.rooms = new Array(roomCount + 1).fill(null);
		// first room is always the tutorial room
		this.rooms[0] = new tutorialRoomClass();

		// prevent consecutive rooms from being the same
		for (let i = 1; i < this.rooms.length; i++) {
			let SelectedRoomClass: Class<RoomController>;
			do {
				const randomIndex = Math.floor(Math.random() * this.possibleRooms.length);
				SelectedRoomClass = this.possibleRooms[randomIndex];
			} while ( this.rooms[i - 1]?.constructor === SelectedRoomClass );
			this.rooms[i] = new SelectedRoomClass();
		}

		// room boundaries, N-1 doors for N rooms
		this.doors = new Array(roomCount).fill(null).map( () => new Door() );

		// inventory management
		this.player = new PlayerController();

		this.currentRoomIndex = 0;

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

	get currentRoom(): RoomController | null {
		return this.rooms[this.currentRoomIndex] ?? null;
	}

	/**
	 * Returns a `Door` instance or `null` if last room
	 */
	get currentRoomBoundary() {
		if (this.currentRoomIndex >= this.rooms.length - 1) {
			return null; // no boundary after last room
		}
		return this.doors[this.currentRoomIndex];
	}

	canMoveToNextRoom() {
		const door = this.currentRoomBoundary;
		if (!door) return false; // no next room
		return !door.isLocked;
	}

	moveToNextRoom() {
		if (!this.canMoveToNextRoom()) {
			throw new Error('Cannot move to next room, door is locked or no next room exists');
		}
		this.currentRoomIndex++;
	}

	/**
	 * Handles player interaction with props in the current room.
	 * All outputs are written to `GameController.logs`.
	 * This function returns nothing, you are expected to read from the logs after each interaction.
	 */
	handleInteraction(action: string, propString: string) {
		if (action.toLowerCase() === 'inventory') {
			this.addLog('You check your inventory.');
			this.addLog(this.player.listInventory());
			return;
		}

		this.addLog(`You attempt to ${action} the ${propString}.`);

		// door interactions take priority over everything else in the room
		if (propString.toLowerCase() === 'door') {
			const door = this.currentRoomBoundary;
			if (!door) {
				this.addLog('There is no door here.');
				return;
			}
			// the door mutates it's internal state (only isLocked flag) when unlocking
			const response = door.interact(this.player, action);
			if (!door.isLocked && action.toLowerCase() === 'open') {
				this.moveToNextRoom();
				this.addLog(response);
				this.addLog('[ You move to the next room ]');
				this.addLog(this.currentRoom.description);
			} else {
				this.addLog(response);
			}
			return;
		}

		this.addLog( this.currentRoom.interact(this.player, action, propString) );
	}
}