import { MessageFlags, SlashCommandBuilder } from 'discord.js';

const API_KEY = process.env.WEATHER_API_KEY;

const weatherCodeToEmoji = {
	1000: [ '☀️', '🌙' ], // Sunny / Clear
	1003: '🌤️', // Partly Cloudy
	1006: '☁️', // Cloudy
	1009: '☁️', // Overcast
	1030: '🌫️', // Mist
	1063: '🌦️', // Patchy rain nearby
	1066: '🌨️', // Patchy snow nearby
	1069: '🌨️', // Patchy sleet nearby
	1072: '🌧️', // Patchy freezing drizzle nearby
	1087: '⛈️', // Thundery outbreaks in nearby
	1114: '🌨️', // Blowing snow
	1117: '🌨️', // Blizzard
	1135: '🌫️', // Fog
	1147: '🌫️', // Freezing fog
	1150: '🌦️', // Patchy light drizzle
	1153: '🌦️', // Light drizzle
	1168: '🌧️', // Freezing drizzle
	1171: '🌧️', // Heavy freezing drizzle
	1180: '🌦️', // Patchy light rain
	1183: '🌧️', // Light rain
	1186: '🌧️', // Moderate rain at times
	1189: '🌧️', // Moderate rain
	1192: '🌧️', // Heavy rain at times
	1195: '🌧️', // Heavy rain
	1198: '🌧️', // Light freezing rain
	1201: '🌧️', // Moderate or heavy freezing rain
	1204: '🌨️', // Light sleet
	1207: '🌨️', // Moderate or heavy sleet
	1210: '🌨️', // Patchy light snow
	1213: '🌨️', // Light snow
	1216: '🌨️', // Patchy moderate snow
	1219: '🌨️', // Moderate snow
	1222: '🌨️', // Patchy heavy snow
	1225: '🌨️', // Heavy snow
	1237: '🧊', // Ice pellets
	1240: '🌦️', // Light rain shower
	1243: '🌧️', // Moderate or heavy rain shower
	1246: '🌧️', // Torrential rain shower
	1249: '🌨️', // Light sleet showers
	1252: '🌨️', // Moderate or heavy sleet showers
	1255: '🌨️', // Light snow showers
	1258: '🌨️', // Moderate or heavy snow showers
	1261: '🧊', // Light showers of ice pellets
	1264: '🧊', // Moderate or heavy showers of ice pellets
	1273: '⛈️', // Patchy light rain in area with thunder
	1276: '⛈️', // Moderate or heavy rain in area with thunder
	1279: '⛈️', // Patchy light snow in area with thunder
	1282: '⛈️' // Moderate or heavy snow in area with thunder
};

const getWeather = async (location) => {
	const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(location)}`;
	const res = await fetch(url);

	return await res.json();
}

const buildLocationString = (result) => {
	// return `${result.location.name}, ${result.location.region}, ${result.location.country}`;
	return `${result.location.name}, ${result.location.country}`;
};

const getEmojiForCondition = (code, isDay) => {
	const emojiData = weatherCodeToEmoji[code];
	const emoji = Array.isArray(emojiData) ? (isDay ? emojiData[0] : emojiData[1]) : emojiData || '';

	return emoji;
};

const buildWeatherString = (result) => {
	const conditionCode = result.current.condition.code;
	const isDay = result.current.is_day === 1;
	const emoji = getEmojiForCondition(conditionCode, isDay);

	return `${emoji} **${result.current.condition.text}**, ${result.current.temp_c}°C (feels like ${result.current.feelslike_c}°C), humidity ${result.current.humidity}%, wind ${result.current.wind_kph} kph`;
};

const buildWeatherMessage = (result) => {
	return `Weather in ${buildLocationString(result)}:\n${buildWeatherString(result)}`;
};

export default {
	data: new SlashCommandBuilder()
		.setName('weather')
		.setDescription('Get weather information.')
		.addStringOption((option) => option
			.setName('location')
			.setDescription('Location to get the weather for.')
		)
		.addUserOption((option) => option
			.setName('user')
			.setDescription('Get weather for the selected user\'s location.')
		)
		.addBooleanOption((option) => option
			.setName('save')
			.setDescription('Save this as your default location.')),

	async execute (interaction) {
		const save = interaction.options.getBoolean('save');
		const targetUser = interaction.options.getUser('user');
		let location = interaction.options.getString('location');

		const userId = interaction.user.id;
		const db = interaction.client.db;

		// Store last searched location for user
		let savedMessage = null;
		if (save && location) {
			await db.set(`weather.${userId}`, location);
			savedMessage = `Saved location "${location}" as your default location.`;
		}
		if (targetUser) {
			// Try to get saved location for mentioned user
			location = await db.get(`weather.${targetUser.id}`);

			if (!location) {
				return await interaction.reply({
					content: `No saved location found for ${targetUser.toString()}.`,
					flags: MessageFlags.Ephemeral,
				});
			}
		}
		if (!location) {
			// Try to get saved location for user
			location = await db.get(`weather.${userId}`);
		}

		const result = await getWeather(location);

		if (result.error) {
			return await interaction.reply({
				content: result.error.message,
				flags: MessageFlags.Ephemeral,
			});
		}

		await interaction.reply(buildWeatherMessage(result));

		if (savedMessage) {
			return await interaction.followUp({
				content: savedMessage,
				flags: MessageFlags.Ephemeral,
			});
		}
	},
};
