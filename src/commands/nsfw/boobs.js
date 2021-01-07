import { ChannelChatCommand } from '@alvarocastro/discord-bot';
import fetch from 'node-fetch';

export default class BoobsCommand extends ChannelChatCommand {
	name = 'boobs';
	description = 'Posts a boobs pic';

	max = 14692; // Max number, probably the amount of posts in oboobs.ru. Should be increased over time

	async run ({channel}) {
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

/*
import PhSearchCommand from './search';
import randomItem from 'random-item';

export default class BoobsCommand extends PhSearchCommand {
	name = 'boobs';
	format = null;
	description = 'Posts a boobs pic';

	check () {
		return true;
	}

	async run (message) {
		const term = randomItem([
			'boobs',
			'tits',
			'boob',
			'nipple',
			'tit',
			'huge boobs',
			'big boobs',
			'huge tits',
			'big tits'
		]);

		await super.run(message, [term]);
	}
}
*/
