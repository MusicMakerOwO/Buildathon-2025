const PlayerController = require('./PlayerController');

// bad name, I know, but "object" is taken in JS
class Obstacle {
	constructor(name, lore, actions) {
		this.name = name;
		this.lore = String(lore || 'An immovable obstacle blocks your path.');

		if (!Array.isArray(actions) || actions.some(x => typeof x !== 'string')) throw new Error('Actions must be an array of strings');
		this.availableActions = actions;
	}

	/**
	 * Interact with the obstacle using a specified action. This method should be overridden by subclasses to provide specific interaction logic.
	 * @param {PlayerController} player - The player interacting with the obstacle.
	 * @param {string} action - The action to perform on the obstacle.
	 * @returns {string} - The result of the interaction.
	 */
	interact(player, action) {
		throw new Error('Interact method not implemented for this obstacle');
	}
}

module.exports = Obstacle;