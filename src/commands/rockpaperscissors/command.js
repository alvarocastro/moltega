import { ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags, SlashCommandBuilder } from 'discord.js';

const EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes
// time: 1000, // Shorter time for testing

const CHOICE_ID = {
	rock: 'rock',
	paper: 'paper',
	scissors: 'scissors',
};
const CHOICE_TEXT = {
	[CHOICE_ID.rock]: '👊 Rock',
	[CHOICE_ID.paper]: '✋ Paper',
	[CHOICE_ID.scissors]: '✌️ Scissors',
};
const CHOICE_SYMBOL = {
	[CHOICE_ID.rock]: '👊',
	[CHOICE_ID.paper]: '✋',
	[CHOICE_ID.scissors]: '✌️',
};
const CHOICES = [
	CHOICE_ID.rock,
	CHOICE_ID.paper,
	CHOICE_ID.scissors,
];

const resolveMatchup = (player1, player2) => {
	if (player1.choice === player2.choice) {
		return { result: 'tie', player1, player2 }; // tie
	} else if (
		(player1.choice === CHOICE_ID.rock && player2.choice === CHOICE_ID.scissors) ||
		(player1.choice === CHOICE_ID.paper && player2.choice === CHOICE_ID.rock) ||
		(player1.choice === CHOICE_ID.scissors && player2.choice === CHOICE_ID.paper)
	) {
		return { result: 'winner', player1, player2, winner: player1.user };
	} else {
		return { result: 'winner', player1, player2, winner: player2.user };
	}
};

export default {
	disabled: true,
	data: new SlashCommandBuilder()
		.setName('rockpaperscissors')
		.setDescription('Play rock paper scissors with the AI.')
		.addStringOption(option => option
			.setName('choice')
			.setDescription('Your choice (rock, paper, or scissors)')
			.setRequired(true)
			.addChoices(
				{ name: CHOICE_TEXT.rock, value: CHOICE_ID.rock },
				{ name: CHOICE_TEXT.paper, value: CHOICE_ID.paper },
				{ name: CHOICE_TEXT.scissors, value: CHOICE_ID.scissors },
			)
		),

	async execute (interaction) {
		const choice = interaction.options.getString('choice');

		const rockButton = new ButtonBuilder().setCustomId(CHOICE_ID.rock).setLabel(CHOICE_TEXT.rock).setStyle(ButtonStyle.Primary);
		const paperButton = new ButtonBuilder().setCustomId(CHOICE_ID.paper).setLabel(CHOICE_TEXT.paper).setStyle(ButtonStyle.Primary);
		const scissorsButton = new ButtonBuilder().setCustomId(CHOICE_ID.scissors).setLabel(CHOICE_TEXT.scissors).setStyle(ButtonStyle.Primary);
		const choicesRow = new ActionRowBuilder().addComponents(rockButton, paperButton, scissorsButton);

		const reply = await interaction.reply({
			content: `${interaction.user.toString()} started a rock paper scissors game. Click a button to play!`,
			components: [ choicesRow ],
		});

		const filter = i =>
			i.isButton() &&
			CHOICES.includes(i.customId);// &&
			// i.user.id !== interaction.user.id; // Only allow other users to play

		const collector = reply.createMessageComponentCollector({
			filter,
			// max: 1,
			time: EXPIRATION_TIME,
			// time: 1000, // Shorter time for testing
		});

		collector.on('collect', async i => {
			if (i.user.id === interaction.user.id) {
				return i.reply({
					content: 'You can\'t play your own game.',
					ephemeral: true,
				});
			}

			const otherUserChoice = i.customId;
			const result = resolveMatchup(
				{ user: interaction.user, choice },
				{ user: i.user, choice: otherUserChoice },
			);

			await Promise.all([
				reply.edit({ content: 'Game finished!', components: [] }),
				i.reply(createMatchupMessage(result)),
			]);
		});

		collector.on('end', async (_, reason) => {
			if (reason === 'time') {
				const botChoice = CHOICES[ Math.floor(Math.random() * CHOICES.length) ];
				const result = resolveMatchup(
					{ user: interaction.user, choice },
					{ user: interaction.client.user, choice: botChoice },
				);

				await Promise.all([
					reply.edit({ content: 'Game finished!', components: [] }),
					interaction.followUp(createMatchupMessage(result, { timeout: true })),
				]);
			}
		});
	},
};

const createMatchupMessage = (match, { timeout = false } = {}) => {
	const lines = [];

	if (timeout) {
		const timeoutMessages = [
			`Time's up! No one played, so ${match.player2.user} is taking over!`,
			`Time's up! No challengers... ${match.player2.user} steps in!`,
			`Time's up! No one played, so ${match.player2.user} will play instead.`,
			`Time's up! Since no one dared to play, ${match.player2.user} will.`,
		];
		lines.push(`-# 🤖 ${timeoutMessages[ Math.floor(Math.random() * timeoutMessages.length) ]}`);
	}

	lines.push(`# ${match.player1.user} ${CHOICE_SYMBOL[ match.player1.choice ]} vs ${CHOICE_SYMBOL[ match.player2.choice ]} ${match.player2.user}`);
	if (match.result === 'winner') {
		lines.push(`\n> **${match.winner} wins!**`);
	} else {
		lines.push('\n> **It\'s a tie!**');
	}

	return lines.join('\n');
};
