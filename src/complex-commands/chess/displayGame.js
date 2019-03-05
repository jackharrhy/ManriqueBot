const {RichEmbed} = require('discord.js');

const bar = '\u2500'.repeat(14);
const spacer = '\u2009';
const fullWidth = {
  a: '\u0041',
  b: '\u0042',
  c: '\u0043',
  d: '\u0044',
  e: '\u0045',
  f: '\u0046',
  g: '\u0047',
  h: '\u0048',
};
let colLabel = '  ';
for (const charKey in fullWidth) {
  colLabel += `${fullWidth[charKey]}${spacer}`;
}

const pieceMap = {
  'R': '\u2656',
  'N': '\u2658',
  'B': '\u2657',
  'Q': '\u2655',
  'K': '\u2654',
  'P': '\u2659',
  'r': '\u265C',
  'n': '\u265F',
  'b': '\u265D',
  'q': '\u265B',
  'k': '\u265A',
  'p': '\u265F',
};

module.exports = async ({chess, game, msg, action}) => {
  const rows = chess.fen().split('/');

  let formatted = '';

  for (let rowKey in rows) {
    const row = rows[rowKey];
    let fancyRow = '';
    for (const charKey in row) {
      const char = row[charKey];
      if (pieceMap[char] !== undefined) {
        fancyRow += `${pieceMap[char]}${spacer}`;
      }
      const charParsed = parseInt(char);
      if (charParsed !== NaN) {
        fancyRow += ` ${spacer}`.repeat(charParsed);
      }
    }
    formatted += `${rowKey * -1 + 8} ${fancyRow}\n`;
  }
  formatted += `\n${colLabel}`;

  const embed = new RichEmbed()
    .setTitle(`Game: ${game.id}`)
    .setColor(0xFF0000)
    .setDescription(`NEXT TURN: ${game.turn} ACTION: ${action}\n${bar}\n\`\`\`${formatted}\`\`\``);

  msg.channel.send(embed);
};
