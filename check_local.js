const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ 
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  const page = await browser.newPage();
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', error => {
    errors.push(error.message);
  });
  
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
  
  // Wait a bit for the error
  await new Promise(r => setTimeout(r, 3000));
  
  console.log("ERRORS:", JSON.stringify(errors, null, 2));
  await browser.close();
})();
