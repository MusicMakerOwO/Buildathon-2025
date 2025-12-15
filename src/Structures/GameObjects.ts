import {Prop, Item} from "./CoreStructs";
import {StorageObstacle} from "./StorageObstacle";

export class Bench extends Prop {
	constructor() {
		super(
			'Bench',
			'A sturdy wooden bench, worn smooth from years of use.',
		);
	}
}
export class WoodStove extends StorageObstacle {
	constructor(isLocked: boolean, contents: Item[]) {
		isLocked = false;
		super(
			'Wood Stove',
			'An old-fashioned wood stove with a small oven compartment below the burners.',
			isLocked,
			contents
		);
	}
}

export class WallMount extends Prop {

	static RANDOM_OPTIONS: [name: string, description: string][] = [
		[
			'Mounted Deer Head',
			'A taxidermy deer head mounted on a wooden plaque. Its glass eyes seem to follow you.'
		],
		[
			'Ancient Sword',
			'An old sword mounted on the wall, its blade tarnished but still sharp.'
		],
		[
			'Decorative Shield',
			'A beautifully crafted shield with intricate designs, hanging proudly on the wall.'
		],
		[
			'Mounted Fish',
			'A large fish mounted on a wooden plaque, its scales shimmering in the light.'
		],
		[
			'Wall Tapestry',
			'A colorful tapestry depicting a historical battle scene, hanging on the wall.'
		]

	]

	constructor() {
		super(
			... WallMount.RANDOM_OPTIONS[ Math.floor(Math.random() * WallMount.RANDOM_OPTIONS.length) ]
		);
	}
}

export class ToolBox extends StorageObstacle {
	constructor(isLocked: boolean, contents: Item[]) {
		isLocked = false;
		super(
			'Tool Box',
			'A metal toolbox with a stiff handle. The latch looks a bit rusty but it should open fine.',
			isLocked,
			contents
		);
	}
}

export class Table extends Prop {
	constructor() {
		super(
			'Table',
			'A sturdy wooden table, scarred from years of use. It looks like it could support a fair amount of weight.',
		);
	}
}

// This is for furniture that can be interacted with, like cabinets or drawers
// For non-interactable furniture, use StaticFurniture instead
export class StorageFurniture extends StorageObstacle {

	static RANDOM_OPTIONS: [name: string, description: string][] = [
		[
			'Cabinet',
			'A tall wooden cabinet with glass doors, filled with various trinkets and curiosities.'
		],
		[
			'Drawer',
			'A small wooden drawer, slightly ajar. It seems to contain some old papers and a few miscellaneous items.'
		],
		[
			'Chest',
			'An old wooden chest bound with iron straps. It looks like it could hold something valuable inside.'
		],
		[
			'Wardrobe',
			'A large wooden wardrobe with ornate carvings. It appears to be used for storing clothes and other personal items.'
		],
		[
			'Shelf',
			'A sturdy wooden shelf filled with various objects, including books, jars, and small boxes.'
		]
	]

	constructor(isLocked: boolean, contents: Item[]) {
		super(
			... StorageFurniture.RANDOM_OPTIONS[ Math.floor(Math.random() * StorageFurniture.RANDOM_OPTIONS.length) ],
			isLocked,
			contents
		);
	}
}

// This is for furniture that cannot be interacted with, only observed
// For interactable furniture, use ./StorageFurniture.js instead
export class StaticFurniture extends Prop {

	static RANDOM_OPTIONS: [name: string, description: string][] = [
		[
			'Couch',
			'A worn-out couch with faded upholstery. It looks surprisingly comfortable despite its age.'
		],
		[
			'Armchair',
			'A plush armchair with intricate wooden carvings on its arms and legs.'
		],
		[
			'Table',
			'A sturdy wooden table, scarred from years of use but still solid.'
		],
		[
			'Coffee Table',
			'A low coffee table with a glass top, surrounded by a few scattered magazines.'
		],
		[
			'Lamp',
			'A tall floor lamp with a decorative shade, casting a warm glow in the room.'
		],
		[
			'Rug',
			'A large, ornate rug with intricate patterns and vibrant colors, adding warmth to the floor.'
		]
	]

	constructor() {
		super(
			... StaticFurniture.RANDOM_OPTIONS[ Math.floor(Math.random() * StaticFurniture.RANDOM_OPTIONS.length) ],
		);
	}
}

export class SpecimenLocker extends StorageObstacle {
	constructor(isLocked: boolean, contents: Item[]) {
		super(
			'Specimen Locker',
			'A tall, temperature-controlled locker containing labeled sample containers.',
			isLocked,
			contents
		);
	}
}

export class SnowdriftBlockage extends Prop {
	constructor() {
		super(
			'Snowdrift Blockage',
			'A mound of packed snow blocking part of the room. Cold air seeps through a nearby window making the snow hard and icy.',
		);
	}
}

export class ShatteredControlPanel extends Prop {
	constructor() {
		super(
			'Shattered Control Panel',
			'A control panel with its screen cracked and buttons missing. Sparks occasionally fly from exposed wiring.',
		);
	}
}

export class Shackles extends Prop {
	constructor() {
		super(
			'Shackles',
			'Metal shackles bolted to the wall. Long abandoned, yet unsettling.',
		);
	}
}

export class Safe extends StorageObstacle {
	constructor(isLocked: boolean, contents: Item[]) {
		super(
			'Safe',
			'A heavy metal safe with little bits of rust along the edges. Its dial sticks slightly when turned but it refuses to open.',
			isLocked,
			contents
		);
	}
}

export class RustedChains extends Prop {
	constructor() {
		super(
			'Rusted Chains',
			'Old chains hang from the wall, rattling slightly when touched.',
		);
	}
}

export class Painting extends Prop {

	static RANDOM_DESCRIPTIONS = [
		"An old painting of a serene landscape. It looks slightly crooked on the wall.",
		"A portrait of a stern, regal figure. The eyes seem to follow you around the room.",
		"A vibrant abstract painting full of swirling colors and shapes. It feels almost hypnotic.",
		"A dark and moody seascape, with stormy skies and crashing waves. It evokes a sense of foreboding.",
		"A cheerful still life of fruit and flowers. The colors are bright and inviting.",
		"It's a painting of a peaceful countryside scene, with rolling hills and a clear blue sky. It brings a sense of calm.",
		"The painting depicts a bustling cityscape at night, with glowing lights and towering skyscrapers. It feels alive with energy.",
		"A mysterious painting of a dense forest shrouded in mist. It feels like something could be lurking just out of sight.",
		"A whimsical painting of fantastical creatures frolicking in a magical land. It sparks the imagination.",
		"A minimalist painting with simple geometric shapes and a limited color palette. It has a modern, sophisticated feel.",
		"It's mostly blank, with just a few faint brushstrokes.",
		"A chaotic explosion of colors and shapes, with no discernible subject.",
		"It's a map of a fictional place, with strange landmarks and names.",
		"This painting is so dark that it's hard to make out any details.",
		"This painting seems to change every time you look at it.",
	];

	constructor() {
		super(
			'Painting',
			Painting.RANDOM_DESCRIPTIONS[ Math.floor(Math.random() * Painting.RANDOM_DESCRIPTIONS.length) ],
		);
	}
}

export class ObservationWindow extends Prop {
	constructor() {
		super(
			'Observation Window',
			'A reinforced glass window looking into a sealed chamber. A series of cracks run along it like a spiderweb.',
		);
	}
}

export class Locker extends StorageObstacle {
	constructor(isLocked: boolean, contents: Item[]) {
		super(
			'Locker',
			'A tall metal locker with a combination lock on the door.',
			isLocked,
			contents
		);
	}
}

export class Lantern extends Prop {

	static RANDOM_DESCRIPTIONS = [
		'A rusty old lantern hanging from a hook on the wall. It looks like it could still be functional if you had some oil and a match to light it.',
		'A weathered lantern covered in soot and grime. Despite its age, it seems sturdy enough to be used in an emergency.',
		'A simple oil lantern with a wick that looks dry and brittle. It would need some maintenance before it could be used again.',
		'A brass lantern with intricate engravings. It has a glass enclosure that is cracked but still intact.',
	]

	constructor() {
		super(
			'Lantern',
			Lantern.RANDOM_DESCRIPTIONS[ Math.floor(Math.random() * Lantern.RANDOM_DESCRIPTIONS.length) ],
		);
	}
}

export class IronMaiden extends Prop {
	constructor() {
		super(
			'Iron Maiden',
			'A terrifying iron maiden stands in the corner, its spiked interior ready to ensnare any unfortunate soul.',
		);
	}
}

export class IronBars extends Prop {
	constructor() {
		super(
			'Iron Bars',
			'A set of sturdy iron bars, forming a partial barrier within the room. I wonder what they were meant to contain.',
		);
	}
}

export class IcicleCluster extends Prop {
	constructor() {
		super(
			'Icicle Cluster',
			'A cluster of long icicles hanging from the ceiling beams.',
		);
	}
}

export class FrostedWindow extends Prop {
	constructor() {
		super(
			'Frosted Window',
			'A small window completely fogged and frozen over. No light passes through.',
		);
	}
}

export class Dresser extends StorageObstacle {
	constructor(isLocked: boolean, contents: Item[]) {
		super(
			'Dresser',
			contents.length > 0
				? 'An old wooden dresser with several drawers. It seems one of the drawers is slightly ajar, revealing some items inside.'
				: 'An old wooden dresser with several drawers. All of the drawers seem to be stuck and cannot be opened.',
			isLocked,
			contents
		);
	}
}

export class Desk extends Prop {

	static RANDOM_DESCRIPTIONS = [
		'A wooden desk covered in various papers, books, and miscellaneous items. It looks like someone has been using it recently.',
		'A cluttered desk piled high with documents, stationery, and a few personal trinkets. It seems to be in a state of organized chaos.',
		'An old wooden desk with a worn surface, scattered with notes, a coffee mug, and a few open books. It has a lived-in feel to it.',
		'A messy desk overflowing with papers, folders, and office supplies. It looks like someone has been working here for hours without taking a break.',
		'A vintage desk cluttered with typewritten pages, ink pens, and a small desk lamp. It has an air of nostalgia about it.',
	]

	constructor() {
		super(
			'Desk',
			Desk.RANDOM_DESCRIPTIONS[ Math.floor(Math.random() * Desk.RANDOM_DESCRIPTIONS.length) ],
		);
	}
}

export class Crate extends StorageObstacle {
	constructor(isLocked: boolean, contents: Item[]) {
		super(
			'Crate',
			'A heavy crate marked with faded symbols. The wood is weathered and aged from years of use.',
			isLocked,
			contents
		);
	}
}

export class Crack extends StorageObstacle {
	constructor(isLocked: boolean, contents: Item[]) {
		isLocked = false;
		super(
			'Crack',
			'A narrow crack in the wall, just wide enough to slip something small inside.',
			isLocked,
			contents
		);
	}
}

export class CollapsedVent extends Prop {
	constructor() {
		super(
			'Collapsed Vent',
			'A ventilation shaft that has caved in, scattering dust and twisted metal.',
		);
	}
}

export class ColdStorageUnit extends StorageObstacle {
	constructor(isLocked: boolean, contents: Item[]) {
		super(
			'Cold Storage Unit',
			'A frost-covered storage unit. The door seal crackles with ice.',
			isLocked,
			contents
		);
	}
}

export class WallClock extends Prop {

	static RANDOM_DESCRIPTIONS = [
		'An old wall clock with Roman numerals and ornate hands. It ticks loudly, filling the room with its steady rhythm.',
		'A vintage clock hanging crookedly on the wall. Its face is cracked, and the hands are frozen at 3:15.',
		'A large wooden clock with intricate carvings. The pendulum swings back and forth, casting eerie shadows on the wall.',
		'A simple metal clock with a white face and black numbers. It seems out of place in this otherwise rustic room.',
		'A decorative clock shaped like a sunburst, with golden rays extending from its center. It gleams faintly in the dim light.',
	]

	constructor() {
		super(
			'Clock',
			WallClock.RANDOM_DESCRIPTIONS[ Math.floor(Math.random() * WallClock.RANDOM_DESCRIPTIONS.length) ],
		);
	}
}

export class GrandfatherClock extends Prop {

	static RANDOM_DESCRIPTIONS = [
		'A towering grandfather clock with a polished wooden case and a swinging pendulum. Its deep chimes resonate through the room every hour.',
		'An antique grandfather clock standing majestically in the corner. The intricate carvings on its surface tell stories of a bygone era.',
		'A grand clock with a brass pendulum and ornate face. The ticking sound is both soothing and ominous in this quiet space.',
		'A stately grandfather clock with a glass door revealing its inner workings. The gears turn slowly, marking the passage of time with precision.',
		'A vintage grandfather clock with a faded finish and delicate hands. Its presence adds a touch of elegance to the otherwise rustic room.',
	]

	constructor() {
		super(
			'Grandfather Clock',
			GrandfatherClock.RANDOM_DESCRIPTIONS[Math.floor(Math.random() * GrandfatherClock.RANDOM_DESCRIPTIONS.length)],
		);
	}
}

export class Chest extends StorageObstacle {
	constructor(isLocked: boolean, contents: Item[]) {
		super(
			'Chest',
			'A sturdy wooden chest reinforced with iron bands.',
			isLocked,
			contents
		);
	}
}

export class ChemicalCabinet extends StorageObstacle {
	constructor(isLocked: boolean, contents: Item[]) {
		super(
			'Chemical Cabinet',
			'A heavy steel cabinet meant for storing hazardous chemicals. A greenish-yellow liquid slowly drips from a small crack in the door and sizzles as it hits the floor.',
			isLocked,
			contents
		);
	}
}

export class Candle extends Prop {
	constructor() {
		super(
			'Candle',
			'A flickering candle mounted on the wall, casting eerie shadows around the room. There is a puddle of melted wax beneath it.'
		);
	}
}

export class BrokenTestTubes extends Prop {
	constructor() {
		super(
			'Broken Test Tubes',
			'Shattered glass litters the floor. Chemical residue stains the surface.'
		);
	}
}

export class Bookshelf extends Prop {
	constructor() {
		super(
			'Bookshelf',
			'A tall wooden bookshelf filled with dusty old books.'
		);
	}
}

export class BloodStains extends Prop {
	constructor() {
		super(
			'Blood Stains',
			'Dried blood stains splattered across the floor and wall. I pity whoever met their end here.',
		);
	}
}