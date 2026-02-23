import { MessageFlags, SlashCommandBuilder } from 'discord.js';

const normalizePauseText = (text) => {
	return text
		.replace(/\[pause \d+\]/gi, '...')
		.replace(/[ \t]+\.\.\./g, '...')
		.replace(/\.\.\.[ \t]+/g, '... ')
		.replace(/[ \t]+/g, ' ')
		.trim();
};

const lowercaseFirst = (t) => {
	return t.charAt(0).toLowerCase() + t.slice(1);
};

export default {
	data: new SlashCommandBuilder()
		.setName('zen')
		.setDescription('Achieve instant enlightenment.')
		.addUserOption(option => option
			.setName('target')
			.setDescription('The user to enlighten')),

	async execute (interaction) {
		const target = interaction.options.getUser('target');

		try {
			const res = await fetch('https://inspirobot.me/api/?generateFlow=1');
			const { data } = await res.json();
			const quotes = data.filter(i => i.type === 'quote').map(i => i.text);

			const quote = quotes[ Math.floor(Math.random() * quotes.length) ];
			const normalizedQuote = normalizePauseText(quote);

			if (target) {
				await interaction.reply({
					content: `${target.toString()}, ${lowercaseFirst(normalizedQuote)}`,
				});
			} else {
				await interaction.reply({
					content: normalizedQuote,
				});
			}
		} catch (error) {
			console.log('>>>> ZEN ERROR', error);
			return await interaction.reply({
				content: 'Sorry, I cannot achieve enlightenment at this time.',
				flags: MessageFlags.Ephemeral,
			});
		}
	},
};
