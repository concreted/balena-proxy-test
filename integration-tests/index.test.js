const assert = require('assert')
const puppeteer = require('puppeteer')

let browser
let page

before(async() => {
  const args = [
    // Required for Docker version of Puppeteer
    '--no-sandbox',
    '--disable-setuid-sandbox',
    // This will write shared memory files into /tmp instead of /dev/shm,
    // because Docker’s default for /dev/shm is 64MB
    '--disable-dev-shm-usage',
  ]
  if (process.env.DISABLE_PROXY !== 'true') {
    args.push('--proxy-server=funes:3128')
    args.push('--disable-http-cache')
    args.push('--ignore-certificate-errors')
  }
  browser = await puppeteer.launch({
    args,
  })

  const browserVersion = await browser.version()
  console.log(`Started ${browserVersion}`)
})

beforeEach(async() => {
  page = await browser.newPage()
})

afterEach(async() => {
  await page.close()
})

after(async() => {
  await browser.close()
})

describe('App', () => {
  it('renders', async() => {
    const url = process.env.TEST_URL ? process.env.TEST_URL : 'https://webglsamples.org/aquarium/aquarium.html'
    const response = await page.goto(url)
    assert(response.ok())
    await page.screenshot({ path: `/screenshots/result.png` })
  })
})