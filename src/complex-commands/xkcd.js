const rp = require('request-promise');

const urlBase = 'https://xkcd.com/';

module.exports = async (msg, command) => {
  let xkcdInfo;

  try {
    if (command.length === 0) {
      xkcdInfo = await rp({
        uri: `${urlBase}info.0.json`,
        json: true,
      });
    } else {
      xkcdInfo = await rp({
        uri: `${urlBase}/${command}/info.0.json`,
        json: true,
      });
    }
  } catch(err) {
    msg.reply('Bad success...');
    return;
  }

  const xkcdImg = Buffer.from(await rp({
    uri: xkcdInfo.img,
    encoding: null,
  }));

  msg.reply(`${xkcdInfo.title} - ${xkcdInfo.alt}`, {
    files: [xkcdImg],
  });
}
