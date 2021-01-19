import { ChatCommand } from '@alvarocastro/discord-bot';
import randomPuppy from 'random-puppy';
import randomItem from 'random-item';

export default class MemeCommand extends ChatCommand {
	name = 'meme';
	description = 'Quality memes';

	async run ({channel}, args) {
		const reddit = randomItem([
			'meme',
			'memes'
		]);
		const img = await randomPuppy(reddit);

		await channel.send(img);
	}
}
