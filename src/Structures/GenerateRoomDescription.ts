import {Obstacle} from "./Obstacle";
import {Item} from "./Item";
import {ObstaclePositions} from "./Obstacle";
import {FullRecord, ObjectValues} from "../Typings/Helpers";

/**
 * General modifiers that define the room's base characteristics.
 *
 * Light: The level of illumination in the room. \
 * Size: The overall dimensions of the room. \
 * Material: The primary construction material of the room. \
 */
export type RoomModifiers = {
	light: 'dark' | 'dim' | 'normal' | 'bright';
	size: 'small' | 'medium' | 'large' | 'huge';
	condition: 'pristine' | 'worn' | 'damaged' | 'ruined';
	material: 'wood' | 'stone' | 'metal';
}

/**
 * Modifiers affected by obstacles and items in the room.
 *
 * @example
 * {
 *   light: [ "A warm glow spreads softly across the room" ],
 *   sounds: [ "The gentle hum of a nearby machine fills the air" ],
 *   smells: [ "A faint scent of lavender lingers in the atmosphere" ],
 *   noise: [ "The distant sound of dripping water echoes through the space" ]
 * }
 */
export type AtmosphereModifiers = {
	light: string[];
	sounds: string[];
	smells: string[];
	noise: string[];
}

const RoomEntrancePhrases = [
	'You enter a',
	'You find yourself in a',
	'Stepping inside, you see a',
	'As you walk in, you notice a',
	'You step into a'
];

const ObstaclePlacementPhrases: FullRecord<ObjectValues<typeof ObstaclePositions>, string[]> = {
	[ObstaclePositions.FLOOR]: [
		'Sitting on the floor',
		'Resting on the ground',
		'Lying on the floor',
		'Positioned on the ground'
	],
	[ObstaclePositions.WALL]: [
		'Hanging on the wall',
		'Mounted on the wall',
		'Affixed to the wall',
		'Positioned against the wall'
	],
	[ObstaclePositions.ROOM]: [
		'In the center of the room',
		'Off to one side of the room',
		'Towards the back of the room',
		'Near the entrance of the room there'
	],
	[ObstaclePositions.CEILING]: [
		'Suspended from the ceiling',
		'Hanging overhead',
		'Attached to the ceiling',
		'Positioned above you there'
	],
	[ObstaclePositions.CORNER]: [
		'Tucked into the corner',
		'Nestled in the corner',
		'Positioned in the corner',
		'Situated in the corner'
	]
}

const ObstaclePlacementPhraseJoiners: FullRecord<ObjectValues<typeof ObstaclePositions>, string[]> = {
	[ObstaclePositions.FLOOR]: [],
	[ObstaclePositions.WALL]: [
		'Hangs a'
	],
	[ObstaclePositions.ROOM]: [
		'Stands a'
	],
	[ObstaclePositions.CEILING]: [
		'Hangs a'
	],
	[ObstaclePositions.CORNER]: []
}

// default phrases for all positions
const defaultPlacementPhrases = [
	'Located in the room is a',
	'Positioned within the room is a',
	'You notice a',
	'There is a',
	'There is a large',
];
const defaultPlacementPhraseJoiners = [
	'You find a',
	'There is a',
	'You see a',
	'You notice a',
	'You spot a',
];
for (const position in ObstaclePlacementPhrases) {
	ObstaclePlacementPhrases[position as unknown as ObjectValues<typeof ObstaclePositions>].push( ... defaultPlacementPhrases );
}
for (const position in ObstaclePlacementPhraseJoiners) {
	ObstaclePlacementPhraseJoiners[position as unknown as ObjectValues<typeof ObstaclePositions>].push(... defaultPlacementPhraseJoiners);
}

export type RoomContext = {
	roomModifiers: RoomModifiers;
	atmosphereModifiers: AtmosphereModifiers;
	obstacles: Obstacle[];
	items: Item[];
}

export function GenerateRoomDescription(context: RoomContext): string {
	const { roomModifiers, atmosphereModifiers, obstacles, items } = context;

	const entrancePhrase = RoomEntrancePhrases[Math.floor(Math.random() * RoomEntrancePhrases.length)];
	const sizeDescription =
		roomModifiers.size === 'small' ? 'cozy' :
		roomModifiers.size === 'medium' ? 'spacious' :
		roomModifiers.size === 'large' ? 'expansive' : 'vast';

	const conditionDescription =
		roomModifiers.condition === 'pristine' ? 'immaculately maintained' :
		roomModifiers.condition === 'worn' ? 'showing signs of wear' :
		roomModifiers.condition === 'damaged' ? 'partially damaged' : 'in ruins';

	const materialDescription =
		roomModifiers.material === 'wood' ? 'wooden walls and floors' :
		roomModifiers.material === 'stone' ? 'stone walls and floors' :
		roomModifiers.material === 'metal' ? 'metallic surfaces' : 'a mix of materials';

	let description = `${entrancePhrase} ${sizeDescription} ${roomModifiers.light} room made of ${materialDescription}. It's ${conditionDescription}. `;

	// select one at random modifier from each category if available
	if (atmosphereModifiers.light.length > 0) {
		description += atmosphereModifiers.light[Math.floor(Math.random() * atmosphereModifiers.light.length)] + '. ';
	}
	if (atmosphereModifiers.sounds.length > 0) {
		description += atmosphereModifiers.sounds[Math.floor(Math.random() * atmosphereModifiers.sounds.length)] + '. ';
	}
	if (atmosphereModifiers.smells.length > 0) {
		description += atmosphereModifiers.smells[Math.floor(Math.random() * atmosphereModifiers.smells.length)] + '. ';
	}
	if (atmosphereModifiers.noise.length > 0) {
		description += atmosphereModifiers.noise[Math.floor(Math.random() * atmosphereModifiers.noise.length)] + '. ';
	}

	description += '\n';

	for (const obstacle of obstacles) {
		const randomPlacementPhrase = ObstaclePlacementPhrases[obstacle.position][Math.floor(Math.random() * ObstaclePlacementPhrases[obstacle.position].length)];
		const randomJoinerPhrase = ObstaclePlacementPhraseJoiners[obstacle.position][Math.floor(Math.random() * ObstaclePlacementPhraseJoiners[obstacle.position].length)];
		const randomChoice = Math.random();
		if (randomChoice < 0.3) {
			description += `${randomPlacementPhrase} ${randomJoinerPhrase.toLowerCase()} ${obstacle.name.toLowerCase()}`;
		} else if (randomChoice < 0.6) {
			description += `${randomJoinerPhrase} ${obstacle.name.toLowerCase()} ${obstacle.placementDescription.toLowerCase()}`;
		} else if (randomChoice < 1.0) {
			description += `${randomPlacementPhrase} a ${obstacle.name.toLowerCase()} ${obstacle.placementDescription.toLowerCase()}`;
		}
	}

	description += '\n\n';

	if (items.length === 1) {
		if (items[0].count === 1) {
			description += `You see a ${items[0].name} on the floor. `;
		} else {
			description += `You see a stack of ${items[0].name}s on the floor. `;
		}
	} else {
		const itemNames = items.map(item => item.count > 1 ? `a stack of ${item.name}s` : `a ${item.name}`);
		const itemList = itemNames.slice(0, -1).join(', ') + (itemNames.length > 1 ? ', and ' : '') + itemNames.slice(-1);
		description += `You see ${itemList} on the floor. `;
	}

	return description.trim();
}