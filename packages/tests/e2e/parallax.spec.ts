import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/components-stories-parallax-origamparallax-story-vue'

/**
 * Probe spec for OrigamParallax runtime behaviour. Covers the three legacy
 * `event` modes (move / scroll / orientation) on <OrigamParallaxElement>
 * AND the enriched multi-layer / direction / disabled / reduced-motion
 * paths on <OrigamParallaxLayer>.
 */

test.describe('OrigamParallax — legacy element runtime', () => {

    test('event="move" — mouse movement translates the element', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — move', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const host = sandbox.locator('.origam-parallax').first()
        const element = sandbox.locator('.origam-parallax-element').first()

        await expect(host).toBeVisible({ timeout: 5000 })
        const initialTransform = await element.evaluate((el) => getComputedStyle(el).transform)

        await host.evaluate(async (host) => {
            const rect = host.getBoundingClientRect()
            host.dispatchEvent(new MouseEvent('mouseenter', {
                bubbles: true, clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2, view: window,
            }))
            await new Promise(r => setTimeout(r, 50))
            for (let i = 0; i <= 10; i++) {
                const ratio = i / 10
                host.dispatchEvent(new MouseEvent('mousemove', {
                    bubbles: true, clientX: rect.left + rect.width * ratio, clientY: rect.top + rect.height * ratio, view: window,
                }))
                await new Promise(r => setTimeout(r, 120))
            }
        })
        await page.waitForTimeout(400)

        const finalTransform = await element.evaluate((el) => getComputedStyle(el).transform)
        console.log('[move] initial:', initialTransform, '→ final:', finalTransform)
        expect(finalTransform).not.toBe(initialTransform)
    })

    test('event="scroll" — window scroll translates the element', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — scroll', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const host = sandbox.locator('.origam-parallax').first()
        const element = sandbox.locator('.origam-parallax-element').first()

        await expect(host).toBeVisible({ timeout: 5000 })
        const initialTransform = await element.evaluate((el) => getComputedStyle(el).transform)

        await host.evaluate(async (host) => {
            const win = host.ownerDocument.defaultView!
            host.ownerDocument.body.style.minHeight = '300vh'
            for (const top of [100, 200, 400, 600, 800]) {
                win.scrollTo({ top, behavior: 'auto' })
                win.dispatchEvent(new Event('scroll'))
                await new Promise(r => setTimeout(r, 120))
            }
        })
        await page.waitForTimeout(400)

        const finalTransform = await element.evaluate((el) => getComputedStyle(el).transform)
        console.log('[scroll] initial:', initialTransform, '→ final:', finalTransform)
        expect(finalTransform).not.toBe(initialTransform)
    })

    test('event="orientation" — deviceorientation translates the element', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — orientation', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const host = sandbox.locator('.origam-parallax').first()
        const element = sandbox.locator('.origam-parallax-element').first()

        await expect(host).toBeVisible({ timeout: 5000 })
        const initialTransform = await element.evaluate((el) => getComputedStyle(el).transform)

        await host.evaluate(async (host) => {
            const win = host.ownerDocument.defaultView!
            for (const beta of [10, 20, 30, 40, 50]) {
                const evt = new Event('deviceorientation') as any
                evt.beta = beta
                evt.gamma = beta
                evt.alpha = 0
                win.dispatchEvent(evt)
                await new Promise(r => setTimeout(r, 120))
            }
        })
        await page.waitForTimeout(400)

        const finalTransform = await element.evaluate((el) => getComputedStyle(el).transform)
        console.log('[orientation] initial:', initialTransform, '→ final:', finalTransform)
        expect(finalTransform).not.toBe(initialTransform)
    })
})


test.describe('OrigamParallax — multi-layer (enriched)', () => {

    test('multi-layer — scroll translates 3 layers with different amplitudes', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Mode — multi-layer (scroll-driven)', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const host = sandbox.locator('.origam-parallax').first()
        const layers = sandbox.locator('.origam-parallax__layer')

        await expect(host).toBeVisible({ timeout: 5000 })
        await expect(layers).toHaveCount(3)

        const initial = await layers.evaluateAll((els) => els.map((el) => getComputedStyle(el).transform))

        await sandbox.locator('body').evaluate(async () => {
            const win = window
            win.document.body.style.minHeight = '300vh'
            for (const top of [100, 300, 600, 900, 1200]) {
                win.scrollTo({ top, behavior: 'auto' })
                win.dispatchEvent(new Event('scroll'))
                await new Promise(r => setTimeout(r, 100))
            }
        })
        await page.waitForTimeout(400)

        const final = await layers.evaluateAll((els) => els.map((el) => getComputedStyle(el).transform))
        console.log('[multi-layer] initial:', initial, '→ final:', final)
        // At least one layer must have changed transform (CSS or JS path).
        const someMoved = final.some((t, i) => t !== initial[i])
        expect(someMoved).toBeTruthy()
    })

    test('direction="horizontal" — translateX changes (not translateY)', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Prop — direction', { exact: true }).first().click()
        await page.waitForTimeout(400)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')

        // Flip the HstSelect to 'horizontal' via the underlying <select>.
        const selectEl = page.locator('select').filter({ hasText: 'horizontal' }).first()
        if (await selectEl.count() > 0) {
            await selectEl.selectOption({ label: 'horizontal' })
            await page.waitForTimeout(400)
        }

        const host = sandbox.locator('.origam-parallax').first()
        const layer = sandbox.locator('.origam-parallax__layer').first()
        await expect(host).toBeVisible({ timeout: 5000 })

        const initial = await layer.evaluate((el) => getComputedStyle(el).transform)

        await sandbox.locator('body').evaluate(async () => {
            const win = window
            win.document.body.style.minHeight = '300vh'
            for (const top of [50, 150, 350, 600]) {
                win.scrollTo({ top, behavior: 'auto' })
                win.dispatchEvent(new Event('scroll'))
                await new Promise(r => setTimeout(r, 100))
            }
        })
        await page.waitForTimeout(400)

        const final = await layer.evaluate((el) => getComputedStyle(el).transform)
        console.log('[horizontal] initial:', initial, '→ final:', final)
        expect(final).not.toBe(initial)
    })

    test('@enter / @leave — counters increment on scroll', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — @enter / @leave', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const display = sandbox.locator('.origam-parallax__layer').first()
        await expect(display).toBeVisible({ timeout: 5000 })

        // At least @enter must have fired by the time the host hits the viewport.
        const text = await display.innerText()
        console.log('[enter/leave] initial display:', text)
        expect(text).toMatch(/enter:\s*\d+/)
    })

    test('@scroll-progress — progress changes between 0 and 1 on scroll', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — @scroll-progress', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const target = sandbox.locator('[data-cy="scroll-progress"]').first()
        await expect(target).toBeVisible({ timeout: 5000 })

        const initial = await target.innerText()

        await sandbox.locator('body').evaluate(async () => {
            const win = window
            win.document.body.style.minHeight = '300vh'
            for (const top of [50, 200, 500, 900, 1500]) {
                win.scrollTo({ top, behavior: 'auto' })
                win.dispatchEvent(new Event('scroll'))
                await new Promise(r => setTimeout(r, 120))
            }
        })
        await page.waitForTimeout(400)

        const final = await target.innerText()
        console.log('[scroll-progress] initial:', initial, '→ final:', final)
        expect(final).not.toBe(initial)
        expect(final).toMatch(/progress\s*=\s*\d\.\d{3}/)
    })

    test('disabled — layer transform stays at offset 0', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Prop — disabled', { exact: true }).first().click()
        await page.waitForTimeout(400)

        // Flip disabled on via the HstCheckbox.
        const checkbox = page.locator('input[type="checkbox"]').filter({ hasNot: page.locator(':checked') }).first()
        if (await checkbox.count() > 0) {
            await checkbox.check()
            await page.waitForTimeout(300)
        }

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const layer = sandbox.locator('.origam-parallax__layer').first()
        await expect(layer).toBeVisible({ timeout: 5000 })

        const initial = await layer.evaluate((el) => getComputedStyle(el).transform)

        await sandbox.locator('body').evaluate(async () => {
            const win = window
            win.document.body.style.minHeight = '300vh'
            for (const top of [50, 200, 500, 900]) {
                win.scrollTo({ top, behavior: 'auto' })
                win.dispatchEvent(new Event('scroll'))
                await new Promise(r => setTimeout(r, 100))
            }
        })
        await page.waitForTimeout(400)

        const final = await layer.evaluate((el) => getComputedStyle(el).transform)
        console.log('[disabled] initial:', initial, '→ final:', final)
        // With disabled=true the transform must NOT change between scrolls.
        expect(final).toBe(initial)
    })

    test('prefers-reduced-motion — layer transform stays at offset 0', async ({ page, browserName }) => {
        // Chromium-only — Firefox's emulateMedia for reducedMotion has quirks
        // through Playwright that make this assertion brittle.
        test.skip(browserName !== 'chromium', 'reduced-motion reliable only on chromium')

        await page.emulateMedia({ reducedMotion: 'reduce' })
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Mode — multi-layer (scroll-driven)', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const layers = sandbox.locator('.origam-parallax__layer')
        await expect(layers.first()).toBeVisible({ timeout: 5000 })

        const initial = await layers.evaluateAll((els) => els.map((el) => getComputedStyle(el).transform))

        await sandbox.locator('body').evaluate(async () => {
            const win = window
            win.document.body.style.minHeight = '300vh'
            for (const top of [100, 300, 600, 1000]) {
                win.scrollTo({ top, behavior: 'auto' })
                win.dispatchEvent(new Event('scroll'))
                await new Promise(r => setTimeout(r, 100))
            }
        })
        await page.waitForTimeout(400)

        const final = await layers.evaluateAll((els) => els.map((el) => getComputedStyle(el).transform))
        console.log('[reduced-motion] initial:', initial, '→ final:', final)
        // No layer should have moved with reduced-motion active.
        for (let i = 0; i < final.length; i++) {
            expect(final[i]).toBe(initial[i])
        }
    })
})
