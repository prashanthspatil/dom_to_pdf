const DIV_ID = '*'; // enter div id

(async() => {

const browser = await puppeteer.launch();

const page = await browser.newPage();
await page.setViewport({width: 1200, height: 800, deviceScaleFactor: 2});
await page.goto(process.env.URL);

const overlay = await page.$(DIV_ID);
const screenshot = await overlay.screenshot({path: 'document.png'});

await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          html, body {
            height: 100vh;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #fafafa;
          }
          img {
            max-width: 60%;
            box-shadow: 3px 3px 6px #eee;
            border-radius: 6px;
          }
        </style>
      </head>
      <body>
        <img src="data:img/png;base64,${screenshot.toString('base64')}">
      </body>
    </html>
  `);

await page.pdf({path: 'document.pdf', printBackground: true});

await browser.close();

})();