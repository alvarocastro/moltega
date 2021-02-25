import { ChatEvent } from '@diamondbot/core';

export default class NoseEvent extends ChatEvent {
	counts = {};

	constructor () {
		super('Nose');
		
		this.noses = [
			'he doesn\'t know',
			'他没信息',
			'on nie wie',
			'ele não sabe',
			'il ne sait pas'
		];
	}

	check () {
		return true;
	}

	async action ({channel, content}) {
		const {guild} = channel;
		const lccontent = content.toLowerCase();
		const hasNose = this.noses.some(nose => lccontent.includes(nose));
		const key = `${guild.id}_${channel.id}`;
		let count = this.counts[key] ?? 0;

		if (hasNose) {
			if (count >= 0) {
				count++;

				if (count >= 2) {
					count = -1;
					channel.send(`He doesn't know ${this.bot.emoji('PepeLaugh')}`);
				}
			}
		} else {
			count = 0;
		}
		this.counts[key] = count;
	}
}
