class Item {
	constructor(name, description, weight, count = 1) {
		this.name        = String(name);
		this.description = String(description);
		this.weight      = Number(weight) || 0;
		this.count       = Number(count) || 1;
	}

	use(target) {
		throw new Error('Use method not implemented for this item');
	}

	get totalWeight() {
		return this.weight * this.count;
	}
}

module.exports = Item;