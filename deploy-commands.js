import 'dotenv/config';

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { REST, Routes } from 'discord.js';

const IS_DEV = process.env.NODE_ENV === 'development';
const token = process.env.DISCORD_TOKEN;
const clientId = process.env.APP_ID;
const guildId = process.env.DEV_GUILD_ID;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
	const commands = [];

	// Grab all the command folders from the commands directory you created earlier
	const foldersPath = path.join(__dirname, 'commands');
	const commandFolders = fs.readdirSync(foldersPath);

	for (const folder of commandFolders) {
		// Grab all the command files from the commands directory you created earlier
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

		// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const { default: command } = await import(filePath);
			if ('data' in command && 'execute' in command) {
				if (command.dev && process.env.NODE_ENV !== 'development') {
					console.log(`[INFO] Skipping dev command ${command.data.name}`);
				} else {
					commands.push(command.data.toJSON());
				}
			} else {
				console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
			}
		}
	}

	// Construct and prepare an instance of the REST module
	const rest = new REST().setToken(token);

	// and deploy your commands!
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		let data;
		// The put method is used to fully refresh all commands in the guild with the current set
		if (IS_DEV) {
			data = await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
		} else {
			data = await rest.put(Routes.applicationCommands(clientId), { body: commands });
		}
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
