const {Chess, Action, Piece} = require('bchess');
const shortid = require('shortid');

const grabUser = require('./grabUser');

module.exports = async (msg, command, db) => {
  const user = await grabUser(msg, db);

  if (user.curGame !== null) {
    msg.channel.send(`You're already playing a game! (${user.curGame})`);
    return;
  }

  const chess = new Chess();
  const gameId = shortid.generate();

  const isWhite = Math.random() >= 0.5;

  await db
    .get('games')
    .push({
      id: gameId,
      fen: chess.fen(),
      turn: Math.random() >= 0.5 ? 'white' : 'black',
      white: isWhite ? 'white' : null,
      black: isWhite ? null : 'black',
    })
    .write()
  ;

  user.games.push(gameId);

  await db.get('users')
    .find({id: user.id})
    .assign({
      games: user.games,
      curGame: gameId,
    })
    .write()
  ;

  msg.channel.send(`New game: ${gameId}`);
};
