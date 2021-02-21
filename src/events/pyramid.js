import { ChatEvent } from '@diamondbot/core';
import { and, isEmoji } from '../utils';
import randomItem from 'random-item';

const pyramids = {
	2: {
		'# #|# #': {
			name: 'plebasquaremid',
			value: -50
		}
	},
	3: {
		'#|# #|#': {
			name: 'plebamid',
			value: -40
		},
		'#|# # # #|#': {
			name: 'cockamid',
			value: 10
		},
		'# # #|# # #|# # #': {
			name: 'squaremid',
			value: 11
		}
	},
	4: {
		'# # # #|# # # #|# # # #|# # # #': {
			name: 'tetrasquaremid',
			value: 12
		}
	},
	5: {
		'#|# #|# # #|# #|#': {
			name: 'pyramid',
			value: 10
		},
		'# # #|# #|#|# #|# # #': {
			name: 'weirdamid',
			value: 20
		},
		'# # #|#|# # #|#|#': {
			name: 'Fmid',
			value: 1
		},
		'# # # # #|# # # # #|# # # # #|# # # # #|# # # # #': {
			name: 'pentasquaremid',
			value: 13
		}
	},
	6: {
		'# #|# #|# # # #|# # # #|# #|# #': {
			name: 'zoomed plebamid',
			value: 20
		},
		'# # # # # #|# # # # # #|# # # # # #|# # # # # #|# # # # # #|# # # # # #': {
			name: 'hexasquaremid',
			value: 14
		}
	},
	7: {
		'#|# #|# # #|# # # #|# # #|# #|#': {
			name: 'tetramid',
			value: 11
		},
		'# # #|# #|# # # #|# # # # # # #|# # # #|# #|# # #': {
			name: 'spaceshipmid',
			value: 35
		},
		'#|# #|# # # #|# # # # # # # #|# # # #|# #|#': {
			name: 'eiffelmid',
			value: 30
		},
		'# # # # # # #|# # # # # # #|# # # # # # #|# # # # # # #|# # # # # # #|# # # # # # #|# # # # # # #': {
			name: 'heptasquaremid',
			value: 15
		}
	},
	8: {
		'#|# #|# # # #|# # # # #|# # # # #|# # # #|# #|#': {
			name: 'bellyriamid',
			value: 25
		},
		'#|# #|# # #|# # # #|#|# #|# # #|# # # #': {
			name: 'nepalmid',
			value: 20
		},
		'# # # # # # # #|# # # # # # # #|# # # # # # # #|# # # # # # # #|# # # # # # # #|# # # # # # # #|# # # # # # # #|# # # # # # # #': {
			name: 'octasquaremid',
			value: 16
		}
	},
	9: {
		'#|# #|# # #|# # # #|# # # # #|# # # #|# # #|# #|#': {
			name: 'pentamid',
			value: 12
		},
		'# #|# # #|# # # #|# # #|# #|# # #|# # # #|# # #|# #': {
			name: 'boobamid',
			value: 25
		},
		'# # # # # # # # #|# # # # # # # # #|# # # # # # # # #|# # # # # # # # #|# # # # # # # # #|# # # # # # # # #|# # # # # # # # #|# # # # # # # # #|# # # # # # # # #': {
			name: 'enneasquaremid',
			value: 18
		}
	},
	10: {
		'# # # # # # # # # #|# # # # # # # # # #|# # # # # # # # # #|# # # # # # # # # #|# # # # # # # # # #|# # # # # # # # # #|# # # # # # # # # #|# # # # # # # # # #|# # # # # # # # # #|# # # # # # # # # #': {
			name: 'decasquaremid',
			value: 20
		}
	},
	11: {
		'#|# #|# # #|# # # #|# # # # #|# # # # # #|# # # # #|# # # #|# # #|# #|#': {
			name: 'hexamid',
			value: 13
		}
	},
	13: {
		'#|# #|# # #|# # # #|# # # # #|# # # # # #|# # # # # # #|# # # # # #|# # # # #|# # # #|# # #|# #|#': {
			name: 'heptamid',
			value: 15
		}
	},
	15: {
		'#|# #|# # #|# # # #|# # # # #|# # # # # #|# # # # # # #|# # # # # # # #|# # # # # # #|# # # # # #|# # # # #|# # # #|# # #|# #|#': {
			name: 'octomid',
			value: 17
		}
	},
	17: {
		'#|# #|# # #|# # # #|# # # # #|# # # # # #|# # # # # # #|# # # # # # # #|# # # # # # # # #|# # # # # # # #|# # # # # # #|# # # # # #|# # # # #|# # # #|# # #|# #|#': {
			name: 'enneamid',
			value: 19
		}
	},
	19: {
		'#|# #|# # #|# # # #|# # # # #|# # # # # #|# # # # # # #|# # # # # # # #|# # # # # # # # #|# # # # # # # # # #|# # # # # # # # #|# # # # # # # #|# # # # # # #|# # # # # #|# # # # #|# # # #|# # #|# #|#': {
			name: 'decamid',
			value: 22
		}
	}
};

export default class PyramidEvent extends ChatEvent {
	crits = [
		{ name: 'american', multi: 2 },
		{ name: 'artistic', multi: 4 },
		{ name: 'alluring', multi: 4 },
		{ name: 'astral', multi: 2 },
		{ name: 'bane of mankind', multi: 6 },
		{ name: 'critical', multi: 3 },
		{ name: 'citadel', multi: 5 },
		{ name: 'commercial', multi: 4 },
		{ name: 'chinese militaristic', multi: 6 },
		{ name: 'depressing', multi: 2 },
		{ name: 'decadent', multi: 3 },
		{ name: 'dont-you-guys-have-phones', multi: 5 },
		{ name: 'dulce de leche covered', multi: 9 },
		{ name: 'dense', multi: 4 },
		{ name: 'death-filled', multi: 6 },
		{ name: 'deep', multi: 4 },
		{ name: 'ecological', multi: 5 },
		{ name: 'ethereal', multi: 2 },
		{ name: 'elite', multi: 10 },
		{ name: 'edgy', multi: 3 },
		{ name: 'false', multi: 2 },
		{ name: 'fried', multi: 4 },
		{ name: 'fragile', multi: 2 },
		{ name: 'flimsy', multi: 2 },
		{ name: 'golden', multi: 4 },
		{ name: 'genuine', multi: 4 },
		{ name: 'glorious', multi: 5 },
		{ name: 'haunted', multi: 4 },
		{ name: 'heroic', multi: 8 },
		{ name: 'hyper', multi: 6 },
		{ name: 'incendiary', multi: 2 },
		{ name: 'inamovible', multi: 7 },
		{ name: 'intrincate', multi: 4 },
		{ name: 'indisputable', multi: 5 },
		{ name: 'imperial', multi: 8 },
		{ name: 'kill-em-all', multi: 7 },
		{ name: 'legendary', multi: 6 },
		{ name: 'GOLDEN LEGENDARY', multi: 10 },
		{ name: 'greedy', multi: 4 },
		{ name: 'godlike', multi: 9 },
		{ name: 'needy', multi: 4 },
		{ name: 'necrotic', multi: 5 },
		{ name: 'nuclear', multi: 7 },
		{ name: 'miraculous', multi: 8 },
		{ name: 'multidimensional', multi: 7 },
		{ name: 'medieval', multi: 5 },
		{ name: 'molten', multi: 5 },
		{ name: 'mothership', multi: 7 },
		{ name: 'obvious', multi: 5 },
		{ name: 'ordered', multi: 3 },
		{ name: 'olympian', multi: 6 },
		{ name: 'preternatural', multi: 4 },
		{ name: 'polar', multi: 3 },
		{ name: 'pop', multi: 4 },
		{ name: 'powerful', multi: 8 },
		{ name: 'pirate', multi: 2 },
		{ name: 'planetary', multi: 5 },
		{ name: 'quintessential', multi: 8 },
		{ name: 'rave party', multi: 7 },
		{ name: 'SUPER RAVE PARTY', multi: 10 },
		{ name: 'relocating', multi: 3 },
		{ name: 'retractable', multi: 2 },
		{ name: 'relative', multi: 4 },
		{ name: 'reptilian', multi: 5 },
		{ name: 'salami flavoured', multi: 5 },
		{ name: 'spammy', multi: 2 },
		{ name: 'stressed', multi: 5 },
		{ name: 'super', multi: 4 },
		{ name: 'space traveling', multi: 4 },
		{ name: 'spacetime traveling', multi: 8 },
		{ name: 'stimulated', multi: 2 },
		{ name: 'satisfactory', multi: 4 },
		{ name: 'sensible', multi: 5 },
		{ name: 'sinister', multi: 7 },
		{ name: 'sacrifical', multi: 6 },
		{ name: 'time traveling', multi: 6 },
		{ name: 'toothy', multi: 3 },
		{ name: 'turbo', multi: 5 },
		{ name: 'truly artistic', multi: 6 },
		{ name: 'terrifying', multi: 6 },
		{ name: 'territorial', multi: 3 },
		{ name: 'timeless', multi: 7 },
		{ name: 'unnecessarily complex', multi: 3 },
		{ name: 'unimaginative', multi: 3 },
		{ name: 'vulgar', multi: 3 },
		{ name: 'weather-changing', multi: 9 },
		{ name: 'wrong', multi: 2 },
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
		messages.every(({content, author}) => {
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
				return true;
			}

			const serialized = serializedLines.join('|');
			const match = pyramids[size][serialized];

			if (!match) {
				// console.log('NO PYRAMIDS THAT SHAPE');
				return true;
			}

			this.processPyramid(match, users, emoji, channel, memory);
			return false;
		});
	}

	processPyramid (match, users, emoji, channel, memory) {
		let {name, value} = match;
		let isCrit = false;
		let critData = null;
		if (Math.random() < .3) { // 30% crit chance
			isCrit = true;
			critData = randomItem(this.crits);
			value = value * critData.multi;
		}
		const participants = Object.entries(users).map(([id, count]) => {
			return {
				mention: `<@${id}>`,
				id: id,
				count: count
			};
		});

		const participantsMulti = Math.pow(2, participants.length - 1);
		const grats = [];

		value = value * participantsMulti;

		if (participants.length > 1) {
			grats.push(`${and(participants.map(p => p.mention))} (x${participantsMulti})`);
		} else {
			grats.push(participants[0].mention);
		}

		if (isCrit) {
			const n = ['a', 'e', 'i', 'o', 'u'].includes(critData.name.charAt(0).toLowerCase()) ? 'n' : '';
			grats.push(`built a${n} ${emoji} **${critData.name} ${name} (x${critData.multi})**`);
		} else {
			grats.push(`built a ${emoji} **${name}**`);
		}

		if (participants.length > 1) {
			if (value < 0) {
				grats.push(`, they lose ${and(participants.map(p => p.count * -value))} spam points respectively ${this.bot.emoji('KEKW')}`);
			} else {
				grats.push(`, they get ${and(participants.map(p => p.count * value))} spam points respectively ${this.bot.emoji('PogYou')}`);
			}
		} else {
			if (value < 0) {
				grats.push(`and loses ${participants[0].count * -value} spam points ${this.bot.emoji('KEKW')}`);
			} else {
				grats.push(`and gets ${participants[0].count * value} spam points ${this.bot.emoji('PogYou')}`);
			}
		}

		// let gratsMessageText;
		// if (match.message) {
		// 	gratsMessageText = match.message(participants, emoji, channel, this.bot);
		// } else {
		// 	const pogEmoji = this.bot.emoji('PogYou');
		// 	if (participants.length > 1) {
		// 		gratsMessageText = `${and(participants.map(p => p.mention))} built a **${emoji} ${match.name}**, they get ${and(participants.map(p => p.count * match.value))} spam points respectively ${pogEmoji}`;
		// 	} else {
		// 		const p = participants[0];
		// 		gratsMessageText = `${p.mention} built a **${emoji} ${match.name}** and get ${p.count * match.value} spam points ${pogEmoji}`;
		// 	}
		// }
		// channel.send(gratsMessageText);
		channel.send(grats.join(' '));

		Object.entries(users).forEach(([u, n]) => {
			const points = memory.get(['points', u]);
			if (points) {
				memory.set(['points', u], points + (n * value));
			} else {
				memory.set(['points', u], n * value);
			}
		});
	}
}
