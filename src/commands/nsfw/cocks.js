import PhSearchCommand from './search';
import randomItem from 'random-item';

export default class CocksCommand extends PhSearchCommand {
	constructor (options = {}) {
		super(Object.assign({
			name: 'cocks',
			format: '',
			description: 'Posts a cock pic',
			hidden: true,
			nsfw: true
		}, options));
	}

	async exec (message) {
		const term = randomItem([
			'cock',
			'cocks',
			'dick',
			'dicks'
		]);

		await super.run(message, [term]);
	}
}
