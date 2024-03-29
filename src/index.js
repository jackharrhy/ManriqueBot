const Discord = require('discord.js');
const {
  commandPrefix,
  discordToken,
}= require('./config');
const logger = require('./logger');

const client = new Discord.Client();

(async () => {
  const responses = await require('./responses')();

  client.on('error', console.error);

  client.on('ready', async () => {
    logger.info(`loggedin: ${client.user.tag}`);
  });

  client.on('message', async (msg) => {
    const content = msg.content;
    if (content.startsWith(commandPrefix)) {
      logger.info(`message: ${msg.author.username} - ${msg.author.id} - ${content}`);

      const command = content.substring(commandPrefix.length + 1);

      if (typeof responses[command] === 'string') {
        msg.reply(responses[command]);
        return;
      }

      for (key in responses) {
        if (command.startsWith(key)) {
          try {
            await responses[key](msg, command.substring(key.length + 1));
          }
          catch(err) {
            const {message, stack} = err;
            logger.error(`${message}`);
            console.error(stack);
            try {
              await msg.reply(`${message}\`\`\`${stack}\`\`\``);
            }
            catch {
              await msg.reply(`${message}\`\`\`${stack.substring(0,1750)}\n...\`\`\``);
            }
          }
          return;
        }
      }

      msg.reply('Unknown command my friend');
    }
  });

  client.login(discordToken);
})();
