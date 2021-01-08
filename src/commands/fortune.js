import { ChatCommand } from '@alvarocastro/discord-bot';
import fetch from 'node-fetch';

export default class FortuneCommand extends ChatCommand {
	name = 'fortune';
	description = 'Crack open your fortune cookie!';
	cooldown = 10 * 60 * 60 * 1000; // Time a user must wait to get a new fortune

	async run (message, args, memory) {
		const lastFortuneTime = memory.get(['fortune', message.author.id], 0);

		if (lastFortuneTime + this.cooldown > Date.now()) {
			await message.reply('come back later for another fortune.');
			return;
		}

		memory.set(['fortune', message.author.id], Date.now());
		const res = await fetch('https://www.generatorslist.com/random/words/fortune-cookie-generator/ajax');
		const data = await res.json();

		const fortune = data[0]?.message[0]?.message;

		if (fortune) {
			await message.reply(fortune.charAt(0).toLowerCase() + fortune.slice(1));
		} else {
			await message.reply('there is no fortune for you today.');
		}
	}
}
