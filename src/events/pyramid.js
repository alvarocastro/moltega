import { ChatEvent } from '@diamondbot/core';
import { and, isEmoji } from '../utils';

const pyramids = {
	3: {
		'#|# #|#': {
			name: 'plebamid',
			value: -10,
			message (participants, emoji, channel, bot) {
				const kekwEmoji = bot.emoji('KEKW');
				if (participants.length > 1) {
					return `${and(participants.map(p => p.mention))} built a ${emoji} ${this.name}, they lose ${and(participants.map(p => p.count * -this.value))} spam points respectively ${kekwEmoji}`;
				}
				const p = participants[0];
				return `${p.mention} built a ${emoji} ${this.name} and loses ${p.count * -this.value} spam points ${kekwEmoji}`;
			}
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
		'# # #|#|# #|#|#': {
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
	constructor () {
		super('Pyramids');
	}

	check () {
		return true;
	}

	async action ({channel}, memory) {
		const messages = await channel.messages.fetch({ limit: 19 });

		let emoji;
		let size = 0;
		const serializedLines = [];
		const users = {};
		messages.every(({content, author}) => {
			size++;

			if (author.bot) {
				// console.log('ESCAPE ruined by bot')
				return false;
			}

			const words = content.split(' ');

			if (!emoji && isEmoji(words[0])) {
				emoji = words[0];
				// console.log('>>>> emoji detected:', emoji);
			}

			if (!emoji) {
				// console.log('ESCAPE no emoji');
				return false;
			}

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

			const participants = Object.entries(users).map(([id, count]) => {
				return {
					mention: `<@${id}>`,
					id: id,
					count: count
				};
			});
			let gratsMessageText;
			if (match.message) {
				gratsMessageText = match.message(participants, emoji, channel, this.bot);
			} else {
				const pogEmoji = this.bot.emoji('PogYou');
				if (participants.length > 1) {
					gratsMessageText = `${and(participants.map(p => p.mention))} built a ${emoji} ${match.name}, they get ${and(participants.map(p => p.count * match.value))} spam points respectively ${pogEmoji}`;
				} else {
					const p = participants[0];
					gratsMessageText = `${p.mention} built a ${emoji} ${match.name} and get ${p.count * match.value} spam points ${pogEmoji}`;
				}
			}
			channel.send(gratsMessageText);

			Object.entries(users).forEach(([u, n]) => {
				const points = memory.get(['points', u]);
				if (points) {
					memory.set(['points', u], points + (n * match.value));
				} else {
					memory.set(['points', u], n * match.value);
				}
			});
			return false;
		});
	}
}
