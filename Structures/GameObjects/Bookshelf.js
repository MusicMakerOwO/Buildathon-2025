const Obstacle = require("../Obstacle");

class Bookshelf extends Obstacle {
	constructor() {
		super(
			'Bookshelf',
			'A tall wooden bookshelf filled with dusty old books.'
		);
	}
}

module.exports = Bookshelf;