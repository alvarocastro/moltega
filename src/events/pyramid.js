import { ChatEvent } from '@diamondbot/core';
import { and, isEmoji } from '../utils';
import randomItem from 'random-item';

const pyramids = {
	2: {
		'# #|# #': {
			name: 'plebasquaremid',
			value: -100
		}
	},
	3: {
		'#|# #|#': {
			name: 'plebamid',
			value: -50
		},
		'#|# # # #|#': {
			name: 'cockamid',
			value: 10
		},
		'#|# # # # #|#': {
			name: 'longcockamid',
			value: 11
		},
		'#|# # # # # #|#': {
			name: 'longercockamid',
			value: 12
		},
		'#|# # # # # # #|#': {
			name: 'evenlongercockamid',
			value: 13
		},
		'# # #|# # #|# # #': {
			name: 'squaremid',
			value: 5
		}
	},
	4: {
		'# # # #|# # # #|# # # #|# # # #': {
			name: 'tetrasquaremid',
			value: 10
		}
	},
	5: {
		'#|# #|# # #|# #|#': {
			name: 'pyramid',
			value: 10
		},
		'# # #|# #|#|# #|# # #': {
			name: 'weirdamid',
			value: 15
		},
		'#|#|# # #|#|# # #': {
			name: 'Fmid',
			value: 5
		},
		'# # # # #|# # # # #|# # # # #|# # # # #|# # # # #': {
			name: 'pentasquaremid',
			value: 15
		}
	},
	6: {
		'# # # # # #|# # # # # #|# # # # # #|# # # # # #|# # # # # #|# # # # # #': {
			name: 'hexasquaremid',
			value: 20
		}
	},
	7: {
		'#|# #|# # #|# # # #|# # #|# #|#': {
			name: 'tetramid',
			value: 15
		},
		'# # #|# #|# # # #|# # # # # # #|# # # #|# #|# # #': {
			name: 'spaceshipmid',
			value: 40
		},
		'#|# #|# # # #|# # # # # # # #|# # # #|# #|#': {
			name: 'eiffelmid',
			value: 30
		},
		'# # # # # # #|# # # # # # #|# # # # # # #|# # # # # # #|# # # # # # #|# # # # # # #|# # # # # # #': {
			name: 'heptasquaremid',
			value: 30
		}
	},
	8: {
		'#|# #|# # # #|# # # # #|# # # # #|# # # #|# #|#': {
			name: 'bellyriamid',
			value: 40
		},
		'# # # #|# # #|# #|#|# # # #|# # #|# #|#': {
			name: 'nepalmid',
			value: 40
		},
		'# # # # # # # #|# # # # # # # #|# # # # # # # #|# # # # # # # #|# # # # # # # #|# # # # # # # #|# # # # # # # #|# # # # # # # #': {
			name: 'octasquaremid',
			value: 50
		}
	},
	9: {
		'#|# #|# # #|# # # #|# # # # #|# # # #|# # #|# #|#': {
			name: 'pentamid',
			value: 20
		},
		'# #|# # #|# # # #|# # #|# #|# # #|# # # #|# # #|# #': {
			name: 'boobamid',
			value: 50
		},
		'# # # # # # # # #|# # # # # # # # #|# # # # # # # # #|# # # # # # # # #|# # # # # # # # #|# # # # # # # # #|# # # # # # # # #|# # # # # # # # #|# # # # # # # # #': {
			name: 'enneasquaremid',
			value: 75
		}
	},
	10: {
		'# # # # # # # # # #|# # # # # # # # # #|# # # # # # # # # #|# # # # # # # # # #|# # # # # # # # # #|# # # # # # # # # #|# # # # # # # # # #|# # # # # # # # # #|# # # # # # # # # #|# # # # # # # # # #': {
			name: 'decasquaremid',
			value: 100
		}
	},
	11: {
		'#|# #|# # #|# # # #|# # # # #|# # # # # #|# # # # #|# # # #|# # #|# #|#': {
			name: 'hexamid',
			value: 30
		}
	},
	13: {
		'#|# #|# # #|# # # #|# # # # #|# # # # # #|# # # # # # #|# # # # # #|# # # # #|# # # #|# # #|# #|#': {
			name: 'heptamid',
			value: 50
		}
	},
	15: {
		'#|# #|# # #|# # # #|# # # # #|# # # # # #|# # # # # # #|# # # # # # # #|# # # # # # #|# # # # # #|# # # # #|# # # #|# # #|# #|#': {
			name: 'octomid',
			value: 75
		}
	},
	17: {
		'#|# #|# # #|# # # #|# # # # #|# # # # # #|# # # # # # #|# # # # # # # #|# # # # # # # # #|# # # # # # # #|# # # # # # #|# # # # # #|# # # # #|# # # #|# # #|# #|#': {
			name: 'enneamid',
			value: 100
		}
	},
	19: {
		'#|# #|# # #|# # # #|# # # # #|# # # # # #|# # # # # # #|# # # # # # # #|# # # # # # # # #|# # # # # # # # # #|# # # # # # # # #|# # # # # # # #|# # # # # # #|# # # # # #|# # # # #|# # # #|# # #|# #|#': {
			name: 'decamid',
			value: 150
		}
	}
};

export default class PyramidEvent extends ChatEvent {
	crits = [
		{ name: 'atypical', multi: 3 },
		{ name: 'area-51', multi: 4 },
		{ name: 'arnold-schwarzeneggerish', multi: 10 },
		{ name: 'american', multi: 2 },
		{ name: 'artistic', multi: 4 },
		{ name: 'alluring', multi: 4 },
		{ name: 'astral', multi: 2 },
		{ name: 'bane-of-mankind', multi: 6 },
		{ name: 'boring', multi: 2 },
		{ name: 'carl-sagan-approved', multi: 11 },
		{ name: 'critical', multi: 3 },
		{ name: 'citadel', multi: 5 },
		{ name: 'cat-friendly', multi: 4 },
		{ name: 'crypto', multi: 6 },
		{ name: 'cyberpunk', multi: 9 },
		{ name: 'commercial', multi: 4 },
		{ name: 'cursed', multi: 4 },
		{ name: 'chinese-militaristic', multi: 6 },
		{ name: 'depressing', multi: 2 },
		{ name: 'decadent', multi: 3 },
		{ name: 'dont-you-guys-have-phones', multi: 5 },
		{ name: 'dulce-de-leche-covered', multi: 9 },
		{ name: 'dense', multi: 4 },
		{ name: 'death-filled', multi: 6 },
		{ name: 'dog-friendly', multi: 4 },
		{ name: 'deep', multi: 4 },
		{ name: 'de_dust2', multi: 8 },
		{ name: 'ecological', multi: 5 },
		{ name: 'ethereal', multi: 2 },
		{ name: 'eminent', multi: 8 },
		{ name: 'elite', multi: 10 },
		{ name: 'edgy', multi: 3 },
		{ name: 'efficient', multi: 5 },
		{ name: 'frozen', multi: 5 },
		{ name: 'false', multi: 2 },
		{ name: 'fried', multi: 4 },
		{ name: 'fragile', multi: 2 },
		{ name: 'far-out', multi: 6 },
		{ name: 'flimsy', multi: 2 },
		{ name: 'golden', multi: 4 },
		{ name: 'genuine', multi: 4 },
		{ name: 'gaussian', multi: 10 },
		{ name: 'glorious', multi: 5 },
		{ name: 'haunted', multi: 4 },
		{ name: 'heroic', multi: 8 },
		{ name: 'he-doesnt-know', multi: 7 },
		{ name: 'hyper', multi: 6 },
		{ name: 'incendiary', multi: 2 },
		{ name: 'inamovible', multi: 7 },
		{ name: 'intrincate', multi: 4 },
		{ name: 'indisputable', multi: 5 },
		{ name: 'imperial', multi: 8 },
		{ name: 'kill-em-all', multi: 7 },
		{ name: 'kaleidoscopic', multi: 9 },
		{ name: 'legendary', multi: 6 },
		{ name: 'golden-legendary', multi: 10 },
		{ name: 'greedy', multi: 4 },
		{ name: 'groundbreaking', multi: 8 },
		{ name: 'golden-axe', multi: 7 },
		{ name: 'godlike', multi: 9 },
		{ name: 'needy', multi: 4 },
		{ name: 'necrotic', multi: 5 },
		{ name: 'noble', multi: 8 },
		{ name: 'nuclear', multi: 7 },
		{ name: 'miraculous', multi: 8 },
		{ name: 'multidimensional', multi: 7 },
		{ name: 'mentally-ill', multi: 4 },
		{ name: 'medieval', multi: 5 },
		{ name: 'mega', multi: 6 },
		{ name: 'molten', multi: 5 },
		{ name: 'mothership', multi: 7 },
		{ name: 'obvious', multi: 5 },
		{ name: 'omega', multi: 8 },
		{ name: 'overwhelming', multi: 8 },
		{ name: 'ordered', multi: 3 },
		{ name: 'olympian', multi: 6 },
		{ name: 'outworldly', multi: 8 },
		{ name: 'out-of-this-world', multi: 10 },
		{ name: 'preternatural', multi: 4 },
		{ name: 'polish', multi: 9 },
		{ name: 'polar', multi: 3 },
		{ name: 'pet-friendly', multi: 5 },
		{ name: 'pop', multi: 4 },
		{ name: 'punk', multi: 3 },
		{ name: 'powerful', multi: 8 },
		{ name: 'pirate', multi: 2 },
		{ name: 'pristine', multi: 7 },
		{ name: 'planetary', multi: 5 },
		{ name: 'quintessential', multi: 8 },
		{ name: 'rave-party', multi: 7 },
		{ name: 'super-rave-party', multi: 10 },
		{ name: 'relocating', multi: 3 },
		{ name: 'retractable', multi: 2 },
		{ name: 'relative', multi: 4 },
		{ name: 'reptilian', multi: 5 },
		{ name: 'salami-flavoured', multi: 5 },
		{ name: 'spammy', multi: 2 },
		{ name: 'siphoning', multi: 5 },
		{ name: 'submarine', multi: 4 },
		{ name: 'scorched', multi: 6 },
		{ name: 'stunning', multi: 7 },
		{ name: 'stressed', multi: 5 },
		{ name: 'super', multi: 4 },
		{ name: 'space-traveling', multi: 4 },
		{ name: 'spacetime-traveling', multi: 8 },
		{ name: 'stimulated', multi: 2 },
		{ name: 'satisfactory', multi: 4 },
		{ name: 'sensible', multi: 5 },
		{ name: 'steampunk', multi: 4 },
		{ name: 'sinister', multi: 7 },
		{ name: 'sacrifical', multi: 6 },
		{ name: 'time-traveling', multi: 6 },
		{ name: 'toothy', multi: 3 },
		{ name: 'turbo', multi: 5 },
		{ name: 'terminator', multi: 8 },
		{ name: 'terminator-2-judgement-day', multi: 10 },
		{ name: 'truly-artistic', multi: 6 },
		{ name: 'terrifying', multi: 6 },
		{ name: 'territorial', multi: 3 },
		{ name: 'timeless', multi: 7 },
		{ name: 'unnecessarily-complex', multi: 3 },
		{ name: 'unimaginative', multi: 3 },
		{ name: 'vape-nation', multi: 5 },
		{ name: 'vulgar', multi: 3 },
		{ name: 'weather-changing', multi: 9 },
		{ name: 'wrong', multi: 2 },
		{ name: 'world-wide-web', multi: 6 },
		{ name: 'worldly', multi: 5 },
	];

	constructor () {
		super('Pyramids');
	}

	check () {
		return true;
	}

	async action (message, memory) {
		const {id, channel, author, content} = message;
		if (author.bot) {
			// console.log('ESCAPE ruined by bot')
			return false;
		}

		const words = content.split(' ');
		let emoji;
		if (!emoji && isEmoji(words[0])) {
			emoji = words[0];
			// console.log('>>>> emoji detected:', emoji);
		}

		if (!emoji) {
			// console.log('ESCAPE no emoji');
			return false;
		}

		const messagesCollection = await channel.messages.fetch({ before: id, limit: 19 });
		const messages = messagesCollection.array();
		const serializedLines = [];
		const users = {};
		let size = 0;
		messages.unshift(message); // Include the triggering message
		for (const {content, author} of messages) {
			size++;

			if (author.bot) {
				// console.log('ESCAPE ruined by bot')
				return false;
			}

			const words = content.split(' ');
			const serializedLine = content.replace(new RegExp(emoji, 'g'), '#');
			
			if (serializedLine.replace(/#( |$)/g, '') !== '') {
				// console.log('ESCAPE no pattern');
				return false;
			}

			serializedLines.push(serializedLine);
			if (users[author.id]) {
				users[author.id]++;
			} else {
				users[author.id] = 1;
			}

			if (!pyramids[size]) {
				// console.log('NO PYRAMIDS THAT SIZE');
				continue;
			}

			const serialized = serializedLines.join('|');
			const match = pyramids[size][serialized];

			if (!match) {
				// console.log('NO PYRAMIDS THAT SHAPE');
				continue;
			}

			match.size = size;

			await this.processPyramid(match, users, emoji, channel, memory);
			return false;
		}
	}

	async processPyramid (match, users, emoji, channel, memory) {
		let {name, value, size} = match;
		const participants = Object.entries(users).map(([id, count]) => {
			return {
				mention: `<@${id}>`,
				id: id,
				count: count
			};
		});

		const isNegative = value < 0;
		const maxCrits = isNegative ? 10 : Math.pow(2, participants.length);
		// Negative pyramids always crit
		// Positive pyramids crit chance increases with size and participants
		let critChance = isNegative ? 1 : 0.35 + size / 50 + participants.length / 10;
		let critsCount = 0;
		while (Math.random() < critChance && critsCount < maxCrits) {
			critChance -= 0.1; // crit chance is reduced by 10% with every crit
			critsCount++;
		}

		const participantsMulti = Math.pow(3, participants.length - 1); // Participants multiplier is exponential
		const grats = [];

		value = value * participantsMulti;

		if (participants.length > 1) {
			grats.push(`${and(participants.map(p => p.mention))} (x${participantsMulti})`);
		} else {
			grats.push(participants[0].mention);
		}

		if (critsCount > 0) {
			const crits = randomItem.multiple(this.crits, critsCount);
			const critMulti = crits.reduce((acc, c) => c.multi * acc, 1);
			const critName = crits.map(c => c.name).join('-');

			name = `${critName}-${name}`;
			if (critMulti > 25) {
				name = name.toUpperCase();
			}
			value = value * critMulti;

			const n = ['a', 'e', 'i', 'o', 'u'].includes(name.charAt(0).toLowerCase()) ? 'n' : '';
			grats.push(`built a${n} ${emoji} **${name} (x${critMulti})**`);
		} else {
			grats.push(`built a ${emoji} **${name}**`);
		}

		if (participants.length > 1) {
			if (isNegative) {
				grats.push(`, they lose ${and(participants.map(p => p.count * -value))} spam points respectively ${this.bot.emoji('KEKW')}`);
			} else {
				grats.push(`, they get ${and(participants.map(p => p.count * value))} spam points respectively ${this.bot.emoji('PogYou')}`);
			}
		} else {
			if (isNegative) {
				grats.push(`and loses ${participants[0].count * -value} spam points ${this.bot.emoji('KEKW')}`);
			} else {
				grats.push(`and gets ${participants[0].count * value} spam points ${this.bot.emoji('PogYou')}`);
			}
		}

		await channel.send(grats.join(' '));

		Object.entries(users).forEach(([u, n]) => {
			const points = memory.get(['points', u]);
			if (points) {
				memory.set(['points', u], Math.max(points + (n * value), 0));
			} else {
				memory.set(['points', u], Math.max(n * value, 0));
			}
		});
	}
}
