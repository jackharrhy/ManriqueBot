const rp = require('request-promise');

const xkcdUrlBase = 'https://xkcd.com/';

module.exports = async () => {
  return {
    'will I have good success?': 'yes!',
    'render math': require('./commands/render-math'),
    'xkcd': async (msg, command) => {
      let uri = command.length === 0 ? `${urlBase}info.0.json` : `${urlBase}/${command}/info.0.json`;
      const xkcdInfo = await rp({uri, json: true});

      const xkcdImg = Buffer.from(await rp({
        uri: xkcdInfo.img,
        encoding: null,
      }));

      msg.channel.send(`${xkcdInfo.title} - ${xkcdInfo.alt}`, {files: [xkcdImg]});
    },
    'ask Barab': require('./commands/barab'),
    'tell me a joke': async (msg) => {
      const response = await rp({uri: 'https://icanhazdadjoke.com/', json: true});
      msg.channel.send(response.joke);
    },
  };
};
