import PhSearchCommand from './search';

export default class HentaiCommand extends PhSearchCommand {
	constructor (options = {}) {
		super(Object.assign({
			name: 'hentai',
			format: '',
			description: 'Posts a weeb pic',
			hidden: true,
			nsfw: true
		}, options));
	}

	async exec (message) {
		if (Math.random() < .05) {
			await message.channel.send(`Weebs ${this.bot.emoji('KEKW')}`);
			return;
		}

		const term = 'hentai';
		await super.run(message, [term]);
	}
}
