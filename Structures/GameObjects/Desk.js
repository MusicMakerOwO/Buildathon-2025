const Obstacle = require('../Obstacle');

const RANDOM_DESCRIPTIONS = [
	'A wooden desk covered in various papers, books, and miscellaneous items. It looks like someone has been using it recently.',
	'A cluttered desk piled high with documents, stationery, and a few personal trinkets. It seems to be in a state of organized chaos.',
	'An old wooden desk with a worn surface, scattered with notes, a coffee mug, and a few open books. It has a lived-in feel to it.',
	'A messy desk overflowing with papers, folders, and office supplies. It looks like someone has been working here for hours without taking a break.',
	'A vintage desk cluttered with typewritten pages, ink pens, and a small desk lamp. It has an air of nostalgia about it.',
];

class Desk extends Obstacle {
	constructor() {
		super(
			'Desk',
			RANDOM_DESCRIPTIONS[ Math.floor(Math.random() * RANDOM_DESCRIPTIONS.length) ],
		);
	}
}

module.exports = Desk;