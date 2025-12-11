import {Obstacle} from '../Obstacle';

export class CollapsedVent extends Obstacle {
	constructor() {
		super(
			'Collapsed Vent',
			'A ventilation shaft that has caved in, scattering dust and twisted metal.'
		);
	}
}