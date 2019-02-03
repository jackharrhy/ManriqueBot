const {projectDir} = require('../config');

module.exports = async (msg, command) => {
  if (msg.member.voiceChannel) {
    msg.member.voiceChannel.join()
      .then((connection) => {
        const dispatcher = connection.playFile(`${projectDir}sound/clip.mp3`);
      })
      .catch(() => {
        msg.reply('Bad success...');
      });
  } else {
    msg.reply('You need to join a voice channel first');
  }
};
