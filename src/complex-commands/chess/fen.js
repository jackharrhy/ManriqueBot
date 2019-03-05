module.exports = async (msg, command, db) => {
  const gameId = command;

  // TODO VALIDATION

  const game = await db
    .get('games')
    .find({id: gameId})
    .value();

  if (game === undefined) {
    msg.channel.send(`Game ID "${gameId}" doesn't seem to exist`);
  }

  msg.channel.send(`ID: ${gameId}\n\`\`\`${game.fen}\`\`\``);
};
