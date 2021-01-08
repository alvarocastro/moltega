import { ChatCommand } from '@alvarocastro/discord-bot';
import roll from '@alvarocastro/roll';

export default class RollCommand extends ChatCommand {
	name = 'roll';
	format = '[dice]';
	description = 'Try your luck and roll the dices in AdX notation. Ex: 1d20, 2d6+1d12+2, etc.';

	async run ({channel, author}, [dice = '1d100']) {
		channel.send(`<@${author.id}> rolled ${roll(dice)}`);
	}
}
