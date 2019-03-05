module.exports = async (msg, db) => {
  const userId = msg.author.id;

  const user = await db
    .get('users')
    .find({id: userId})
    .value();

  if (user === undefined) {
    await db
      .get('users')
      .push({
        id: userId,
        games: [],
        curGame: null,
      })
      .write();
    return await db
      .get('users')
      .find({id: userId})
      .value();
  } else {
    return user;
  }
};
