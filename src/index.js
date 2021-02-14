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
import PassiveSpamPointsEvent from './events/passive-spam-points';

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
	bot.addEvent(new PassiveSpamPointsEvent);

	await bot.login(process.env.DISCORD_TOKEN);
})();
