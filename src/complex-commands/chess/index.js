const lowdb = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

const adapter = new FileAsync('data/chess.db.json');;

module.exports = async () => {
  const subCommands = {
    'create game': await require('./createGame'),
    'fen': await require('./fen'),
    'move': await require('./move'),
  };

  const db = await lowdb(adapter);
  db.defaults({
    games: [],
    users: [],
  }).write();

  return async (msg, command) => {
    for (key in subCommands) {
      if (command.startsWith(key)) {
        await subCommands[key](msg, command.substring(key.length + 1), db);
      }
    }
  };
};
