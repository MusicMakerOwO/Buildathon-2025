const StorageObstacle = require("../StorageObstacle");

/** @type {[name: string, description: string][]} */
const FURNITURE_OPTIONS = [
	[
		'Cabinet',
		'A tall wooden cabinet with glass doors, filled with various trinkets and curiosities.'
	],
	[
		'Drawer',
		'A small wooden drawer, slightly ajar. It seems to contain some old papers and a few miscellaneous items.'
	],
	[
		'Chest',
		'An old wooden chest bound with iron straps. It looks like it could hold something valuable inside.'
	],
	[
		'Wardrobe',
		'A large wooden wardrobe with ornate carvings. It appears to be used for storing clothes and other personal items.'
	],
	[
		'Shelf',
		'A sturdy wooden shelf filled with various objects, including books, jars, and small boxes.'
	]
]

// This is for furniture that can be interacted with, like cabinets or drawers
// For non-interactable furniture, use ./StaticFurniture.js instead
class StorageFurniture extends StorageObstacle {
	/**
	 * @param {boolean} isLocked
	 * @param {Item[]} contents
	 */
	constructor(isLocked, contents) {
		super(
			... FURNITURE_OPTIONS[ Math.floor(Math.random() * FURNITURE_OPTIONS.length) ],
			isLocked,
			contents
		);
	}
}

module.exports = StorageFurniture;