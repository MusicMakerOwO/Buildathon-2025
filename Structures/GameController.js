const PrisonCell = require("./Rooms/PrisonCell");
const DungeonTutorial = require("./TutorialRooms/Dungeon");

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
	}
}

module.exports = GameController;