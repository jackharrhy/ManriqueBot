const {assert} = require('chai');

const chessFactory = require('../../src/complex-commands/chess');

const msgMock = {
  channel: {
    send: () => {},
  },
};

describe('complex-commands/chess', () => {
  it('factory should return function', async () => {
    const chess = await chessFactory();
    assert.isFunction(chess, 'should be function');

    chess(msgMock, 'foo bar');
  });
});
