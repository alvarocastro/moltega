import { MessageFlags, SlashCommandBuilder } from 'discord.js';

/*



*/

export default {
	data: new SlashCommandBuilder()
		.setName('inspire')
		.setDescription('Replies with an inspirational message.')
		.addUserOption(option => option
			.setName('target')
			.setDescription('The user to inspire')),

	async execute (interaction) {
		const target = interaction.options.getUser('target');

		try {
			const res = await fetch('https://inspirobot.me/api/?generate=true');
			const imageUrl = await res.text();

			if (target) {
				await interaction.reply({
					content: target.toString(),
					files: [ imageUrl ],
				});
			} else {
				await interaction.reply({
					files: [ imageUrl ],
				});
			}
		} catch (error) {
			console.log('>>>> INSPIRE ERROR', error);
			return await interaction.reply({
				content: 'Sorry, I could not fetch an inspirational message at this time.',
				flags: MessageFlags.Ephemeral,
			});
		}
	},
};
