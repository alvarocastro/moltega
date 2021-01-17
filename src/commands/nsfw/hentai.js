import PhSearchCommand from './search';

export default class HentaiCommand extends PhSearchCommand {
	name = 'hentai';
	description = 'Posts a weeb pic';
	hidden = true;

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

		const term = 'hentai';
		await super.run(message, [term]);
	}
}
