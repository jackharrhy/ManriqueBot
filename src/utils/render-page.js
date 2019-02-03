const puppeteer = require('puppeteer');

module.exports = async (htmlString) => {
  const browser = await puppeteer.launch({
    defaultViewport: {
      height: 512,
      width: 16,
    },
  });
  const page = await browser.newPage();

  await page.setContent(htmlString);

  const selector = 'body';

  const pageInfo = await page.evaluate((selector) => {
    const element = document.querySelector(selector);
    const {x, y} = element.getBoundingClientRect();
    return {
      left: x,
      top: y,
      width: element.scrollWidth,
      height: element.scrollHeight,
      id: element.id
    };
  }, selector);

  const padding = 5;

  await page.setViewport({
    height: pageInfo.height,
    width: pageInfo.width,
  });

  const screenshot = await page.screenshot({
    clip: {
      x: pageInfo.left - padding,
      y: pageInfo.top - padding,
      width: pageInfo.width + padding * 2,
      height: pageInfo.height + padding * 2
    }
  });

  await browser.close();
  return screenshot;
};

