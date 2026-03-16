import { MessageFlags, SlashCommandBuilder } from 'discord.js';

const buildSexComSearchEndpoint = function (
	type,
	search,
	{ page = 1, limit = 100 } = {}
) {
	const base = 'https://www.sex.com/portal/api';

	const endpoints = {
		gifs: 'gifs/search',
		pics: 'pictures/search',
	};

	if (!endpoints[type]) {
		throw new Error('Type must be "gifs" or "pics"');
	}

	const params = new URLSearchParams({
		'sexual-orientation': 'straight',
		order: 'likeCount',
		search,
		page,
		limit,
	});

	return `${base}/${endpoints[type]}?${params.toString()}`;
};

const buildMediaUrl = (uri) => {
	return `https://imagex1.sx.cdn.live${uri}`;
};

const fetchRandomItem = async (search, preferredType) => {
	const tryTypes = preferredType ? [ preferredType ] : [ 'gifs', 'pics' ];

	for (const type of tryTypes) {
		const url = buildSexComSearchEndpoint(type, search);

		const res = await fetch(url);
		if (!res.ok) continue;

		const json = await res.json();
		const items = json?.data ?? [];

		if (items.length) {
			const random = items[ Math.floor(Math.random() * items.length) ];
			return {
				type,
				item: random,
			};
		}
	}

	return null;
};

export default {
	// dev: true,
	data: new SlashCommandBuilder()
		.setName('porn')
		.setDescription('Search porn on sex.com')
		.setNSFW(true)
		.addStringOption(option => option
			.setName('search')
			.setDescription('What do you want to see')
			.setRequired(true)
		)
		.addStringOption(option => option
			.setName('type')
			.setDescription('gifs or pics')
			.addChoices(
				{ name: 'gif', value: 'gifs' },
				{ name: 'pic', value: 'pics' }
			)
		),

	async execute (interaction) {
		const search = interaction.options.getString('search');
		const explicitType = interaction.options.getString('type');

		try {
			const result = await fetchRandomItem(search, explicitType);

			if (!result) {
				return await interaction.reply({
					content: 'No results found.',
					flags: MessageFlags.Ephemeral,
				});
			}

			const mediaUrl = buildMediaUrl(result.item.uri);

			await interaction.reply({
				content: mediaUrl,
			});
		} catch (error) {
			console.log('>>>> PORN ERROR', error);

			await interaction.reply({
				content: 'Failed to fetch porn.',
				flags: MessageFlags.Ephemeral,
			});
		}
	},
};
