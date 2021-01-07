import { ChatEvent } from '@alvarocastro/discord-bot';
import { and, isEmoji } from '../utils';

const pyramids = {
	3: {
		'#|# #|#': {
			name: 'plebamid',
			value: -10,
			message (participants, emoji, channel) {
				const kekwEmoji = channel.guild.emojis.cache.find(emoji => emoji.name.toLowerCase() === 'kekw');
				let kekwText;
				if (kekwEmoji) {
					kekwText = `<:${kekwEmoji.name}:${kekwEmoji.id}>`;
				}
				if (participants.length > 1) {
					return `${and(participants.map(p => p.mention))} built a ${emoji} ${this.name}, they lose ${and(participants.map(p => p.count * -this.value))} spam points respectively ${kekwText}`;
				}
				const p = participants[0];
				return `${p.mention} built a ${emoji} ${this.name} and loses ${p.count * -this.value} spam points ${kekwText}`;
			}
		},
		'#|# # # #|#': {
			name: 'cockamid',
			value: 10
			// message () {

			// },
			// action () {

			// }
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
		}
	},
	6: {
		'# #|# #|# # # #|# # # #|# #|# #': {
			name: 'zoomed plebamid',
			value: 20
		}
	},
	7: {
		'#|# #|# # #|# # # #|# # #|# #|#': {
			name: 'tetramid',
			value: 11
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
	check ({channel}, memory) {
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
				gratsMessageText = match.message(participants, emoji, channel);
			} else {
				const pogEmoji = channel.guild.emojis.cache.find(emoji => emoji.name.toLowerCase() === 'pogyou');
				let pogText;
				if (pogEmoji) {
					pogText = `<:${pogEmoji.name}:${pogEmoji.id}>`;
				}
				if (participants.length > 1) {
					gratsMessageText = `${and(participants.map(p => p.mention))} built a ${emoji} ${match.name}, they get ${and(participants.map(p => p.count * match.value))} spam points respectively ${pogText}`;
				}
				const p = participants[0];
				gratsMessageText = `${p.mention} built a ${emoji} ${match.name} and get ${p.count * match.value} spam points ${pogText}`;
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



