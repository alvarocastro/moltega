import PhSearchCommand from './search';
import randomItem from 'random-item';

export default class BdsmCommand extends PhSearchCommand {
	name = 'bdsm';
	format = null;
	description = 'Posts a BDSM pic';

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
