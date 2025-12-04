const Obstacle = require('../Obstacle');

class Door extends Obstacle {
	constructor(name, lore, isLocked = true) {
		super(
			name,
			lore || (isLocked
					? 'A sturdy door blocks your path. It appears to be locked.'
					: 'A sturdy door blocks your path. It is currently unlocked.'
			),
			[isLocked ? 'unlock' : 'open']
		);
		this.isLocked = Boolean(isLocked);
	}

	unlock() {
		this.isLocked = false;
		this.availableActions = this.availableActions.filter(action => action !== 'unlock').concat('open');
	}
}