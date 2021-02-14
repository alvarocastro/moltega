import { ChatCommand } from '@diamondbot/core';
import randomItem from 'random-item';

export default class GambleCommand extends ChatCommand {
	pockets = [
		{ number: 0, color: 'green' },
		{ number: 32, color: 'red' },
		{ number: 15, color: 'black' },
		{ number: 19, color: 'red' },
		{ number: 4, color: 'black' },
		{ number: 21, color: 'red' },
		{ number: 2, color: 'black' },
		{ number: 25, color: 'red' },
		{ number: 17, color: 'black' },
		{ number: 34, color: 'red' },
		{ number: 6, color: 'black' },
		{ number: 27, color: 'red' },
		{ number: 13, color: 'black' },
		{ number: 36, color: 'red' },
		{ number: 11, color: 'black' },
		{ number: 30, color: 'red' },
		{ number: 8, color: 'black' },
		{ number: 23, color: 'red' },
		{ number: 10, color: 'black' },
		{ number: 5, color: 'red' },
		{ number: 24, color: 'black' },
		{ number: 16, color: 'red' },
		{ number: 33, color: 'black' },
		{ number: 1, color: 'red' },
		{ number: 20, color: 'black' },
		{ number: 14, color: 'red' },
		{ number: 31, color: 'black' },
		{ number: 9, color: 'red' },
		{ number: 22, color: 'black' },
		{ number: 18, color: 'red' },
		{ number: 29, color: 'black' },
		{ number: 7, color: 'red' },
		{ number: 28, color: 'black' },
		{ number: 12, color: 'red' },
		{ number: 35, color: 'black' },
		{ number: 3, color: 'red' },
		{ number: 26, color: 'black' }
	];
	colors = {
		red: '🟥',
		black: '⬛',
		green: '🟩'
	};
	digits = [ '0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣' ];

	constructor (options = {}) {
		super(Object.assign({
			name: 'gamble',
			format: '<game> <bet>',
			description: 'Test your luck and win spam points!'
		}, options));
	}

	async commandHelp ({channel}, game) {
		if (game === 'roulette' || game === 'r') {
			return await channel.send(`
				> Roulette help:
				> \`!${this.name} roulette <bet> <type>\`
				> \`bet\`: Minimum bet is 50 spam points.
				> \`type\`: Type of bet can be one of:
				> - \`#\` to bet on an number, pays 36 to 1.
				> - \`odd\`/\`even\` to bet on type of number, pays 2 to 1.
				> - \`red\`/\`black\` to bet on color, pays 2 to 1.
				> - \`dozen #\` to bet that the number will be in the chosen dozen, pays 3 to 1.
				>   - \`dozen 1\` for numbers between 1 and 12.
				>   - \`dozen 2\` for numbers between 13 and 24.
				>   - \`dozen 3\` for numbers between 25 and 36.
				> Examples:
				> \`!${this.name} roulette 250 red\`
				> \`!${this.name} roulette 500 dozen 2\`
				> \`!${this.name} roulette 300 25\`
			`);
		}
		if (game === 'coin' || game === 'c') {
			return await channel.send(`
				> Coin help:
				> \`!${this.name} coin <bet>\`
				> \`bet\`: Minimum bet is 5 spam points.
				> Example:
				> \`!${this.name} coin 50\`
			`);
		}
		if (game === 'slots' || game === 's') {
			return await channel.send(`
				> Slots help:
				> \`!${this.name} slots <bet>\`
				> \`bet\`: Minimum bet is 20 spam points.
				> Pay table:
				>   💰💰💰 = bet x 100
				>   💰💰 = bet x 5
				>   💰 = bet x 2
				>   💸💸💸 = bet x 50
				>   match any 3 emotes = bet x 25
				> Example:
				> \`!${this.name} slots 69\`
			`);
		}
		return await channel.send(`
			> Gamble help:
			> - \`coin\` (\`c\`) to toss a coin against the bot.
			> - \`roulette\` (\`r\`) to bet on the roulette, try \`!${this.name} help roulette\` for more info.
			> - \`slots\` (\`s\`) to play slots.
			> - \`help\` (\`h\`) to view this message or more info of other games.
		`);
	}

	async commandCoin (message, amount, memory) {
		if (!amount) {
			return await this.commandHelp(message, 'coin');
		}
		if (amount < 5) {
			return await message.reply('minimum bet is 5 spam points');
		}
		const {author} = message;
		const winOdds = amount < 50 ? 0.52 : 0.48; // If bet is less than roulette's minimum, winning odds are better. If not, winning odds are worse than roulette to keep things balanced
		const playerWon = Math.random() <= winOdds;
		const [botSide, playerSide] = Math.random() < 0.5 ? ['heads', 'tails'] : ['tails', 'heads'];

		let points = memory.get(['points', author.id]);
		const sidesAnnounce = `I go ${botSide}, you go ${playerSide}... *\\*toss\\**`;

		let text;
		if (playerWon) {
			text = `${sidesAnnounce} **${playerSide.toUpperCase()}!** You get ${amount} spam points ${this.bot.emoji('PogYou')} (balance: ${points + amount} spam points)`;
			points += amount;
		} else {
			text = `${sidesAnnounce} **${botSide.toUpperCase()}!** You lose ${amount} spam points ${this.bot.emoji('KEKW')} (balance: ${points - amount} spam points)`;
			points -= amount;
		}

		memory.set(['points', author.id], points);
		return await message.reply(text);
	}

	async commandRoulette (message, [amount, bet, betParam], memory) {
		const {author} = message;
		bet = (bet ?? '').toUpperCase();
		
		if (
			!amount ||
			!bet ||
			(!isNaN(Number(bet)) && (
				Number(bet) < 0 ||
				Number(bet) > 36)
			) ||
			(isNaN(Number(bet)) && (
				!['ODD', 'EVEN', 'RED', 'BLACK', 'DOZEN'].includes(bet) ||
				(bet === 'DOZEN' && !['1', '2', '3'].includes(betParam))
			))
		) {
			return await this.commandHelp(message, 'roulette');
		}
		if (amount < 50) {
			return await message.reply('minimum bet is 50 spam points');
		}

		const pocket = randomItem(this.pockets);
		const points = memory.get(['points', author.id]);
		let playerWon = false;
		let prize = 0;
		if (bet === 'ODD') {
			playerWon = pocket.number !== 0 && (pocket.number % 2) !== 0;
			prize = amount * 2;
		} else if (bet === 'EVEN') {
			playerWon = pocket.number !== 0 && (pocket.number % 2) === 0;
			prize = amount * 2;
		} else if (bet === 'RED') {
			playerWon = pocket.color === 'red';
			prize = amount * 2;
		} else if (bet === 'BLACK') {
			playerWon = pocket.color === 'black';
			prize = amount * 2;
		} else if (bet === 'DOZEN') {
			const dozen = Number(betParam);
			bet = `${bet} ${dozen}`;
			playerWon = pocket.number > 12 * (dozen - 1) && pocket.number <= 12 * dozen;
			prize = amount * 3;
		} else {
			playerWon = pocket.number === Number(bet);
			prize = amount * 36;
		}

		let text = `**[${this.colors[pocket.color]}${String(pocket.number).split('').map(d => this.digits[d]).join('')}${this.colors[pocket.color]}]**`;
		if (playerWon) {
			text += ` You win ${prize} spam points betting on ${bet} ${this.bot.emoji('PogYou')} (balance: ${points + prize - amount} spam points)`;
			memory.set(['points', author.id], points + prize - amount);
		} else {
			text += ` You lost ${amount} spam points betting on ${bet} ${this.bot.emoji('KEKW')} (balance: ${points - amount} spam points)`;
			memory.set(['points', author.id], points - amount);
		}

		return await message.reply(text);
	}

	async commandSlots (message, amount, memory) {
		if (!amount) {
			return await this.commandHelp(message, 'slots');
		}
		if (amount < 20) {
			return await message.reply('minimum bet is 20 spam points');
		}

		const {author} = message;
		const symbols = [
			'💰', // FAT
			'💸', // LESSFAT
			'🍆',
			'🍋',
			'🍒',
			'🍑'
		];

		const result = [
			randomItem(symbols),
			randomItem(symbols),
			randomItem(symbols)
		];

		let multiplier = 0;
		if (result.every(s => s === result[0])) {
			// All the same!
			if (result[0] === symbols[0]) {
				// All are FATS
				multiplier = 100;
			} else if (result[0] === symbols[1]) {
				// All are LESSFATS
				multiplier = 50;
			} else {
				// All are other symbols
				multiplier = 25;
			}
		} else {
			// Look for the amount of FAT symbols
			const fats = result.filter(s => s === symbols[0]).length;
			if (fats === 2) {
				multiplier = 5;
			} else if (fats === 1) {
				multiplier = 2;
			}
		}

		const points = memory.get(['points', author.id]);
		let text = `[ ${result.join(' | ')} ]`;
		if (multiplier) {
			text = `${text} You win ${amount * multiplier} spam points ${this.bot.emoji('PogYou')} (balance: ${points + (amount * (multiplier - 1))})`;
			memory.set(['points', author.id], points + (amount * (multiplier - 1)));
		} else {
			text = `${text} You lost ${amount} spam points ${this.bot.emoji('KEKW')} (balance: ${points - amount})`;
			memory.set(['points', author.id], points - amount);
		}

		return await message.reply(text);
	}

	async exec (message, [game = 'help', amount, ...args], memory) {
		if (game === 'help' || game === 'h') {
			return await this.commandHelp(message, amount);
		}
		const {author} = message;
		const callerPoints = memory.get(['points', author.id], 0);
		amount = Number(amount ?? 0);

		if (callerPoints < amount) {
			return await message.reply(`you don't have enough points ${this.bot.emoji('KEKWait')}`);
		}

		if (game === 'coin' || game === 'c') {
			return await this.commandCoin(message, amount, memory);
		}
		if (game === 'roulette' || game === 'r') {
			return await this.commandRoulette(message, [amount, ...args], memory);
		}
		if (game === 'slots' || game === 's') {
			return await this.commandSlots(message, amount, memory);
		}
	}
}
