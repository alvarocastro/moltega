import PhSearchCommand from './search';
import randomItem from 'random-item';

export default class CocksCommand extends PhSearchCommand {
	name = 'cocks';
	description = 'Posts a cock pic';
	hidden = true;

	check () {
		return true;
	}

	async run (message) {
		const term = randomItem([
			'cock',
			'cocks',
			'dick',
			'dicks'
		]);

		await super.run(message, [term]);
	}
}
