import {TutorialRooms} from "./TutorialRooms";
import {ObjectValues} from "../Typings/Helpers";
import {Room} from "./Room";
import {PlayerController} from "./PlayerController";
import {Prop} from "./CoreStructs";
import {GameEvent, THEMES} from "../Typings/GameTypes";
import {CreateRoom} from "./RoomCreation";

export class GameController {

	theme: ObjectValues<typeof THEMES>;
	player: PlayerController;
	logs: string[];
	gameOver: boolean;
	roomsCleared: number;
	currentRoom: Room | null;
	roomCount: number;

	scheduledEvents: Array<GameEvent>;

	constructor(theme: ObjectValues<typeof THEMES>, roomCount: number) {
		const tutorialRoomClass = TutorialRooms[theme];
		if (!tutorialRoomClass) {
			throw new Error(`No tutorial room defined for theme: ${theme}`);
		}

		this.theme = theme;

		// inventory management
		this.player = new PlayerController();

		this.roomCount = 3;
		this.roomsCleared = 0;
		this.currentRoom = new tutorialRoomClass();

		console.log(this.currentRoom);

		this.logs = [];
		this.scheduledEvents = [];
		this.gameOver = false;

		this.addLog(this.currentRoom!.description);
	}

	addBlankLog() {
		this.logs.push(''); // blank line
	}

	addLog(entry: string) {

		entry = entry.trim();

		const logLines = entry.split('\n');
		if (logLines.length > 1) {
			for (const line of logLines) {
				this.addLog(line);
			}
			return;
		}

		// max of 50 characters per log entry
		const MAX_LOG_LENGTH = 50;

		if (entry.length <= MAX_LOG_LENGTH) {
			this.logs.push(entry);
			return;
		}

		// split entry into multiple lines
		let currentLine = '';
		const words = entry.split(' ');
		for (const word of words) {
			if ((currentLine + ' ' + word).trim().length > MAX_LOG_LENGTH) {
				this.logs.push(currentLine.trim());
				currentLine = word;
			} else {
				currentLine += ' ' + word;
			}
		}
		if (currentLine.trim().length > 0) {
			this.logs.push(currentLine.trim());
		}
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

		this.currentRoom = CreateRoom(this.theme);
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

		if (response.nextRoom) {
			this.moveToNextRoom();
			this.addBlankLog();
			if (this.currentRoom === null) {
				this.addLog('Congratulations! You have cleared all the rooms.');
				this.addLog('Thank you for playing');
				this.gameOver = true;
			} else {
				this.addLog('[ You move to the next room ]');
				this.addBlankLog();
				this.addLog(this.currentRoom.description);
			}
		}
	}

	// bubble up RoomController methods for convenience and game boundary handling
	get availableActions(): Record<Capitalize<string>, Prop[]> | null {
		if (this.gameOver || this.currentRoom === null) return null;
		return this.currentRoom.availableActions;
	}

	resolvePropByName(propName: string): Prop | null {
		if (this.gameOver || this.currentRoom === null) return null;
		return this.currentRoom.resolvePropByName(propName);
	}
}