class Item {
	constructor(name, description, weight, count = 1) {
		this.name        = String(name);
		this.description = String(description);
		this.weight      = Number(weight) || 0;
		this.count       = Number(count) || 1;
	}

	drop(amount) {
		amount = Number(amount) || 1;
		if (amount < 1) {
			throw new RangeError('Drop amount must be at least 1');
		}
		if (amount > this.count) {
			amount = this.count;
		}
		this.count -= amount;
		return this.count;
	}

	use(target) {
		throw new Error('Use method not implemented for this item');
	}

	get totalWeight() {
		return this.weight * this.count;
	}
}

module.exports = Item;