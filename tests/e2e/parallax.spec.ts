import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-parallax-origamparallax-story-vue'

/**
 * Probe spec for OrigamParallax runtime behaviour. Exercises the three
 * `event` modes via dedicated Variants (Event — Move / Event — Scroll /
 * Event — Orientation) so we don't have to fight the Histoire HstSelect
 * dropdown to switch modes at runtime.
 */

test.describe('OrigamParallax runtime', () => {

    test('event="move" — mouse movement translates the element', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Event — Move', { exact: true }).first().click()
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
        await page.getByText('Event — Scroll', { exact: true }).first().click()
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
        await page.getByText('Event — Orientation', { exact: true }).first().click()
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
