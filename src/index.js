const Discord = require('discord.js');
const config = require('./config');
const loggerFactory = require('./logger');
const responses = require('./responses');

const prefix = config.commandPrefix;
const client = new Discord.Client();
const logger = loggerFactory();

client.on('ready', () => {
  logger.info('loggedin', client.user.tag);
});

client.on('message', (msg) => {
  const content = msg.content;
  if (content.startsWith(prefix)) {
    logger.info('message', msg.author.username, msg.author.id, content);
    const command = content.substring(prefix.length + 1);
    if (typeof responses[command] === 'string') {
      msg.reply(responses[command]);
    }
  }
});

client.login(config.discordToken);
