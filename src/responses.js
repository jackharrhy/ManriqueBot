const rp = require('request-promise');

module.exports = {
  'will I have good success?': 'yes!',
  'render math': require('./complex-commands/render-math'),
  'xkcd': require('./complex-commands/xkcd'),
  'play': require('./complex-commands/play'),
  'tell me a joke': async (msg) => {
    const response = await rp({uri: 'https://icanhazdadjoke.com/', json: true});
    msg.channel.send(response.joke);
  }
};
