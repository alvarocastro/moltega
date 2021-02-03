import { ChatCommand } from '@diamondbot/core';
import fetch from 'node-fetch';

export default class ButtsCommand extends ChatCommand {
	max = 8358; // Max number, probably the amount of posts in obutts.ru. Should be increased over time

	constructor (options = {}) {
		super(Object.assign({
			name: 'butts',
			format: '',
			description: 'Posts a butts pic',
			hidden: true,
			nsfw: true
		}, options));
	}

	async exec ({channel}) {
		const res = await fetch(`http://api.obutts.ru/butts/${Math.floor(Math.random() * this.max)}`);
		const json = await res.json();

		if (!json.length) {
			return;
		}

		const butt = json[0];

		if (!butt) {
			return;
		}

		channel.send(`http://media.obutts.ru/${butt.preview}`);
	}
}

/*
import PhSearchCommand from './search';
import randomItem from 'random-item';

export default class ButtsCommand extends PhSearchCommand {
	name = 'butts';
	format = null;
	description = 'Posts a butt pic';

	check () {
		return true;
	}

	async run (message) {
		const term = randomItem([
			'ass',
			'asses',
			'butt',
			'butts',
			'big butt'
		]);

		await super.run(message, [term]);
	}
}
*/
