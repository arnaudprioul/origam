import { expect, test, type Page } from '@playwright/test'

/**
 * OrigamWatermark — runtime probes for the SVG data-URL pattern,
 * opacity / angle propagation, anti-tamper re-injection, and the
 * pointer-events: none contract that keeps the wrapped content
 * clickable through the overlay.
 *
 * The watermark is rendered as an absolutely-positioned `__layer`
 * sibling of the slot content. We assert on the `background-image`
 * inline style — it is the canonical surface where every prop
 * resolves visible behaviour.
 */

const STORY = '/story/components-stories-watermark-origamwatermark-story-vue'

const sandboxOf = (page: Page) =>
    page.frameLocator('iframe[src*="__sandbox"]')

const openVariant = async (page: Page, title: string) => {
    await page.goto(STORY)
    await page.waitForLoadState('networkidle')
    await page.getByText(title, { exact: true }).first().click()
    await page.waitForTimeout(400)
}

const getDecodedBackground = async (locator: ReturnType<Page['locator']>): Promise<string> => {
    const handle = await locator.elementHandle()
    if (!handle) throw new Error('could not resolve element handle for layer')
    const raw = await handle.evaluate((node) => (node as HTMLElement).style.backgroundImage)
    // The browser may return the url() value with the SVG partially decoded (e.g. ")" restored
    // inside rotate() transforms). The lazy (.+?) regex stops prematurely at the first ")"
    // it encounters inside the SVG body. Using a greedy (.+) with a required closing double-quote
    // ensures we capture everything up to the actual end of the quoted URL string.
    const match = raw.match(/url\("data:image\/svg\+xml,(.+)"\)/)
    if (!match) throw new Error(`unexpected backgroundImage shape: ${raw}`)
    return decodeURIComponent(match[1])
}

test.describe('OrigamWatermark — Default', () => {
    test('renders a layer with an SVG data-URL containing the text glyph', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="watermark-playground-host"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const layer = host.locator('[data-cy="origam-watermark-layer"]').first()
        await expect(layer).toBeVisible()

        const svg = await getDecodedBackground(layer)
        expect(svg).toContain('<text')
        expect(svg).toContain('>CONFIDENTIAL<')
    })

    test('pointerEvents=none lets clicks pass through to the wrapped content', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)

        const button = sandbox.locator('[data-cy="watermark-playground-button"]').first()
        await expect(button).toBeVisible()

        // If pointer-events were intercepted by the layer, this would
        // either fail to dispatch or time out. Either way Playwright
        // reports a failure — the assertion is that the click completes.
        await button.click()
    })

    test('layer is marked aria-hidden so screen readers ignore the watermark', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)

        const layer = sandbox.locator('[data-cy="origam-watermark-layer"]').first()
        await expect(layer).toHaveAttribute('aria-hidden', 'true')
    })
})

test.describe('OrigamWatermark — Prop opacity', () => {
    test('opacity=0.05 / 0.1 / 0.2 each emit a distinct SVG opacity value', async ({ page }) => {
        await openVariant(page, 'Prop — opacity (0.05 / 0.1 / 0.2)')
        const sandbox = sandboxOf(page)

        for (const value of [0.05, 0.1, 0.2]) {
            const host = sandbox.locator(`[data-cy="watermark-opacity-${value}"]`).first()
            await expect(host).toBeVisible({ timeout: 8000 })
            const layer = host.locator('[data-cy="origam-watermark-layer"]').first()
            const svg = await getDecodedBackground(layer)
            expect(svg).toContain(`opacity="${value}"`)
        }
    })
})

test.describe('OrigamWatermark — Prop angle', () => {
    test('angle propagates into the SVG rotate() transform', async ({ page }) => {
        await openVariant(page, 'Prop — angle (-45 / -30 / 0 / 30 / 45 / 90)')
        const sandbox = sandboxOf(page)

        for (const value of [-45, -30, 0, 30, 45, 90]) {
            const host = sandbox.locator(`[data-cy="watermark-angle-${value}"]`).first()
            await expect(host).toBeVisible({ timeout: 8000 })
            const layer = host.locator('[data-cy="origam-watermark-layer"]').first()
            const svg = await getDecodedBackground(layer)
            expect(svg).toMatch(new RegExp(`rotate\\(${value}\\b`))
        }
    })
})

test.describe('OrigamWatermark — Prop gap', () => {
    test('gap changes the SVG tile size (viewBox + width/height)', async ({ page }) => {
        await openVariant(page, 'Prop — gap (60 / 120 / 200)')
        const sandbox = sandboxOf(page)

        // tile = gap + fontSize (default 16). The three variants share
        // a fontSize of 16, so we expect tile sizes of 76 / 136 / 216.
        const expectedTiles: Record<number, number> = { 60: 76, 120: 136, 200: 216 }
        for (const [gap, tile] of Object.entries(expectedTiles)) {
            const host = sandbox.locator(`[data-cy="watermark-gap-${gap}"]`).first()
            await expect(host).toBeVisible({ timeout: 8000 })
            const layer = host.locator('[data-cy="origam-watermark-layer"]').first()
            const svg = await getDecodedBackground(layer)
            expect(svg).toContain(`viewBox="0 0 ${tile} ${tile}"`)
        }
    })
})

test.describe('OrigamWatermark — Prop text vs image', () => {
    test('image variant emits <image href> instead of <text>', async ({ page }) => {
        await openVariant(page, 'Prop — text vs image')
        const sandbox = sandboxOf(page)

        const textHost = sandbox.locator('[data-cy="watermark-mode-text"]').first()
        const textLayer = textHost.locator('[data-cy="origam-watermark-layer"]').first()
        await expect(textLayer).toBeVisible({ timeout: 8000 })
        const textSvg = await getDecodedBackground(textLayer)
        expect(textSvg).toContain('<text')
        expect(textSvg).not.toContain('<image')

        const imageHost = sandbox.locator('[data-cy="watermark-mode-image"]').first()
        const imageLayer = imageHost.locator('[data-cy="origam-watermark-layer"]').first()
        await expect(imageLayer).toBeVisible({ timeout: 8000 })
        const imageSvg = await getDecodedBackground(imageLayer)
        expect(imageSvg).toContain('<image')
        expect(imageSvg).not.toContain('<text')
    })
})

test.describe('OrigamWatermark — antiTamper', () => {
    test('antiTamper=true re-injects the layer after manual removal', async ({ page }) => {
        await openVariant(page, 'Prop — antiTamper (try removing in DevTools)')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="watermark-anti-tamper-on"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        // Sanity check — the layer is there.
        const before = await host.locator('[data-cy="origam-watermark-layer"]').count()
        expect(before).toBe(1)

        // Programmatically remove the layer, then wait one microtask
        // tick for the MutationObserver-driven re-injection to land.
        await host.evaluate((node) => {
            const layer = (node as HTMLElement).querySelector('[data-cy="origam-watermark-layer"]')
            if (layer) layer.remove()
        })
        await page.waitForTimeout(200)

        const after = await host.locator('[data-cy="origam-watermark-layer"]').count()
        expect(after).toBe(1)
    })

    test('antiTamper=false leaves the layer removed', async ({ page }) => {
        await openVariant(page, 'Prop — antiTamper (try removing in DevTools)')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="watermark-anti-tamper-off"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        await host.evaluate((node) => {
            const layer = (node as HTMLElement).querySelector('[data-cy="origam-watermark-layer"]')
            if (layer) layer.remove()
        })
        await page.waitForTimeout(200)

        const after = await host.locator('[data-cy="origam-watermark-layer"]').count()
        expect(after).toBe(0)
    })
})
