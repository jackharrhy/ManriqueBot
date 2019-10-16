const rp = require('request-promise');

const chessFactory = require('./complex-commands/chess');

module.exports = async () => {
  return {
    'will I have good success?': 'yes!',
    'render math': require('./complex-commands/render-math'),
    'xkcd': require('./complex-commands/xkcd'),
    // 'play': require('./complex-commands/play'),
    // 'stop': require('./complex-commands/stop'),
    'ask Barab': require('./complex-commands/barab'),
    'tell me a joke': async (msg) => {
      const response = await rp({uri: 'https://icanhazdadjoke.com/', json: true});
      msg.channel.send(response.joke);
    },
    // 'chess': await chessFactory(),
  };
};
