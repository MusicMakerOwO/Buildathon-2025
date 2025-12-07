const Item = require('../Item');
const Door = require("../GameObjects/Door");

class Key extends Item {
	constructor() {
		super('Key', 'A small rusted key. I wonder where it goes?', 0.1, 1);
	}

	use(target) {
		if (!('name' in target)) {
			throw new TypeError('Target must have a name property. Make sure you pass an Item, Entity, or GameObject instance.');
		}

		if (!(target instanceof Door)) {
			return `You try the ${this.name} on the ${target.name}, but nothing happens.`;
		}

		target.unlock();
		return `You use the ${this.name} to unlock the ${target.name}.`;
	}
}

module.exports = Key;