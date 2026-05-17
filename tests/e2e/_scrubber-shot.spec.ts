import { test } from '@playwright/test'

test('scrubber screenshots — idle + hover', async ({ page }) => {
    test.setTimeout(60000)
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('http://localhost:6006/story/stories-components-stories-video-origamvideo-story-vue')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(800)
    await page.getByText('Playground').first().click({ timeout: 5000 })
    await page.waitForTimeout(2000)

    const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
    const video = sandbox.locator('[data-cy="origam-video-el"]').first()
    await video.evaluate((el: HTMLVideoElement) => new Promise<void>((res) => {
        if (el.readyState >= 1) return res()
        el.addEventListener('loadedmetadata', () => res(), { once: true })
    }))
    await video.evaluate((el: HTMLVideoElement) => { el.currentTime = 120 })
    await page.waitForTimeout(500)

    // Force controls visible
    await sandbox.locator('[data-cy="origam-video"]').first().hover()
    await page.waitForTimeout(400)

    const controls = sandbox.locator('[data-cy="origam-video-controls"]').first()
    const cbox = await controls.boundingBox()
    if (!cbox) throw new Error('no controls box')

    // Idle (just controls visible, no hover on scrubber)
    await page.mouse.move(cbox.x, cbox.y - 100)  // move cursor away from scrubber
    await page.waitForTimeout(300)
    await page.screenshot({
        path: 'tests/e2e/.results/scrubber-idle.png',
        clip: { x: cbox.x, y: cbox.y - 40, width: cbox.width, height: cbox.height + 40 }
    })
    console.log('idle saved')

    // Hover on scrubber at 60% position
    const scrubber = sandbox.locator('[data-cy="origam-video-scrubber"]').first()
    const sbox = await scrubber.boundingBox()
    if (!sbox) throw new Error('no scrubber box')
    await page.mouse.move(sbox.x + sbox.width * 0.6, sbox.y + sbox.height / 2)
    await page.waitForTimeout(400)
    await page.screenshot({
        path: 'tests/e2e/.results/scrubber-hover.png',
        clip: { x: cbox.x, y: cbox.y - 40, width: cbox.width, height: cbox.height + 40 }
    })
    console.log('hover saved')
})
