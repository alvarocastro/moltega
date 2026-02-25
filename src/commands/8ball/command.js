import { SlashCommandBuilder } from 'discord.js';

const outcomes = {
	negative: {
		chance: 48,
		messages: [
			// Negative
			// :red_circle:
			'Don\'t count on it.',
			'My reply is no.',
			'My sources say no.',
			'Outlook not so good.',
			'Very doubtful.',
		],
	},
	positive: {
		chance: 48,
		messages: [
			// Positive
			// :green_circle:
			'It is certain.',
			'It is decidedly so.',
			'Without a doubt.',
			'Yes definitely.',
			'You may rely on it.',
			'As I see it, yes.',
			'Most likely.',
			'Outlook good.',
			'Yes.',
			'Signs point to yes.',
		],
	},
	neutral: {
		chance: 4,
		messages: [
			// Neutral
			// :yellow_circle:
			'Reply hazy, try again.',
			'Ask again later.',
			'Better not tell you now.',
			'Cannot predict now.',
			'Concentrate and ask again.',
		],
	},
};

export default {
	data: new SlashCommandBuilder()
		.setName('8ball')
		.setDescription('Ask the magic ball!')
		.addStringOption((option) => option
			.setName('question')
			.setDescription('The question to ask the magic ball')
		),

	async execute (interaction) {
		const roll = Math.ceil(Math.random() * 100);
		const question = interaction.options.getString('question');

		// console.log(`>> [${this.name}] roll: ${roll}`);
		let acc = 0;
		for (const [ type, { chance, messages } ] of Object.entries(outcomes)) {
			acc += chance;

			if (roll <= acc) {
				// console.log(`>> [${this.name}] Result: ${type} (chance: ${acc - chance + 1} - ${acc})`);
				const message = messages[ Math.floor(Math.random() * messages.length) ];

				const reply = [];
				if (question) {
					reply.push(`:question: ${question}`);
				}
				reply.push(`:8ball: ${message}`);
				return interaction.reply(reply.join('\n'));
			}
		}
	},
};
