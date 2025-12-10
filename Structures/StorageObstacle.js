const Obstacle = require('./Obstacle');
const Item = require('./Item');
const Key = require('./Items/Key');
const PlayerController = require('./PlayerController');

class StorageObstacle extends Obstacle {
	/**
	 * @param {string} name
	 * @param {string} lore
	 * @param {boolean} isLocked
	 * @param {Item[]} contents
	 * @param {string[]?} additionActions
	 */
	constructor(name, lore, isLocked, contents, additionActions) {
		for (const item of contents) {
			if (!(item instanceof Item)) {
				throw new TypeError('All contents must be instances of Item');
			}
		}

		super(
			name,
			lore,
			(
				contents.length > 0 ? ['unlock', 'open'] : []
			).concat(additionActions || [])
		);

		this.contents = Array.isArray(contents) ? contents : [];
		this.isLocked = Boolean(isLocked);
	}

	interact(player, action) {
		if (!(player instanceof PlayerController)) {
			throw new TypeError('Player must be an instance of PlayerController');
		}

		if (action === 'open') {
			if (this.contents.length === 0) {
				return `You try to open the ${this.name}, but find nothing of interest.`;
			} else {
				if (this.isLocked) {
					return `The ${this.name} is locked. You must unlock it first.`;
				} else {
					const itemsList = this.contents.map(item => `- ${item.name} (x${item.count})`).join('\n');
					this.contents.forEach(item => player.addItem(item));
					this.contents = [];
					return `You open the ${this.name} and find:\n${itemsList}\nThe items have been added to your inventory.`;
				}
			}
		}

		if (action === 'unlock') {
			if (player.hasItem(Key) !== false) {
				player.removeItem(Key, 1);
				return `You use a key to unlock the ${this.name}. You hear a soft click and can now open it.`;
			} else {
				return `You need a key to unlock the ${this.name}.`;
			}
		}

		// handles base actions, error if action not recognized
		return super.interact(player, action);
	}
}

module.exports = StorageObstacle;