// bad name, I know, but "object" is taken in JS
class Obstacle {
	constructor(name, lore, actions) {
		this.name = name;
		this.lore = String(lore || 'An immovable obstacle blocks your path.');

		if (!Array.isArray(actions) || actions.some(x => typeof x !== 'string')) throw new Error('Actions must be an array of strings');
		this.availableActions = actions;
	}

	interact() {
		throw new Error('Interact method not implemented for this obstacle');
	}
}

module.exports = Obstacle;