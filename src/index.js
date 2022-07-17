require('dotenv').config({
  path: '../.env'
});

const { Client, Intents } = require("discord.js");
const client = new Client({ 
  intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES
  ] 
});

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.BOT_TOKEN;

// deploy commands here

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');


const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');
		await rest.put(
			// Routes.applicationGuildCommands(clientId, guildId),
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

// set up bot

client.login(process.env.BOT_TOKEN).then((token) => {
  client.user.setActivity('being talented', {
    type: 'PLAYING', 
  });
});

client.once('ready', ()=> {
  console.log(new Date() + ' Chen Bot has started!');
});

client.on("messageCreate", async message => {
  console.log(new Date() + ' Message sent: ' + message)
  if (message.mentions.users.first().id === '501077051017789451' || message.mentions.users.first().id === '232163406621179905'){
    message.channel.send('Chen is sleeping');
  }
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply('Server info.');
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});