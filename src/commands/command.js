import { commands } from '@alvarocastro/discord-bot';
import { messageAuthorIsMoltar } from '../utils';

export default class CommandCommand extends commands.CommandCommand {
	check (message) {
		return super.check(...arguments) || messageAuthorIsMoltar(message);
	}
}
