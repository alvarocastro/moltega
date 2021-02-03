import { ChatCommand } from '@diamondbot/core';

export default class RankCommand extends ChatCommand {
	constructor (options = {}) {
		super(Object.assign({
			name: 'rank',
			format: '[user]',
			description: 'Show rank and spam points of a user'
		}, options));
	}

	async exec ({member, guild, channel}, [query], memory) {
		let members;
		if (query) {
			members = await guild.members.fetch({query});
			members = members.array();
		} else {
			members = [member];
		}

		if (!members.length) {
			return;
		}

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
			.map(([id]) => {
				return id;
			});

		const output = members.map(({nickname, user: {username, discriminator, id}}) => {
			let rank = ranking.indexOf(id) + 1;
			let points = memory.get(['points', id], 0);
			return `**${nickname || username}** _(${username}#${discriminator})_ is rank ${rank} with ${points} spam points`;
		});
		
		channel.send(output.join('\n'));
	}
}
