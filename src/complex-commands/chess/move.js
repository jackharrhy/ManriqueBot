const {Chess, Action, Piece} = require('bchess');

const displayGame = require('./displayGame');

module.exports = async (msg, command, db) => {
  const userId = msg.author.id;
  const user = await db
    .get('users')
    .find({id: userId})
    .value();

  console.log('user', user);

  if (user.curGame === null) {
    msg.channel.send(`You're not in a game!`);
    return;
  }

  const request = command.split(' ');

  if (request.length <= 0 && request.length < 2) {
    msg.channel.send('Move command must contain two arguments');
    return;
  }
  if (request[0].length !== 2) {
    msg.channel.send(`${request[0]} should be two characters only`);
    return;
  }
  if (request[1].length !== 2) {
    msg.channel.send(`${request[0]} should be two characters only`);
    return;
  }

  const game = await db
    .get('games')
    .find({id: user.curGame})
    .value();

  const chess = new Chess({
    fen: game.fen,
  });

  const [from, to] = request;
  const action = chess.move({
    from: from.toLowerCase(),
    to: to.toLowerCase(),
  });

  await db.get('games')
    .find({id: game.id})
    .assign({
      fen: chess.fen(),
      turn: game.turn === 'white' ? 'black' : 'white',
    })
    .write()
  ;

  displayGame({chess, msg, game, action});
};
