import { chromium } from 'playwright'
const log = (k, v) => console.log(`[${k}] ${v}`)

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1600, height: 1200 } })
page.on('pageerror', err => log('pageerror', `${err.message.slice(0, 150)} | stack: ${(err.stack || '').slice(0, 600)}`))

try {
    await page.goto('http://localhost:6006/', { waitUntil: 'networkidle', timeout: 25000 })
    await page.waitForTimeout(2000)
    await page.getByText('SnackbarStack', { exact: true }).first().scrollIntoViewIfNeeded()
    await page.getByText('SnackbarStack', { exact: true }).first().click()
    await page.waitForTimeout(300)
    await page.getByText('OrigamSnackbarStack', { exact: true }).first().click()
    await page.waitForTimeout(800)
    await page.getByText('Prop — intent', { exact: true }).first().click()
    await page.waitForTimeout(1500)

    const frame = page.frameLocator('iframe').first()
    const btn = frame.locator('button').filter({ hasText: /Success/ }).first()
    await btn.click()
    await page.waitForTimeout(800)
} catch (e) {
    console.error('[error]', e.message.slice(0, 200))
} finally {
    await browser.close()
}
