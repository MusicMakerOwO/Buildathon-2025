export class Item {
	name: string;
	description: string;
	weight: number;
	count: number;

	constructor(name: string, description: string, weight: number, count?: number) {
		this.name        = name;
		this.description = description;
		this.weight      = weight || 0;
		this.count       = count  || 1;
	}

	use(target: unknown) {
		throw new Error('Use method not implemented for this item');
	}

	get totalWeight() {
		return this.weight * this.count;
	}
}