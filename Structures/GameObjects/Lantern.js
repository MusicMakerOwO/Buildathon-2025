const Obstacle = require('../Obstacle');

const RANDOM_DESCRIPTIONS = [
	'A rusty old lantern hanging from a hook on the wall. It looks like it could still be functional if you had some oil and a match to light it.',
	'An antique lantern with intricate metalwork and a glass enclosure. It has a faint glow, suggesting it might still hold some residual light.',
	'A weathered lantern covered in soot and grime. Despite its age, it seems sturdy enough to be used in an emergency.',
	'A decorative lantern with ornate designs etched into its surface. It appears to be more of a showpiece than a practical light source.',
	'A simple oil lantern with a wick that looks dry and brittle. It would need some maintenance before it could be used again.',
];

class Lantern extends Obstacle {
	constructor() {
		super(
			'Lantern',
			RANDOM_DESCRIPTIONS[ Math.floor(Math.random() * RANDOM_DESCRIPTIONS.length) ],
		);
	}
}

module.exports = Lantern;