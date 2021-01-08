import { ChatCommand } from '@alvarocastro/discord-bot';
import fetch from 'node-fetch';

export default class JokeCommand extends ChatCommand {
	name = 'joke';
	description = 'Get some healthy bot humor';

	async run ({channel}) {
		const res = await fetch('https://icanhazdadjoke.com', {
			headers: {
				'Accept': 'application/json'
			}
		});
		const data = await res.json();
		let joke = 'Your mom';
		if (data.status === 200 && data.joke) {
			joke = data.joke;
		}

		const kekwEmoji = channel.guild.emojis.cache.find(emoji => emoji.name.toLowerCase() === 'kekw');
		let kekwText;
		if (kekwEmoji) {
			kekwText = `<:${kekwEmoji.name}:${kekwEmoji.id}>`;
		}

		await channel.send(`${joke} ${kekwText}`);
	}
}
