import {Room} from "../Structures/Room";
import {PlayerController} from "../Structures/PlayerController";
import {ObjectValues} from "./Helpers";
import {GameController} from "../Structures/GameController";

export const THEMES = {
	Dungeon: 'dungeon',
	HauntedHouse: 'haunted_house',
	AbandonedLab: 'abandoned_lab',
	SnowyCabin: 'snowy_cabin'
} as const;

export const ROOM_EVENTS = {
	CHALK: 1 << 0,
	JOURNAL: 1 << 1,
} as const;

export const PropPositions = {
	/** The object is either in the middle of the room (furniture) or spans floor to ceiling (pillars) */
	ROOM: 0,
	/** Usually smaller objects located on the floor, like rugs or floorboards */
	FLOOR: 1,
	/** Objects attached to or part of the walls, like paintings or shelves */
	WALL: 2,
	/** Objects that are attached or hanging from the ceiling, ie chandeliers */
	CEILING: 3
} as const;

export const EventTypes = {
	/** The player has places some chalk in the room and the next room should reference it */
	CHALK: 0,
	/** The player has stabilized the room using the journal */
	JOURNAL: 1
} as const;

export type GameEvent = {
	type: ObjectValues<typeof EventTypes>;
	duration: number; // in rooms
	callback: (game: GameController) => void;
}

export type InteractionResult = {
	message: string;
	/** Move the player to the next room after this interaction */
	nextRoom?: boolean;
}

export type InteractionCallback = (room: Room, player: PlayerController) => InteractionResult;
export type PropInteractionMap = Record<Capitalize<string>, InteractionCallback>;