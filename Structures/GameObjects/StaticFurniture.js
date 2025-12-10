const Obstacle = require("../Obstacle");

/** @type {[name, description]} */
const FURNITURE_OPTIONS = [
	[
		'Couch',
		'A worn-out couch with faded upholstery. It looks surprisingly comfortable despite its age.'
	],
	[
		'Armchair',
		'A plush armchair with intricate wooden carvings on its arms and legs.'
	],
	[
		'Table',
		'A sturdy wooden table, scarred from years of use but still solid.'
	]
]

// This is for furniture that cannot be interacted with, only observed
// For interactable furniture, use ./StorageFurniture.js instead
class StaticFurniture extends Obstacle {
	constructor() {
		super(
			... FURNITURE_OPTIONS[ Math.floor(Math.random() * FURNITURE_OPTIONS.length) ]
		);
	}
}

module.exports = StaticFurniture;