import { ChatCommand } from '@diamondbot/core';
import fetch from 'node-fetch';

export default class BoobsCommand extends ChatCommand {
	max = 14692; // Max number, probably the amount of posts in oboobs.ru. Should be increased over time

	constructor (options = {}) {
		super(Object.assign({
			name: 'boobs',
			format: '',
			description: 'Posts a boobs pic',
			hidden: true,
			nsfw: true
		}, options));
	}

	async exec ({channel}) {
		const res = await fetch(`http://api.oboobs.ru/boobs/${Math.floor(Math.random() * this.max)}`);
		const json = await res.json();

		if (!json.length) {
			return;
		}

		const boob = json[0];

		if (!boob) {
			return;
		}

		channel.send(`http://media.oboobs.ru/${boob.preview}`);
	}
}
