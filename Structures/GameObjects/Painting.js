const Obstacle = require('../Obstacle');
const RandomInt = require('../../Utils/RandomInt');

const PAINTING_DESCRIPTIONS = [
	"An old painting of a serene landscape. It looks slightly crooked on the wall.",
	"A portrait of a stern, regal figure. The eyes seem to follow you around the room.",
	"A vibrant abstract painting full of swirling colors and shapes. It feels almost hypnotic.",
	"A dark and moody seascape, with stormy skies and crashing waves. It evokes a sense of foreboding.",
	"A cheerful still life of fruit and flowers. The colors are bright and inviting.",
	"It's a painting of a peaceful countryside scene, with rolling hills and a clear blue sky. It brings a sense of calm.",
	"The painting depicts a bustling cityscape at night, with glowing lights and towering skyscrapers. It feels alive with energy.",
	"A mysterious painting of a dense forest shrouded in mist. It feels like something could be lurking just out of sight.",
	"A whimsical painting of fantastical creatures frolicking in a magical land. It sparks the imagination.",
	"A minimalist painting with simple geometric shapes and a limited color palette. It has a modern, sophisticated feel.",
	"It's mostly blank, with just a few faint brushstrokes.",
	"A chaotic explosion of colors and shapes, with no discernible subject.",
	"It's a map of a fictional place, with strange landmarks and names.",
	"This painting is so dark that it's hard to make out any details.",
	"This painting seems to change every time you look at it.",
];

class Painting extends Obstacle {
	constructor() {
		super(
			'Painting',
			PAINTING_DESCRIPTIONS[ RandomInt(0, PAINTING_DESCRIPTIONS.length - 1) ],
			['examine']
		);
	}
}

module.exports = Painting;