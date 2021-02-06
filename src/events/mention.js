import { ChatEvent } from '@diamondbot/core';
import getInsult from 'insults';

export default class MentionEvent extends ChatEvent {
	constructor () {
		super('Mention');
	}

	check () {
		return true;
	}

	async action (message) {
		const {channel, author, mentions} = message;

		if (mentions.has(this.bot.user)) {
			await message.react(this.bot.emoji('pingsock'));
			if (Math.random() < 0.2) {
				await channel.send(`${author} ${getInsult()}`);
			}
		}
	}
}
