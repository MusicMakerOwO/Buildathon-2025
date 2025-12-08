const PrisonCell = require("./Rooms/PrisonCell");
const DungeonTutorial = require("./TutorialRooms/Dungeon");
const PlayerController = require("./PlayerController");
const Door = require("./GameObjects/Door");

const THEMES = {
	Dungeon: 'dungeon',
	HauntedHouse: 'haunted_house',
	AbandonedLab: 'abandoned_lab',
	MedievalCastle: 'medieval_castle',
	SnowyCabin: 'snowy_cabin'
}

const TUTORIAL_ROOMS_BY_THEME = {
	[THEMES.Dungeon]: DungeonTutorial,
	[THEMES.HauntedHouse]: null, // coming soon
	[THEMES.AbandonedLab]: null,
	[THEMES.MedievalCastle]: null,
	[THEMES.SnowyCabin]: null
}

const ROOMS_BY_THEME = {
	[THEMES.Dungeon]: [
		PrisonCell
	],
	[THEMES.HauntedHouse]: [
		// Add Haunted House rooms here
	],
	[THEMES.AbandonedLab]: [
		// Add Abandoned Lab rooms here
	],
	[THEMES.MedievalCastle]: [
		// Add Medieval Castle rooms here
	],
	[THEMES.SnowyCabin]: [
		// Add Snowy Cabin rooms here
	]
}

class GameController {
	constructor(theme, roomCount) {
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
		for (let i = 1; i < roomCount; i++) {
			const RoomClass = this.possibleRooms[Math.floor(Math.random() * this.possibleRooms.length)];
			this.rooms[i] = new RoomClass();
		}

		// room boundaries, N-1 doors for N rooms
		this.doors = new Array(roomCount).fill(null).map( () => new Door() );

		// inventory management
		this.player = new PlayerController();

		this.currentRoomIndex = 0;

		/** @type {string[]} */
		this.logs = [];
	}

	/** @param {string} entry */
	addLog(entry) {
		const lineNumber = this.logs.length + 1;
		this.logs.push(`${lineNumber.toString().padStart(3)}: ${entry}`);
	}

	/** @returns {RoomController} */
	get currentRoom() {
		return this.rooms[this.currentRoomIndex];
	}

	/**
	 * Returns a `Door` instance or `null` if last room
	 * @returns {Door|null}
	 */
	get currentRoomBoundary() {
		if (this.currentRoomIndex >= this.rooms.length - 1) {
			return null; // no boundary after last room
		}
		return this.doors[this.currentRoomIndex];
	}

	/** @returns {boolean} */
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
	 * @param {string} action
	 * @param {string} propString
	 */
	handleInteraction(action, propString) {
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

		this.addLog(this.currentRoom.interact(this.player, action, propString));
	}
}

module.exports = GameController;

module.exports.THEMES = THEMES;