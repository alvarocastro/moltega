import { ChatCommand } from '@alvarocastro/discord-bot';
import randomItem from 'random-item';
import PornHub from 'pornhub.js';

const ph = new PornHub();

export default class PhSearchCommand extends ChatCommand {
	name = 'phsearch';
	format = '<term>';
	description = 'Searches Pornhub for the term and posts a pic';

	check () {
		return true;
	}

	async run ({channel}, terms) {
		const term = terms.join(' ');
		const waitMessage = await channel.send(`Fetching some ${term}...`);

		const {data: albums} = await ph.search('Album', term);
		const album = randomItem(albums);

		const {data: {photos}} = await ph.album(album.url)
		const photo = randomItem(photos);

		const {data: {info}} = await ph.photo(photo.url)
		const imageUrl = info.url;

		// const reply = await channel.send(`Fetching some ${term}...`);
		// await reply.edit(imageUrl);

		await channel.send(imageUrl);
		await waitMessage.delete();
	}
}
