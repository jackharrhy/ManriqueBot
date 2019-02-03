const rp = require('request-promise');

module.exports = {
  'will I have good success?': 'Yes!',
  'render math': require('./complex-commands/render-math'),
  'xkcd': require('./complex-commands/xkcd'),
  'join my channel': require('./complex-commands/join-channel'),
  'tell me a joke': async (msg) => {
    const response = await rp({uri: 'https://icanhazdadjoke.com/', json: true});
    msg.channel.send(response.joke);
  }
};
