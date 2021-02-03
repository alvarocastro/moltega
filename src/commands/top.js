import { ChatCommand } from '@diamondbot/core';

export default class TopCommand extends ChatCommand {
	constructor (options = {}) {
		super(Object.assign({
			name: 'top',
			description: 'Show top users with most spam points'
		}, options));

		this.size = options.size ?? 10;
	}

	async exec ({guild, channel}, args, memory) {
		const users = memory.get(['points'], {});
		const ranking = Object.entries(users)
			.sort(([, pointsA], [, pointsB]) => {
				if (pointsA < pointsB) {
					return 1;
				}
				if (pointsA > pointsB) {
					return -1;
				}
				return 0;
			})
			.slice(0, this.size)
			.map(([id]) => {
				return id;
			});

		if (!ranking.length) {
			return;
		}

		const members = await guild.members.fetch({user: ranking});

		const output = ranking.map((id, i) => {
			const rank = i + 1;
			const points = memory.get(['points', id], 0);
			const member = members.get(id);
			const {nickname, user: {username, discriminator}} = member;
			return `**${nickname || username}** _(${username}#${discriminator})_ is rank ${rank} with ${points} spam points`;
		});
		
		channel.send(`Top ${output.length} spammers:\n${output.join('\n')}`);
	}
}
