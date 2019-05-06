const ytdl = require('ytdl-core-discord');

module.exports = async (msg, command) => {
  if (msg.member.voiceChannel) {
    try {
      const connection = await msg.member.voiceChannel.join();
      connection.playOpusStream(await ytdl(command, {
        type: 'opus'
      }));
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
