import { SlashCommandBuilder } from 'discord.js';
import Groq from 'groq-sdk';

const client = new Groq({
	apiKey: process.env.GROQ_API_KEY
});

const generateAiReply = async function (systemInstruction, question) {
	const groq = client;

	const response = await groq.chat.completions.create({
		messages: [
			{
				role: 'system',
				content: systemInstruction,
			}, {
				role: 'user',
				content: question,
			}
		],
		model: 'groq/compound',
		temperature: 1,
	});

	return response.choices[0]?.message?.content || 'Failed to reply.';
};

export default {
	dev: true,
	data: new SlashCommandBuilder()
		.setName('ask')
		.setDescription('Ask a question and get an answer.')
		.addStringOption(option => option
			.setName('question')
			.setDescription('The question to ask')
			.setRequired(true)
		),

	async execute (interaction) {
		await interaction.deferReply();
		const question = interaction.options.getString('question');

console.log('>>>> QUESTION', question);

		const channel = interaction.channel;

		const messages = await channel.messages.fetch({ limit: 100 });
		const sorted = [ ...messages.values() ].reverse();

		/*

		msg.author.id // ID de la cuenta
		msg.author.username // nombre de la cuenta
		msg.author.globalName // alias global (puede ser null)
		msg.author.bot // booleano que indica si es un bot

		msg.id // ID del mensaje
		msg.content // contenido del mensaje
		msg.createdTimestamp // timestamp de creación del mensaje

		*/


		const users = {};
		const msgs = [];

		// Add interaction user to context
		users[interaction.member.user.id] = {
			username: interaction.member.user.username,
			globalName: interaction.member.user.globalName,
			bot: interaction.member.user.bot,
		};

		// Add bot to context
		const botUser = interaction.client.user;
		users[botUser.id] = {
			username: botUser.username,
			globalName: botUser.globalName,
			bot: botUser.bot,
		};

		sorted.forEach(async msg => {
			users[msg.author.id] = {
				username: msg.author.username,
				globalName: msg.author.globalName,
				bot: msg.author.bot,
			};

			msgs.push({
				// id: msg.id,
				content: msg.content,
				authorId: msg.author.id,
				createdTimestamp: msg.createdTimestamp,
			});
		});

		const context = [];
		context.push('You are answering a question in a Discord conversation.');
		context.push(`You are the user with ID ${interaction.client.user.id}. Messages from this ID are your previous replies.`);
		context.push('Here is the recent conversation for context:');
		context.push(JSON.stringify(msgs, null, 2));
		context.push('Here is the list of users in the conversation:');
		context.push(JSON.stringify(users, null, 2));
		context.push(`Now reply user ${interaction.member.user.id} following question: "${question}"`);
		context.push('Only use the conversation if it is relevant.');
		context.push([
			'Rules:',
			'- Only mention users using <@USER_ID>',
			'- Do not invent users.',
			'- Only use IDs from the list above.',
			'- Use conversation context only if relevant.',
			'- Respond naturally and conversationally.',
			'- Keep responses concise unless detail is necessary.',
			'- Do not sound like an assistant or an AI.',
			'- Do not explain obvious things unless asked.',
			'- Use a relaxed tone.',
		].join('\n'));

		const finalContext = context.join('\n\n');

		console.log('>>>> FINAL CONTEXT', finalContext);

		const reply = await generateAiReply(finalContext, question);


		console.log('>>>> USERS', JSON.stringify(users, null, 2));
		// console.log('>>>> MSGS', JSON.stringify(msgs, null, 2));



		await interaction.followUp(reply);
	},
};
