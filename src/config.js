require('dotenv').config();

const path = require('path');

module.exports = {
  projectDir: path.join(__dirname, '/../'),
  commandPrefix: process.env.COMMAND_PREFIX,
  discordToken: process.env.DISCORD_TOKEN,
  canBarab: Boolean(process.env.BARAB_ENABLED),
  barabURL: process.env.BARAB_URL,
};
