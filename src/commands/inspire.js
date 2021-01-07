import { ChatCommand } from '@alvarocastro/discord-bot';
import fetch from 'node-fetch';

export default class InspireCommand extends ChatCommand {
	name = 'inspire';
	description = 'Shows an AI generated inspirational quote';

	async run ({channel}) {
		const res = await fetch('https://inspirobot.me/api?generate=true');
		const imageUrl = await res.text();
		await channel.send(imageUrl);
	}
}
