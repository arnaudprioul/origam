import { chromium } from 'playwright'
const log = (k, v) => console.log(`[${k}] ${v}`)

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 2 })
page.on('pageerror', err => log('pageerror', err.message.slice(0, 250)))

try {
    await page.goto('http://localhost:6006/', { waitUntil: 'networkidle', timeout: 20000 })
    await page.waitForTimeout(1200)
    await page.getByText('SnackbarStack', { exact: true }).first().click()
    await page.waitForTimeout(300)
    await page.getByText('OrigamSnackbarStack', { exact: true }).first().click()
    await page.waitForTimeout(800)
    await page.getByText('Prop — intent', { exact: true }).first().click()
    await page.waitForTimeout(1500)

    const frame = page.frameLocator('iframe').first()
    await frame.locator('body').waitFor({ state: 'attached', timeout: 6000 })

    // Push toasts by clicking the 4 trigger buttons
    for (const label of ['Success', 'Warning', 'Danger', 'Info']) {
        const btn = frame.locator('button').filter({ hasText: label }).first()
        if (await btn.count() > 0) {
            await btn.click()
            await page.waitForTimeout(250)
            log('clicked', label)
        }
    }
    await page.waitForTimeout(500)

    // Now inspect the rendered SnackbarItems
    const items = await frame.locator('.origam-snackbar-item').evaluateAll(els => els.map(el => {
        const cs = getComputedStyle(el)
        return {
            cls: el.className,
            bg: cs.backgroundColor,
            color: cs.color,
            visible: cs.visibility,
            opacity: cs.opacity,
            text: (el.textContent || '').trim().slice(0, 60)
        }
    }))
    log('snackbar-item count', String(items.length))
    items.forEach((it, i) => log(`item[${i}]`, JSON.stringify(it)))

    await page.screenshot({ path: '/Users/arnaudprioul/Projects/origam/.scratch-snackbar-stack-loaded.png', fullPage: false })
    log('screenshot', '.scratch-snackbar-stack-loaded.png')
} catch (e) {
    console.error('[error]', e.message.slice(0, 250))
} finally {
    await browser.close()
}
