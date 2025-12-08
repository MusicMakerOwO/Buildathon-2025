const Item = require('../Item');

class Rock extends Item {
	constructor() {
		super('Rock', 'A large, heavy rock. Could be used as a makeshift weapon.', 2, 1);
	}
}

module.exports = Rock;