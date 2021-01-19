import { ChatCommand } from '@alvarocastro/discord-bot';
import randomPuppy from 'random-puppy';
import randomItem from 'random-item';

export default class MemeCommand extends ChatCommand {
	name = 'cat';
	description = 'Get an image of our overlords';

	async run ({channel}) {
		const reddit = randomItem([
			'cat',
			'cats',
			'whatswrongwithyourcat',
			'catsareassholes'
		]);
		const img = await randomPuppy(reddit);

		await channel.send(img);
	}
}
