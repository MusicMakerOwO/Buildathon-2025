const Obstacle = require('../Obstacle');
const PlayerController = require('../PlayerController');
const Key = require("../Items/Key");

class Door extends Obstacle {
	constructor(name, lore, isLocked) {
		super(
			name,
			lore,
			['examine', 'open', 'unlock']
		);
		this.isLocked = Boolean(isLocked);
	}

	/**
	 * @param {PlayerController} player
	 * @param {string} action
	 * @returns {string}
	 */
	interact(player, action) {
		if (!(player instanceof PlayerController)) {
			throw new TypeError('Player must be an instance of PlayerController');
		}
		if (action === 'examine') {
			return this.lore + (this.isLocked ? ' The door is locked.' : ' The door is unlocked.');
		}
		if (action === 'open') {
			if (this.isLocked) {
				return `The ${this.name} is locked. You must unlock it first.`;
			} else {
				return `You open the ${this.name} and pass through.`;
			}
		}
		if (action === 'unlock') {
			if (!this.isLocked) {
				return `The ${this.name} is already unlocked. You can open it.`;
			} else {
				if (player.hasItem(Key) !== false) {
					this.isLocked = false;
					this.availableActions = this.availableActions.filter(act => act !== 'unlock').concat('open');
					return `You use a key to unlock the ${this.name}. You hear a loud click and can now open it.`;
				} else {
					return `You need a key to unlock the ${this.name}.`;
				}
			}
		}
	}
}

module.exports = Door;