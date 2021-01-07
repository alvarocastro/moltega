import PhSearchCommand from './search';
import randomItem from 'random-item';

export default class HentaiCommand extends PhSearchCommand {
	name = 'hentai';
	format = null;
	description = 'Posts a weeb pic';

	check () {
		return true;
	}

	async run (message) {
		if (Math.random() < .1) {
			const emoji = message.channel.guild.emojis.cache.find(emoji => emoji.name.toLowerCase() === 'kekw');
			if (emoji) {
				await message.channel.send(`Weebs <:${emoji.name}:${emoji.id}>`);
				return;
			}
		}

		const term = randomItem([
			'hentai'
		]);
		await super.run(message, [term]);
	}
}
