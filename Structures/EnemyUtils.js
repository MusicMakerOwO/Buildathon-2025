const Entity = require('./Entity');
const RandomInt = require('../Utils/RandomInt');

class FeralRat extends Entity {
	constructor() {
		super('Feral Rat', RandomInt(50, 70), RandomInt(7,10), RandomInt(0,3), 'A large rat, its eyes gleam with a wild hunger. There is a bitter smell coming from it.');
	}
}

class Skeleton extends Entity {
	constructor() {
		super('Skeleton', RandomInt(60,80), RandomInt(10,17), RandomInt(3,8), 'An animated pile of bones, held together by dark magic. Who knows what it has seen?');
	}
}

class Goblin extends Entity {
	constructor() {
		super('Goblin', RandomInt(80,100), RandomInt(12,15), RandomInt(5,10), 'A small, green-skinned creature. It\'s starving and aggressive.');
	}
}

class Wraith extends Entity {
	constructor() {
		super('Wraith', RandomInt(100,130), RandomInt(15,20), 0, 'A ghostly apparition that chills the air around it. Its presence is unsettling.');
	}
}

module.exports = {
	Entity,

	Wraith,
	Skeleton,
	Goblin,
	FeralRat
};