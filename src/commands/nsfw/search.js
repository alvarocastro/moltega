import { ChatCommand } from '@diamondbot/core';
import randomItem from 'random-item';
import PornHub from 'pornhub.js';


export default class PhSearchCommand extends ChatCommand {
	ph = new PornHub();

	constructor (options = {}) {
		super(Object.assign({
			name: 'phsearch',
			format: '<term>',
			description: 'Searches Pornhub for the term and posts a pic',
			hidden: true,
			nsfw: true
		}, options));
	}

	async exec ({channel}, terms) {
		const term = terms.join(' ');
		const waitMessage = await channel.send(`Fetching some ${term}...`);

		const {data: albums} = await this.ph.search('Album', term);
		const album = randomItem(albums);

		const {data: {photos}} = await this.ph.album(album.url)
		const photo = randomItem(photos);

		const {data: {info}} = await this.ph.photo(photo.url)
		const imageUrl = info.url;

		// const reply = await channel.send(`Fetching some ${term}...`);
		// await reply.edit(imageUrl);

		await channel.send(imageUrl);
		await waitMessage.delete();
	}
}
