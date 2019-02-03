const katex = require('katex');

const renderPage = require('../utils/render-page');

const getPageHTML = (content) => `<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/katex.min.css" integrity="sha384-9eLZqc9ds8eNjO3TmqPeYcDj8n+Qfa4nuSiGYa6DjLNcv9BtN69ZIulL9+8CqC9Y" crossorigin="anonymous">
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/katex.min.js" integrity="sha384-K3vbOmF2BtaVai+Qk37uypf7VrgBubhQreNQe9aGsz9lB63dIFiQVlJbr92dw2Lx" crossorigin="anonymous"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/contrib/auto-render.min.js" integrity="sha384-kmZOZB5ObwgQnS/DuDg6TScgOiWWBiVt0plIRkZCmE6rDZGrEOQeHM5PcHi+nyqe" crossorigin="anonymous"
      onload="renderMathInElement(document.body);"></script>
  </head>
  <body>
    ${content}
  </body>
</html>
`;

module.exports = async (msg, command) => {
  const mathElementString = katex.renderToString(command, {
    throwOnError: false,
    displayMode: true,
  });
  msg.reply('', {
    files: [await renderPage(getPageHTML(mathElementString))],
  });
};
