import { ChatCommand } from '@alvarocastro/discord-bot';
import randomPuppy from 'random-puppy';

export default class TestCommand extends ChatCommand {
	name = 'test';
	hidden = true;

	async run ({channel}, args) {
		// const subReddits = ['cat'];
		// const random = subReddits[Math.floor(Math.random() * subReddits.length)];
		const img = await randomPuppy(args.join(' '));

		channel.send(img);
	}
}
