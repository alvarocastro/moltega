require('dotenv').config();

import { Bot } from '@diamondbot/core';
import PingCommand from '@diamondbot/ping-command';
import JokeCommand from '@diamondbot/joke-command';
import InspireCommand from '@diamondbot/inspire-command';
import FortuneCommand from '@diamondbot/fortune-command';
import VaseCommand from '@diamondbot/vase-command';
import MemeCommand from '@diamondbot/meme-command';
import RollCommand from '@diamondbot/roll-command';
import CatsCommand from '@diamondbot/cats-command';
import DogsCommand from '@diamondbot/dogs-command';
import MinesweeperCommand from '@diamondbot/minesweeper-command';
import HistoryCommand from '@diamondbot/history-command';
import FactCommand from '@diamondbot/fact-command';
import MemberageCommand from '@diamondbot/memberage-command';
// import WeatherCommand from '@diamondbot/weather-command';
import TipCommand from './commands/tip';

import RankCommand from './commands/rank';
import TopCommand from './commands/top';
import HelpCommand from '@diamondbot/help-command';
import GambleCommand from './commands/gamble';

import PornCommand from '@diamondbot/porn-command';

import BdsmCommand from './commands/nsfw/bdsm';
import BoobsCommand from './commands/nsfw/boobs';
import ButtsCommand from './commands/nsfw/butts';
import CocksCommand from './commands/nsfw/cocks';
import HentaiCommand from './commands/nsfw/hentai';
import PhSearchCommand from './commands/nsfw/search';

import PyramidEvent from './events/pyramid';
import MentionEvent from './events/mention';
import NoseEvent from './events/nose';
import PassiveSpamPointsEvent from './events/passive-spam-points';

import randomItem from 'random-item';

(async function () {
	const bot = new Bot({
		owner: process.env.MOLTAR_DISCORD_ID
	});

	bot.addCommand(new PingCommand);
	bot.addCommand(new JokeCommand);
	bot.addCommand(new InspireCommand);
	bot.addCommand(new FortuneCommand);
	bot.addCommand(new VaseCommand);
	bot.addCommand(new MemeCommand);
	bot.addCommand(new RollCommand);
	bot.addCommand(new CatsCommand);
	bot.addCommand(new DogsCommand);
	bot.addCommand(new MinesweeperCommand);

	bot.addCommand(new RankCommand);
	bot.addCommand(new TopCommand);
	bot.addCommand(new HelpCommand);
	bot.addCommand(new GambleCommand);
	bot.addCommand(new TipCommand);
	bot.addCommand(new HistoryCommand);
	bot.addCommand(new FactCommand);
	// bot.addCommand(new WeatherCommand);

	bot.addCommand(new MemberageCommand);

	bot.addCommand(new BdsmCommand);
	bot.addCommand(new BoobsCommand);
	bot.addCommand(new ButtsCommand);
	bot.addCommand(new CocksCommand);
	bot.addCommand(new HentaiCommand);
	bot.addCommand(new PhSearchCommand);
	bot.addCommand(new PornCommand({
		imgurClientId: process.env.IMGUR_CLIENT_ID
	}));

	bot.addEvent(new PyramidEvent);
	bot.addEvent(new MentionEvent);
	bot.addEvent(new NoseEvent);
	bot.addEvent(new PassiveSpamPointsEvent);

	await bot.login(process.env.DISCORD_TOKEN);

	// Activity changer
	bot.setInterval(async function () {
		console.log('[activity] Changing activity...');
		/**
		 * Endpoint to get a user id
		 * const res = await fetch('https://api.twitch.tv/kraken/users?login=moltarr', {
		 */
		/*
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
		*/

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
