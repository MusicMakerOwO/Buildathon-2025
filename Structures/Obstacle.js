// bad name, I know, but "object" is taken in JS
class Obstacle {
	/**
	 * @param {string} name
	 * @param {string} lore
	 * @param {string[]} actions
	 */
	constructor(name, lore, actions) {
		this.name = String(name);
		this.lore = String(lore || 'An immovable obstacle blocks your path.');

		if (!Array.isArray(actions) || actions.some(x => typeof x !== 'string')) throw new Error('Actions must be an array of strings');
		this.availableActions = actions;
	}

	interact() {
		throw new Error('Interact method not implemented for this obstacle');
	}
}

module.exports = Obstacle;