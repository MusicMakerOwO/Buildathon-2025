const RandomInt = require('../Utils/RandomInt');

class Entity {
	constructor(name, health, damage, defense, lore) {
		this.name    = String(name);
		this.health  = Number(health)  || 100;
		this.damage	 = Number(damage)  || 10;
		this.defense = Number(defense) || 5;
		this.lore    = String(lore || 'You feel an eerie presence...');
	}

	/**
	 * Damages the target entity based on this entity's damage and the target's defense
	 * @param target
	 * @returns {number}
	 */
	damageEntity(target) {
		if (!(target instanceof Entity)) {
			throw new TypeError('Target must be an instance of Entity');
		}

		const maxDamage = Math.max(0, this.damage - target.defense);
		const actualDamage = RandomInt(1, maxDamage);
		target.health = Math.max(0, target.health - actualDamage);

		return actualDamage;
	}

	/**
	 * Designed for environmental or non-entity damage sources, ie traps, falls, etc.
	 * @param amount
	 * @returns {number}
	 */
	damageWithoutSource(amount) {
		amount = Number(amount) || 0;
		if (amount < 0) {
			throw new RangeError('Damage amount must be non-negative');
		}
		this.health = Math.max(0, this.health - amount);
		return this.health;
	}

	/**
	 * Heals the entity by the specified amount
	 * @param amount
	 * @returns {number}
	 */
	heal(amount) {
		amount = Number(amount) || 0;
		if (amount < 0) {
			throw new RangeError('Heal amount must be non-negative');
		}
		this.health += amount;
		return this.health;
	}

	/**
	 * Instantly kills the entity by setting its health to zero
	 */
	kill() {
		this.health = 0;
	}

	get isAlive() {
		return this.health > 0;
	}
}

module.exports = Entity;