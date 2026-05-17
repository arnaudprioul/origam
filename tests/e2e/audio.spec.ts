import { expect, test, type Page } from '@playwright/test'

/**
 * <OrigamAudio> — runtime probes for the audio component built on top
 * of <OrigamMediaController>.
 *
 * Variants are reached via their dedicated titles — never via the
 * HstSelect picker dropdown (custom DOM, brittle).
 *
 * Caveats — Chromium's autoplay policy blocks `audio.play()` without a
 * prior user gesture in headless mode. The specs below click the play
 * button to satisfy the gesture requirement before asserting state
 * transitions. The cast (Remote Playback) probe is skipped headlessly
 * because no cast-capable device is reachable; the assertion below
 * only checks that the button is hidden when `allowRemotePlayback`
 * is false, which is the headless default.
 */

const STORY = '/story/stories-components-stories-audio-origamaudio-story-vue'

const sandboxOf = (page: Page) =>
    page.frameLocator('iframe[src*="__sandbox"]')

const openVariant = async (page: Page, title: string): Promise<void> => {
    await page.goto(STORY)
    await page.waitForLoadState('networkidle')
    await page.getByText(title, { exact: true }).first().click()
    await page.waitForTimeout(400)
}

test.describe('OrigamAudio — Default playground', () => {
    test('mounts the <audio> element and the controller shell', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="audio-default-player"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const audio = host.locator('[data-cy="origam-audio-el"]').first()
        const tag = await audio.evaluate((node) => node.tagName)
        expect(tag).toBe('AUDIO')

        await expect(host.locator('[data-cy="origam-audio-controls"]').first()).toBeVisible()
    })

    test('renders title, artist, and cover when provided', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="audio-default-player"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        await expect(host.locator('[data-cy="origam-audio-title"]').first()).toBeVisible()
        await expect(host.locator('[data-cy="origam-audio-artist"]').first()).toBeVisible()
        await expect(host.locator('[data-cy="origam-audio-cover"]').first()).toBeVisible()
    })

    test('hides the metadata strip in the bare single-track Variant', async ({ page }) => {
        await openVariant(page, 'Variant — single track')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="audio-single-player"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        await expect(host.locator('[data-cy="origam-audio-metadata"]')).toHaveCount(0)
    })
})

test.describe('OrigamAudio — play / pause toggle', () => {
    test('play button has a dynamic aria-label that flips on toggle', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)

        const playBtn = sandbox.locator('[data-cy="origam-media-controller-play"]').first()
        await expect(playBtn).toBeVisible({ timeout: 8000 })
        await expect(playBtn).toHaveAttribute('aria-label', /play/i)

        await playBtn.click()
        // Chromium honours the user gesture and starts playback; the
        // composable flips the aria-label to "Pause".
        await expect(playBtn).toHaveAttribute('aria-label', /pause/i, { timeout: 5000 })

        await playBtn.click()
        await expect(playBtn).toHaveAttribute('aria-label', /play/i, { timeout: 5000 })
    })
})

test.describe('OrigamAudio — playback rate via cog menu', () => {
    test('picking 2× from the config menu updates the audio element playbackRate', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="audio-default-player"]').first()
        const audio = host.locator('[data-cy="origam-audio-el"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const cog = sandbox.locator('[data-cy="origam-media-controller-config"]').first()
        await expect(cog).toBeVisible({ timeout: 8000 })
        await cog.click()

        const openSpeed = sandbox.locator('[data-cy="origam-media-controller-config-open-speed"]').first()
        await expect(openSpeed).toBeVisible({ timeout: 5000 })
        await openSpeed.click()

        const twoX = sandbox.locator('[data-cy="origam-media-controller-config-rate-2"]').first()
        await expect(twoX).toBeVisible({ timeout: 5000 })
        await twoX.click()

        await expect.poll(async () => {
            return audio.evaluate((node) => (node as HTMLAudioElement).playbackRate)
        }, { timeout: 5000 }).toBe(2)
    })
})

test.describe('OrigamAudio — controls=native', () => {
    test('the <audio> carries the native controls attribute and the controller is NOT mounted', async ({ page }) => {
        await openVariant(page, 'Variant — controls="native"')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="audio-native-player"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const audio = host.locator('[data-cy="origam-audio-el"]').first()
        const hasControls = await audio.evaluate((node) => (node as HTMLAudioElement).controls)
        expect(hasControls).toBe(true)

        await expect(host.locator('[data-cy="origam-audio-controls"]')).toHaveCount(0)
    })
})

test.describe('OrigamAudio — downloadable', () => {
    test('the Download row appears in the cog menu when downloadable is true', async ({ page }) => {
        await openVariant(page, 'Variant — downloadable')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="audio-downloadable-player"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const cog = sandbox.locator('[data-cy="origam-media-controller-config"]').first()
        await expect(cog).toBeVisible({ timeout: 8000 })
        await cog.click()

        const download = sandbox.locator('[data-cy="origam-media-controller-config-download"]').first()
        await expect(download).toBeVisible({ timeout: 5000 })
    })
})

test.describe('OrigamAudio — Remote Playback availability gate (headless caveat)', () => {
    test('cast button stays hidden in headless mode when allowRemotePlayback is false', async ({ page }) => {
        // The Default Variant ships with `allowRemotePlayback=false`,
        // so the cast button must not be mounted regardless of device
        // availability. We can't probe the `true` branch headlessly
        // (no cast devices reachable from the test runner), so this
        // assertion only locks the OFF branch — see file-level comment.
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)

        await expect(sandbox.locator('[data-cy="origam-media-controller-cast"]')).toHaveCount(0)
    })
})

test.describe('OrigamAudio — slot overrides', () => {
    test('the #metadata + #controls slots fully replace the default rendering', async ({ page }) => {
        await openVariant(page, 'Slot — override #metadata and #controls')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="audio-slots-player"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        await expect(sandbox.locator('[data-cy="audio-slots-meta"]').first()).toBeVisible()
        await expect(sandbox.locator('[data-cy="audio-slots-controls"]').first()).toBeVisible()

        // The default controller is replaced — there should be no
        // controller wrapper rendered when the slot is provided.
        await expect(host.locator('[data-cy="origam-audio-controls"]')).toHaveCount(0)
    })
})
