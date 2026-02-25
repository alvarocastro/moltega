import { Events, MessageFlags } from 'discord.js';

export default {
	disabled: true, // Disable this event handler for now, as it's not fully implemented
	name: Events.MessageCreate,

	async execute (message,a,s,d) {
		if (message.author.bot) return;

		console.log('>>>> MESSAGE CREATE EVENT FIRED', message,a,s,d);
		// if (!interaction.isChatInputCommand()) return;

		// const command = interaction.client.commands.get(interaction.commandName);

		// if (!command) {
		// 	console.error(`No command matching ${interaction.commandName} was found.`);
		// 	return;
		// }

		// try {
		// 	await command.execute(interaction);
		// } catch (error) {
		// 	console.error(error);
		// 	if (interaction.replied || interaction.deferred) {
		// 		await interaction.followUp({
		// 			content: 'There was an error while executing this command!',
		// 			flags: MessageFlags.Ephemeral,
		// 		});
		// 	} else {
		// 		await interaction.reply({
		// 			content: 'There was an error while executing this command!',
		// 			flags: MessageFlags.Ephemeral,
		// 		});
		// 	}
		// }
	},
};
