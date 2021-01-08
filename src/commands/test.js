import { ChatCommand } from '@alvarocastro/discord-bot';
import fetch from 'node-fetch';

export default class TestCommand extends ChatCommand {
	name = 'test';
	hidden = true;

	async run ({channel}) {
		console.log('LOG1');
		const res = await fetch('http://example.com');
		console.log('LOG2');
		const content = await res.text();
		console.log('LOG3');
		await channel.send(`Content is: ${content}`);
	}
}
