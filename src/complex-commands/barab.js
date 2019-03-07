const rp = require('request-promise');

const {
  canBarab,
  barabURL,
} = require('../config');

module.exports = async (msg, command) => {
  if (!canBarab) {
    msg.reply('Barab isn\'t in today sorry!');
  }

  const splitOnCodeBlock = command.split('```');

  let source = '';

  for (let i in splitOnCodeBlock) {
    if (i % 2 === 1) {
      let sourcePiece = splitOnCodeBlock[i];
      if (sourcePiece.startsWith('verilog')) {
        source += sourcePiece.slice('verilog'.length);
      }
      else {
        source += sourcePiece;
      }
    }
  }

  let barabResponse;

  try {
    barabResponse = await rp({
      uri: `${barabURL}/`,
      method: 'POST',
      body: source,
      headers: {
        'content-type': 'text/plain',
      },
    });
  }
  catch(err) {
    console.error(err);
    msg.reply('bad success...');
    return;
  }

  const maxLengthResponses = barabResponse.match(/[\s\S]{1,1975}/g);

  for (let i in maxLengthResponses) {
    msg.channel.send('```\n' + maxLengthResponses[i] + '\n```');
  }
};
