import PhSearchCommand from './search';
import randomItem from 'random-item';

export default class BdsmCommand extends PhSearchCommand {
	name = 'bdsm';
	description = 'Posts a BDSM pic';
	hidden = true;

	check () {
		return true;
	}

	async run (message) {
		const term = randomItem([
			'bdsm'
		]);

		await super.run(message, [term]);
	}
}
