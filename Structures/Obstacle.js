// bad name, I know, but "object" is taken in JS
const { Log } = require("../Utils/Log");

class Obstacle {
	/**
	 * @param {string} name
	 * @param {string} lore
	 * @param {string[]?} additionalActions
	 */
	constructor(name, lore, additionalActions) {
		this.name = String(name);
		this.lore = String(lore || 'An immovable obstacle blocks your path.');

		const actionsSet = new Set( ['examine'].concat(additionalActions || []) );
		this.availableActions = Array.from(actionsSet);
	}

	/**
	 * @param {PlayerController} player
	 * @param {string} action
	 * @returns {string}
	 */
	interact(player, action) {
		if (action === 'examine') {
			return this.lore;
		}

		// default unhandled action
		Log('ERROR', `Unhandled interaction action "${action}" on obstacle "${this.name}".`);
		return `You can't ${action} the ${this.name}.`;
	}
}

module.exports = Obstacle;