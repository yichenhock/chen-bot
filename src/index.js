require('dotenv').config({
  path: '../.env'
});

//const discord = require('discord.js');

const { Client, Intents } = require("discord.js");
const client = new Client({ 
  intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES
  ] 
});

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

