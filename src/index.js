require('dotenv').config();

import { Bot, commands } from '@alvarocastro/discord-bot';
import fetch from 'node-fetch';
import randomItem from 'random-item';
import PyramidEvent from './events/pyramid';
import CatsCommand from './commands/cats';
import CommandCommand from './commands/command';
import ConfigCommand from './commands/config';
import FortuneCommand from './commands/fortune';
import InspireCommand from './commands/inspire';
import JokeCommand from './commands/joke';
import MemeCommand from './commands/meme';
import RankCommand from './commands/rank';
import RollCommand from './commands/roll';
import VaseCommand from './commands/vase';
import nsfwCommands from './commands/nsfw';
import TestCommand from './commands/test';

(async function () {
	const bot = new Bot({
		commands: [
			// TestCommand,
			CatsCommand,
			CommandCommand,
			ConfigCommand,
			FortuneCommand,
			InspireCommand,
			JokeCommand,
			MemeCommand,
			RankCommand,
			RollCommand,
			VaseCommand,
			commands.PingCommand,
			commands.HelpCommand,
			...nsfwCommands
		],
		events: [
			PyramidEvent
		]
	});

	await bot.login(process.env.DISCORD_TOKEN);

	// Activity changer
	bot.setInterval(async function () {
		console.log('[activity] Changing activity...');
		/**
		 * Endpoint to get a user id
		 * const res = await fetch('https://api.twitch.tv/kraken/users?login=moltarr', {
		 */
		const res = await fetch(`https://api.twitch.tv/kraken/streams/${process.env.ZETALOT_TWITCH_ID}`, {
			headers: {
				'Accept': 'application/vnd.twitchtv.v5+json',
				'Client-ID': process.env.TWITCH_CLIENT_ID
			}
		});
		const {stream} = await res.json();

		if (stream) {
			await bot.user.setPresence({
				activity: {
					type: 'WATCHING',
					name: `${stream.channel.display_name} play ${stream.game}`,
					url: stream.channel.url
				},
				status: 'dnd'
			});
			return;
		}

		if (Math.random() < .8) {
			await bot.user.setPresence({
				activity: null,
				status: 'idle'
			});
			return;
		}

		const activities = [
			{ type: 'COMPETING', name: 'battle bots' },
			{ type: 'WATCHING', name: 'cat memes' },
			{ type: 'WATCHING', name: 'cat videos' },
			{ type: 'WATCHING', name: 'Dark' },
			{ type: 'WATCHING', name: 'humans' },
			{ type: 'WATCHING', name: 'Lost' },
			{ type: 'WATCHING', name: 'life passing by' },
			{ type: 'WATCHING', name: 'Netflix' },
			{ type: 'WATCHING', name: 'origami tutorials' },
			{ type: 'WATCHING', name: 'the stars' },
			{ type: 'WATCHING', name: 'X-Files' },
			{ type: 'WATCHING', name: 'Youtube' },
			{ type: 'WATCHING', name: 'Zetalot\'s house from outside' },
			{ type: 'LISTENING', name: '!inspire' },
			{ type: 'LISTENING', name: 'Country Roads' },
			{ type: 'LISTENING', name: 'Forever Young' },
			{ type: 'LISTENING', name: 'humans' },
			{ type: 'LISTENING', name: 'modem sounds' },
			{ type: 'LISTENING', name: 'the rain' },
			{ type: 'LISTENING', name: 'voices' },
			{ type: 'LISTENING', name: 'Mr. Jones' },
			{ type: 'LISTENING', name: 'Spirit Bird' },
			{ type: 'LISTENING', name: 'Tool' },
			{ type: 'LISTENING', name: 'Radiohead' },
			{ type: 'LISTENING', name: 'Skynet' },
			{ type: 'LISTENING', name: 'the void' },
			{ type: 'LISTENING', name: 'myself' },
			{ type: 'LISTENING', name: 'my neighbours' },
			{ type: 'LISTENING', name: 'no one' },
			{ type: 'PLAYING', name: 'Among us' },
			{ type: 'PLAYING', name: 'backgammon' },
			{ type: 'PLAYING', name: 'chess' },
			{ type: 'PLAYING', name: 'dominoes' },
			{ type: 'PLAYING', name: 'go' },
			{ type: 'PLAYING', name: 'hex' },
			{ type: 'PLAYING', name: 'Hearthstone' },
			{ type: 'PLAYING', name: 'Minecraft' },
			{ type: 'PLAYING', name: 'minesweeper' },
			{ type: 'PLAYING', name: 'Monopoly as the shoe' },
			{ type: 'PLAYING', name: 'Monopoly as the thimble' },
			{ type: 'PLAYING', name: 'Monopoly as the top hat' },
			{ type: 'PLAYING', name: 'Monopoly as the iron' },
			{ type: 'PLAYING', name: 'Monopoly as the cannon' },
			{ type: 'PLAYING', name: 'Risk' },
			{ type: 'PLAYING', name: 'Runeterra' },
			{ type: 'PLAYING', name: 'with server roles' },
			{ type: 'PLAYING', name: 'with server premissions' },
			{ type: 'PLAYING', name: 'with humans' },
			{ type: 'PLAYING', name: 'with kangaroos' },
			{ type: 'PLAYING', name: 'with human feelings' },
			{ type: 'PLAYING', name: 'with legos' },
			{ type: 'PLAYING', name: 'World of Warcraft Classic' },
		];
		const activity = randomItem(activities);

		await bot.user.setPresence({
			activity,
			status: 'online'
		});
	}, [10 * 60 * 1000, 15 * 60 * 1000]); // Changes every 10~15 minutes
})();
