const Item = require('../Item');
const Entity = require('../Entity');
const RandomInt = require('../../Utils/RandomInt');

class Rock extends Item {
	constructor() {
		super('Rock', 'A large, heavy rock. Could be used as a makeshift weapon.', 2, 1);
		this.damage = 5;
	}

	/**
	 * Damages the target entity based on the rock's damage and the target's defense
	 * @param target
	 * @returns {number}
	 */
	use(target) {
		// duplicate of Entity.damageEntity but for item use
		if (!(target instanceof Entity)) {
			throw new TypeError('Target must be an instance of Entity');
		}

		const maxDamage = Math.max(0, this.damage - target.defense);
		const actualDamage = RandomInt(1, maxDamage);
		target.health = Math.max(0, target.health - actualDamage);

		return actualDamage;
	}
}