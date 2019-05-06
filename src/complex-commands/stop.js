module.exports = async (msg, command) => {
  if (msg.member.voiceChannel) {
    if (msg.member.voiceChannel.connection) {
      await msg.member.voiceChannel.leave();
    }
    else {
      msg.reply(`I'm am not in your channel my friend.`);
    }
  } else {
    msg.reply(`you're not in a channel my friend.`);
  }
};
