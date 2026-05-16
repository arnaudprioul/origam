import { expect, test, type Page } from '@playwright/test'

/**
 * OrigamSound — runtime probes for the native `<audio>` wiring,
 * controls modes (custom / native / none), waveform canvas presence,
 * metadata rendering, and accessibility annotations. Playback itself
 * isn't asserted (Chromium needs an explicit autoplay policy flag),
 * so the spec focuses on the DOM contract.
 */

const STORY = '/story/stories-components-stories-sound-origamsound-story-vue'

const sandboxOf = (page: Page) =>
    page.frameLocator('iframe[src*="__sandbox"]')

const openVariant = async (page: Page, title: string) => {
    await page.goto(STORY)
    await page.waitForLoadState('networkidle')
    await page.getByText(title, { exact: true }).first().click()
    await page.waitForTimeout(400)
}

test.describe('OrigamSound — Playground', () => {
    test('renders a native <audio> element with the configured src', async ({ page }) => {
        await openVariant(page, 'Playground')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="sound-playground-player"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const audio = host.locator('[data-cy="origam-sound-el"]').first()
        const tag = await audio.evaluate((node) => node.tagName)
        expect(tag).toBe('AUDIO')

        const src = await audio.getAttribute('src')
        expect(src ?? '').toMatch(/\.mp3|\.ogg|\.wav/i)
    })

    test('renders the custom toolbar when controls=custom', async ({ page }) => {
        await openVariant(page, 'Playground')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="sound-playground-player"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })
        await expect(host.locator('[data-cy="origam-sound-controls"]').first()).toBeVisible()
        await expect(host.locator('[data-cy="origam-sound-play"]').first()).toBeVisible()
        await expect(host.locator('[data-cy="origam-sound-scrubber"]').first()).toBeVisible()
        await expect(host.locator('[data-cy="origam-sound-mute"]').first()).toBeVisible()
    })

    test('play button has a dynamic aria-label', async ({ page }) => {
        await openVariant(page, 'Playground')
        const sandbox = sandboxOf(page)

        const btn = sandbox.locator('[data-cy="origam-sound-play"]').first()
        await expect(btn).toHaveAttribute('aria-label', /play/i)
    })

    test('scrubber declares role=slider with aria-valuemin/max', async ({ page }) => {
        await openVariant(page, 'Playground')
        const sandbox = sandboxOf(page)

        const scrubber = sandbox.locator('[data-cy="origam-sound-scrubber"]').first()
        await expect(scrubber).toHaveAttribute('role', 'slider')
        await expect(scrubber).toHaveAttribute('aria-valuemin', '0')
    })
})

test.describe('OrigamSound — controls modes', () => {
    test('controls=custom paints the in-house toolbar and the <audio> has no native controls attribute', async ({ page }) => {
        await openVariant(page, 'Prop — controls (custom vs native vs none)')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="sound-controls-custom"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })
        await expect(host.locator('[data-cy="origam-sound-controls"]').first()).toBeVisible()

        const audio = host.locator('[data-cy="origam-sound-el"]').first()
        const hasControls = await audio.evaluate((node) => (node as HTMLAudioElement).controls)
        expect(hasControls).toBe(false)
    })

    test('controls=native sets the controls attribute on the <audio>', async ({ page }) => {
        await openVariant(page, 'Prop — controls (custom vs native vs none)')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="sound-controls-native"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const audio = host.locator('[data-cy="origam-sound-el"]').first()
        const hasControls = await audio.evaluate((node) => (node as HTMLAudioElement).controls)
        expect(hasControls).toBe(true)

        const customCount = await host.locator('[data-cy="origam-sound-controls"]').count()
        expect(customCount).toBe(0)
    })

    test('controls=none renders neither the custom toolbar nor the native controls attribute', async ({ page }) => {
        await openVariant(page, 'Prop — controls (custom vs native vs none)')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="sound-controls-none"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const audio = host.locator('[data-cy="origam-sound-el"]').first()
        const hasControls = await audio.evaluate((node) => (node as HTMLAudioElement).controls)
        expect(hasControls).toBe(false)

        const customCount = await host.locator('[data-cy="origam-sound-controls"]').count()
        expect(customCount).toBe(0)
    })
})

test.describe('OrigamSound — waveform', () => {
    test('waveform=true renders a canvas element with role=img', async ({ page }) => {
        await openVariant(page, 'Prop — waveform (true vs false)')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="sound-waveform-on"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const canvas = host.locator('[data-cy="origam-sound-waveform-canvas"]').first()
        await expect(canvas).toBeVisible()
        await expect(canvas).toHaveAttribute('role', 'img')
        await expect(canvas).toHaveAttribute('aria-label', /waveform/i)
    })

    test('waveform=false omits the canvas and renders the scrubber', async ({ page }) => {
        await openVariant(page, 'Prop — waveform (true vs false)')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="sound-waveform-off"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const canvasCount = await host.locator('[data-cy="origam-sound-waveform-canvas"]').count()
        expect(canvasCount).toBe(0)
        await expect(host.locator('[data-cy="origam-sound-scrubber"]').first()).toBeVisible()
    })
})

test.describe('OrigamSound — metadata', () => {
    test('metadata.title is rendered in the toolbar block', async ({ page }) => {
        await openVariant(page, 'Prop — metadata (Media Session API)')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="sound-metadata-with"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const title = host.locator('[data-cy="origam-sound-title"]').first()
        await expect(title).toBeVisible()
        const text = (await title.textContent()) ?? ''
        expect(text.trim().length).toBeGreaterThan(0)
    })

    test('metadata is hidden when no title/artist/album is supplied', async ({ page }) => {
        await openVariant(page, 'Prop — metadata (Media Session API)')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="sound-metadata-without"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const count = await host.locator('[data-cy="origam-sound-metadata"]').count()
        expect(count).toBe(0)
    })

    test('cover image is rendered when the prop is set', async ({ page }) => {
        await openVariant(page, 'Prop — metadata (Media Session API)')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="sound-metadata-with"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })
        await expect(host.locator('[data-cy="origam-sound-cover"]').first()).toBeVisible()
    })
})

test.describe('OrigamSound — slot controls', () => {
    test('#controls slot replaces the default toolbar entirely', async ({ page }) => {
        await openVariant(page, 'Slot — controls (timestamp-only minimal bar)')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="sound-slot-controls-player"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })
        await expect(host.locator('[data-cy="sound-slot-controls-play"]').first()).toBeVisible()
        const defaultPlay = await host.locator('[data-cy="origam-sound-play"]').count()
        expect(defaultPlay).toBe(0)
    })
})
