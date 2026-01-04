import {Key} from "./Items";
import {PlayerController} from "./PlayerController";
import {Item, Prop} from "./CoreStructs";
import {Door} from "./TransitionProps";
import {InteractionResult, PropPositions} from "../Typings/GameTypes";

const BASE_ACTIONS: Capitalize<string>[] = ['Inventory', 'Examine'] as const;

class FloorProp extends Prop {
	constructor() {
		super(
			'Floor',
			'A dusty old floor. Nothing special about it.',
			PropPositions.FLOOR,
			'You spot something glinting in the corner.',
		);
	}
}

export class Room {

	description: string;
	props: Prop[];
	door: Door;
	floor: FloorProp;
	isUnlocked: boolean;

	events: number;

	constructor(description: string, props: Prop[], items: Item[]) {
		this.description = description;
		this.props = props;
		this.door = new Door(true);
		this.floor = new FloorProp();
		this.events = 0;

		for (const item of items) {
			this.floor.addItem(item);
		}

		const key = new Key();

		// select a random prop to add it to
		let attempts = 3;
		while (attempts > 0) {
			const randIndex = Math.floor(Math.random() * props.length);
			const selectedProp = props[randIndex];
			// only add the key to props that are not the floor or door
			if (selectedProp.canHoldItems) {
				selectedProp.addItem(key);
				break;
			}
			attempts--;
		}
		if (attempts === 0) {
			// failed to find a suitable prop, add it to the floor instead
			this.floor.addItem(key);
		}

		this.isUnlocked = true;
	}

	/** Handles player interaction with props in the room */
	interact(player: PlayerController, action: Capitalize<string>, propString: string): InteractionResult {
		propString = String(propString).toLowerCase();

		if (propString === 'floor') {
			return this.floor.interact(this, player, action);
		}

		if (propString === 'door') {
			return this.door.interact(this, player, action);
		}

		// Check props
		for (const prop of this.props.values()) {
			if (prop.name.toLowerCase() === propString) {
				return prop.interact(this, player, action);
			}
		}

		// And finally, 404 error
		return { message: `There is no ${propString} here to interact with.` };
	}

	resolvePropByName(propName: string): Prop | null {
		propName = String(propName).toLowerCase();
		if (propName === 'door') return this.door;
		for (const prop of this.props.values()) {
			if (prop.name.toLowerCase() === propName) {
				return prop;
			}
		}
		return null;
	}

	/**
	 * Returns a mapping of all available actions in the room to the props that support them.
	 */
	get availableActions(): Record<Capitalize<string>, Prop[]> {
		const actionMap: Record<Capitalize<string>, Prop[]> = Object.fromEntries(
			BASE_ACTIONS.map(action => [action, []])
		);
		for (const prop of this.props.values()) {
			for (const action of prop.availableActions) {
				if (action in actionMap) {
					actionMap[action].push(prop);
				} else {
					actionMap[action] = [prop];
				}
			}
		}
		for (const action of this.door.availableActions) {
			if (action in actionMap) {
				actionMap[action].push(this.door);
			} else {
				actionMap[action] = [this.door];
			}
		}
		actionMap['Examine'].push(this.floor);
		return actionMap;
	}
}