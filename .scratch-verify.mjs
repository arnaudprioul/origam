import { chromium } from 'playwright'
const log = (k, v) => console.log(`[${k}] ${v}`)
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 })
try {
    await page.goto('http://localhost:6006/?t=' + Date.now(), { waitUntil: 'networkidle', timeout: 25000 })
    await page.waitForTimeout(4000)
    await page.getByText('Video', { exact: true }).first().click()
    await page.waitForTimeout(400)
    await page.getByText('OrigamVideo', { exact: true }).first().click()
    await page.waitForTimeout(800)
    await page.getByText('Playground', { exact: true }).first().click()
    await page.waitForTimeout(3500)
    const frame = page.frameLocator('iframe').first()
    const root = frame.locator('.origam-video').first()
    await root.hover()
    await page.waitForTimeout(400)

    // i18n labels in controls bar (visible even while poster shows)
    const cogAria = await frame.locator('[data-cy="origam-video-config"]').first().getAttribute('aria-label')
    const muteAria = await frame.locator('[data-cy="origam-video-mute"]').first().getAttribute('aria-label')
    log('cog aria-label (i18n)', cogAria || '(none)')
    log('mute aria-label (i18n)', muteAria || '(none)')

    // Open cog → main level
    await frame.locator('[data-cy="origam-video-config"]').first().click()
    await page.waitForTimeout(500)
    const main = await frame.locator('[data-cy="origam-video-config-menu"]').first().evaluate(el => ({
        text: el.textContent?.trim().slice(0, 80),
        rows: el.querySelectorAll('.origam-video__config-row').length,
        items_in_main: el.querySelectorAll('.origam-video__config-item').length,
        speed_label: el.querySelector('.origam-video__config-row-label')?.textContent?.trim(),
        speed_value: el.querySelector('.origam-video__config-row-value')?.textContent?.trim(),
        has_arrow: !!el.querySelector('.origam-video__config-row-arrow')
    }))
    log('main menu', JSON.stringify(main))

    // Drill into speed submenu
    await frame.locator('[data-cy="origam-video-config-open-speed"]').click()
    await page.waitForTimeout(400)
    const sub = await frame.locator('[data-cy="origam-video-config-menu"]').first().evaluate(el => ({
        back_visible: !!el.querySelector('[data-cy="origam-video-config-back"]'),
        rates: Array.from(el.querySelectorAll('.origam-video__config-item')).map(b => b.textContent?.trim()).slice(0, 4)
    }))
    log('speed submenu', JSON.stringify(sub))

    // Click 1.5×
    await frame.locator('[data-cy="origam-video-config-rate-1.5"]').click()
    await page.waitForTimeout(400)
    const rate = await frame.locator('video').first().evaluate(v => v.playbackRate)
    log('video.playbackRate after 1.5x click', String(rate))

    // Re-open cog → check value updated
    await frame.locator('[data-cy="origam-video-config"]').first().click()
    await page.waitForTimeout(400)
    const after = await frame.locator('[data-cy="origam-video-config-menu"]').first().evaluate(el =>
        el.querySelector('.origam-video__config-row-value')?.textContent?.trim()
    )
    log('main row value after change', after)

    const box = await frame.locator('[data-cy="origam-video-config-menu"]').first().boundingBox()
    await page.screenshot({
        path: '/Users/arnaudprioul/Projects/origam/.scratch-menu.png',
        clip: { x: Math.max(0, box.x - 30), y: Math.max(0, box.y - 30), width: Math.min(box.width + 60, 1600), height: Math.min(box.height + 60, 1000) }
    })
    log('screenshot', '.scratch-menu.png')
} catch (e) { console.error('[error]', e.message.slice(0,200)) } finally { await browser.close() }
