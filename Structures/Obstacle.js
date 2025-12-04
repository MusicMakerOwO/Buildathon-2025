// bad name, I know, but "object" is taken in JS
class Obstacle {
	constructor(name, lore, actions) {
		this.name = name;
		this.lore = String(lore || 'An immovable obstacle blocks your path.');

		if (!Array.isArray(actions) || actions.some(x => typeof x !== 'string')) throw new Error('Actions must be an array of strings');
		actions.unshift('examine');
		this.availableActions = actions; // string[], first element is always "examine"
	}

	/**
	 * Interact with the obstacle using a specified action. This method should be overridden by subclasses to provide specific interaction logic.
	 * @param {string} action - The action to perform on the obstacle.
	 * @returns {string} - The result of the interaction.
	 */
	interact(action) {
		return this.lore;
	}
}