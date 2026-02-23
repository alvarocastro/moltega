import 'dotenv/config';

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client, Collection, GatewayIntentBits } from 'discord.js';

const token = process.env.DISCORD_TOKEN;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

// // // // // // // // // // // // // // // // // // // // // // // // //
// Setup DB

const databaseUri = process.env.DATABASE_URI;

import { createKeyv } from '@keyv/sqlite';
const db = createKeyv({
	uri: databaseUri,
	wal: true,
});

client.db = db;

// await db.set('fooexp.ew', Date.now(), 10000);
// console.log('>>>>', await db.get('fooexp.ew'));

// // // // // // // // // // // // // // // // // // // // // // // // //
// Load commands
client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const { default: command } = await import(filePath);

		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			if (command.dev && process.env.NODE_ENV !== 'development') {
				console.log(`[INFO] Skipping dev command ${command.data.name}`);
			} else {
				client.commands.set(command.data.name, command);
			}
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// // // // // // // // // // // // // // // // // // // // // // // // //
// Load events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const { default: event } = await import(filePath);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Log in to Discord with your client's token
client.login(token);
