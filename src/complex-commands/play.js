const ytdl = require('ytdl-core');

const {projectDir} = require('../config');
const streamOptions = {seek: 0, volume: 1};

module.exports = async (msg, command) => {
  if (msg.member.voiceChannel) {
    try {
      const connection = await msg.member.voiceChannel.join();
      const stream = ytdl(command, {filter : 'audioonly'});
      const dispatcher = connection.playStream(stream, streamOptions);
    }
    catch(err) {
      console.log(err);
      if (msg.member.voiceChannel) {
        msg.member.voiceChannel.leave();
      }
      msg.reply('bad success...');
    }
  } else {
    msg.reply(`you're not in a channel my friend.`);
  }
};
