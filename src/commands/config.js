import { commands } from '@alvarocastro/discord-bot';
import { messageAuthorIsMoltar } from '../utils';

export default class ConfigCommand extends commands.ConfigCommand {
	check (message) {
		return super.check(...arguments) || messageAuthorIsMoltar(message);
	}
}
