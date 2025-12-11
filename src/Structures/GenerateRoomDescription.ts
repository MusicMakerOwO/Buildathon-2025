import {Class} from "../Typings/Helpers";
import {Obstacle} from "./Obstacle";
import {Item} from "./Item";

/**
 * @param {string[]} roomDescriptions A room description will be randomly selected from this array.
 * @param {Obstacle[]} obstacles The list of obstacles being placed in the room.
 * @param {Item[]} items The list of items being placed on the floor.
 */
export function GenerateRoomDescription(roomDescriptions: string[], obstacles: Class<Obstacle>[], items: Class<Item>[]): string {
	return '';
}