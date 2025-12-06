const Obstacle = require('../Obstacle');
const Item = require('../Item');
const PlayerController = require('../PlayerController');
const Key = require('../Items/Key');

class Drawer extends Obstacle {
	constructor(isLocked, contents = []) {
		super(
			'Drawer',
			'A wooden drawer that can be opened to reveal its contents.',
			['examine' , 'open', 'unlock']
		);
		this.isLocked = Boolean(isLocked);
		for (const item of contents) {
			if (!(item instanceof Item)) {
				throw new TypeError('All contents must be instances of Item');
			}
		}
		this.contents = Array.isArray(contents) ? contents : [];
	}

	interact(player, action) {
		if (!(player instanceof PlayerController)) {
			throw new TypeError('Player must be an instance of PlayerController');
		}
		if (action === 'examine') {
			return this.lore + (this.isLocked ? ' The drawer is locked.' : ' The drawer is unlocked.');
		}
		if (action === 'open') {
			if (this.isLocked) {
				return `The ${this.name} is locked. You must unlock it first.`;
			} else {
				if (this.contents.length === 0) {
					return `You open the ${this.name}, but it's empty.`;
				} else {
					const itemsList = this.contents.map(item => `- ${item.name} (x${item.count})`).join('\n');
					this.contents.forEach(item => player.addItem(item));
					this.contents = [];
					return `You open the ${this.name} and find:\n${itemsList}\nThe items have been added to your inventory.`;
				}
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

module.exports = Drawer;