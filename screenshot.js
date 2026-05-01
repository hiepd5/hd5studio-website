const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  const filePath = path.resolve(__dirname, 'index.html').split('\\').join('/');
  await page.goto('file:///' + filePath, { waitUntil: 'networkidle0', timeout: 30000 });

  // Force all reveal elements visible (simulate scroll through entire page)
  await page.evaluate(() => {
    document.querySelectorAll('.reveal, .reveal-scale, .rx, .rs').forEach(el => {
      el.classList.add('visible', 'on');
    });
  });

  // Scroll through the entire page to trigger any lazy content
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < totalHeight; y += 600) {
    await page.evaluate(scrollY => window.scrollTo(0, scrollY), y);
    await new Promise(r => setTimeout(r, 80));
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({ path: path.join(__dirname, 'screenshot_v1.png'), fullPage: true });
  console.log('Desktop screenshot saved.');

  // Mobile
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.reload({ waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    document.querySelectorAll('.reveal, .reveal-scale, .rx, .rs').forEach(el => el.classList.add('visible', 'on'));
  });
  const mHeight = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < mHeight; y += 600) {
    await page.evaluate(scrollY => window.scrollTo(0, scrollY), y);
    await new Promise(r => setTimeout(r, 60));
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(__dirname, 'screenshot_v1_mobile.png'), fullPage: true });
  console.log('Mobile screenshot saved.');

  await browser.close();
})().catch(e => { console.error(e.message); process.exit(1); });
