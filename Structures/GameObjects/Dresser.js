const Obstacle = require('../Obstacle');
const Drawer = require('./Drawer');
const PlayerController = require('../PlayerController');

class Dresser extends Obstacle {
	/**
	 * @param {Drawer|undefined} drawer
	 */
	constructor(drawer) {
		super(
			'Bookshelf',
			drawer
				? 'A tall wooden dresser with several drawers. You notice one drawer that seems slightly ajar.'
				: 'A tall wooden dresser with several drawers. They are all stuck shut and cannot be opened.',
			drawer ? ['examine', 'open'] : ['examine']
		);
		if (drawer !== undefined && !(drawer instanceof Drawer)) {
			throw new TypeError('Drawer must be an instance of Drawer or undefined');
		}
		this.drawer = drawer;
	}

	interact(player, action) {
		if (!(player instanceof PlayerController)) {
			throw new TypeError('Player must be an instance of PlayerController');
		}
		if (action === 'examine') {
			return this.lore;
		}
		if (action === 'open') {
			if (this.drawer === undefined) {
				return `There is no drawer to open on the ${this.name}.`;
			} else {
				return this.drawer.interact(player, 'open');
			}
		}
	}
}

module.exports = Dresser;