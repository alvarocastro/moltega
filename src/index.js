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
import MinesweeperCommand from '@diamondbot/minesweeper-command';

import RankCommand from './commands/rank';
import TopCommand from './commands/top';

import BdsmCommand from './commands/nsfw/bdsm';
import BoobsCommand from './commands/nsfw/boobs';
import ButtsCommand from './commands/nsfw/butts';
import CocksCommand from './commands/nsfw/cocks';
import HentaiCommand from './commands/nsfw/hentai';
import PhSearchCommand from './commands/nsfw/search';

import PyramidEvent from './events/pyramid';

(async function () {
	const bot = new Bot();

	bot.addCommand(new PingCommand);
	bot.addCommand(new JokeCommand);
	bot.addCommand(new InspireCommand);
	bot.addCommand(new FortuneCommand);
	bot.addCommand(new VaseCommand);
	bot.addCommand(new MemeCommand);
	bot.addCommand(new RollCommand);
	bot.addCommand(new CatsCommand);
	bot.addCommand(new MinesweeperCommand);

	bot.addCommand(new RankCommand);
	bot.addCommand(new TopCommand);
	
	bot.addCommand(new BdsmCommand);
	bot.addCommand(new BoobsCommand);
	bot.addCommand(new ButtsCommand);
	bot.addCommand(new CocksCommand);
	bot.addCommand(new HentaiCommand);
	bot.addCommand(new PhSearchCommand);

	bot.addEvent(new PyramidEvent);

	await bot.login(process.env.DISCORD_TOKEN);
})();
