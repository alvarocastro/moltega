import { ChatCommand } from '@alvarocastro/discord-bot';

export default class VaseCommand extends ChatCommand {
	name = 'vase';
	description = 'A decorative container without handles';

	async run ({channel}) {
		const num = Math.floor(Math.random() * 20000) + 1;
		const padded = num.toString().padStart(7, '0');
		const vase = `http://thisvesseldoesnotexist.s3-website-us-west-2.amazonaws.com/public/v2/fakes/${padded}.jpg`;

		await channel.send(vase);
	}
}
