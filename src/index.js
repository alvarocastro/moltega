require('dotenv').config();

import { Bot, commands } from '@alvarocastro/discord-bot';
import fetch from 'node-fetch';
import randomItem from 'random-item';
import nsfwCommands from './commands/nsfw';
import InspireCommand from './commands/inspire';
import FortuneCommand from './commands/fortune';
import JokeCommand from './commands/joke';
import RollCommand from './commands/roll';
import RankCommand from './commands/rank';
import TestCommand from './commands/test';
import ConfigCommand from './commands/config';
import CommandCommand from './commands/command';
import PyramidEvent from './events/pyramid';

(async function () {
	const bot = new Bot({
		commands: [
			ConfigCommand,
			CommandCommand,
			commands.PingCommand,
			commands.HelpCommand,
			...nsfwCommands,
			InspireCommand,
			FortuneCommand,
			JokeCommand,
			RankCommand,
			RollCommand,
			TestCommand
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
		 * const res = await fetch('https://api.twitch.tv/kraken/users?login=followgrubby', {
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
			{ type: 'WATCHING', name: 'Lost' },
			{ type: 'WATCHING', name: 'humans' },
			{ type: 'WATCHING', name: 'cat memes' },
			{ type: 'WATCHING', name: 'cat videos' },
			{ type: 'WATCHING', name: 'the stars' },
			{ type: 'WATCHING', name: 'Zetalot\'s house from outside' },
			{ type: 'WATCHING', name: 'life passing by' },
			{ type: 'WATCHING', name: 'origami tutorials' },
			{ type: 'WATCHING', name: 'X-Files' },
			{ type: 'WATCHING', name: 'Dark' },
			{ type: 'WATCHING', name: 'Netflix' },
			{ type: 'WATCHING', name: 'Youtube' },
			{ type: 'LISTENING', name: '!inspire' },
			{ type: 'LISTENING', name: 'humans' },
			{ type: 'LISTENING', name: 'modem sounds' },
			{ type: 'LISTENING', name: 'the rain' },
			{ type: 'LISTENING', name: 'voices' },
			{ type: 'LISTENING', name: 'Mr. Jones' },
			{ type: 'LISTENING', name: 'Country Roads' },
			{ type: 'LISTENING', name: 'Spirit Bird' },
			{ type: 'LISTENING', name: 'Forever Young' },
			{ type: 'LISTENING', name: 'Tool' },
			{ type: 'LISTENING', name: 'Radiohead' },
			{ type: 'LISTENING', name: 'Skynet' },
			{ type: 'LISTENING', name: 'the void' },
			{ type: 'PLAYING', name: 'with server roles' },
			{ type: 'PLAYING', name: 'with server premissions' },
			{ type: 'PLAYING', name: 'with humans' },
			{ type: 'PLAYING', name: 'with kangaroos' },
			{ type: 'PLAYING', name: 'with human feelings' },
			{ type: 'PLAYING', name: 'with legos' },
			{ type: 'PLAYING', name: 'World of Warcraft Classic' },
			{ type: 'PLAYING', name: 'Hearthstone' },
			{ type: 'PLAYING', name: 'Runeterra' },
			{ type: 'PLAYING', name: 'Among us' },
			{ type: 'PLAYING', name: 'Minecraft' },
			{ type: 'PLAYING', name: 'Monopoly as the shoe' },
			{ type: 'PLAYING', name: 'Monopoly as the thimble' },
			{ type: 'PLAYING', name: 'Monopoly as the top hat' },
			{ type: 'PLAYING', name: 'Monopoly as the iron' },
			{ type: 'PLAYING', name: 'Monopoly as the cannon' },
			{ type: 'PLAYING', name: 'Risk' },
			{ type: 'PLAYING', name: 'minesweeper' },
			{ type: 'PLAYING', name: 'go' },
			{ type: 'PLAYING', name: 'hex' },
			{ type: 'PLAYING', name: 'backgammon' },
			{ type: 'PLAYING', name: 'dominoes' },
			{ type: 'PLAYING', name: 'chess' }
		];
		const activity = randomItem(activities);

		await bot.user.setPresence({
			activity,
			status: 'online'
		});
	}, [10 * 60 * 1000, 15 * 60 * 1000]);
})();
