const { url } = require('../jest-puppeteer.config');

describe('e2e', () => {
  beforeEach(async () => {
    await page.goto(url);
  });

  // `jest-puppeteer` offers a handful of custom matchers like `toMatchElement`.
  it('should have a link with "Learn React" text inside', async () => {
    await expect(page).toMatchElement('.App-link', { text: 'Learn React' });
  });

  // You can also use all the Puppeteer page methods and Jest built-in assertions.
  it('should have the page title "cra-jest-puppeteer-example"', async () => {
    const title = await page.title();
    expect(title).toEqual('cra-jest-puppeteer-example');
  });
});
