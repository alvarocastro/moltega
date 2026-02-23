import { Events, MessageFlags } from 'discord.js';


// import Groq from 'groq-sdk';

// let AI_CLIENT;
// const getAiClient = function () {
// 	return AI_CLIENT || new Groq({
// 		apiKey: process.env.GROQ_API_KEY
// 	});
// }

// const generateFortune = async function (systemInstruction) {
// 	const groq = getAiClient();

// 	const response = await groq.chat.completions.create({
// 		messages: [
// 			{
// 				role: 'system',
// 				content: systemInstruction,
// 			},
// 		],
// 		model: 'openai/gpt-oss-20b',
// 		temperature: 1.9,
// 	});

// 	return response.choices[0]?.message?.content || 'Your future is uncertain.';
// };

export default {
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
