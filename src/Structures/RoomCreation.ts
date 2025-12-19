import {Class, ObjectValues} from "../Typings/Helpers";
import {Room} from "./Room";
import * as Props from "./GameObjects";
import {Prop} from "./CoreStructs";
import {PropPositions, THEMES} from "../Typings/GameTypes";

const PROPS_NOT_COUNTING_TOWARD_LIMIT = new Set<Class<Prop>>([
	Props.Torch,
	Props.Lantern,
	Props.IcicleCluster,
	Props.WallMount,
	Props.FrostedWindow,
	Props.ObservationWindow,
	Props.ShatteredControlPanel
]);

const PROP_WEIGHTS_BY_THEME: Record<
	ObjectValues<typeof THEMES>,
	Array<{
		propClass: Class<Prop>,
		weight: number,
		cannotPairWith?: Class<Prop>[]
	}>
> = {
	[THEMES.Dungeon]: [
		{propClass: Props.Crate,		weight: 2},
		{propClass: Props.Chest,		weight: 4},
		{propClass: Props.Table,		weight: 5},
		{propClass: Props.IronMaiden,	weight: 3},
		{propClass: Props.IronBars,		weight: 4},
		{propClass: Props.Candle,		weight: 6, cannotPairWith: [Props.Lantern, Props.Torch] },
		{propClass: Props.Lantern,		weight: 5, cannotPairWith: [Props.Torch, Props.Candle] },
		{propClass: Props.Skeleton,		weight: 2},
		{propClass: Props.Banner,		weight: 3},
		{propClass: Props.Shackles,		weight: 4},
		{propClass: Props.Safe,			weight: 3},
		{propClass: Props.Torch,		weight: 5, cannotPairWith: [Props.Lantern, Props.Candle] },
	],
	[THEMES.HauntedHouse]: [
		{propClass: Props.Painting,			weight: 4},
		{propClass: Props.StaticFurniture,	weight: 5},
		{propClass: Props.StorageFurniture,	weight: 4},
		{propClass: Props.Candle,			weight: 6, cannotPairWith: [Props.Lantern] },
		{propClass: Props.Lantern,			weight: 5, cannotPairWith: [Props.Candle] },
		{propClass: Props.ShatteredMirror,	weight: 3},
		{propClass: Props.Bookshelf,		weight: 4},
		{propClass: Props.WallClock,		weight: 3, cannotPairWith: [Props.GrandfatherClock] },
		{propClass: Props.GrandfatherClock,	weight: 2, cannotPairWith: [Props.WallClock] },
		{propClass: Props.Skeleton,			weight: 1},
	],
	[THEMES.AbandonedLab]: [
		{propClass: Props.ChemicalCabinet,		weight: 4},
		{propClass: Props.ColdStorageUnit,		weight: 3},
		{propClass: Props.ToolBox,				weight: 5},
		{propClass: Props.Table,				weight: 5, cannotPairWith: [Props.Desk] },
		{propClass: Props.SpecimenLocker,		weight: 4},
		{propClass: Props.Microscope,			weight: 3},
		{propClass: Props.BrokenTestTubes,		weight: 4},
		{propClass: Props.WallClock,			weight: 3},
		{propClass: Props.ShatteredControlPanel,weight: 2},
		{propClass: Props.Desk,					weight: 5, cannotPairWith: [Props.Table] },
		{propClass: Props.ObservationWindow,	weight: 3},
		{propClass: Props.CollapsedVent,		weight: 4},
	],
	[THEMES.SnowyCabin]: [
		{propClass: Props.Fireplace,		weight: 5, cannotPairWith: [Props.WoodStove, Props.SnowdriftBlockage, Props.IcicleCluster] },
		{propClass: Props.Crate,			weight: 3},
		{propClass: Props.Chest,			weight: 2},
		{propClass: Props.Table,			weight: 5},
		{propClass: Props.SnowdriftBlockage,weight: 3, cannotPairWith: [Props.Fireplace, Props.WoodStove, Props.IcicleCluster] },
		{propClass: Props.WoodStove,		weight: 4, cannotPairWith: [Props.Fireplace, Props.SnowdriftBlockage, Props.IcicleCluster] },
		{propClass: Props.IcicleCluster,	weight: 2, cannotPairWith: [Props.Fireplace, Props.WoodStove, Props.SnowdriftBlockage] },
		{propClass: Props.FrostedWindow,	weight: 3},
		{propClass: Props.WallMount,		weight: 2},
		{propClass: Props.Lantern,			weight: 4},
	]
};

const RoomNamesByTheme: Record<ObjectValues<typeof THEMES>, Lowercase<string>[]> = {
	[THEMES.Dungeon]: [
		"torture chamber",
		"mess hall",
		"armory",
		"dungeon cell",
		"guard post",
		"storage room"
	],
	[THEMES.HauntedHouse]: [
		"living room",
		"library",
		"ballroom",
		"bedroom",
		"attic",
		"basement",
		"dining room",
		"study",
		"foyer",
		"library",
		"kitchen",
	],
	[THEMES.AbandonedLab]: [
		"research lab",
		"storage room",
		"control room",
		"chemical lab",
		"observation room",
		"equipment room",
		"break room",
	],
	[THEMES.SnowyCabin]: [
		"living room",
		"bedroom",
		"kitchen",
		"dining area",
		"storage room",
		"foyer",
	],
};

function GetRandomRoomName(theme: ObjectValues<typeof THEMES>): string {
	const roomNames = RoomNamesByTheme[theme];
	return roomNames[Math.floor(Math.random() * roomNames.length)];
}

function WordStartsWithVowel(word: string): boolean {
	const firstLetter = word.charAt(0).toLowerCase();
	return ['a', 'e', 'i', 'o', 'u'].includes(firstLetter);
}

function Capitalize<S extends string>(str: S) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function GetRandomPropsForTheme(theme: ObjectValues<typeof THEMES>): Prop[] {
	const possibleProps = PROP_WEIGHTS_BY_THEME[theme];
	if (!possibleProps || possibleProps.length === 0) {
		throw new Error(`No props defined for theme: ${theme}`);
	}

	let totalWeight = 0;
	for (const prop of possibleProps) {
		totalWeight += prop.weight;
	}

	const blockedProps = new Set<Class<Prop>>();
	const selectedProps = new Set<Class<Prop>>();

	const count = Math.floor(Math.random() * 3) + 2; // 2 to 4 props
	for (let i = 0; i < count; i++) {
		let rand = Math.floor(Math.random() * totalWeight);

		for (const prop of possibleProps) {
			if (blockedProps.has(prop.propClass)) continue;

			rand -= prop.weight;
			if (rand < 0) {
				selectedProps.add(prop.propClass);
				for (const blockedProp of prop.cannotPairWith || []) {
					blockedProps.add(blockedProp);
				}
				if (PROPS_NOT_COUNTING_TOWARD_LIMIT.has(prop.propClass)) {
					i--; // don't count this prop toward the limit
				}
				break;
			}
		}
	}

	return Array.from(selectedProps).map(propClass => new propClass());
}

function GenerateRoomDescription(
	theme: ObjectValues<typeof THEMES>,
	name: string,
	propList: [
		name: string,
		position: ObjectValues<typeof PropPositions>
	][]
): string {
	name = name.toLowerCase();
	propList = propList.map(([propName, position]) => [propName.toLowerCase(), position]);

	let a = WordStartsWithVowel(name) ? 'an' : 'a';

	const RANDOM_ENTRANCES = [
		`You step into ${a} ${name}.`,
		`You enter ${a} ${name}.`,
		`The ${name} greets you with an eerie silence.`,
		`You find yourself in ${a} ${name}.`,
		`Stepping into the ${name}, you can't help but feel that you're being watched by unseen eyes.`,
		`You cautiously enter ${a} ${name}.`,
		`The door creaks loudly and you step into the ${name}.`,
		`You find yourself in a dimly lit ${name}.`
	];

	let description = [
		RANDOM_ENTRANCES[Math.floor(Math.random() * RANDOM_ENTRANCES.length)]
	];

	// group similar positioned props together but not sorted
	const propsByPlacement: Record<ObjectValues<typeof PropPositions>, string[]> = {
		[PropPositions.FLOOR]: [],
		[PropPositions.WALL]: [],
		[PropPositions.ROOM]: [],
		[PropPositions.CEILING]: []
	};

	for (const [propName, position] of propList) {
		propsByPlacement[position].push(propName);
	}

	const randomPositionDescriptions: Record<ObjectValues<typeof PropPositions>, ((prop: string) => string)[]> = {
		[PropPositions.FLOOR]: [
			(prop: string) => `On the floor, you notice ${prop}.`,
			(prop: string) => `Lying on the ground is ${prop}.`,
			(prop: string) => `You see ${prop} resting on the floor.`,
			(prop: string) => `Spread across the floor is ${prop}.`
		],
		[PropPositions.WALL]: [
			(prop: string) => `Against the wall stands ${prop}.`,
			(prop: string) => `You see ${prop} affixed to the wall.`,
			(prop: string) => `Mounted on the wall is ${prop}.`,
		],
		[PropPositions.ROOM]: [
			(prop: string) => `In the room, there is ${prop}.`,
			(prop: string) => `You spot ${prop} in the area.`,
			(prop: string) => `${prop} catches your eye in the room.`,
			(prop: string) => `${prop} sits in the center of the room.`
		],
		[PropPositions.CEILING]: [
			(prop: string) => `Hanging from the ceiling is ${prop}.`,
			(prop: string) => `You look up to see ${prop} suspended above you.`,
			(prop: string) => `${prop} dangles from the ceiling.`
		]
	};

	const randomPositionOrder = Object.values(PropPositions).sort(() => Math.random() - 0.5);

	for (const position of randomPositionOrder) {
		const props = propsByPlacement[position];
		if (props.length === 0) continue;

		let propText = '';
		for (let i = 0; i < props.length; i++) {
			const prop = props[i];
			const isPlural = prop.endsWith('s');
			a = WordStartsWithVowel(prop) ? 'an' : 'a';
			if (i === 0) {
				propText += isPlural ? prop : `${a} ${prop}`;
			} else if (i === props.length - 1) {
				propText += isPlural ? ` and ${prop}` : ` and ${a} ${prop}`;
			} else {
				propText += isPlural ? `, ${prop}` : `, ${a} ${prop}`;
			}
		}

		a = WordStartsWithVowel(propText) ? 'an' : 'a';

		const randomDescriptions = randomPositionDescriptions[position];
		const descriptionFunc = randomDescriptions[Math.floor(Math.random() * randomDescriptions.length)];
		const propDescription = Capitalize( descriptionFunc(propText.toLowerCase()) );

		description.push(propDescription);
	}

	return description.join(' ').trim();
}

export function CreateRoom(theme: ObjectValues<typeof THEMES>): Room {
	const possibleProps = PROP_WEIGHTS_BY_THEME[theme];
	if (!possibleProps || possibleProps.length === 0) {
		throw new Error(`No props defined for theme: ${theme}`);
	}

	const name = GetRandomRoomName(theme);
	const props = GetRandomPropsForTheme(theme);

	const description = GenerateRoomDescription(theme, name, props.map(prop => {
		return [prop.name, prop.position];
	}));

	return new Room(description, props, []);
}