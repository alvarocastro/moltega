import { ChatEvent } from '@diamondbot/core';

export default class PassiveSpamPointsEvent extends ChatEvent {
	constructor () {
		super('PassiveSpamPoints');
	}

	check () {
		return true;
	}

	async action ({author, content}, memory) {
		const prefix = memory.get(['config', 'prefix']);

		if (!content.startsWith(prefix)) {
			memory.db.update(['points', author.id], p => (p || 0) + 1).write();
		}
	}
}
