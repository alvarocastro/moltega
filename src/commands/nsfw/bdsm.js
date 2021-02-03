import PhSearchCommand from './search';
import randomItem from 'random-item';

export default class BdsmCommand extends PhSearchCommand {
	constructor (options = {}) {
		super(Object.assign({
			name: 'bdsm',
			format: '',
			description: 'Posts a BDSM pic'
		}, options));
	}

	async run (message) {
		const term = randomItem([
			'bdsm',
			'cbt'
		]);

		await super.run(message, [term]);
	}
}
