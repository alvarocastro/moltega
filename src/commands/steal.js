import { ChatCommand, Discord } from '@diamondbot/core';

export default class TipCommand extends ChatCommand {
	constructor (options = {}) {
		super(Object.assign({
			name: 'steal',
			description: 'Give spam points to a user'
		}, options));
	}

	async commandHelp ({channel}) {
		return await channel.send(`
			> Tip help:
			> \`!${this.name} username amount\`
			> Example:
			> \`!${this.name} moltega 500\`
			> \`!${this.name} @Moltega 500\`
		`);
	}

	async exec (message, [user, amount], memory) {
		const {channel, guild, author} = message;
		if (!user || !amount) {
			return await this.commandHelp(message);
		}
		amount = Number(amount);
		if (isNaN(amount) || amount <= 0) {
			return await message.reply('tip must be greater than 0');
		}

		let target;
		if (Discord.MessageMentions.USERS_PATTERN.test(user)) {
			target = await guild.members.fetch(user.replace(Discord.MessageMentions.USERS_PATTERN, '$1'));
		} else {
			const members = await guild.members.fetch({query: user});
			if (members.length > 1) {
				return await message.reply(`try mentioning, your tip matched several users: ${members.join(', ')}`);
			}
			target = members.first();
		}

		if (author.id === target.id) {
			return await message.reply(`you can't tip yourself ${this.bot.emoji('KEKW')}`);
		}
		if (target.user.bot) {
			return await message.reply(`bots don't need your filthy points.`);
		}

		const points = memory.get(['points', author.id]);

		if (points <= 0) {
			return await message.reply(`you don't have spam points ${this.bot.emoji('KEKW')}`);
		}
		if (points < amount) {
			return await message.reply(`you only have ${points} spam points.`);
		}

		memory.db.update(['points', author.id], p => p - amount).write();
		memory.db.update(['points', target.id], p => (p || 0) + amount).write();

		return await channel.send(`${author} tipped ${amount} to ${target} ${this.bot.emoji('PogYou')}`);
	}
}
