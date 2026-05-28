import { expect, test, type Page } from '@playwright/test'

/**
 * <OrigamAudio> — runtime probes for the Stemtracks-style audio shell
 * built directly from the atomic media sub-components (OrigamMediaPlayBtn,
 * OrigamMediaVolumeControl, OrigamMediaTimeLabel, OrigamMediaCastBtn,
 * OrigamMediaConfigMenu) and two OrigamSliderField scrubbers
 * (`variant="audio"` for the waveform, `variant="timer"` for the inline
 * transport scrubber).
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
    test('mounts the <audio> element and the transport <nav>', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="audio-default-player"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const audio = host.locator('[data-cy="origam-audio-el"]').first()
        const tag = await audio.evaluate((node) => node.tagName)
        expect(tag).toBe('AUDIO')

        const nav = host.locator('[data-cy="origam-audio-controls"]').first()
        await expect(nav).toBeVisible()
        expect(await nav.evaluate((node) => node.tagName)).toBe('NAV')
    })

    test('uses the semantic <article> root + <figure> cover + <header> metadata', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="audio-default-player"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        expect(await host.evaluate((node) => node.tagName)).toBe('ARTICLE')
        const cover = host.locator('[data-cy="origam-audio-cover-figure"]').first()
        await expect(cover).toBeVisible()
        expect(await cover.evaluate((node) => node.tagName)).toBe('FIGURE')
        const meta = host.locator('[data-cy="origam-audio-metadata"]').first()
        await expect(meta).toBeVisible()
        expect(await meta.evaluate((node) => node.tagName)).toBe('HEADER')
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
        await openVariant(page, 'Variant — single track (no metadata)')
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

        const playBtn = sandbox.locator('[data-cy="origam-audio-play"]').first()
        await expect(playBtn).toBeVisible({ timeout: 8000 })
        await expect(playBtn).toHaveAttribute('aria-label', /play/i)

        await playBtn.click()
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

        const cog = sandbox.locator('[data-cy="origam-audio-config"]').first()
        await expect(cog).toBeVisible({ timeout: 8000 })
        await cog.click()

        const openSpeed = sandbox.locator('[data-cy="origam-audio-config-open-speed"]').first()
        await expect(openSpeed).toBeVisible({ timeout: 5000 })
        await openSpeed.click()

        const twoX = sandbox.locator('[data-cy="origam-audio-config-rate-2"]').first()
        await expect(twoX).toBeVisible({ timeout: 5000 })
        await twoX.click()

        await expect.poll(async () => {
            return audio.evaluate((node) => (node as HTMLAudioElement).playbackRate)
        }, { timeout: 5000 }).toBe(2)
    })
})

test.describe('OrigamAudio — controls=native', () => {
    test('the <audio> carries the native controls attribute and the transport is NOT mounted', async ({ page }) => {
        await openVariant(page, 'Variant — controls=native')
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

        const cog = sandbox.locator('[data-cy="origam-audio-config"]').first()
        await expect(cog).toBeVisible({ timeout: 8000 })
        await cog.click()

        const download = sandbox.locator('[data-cy="origam-audio-config-download"]').first()
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

        await expect(sandbox.locator('[data-cy="origam-audio-cast"]')).toHaveCount(0)
    })
})

test.describe('OrigamAudio — variant routing', () => {
    test('expanded variant renders the waveform mini scrubber', async ({ page }) => {
        await openVariant(page, 'Variant — variant=expanded')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="audio-expanded-player"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })
        await expect(host.locator('[data-cy="origam-audio-waveform"]')).toBeVisible()
    })

    test('compact variant hides the waveform mini scrubber', async ({ page }) => {
        await openVariant(page, 'Variant — variant=compact')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="audio-compact-player"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })
        await expect(host.locator('[data-cy="origam-audio-waveform"]')).toHaveCount(0)
    })

    test('cover-position=right swaps the grid columns', async ({ page }) => {
        await openVariant(page, 'Variant — coverPosition=right')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="audio-cover-right-player"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })
        const classes = await host.evaluate((node) => Array.from(node.classList))
        expect(classes).toContain('origam-audio--cover-right')
    })
})

test.describe('OrigamAudio — transport navigation', () => {
    test('previous and next buttons are mounted with translated aria-labels', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)

        const previous = sandbox.locator('[data-cy="origam-audio-previous"]').first()
        const next = sandbox.locator('[data-cy="origam-audio-next"]').first()
        await expect(previous).toBeVisible({ timeout: 8000 })
        await expect(next).toBeVisible()
        await expect(previous).toHaveAttribute('aria-label', /previous/i)
        await expect(next).toHaveAttribute('aria-label', /next/i)
    })
})

test.describe('OrigamAudio — scrubber drag fluidity', () => {
    /**
     * Drag-fluidity probe — synthesise N pointer events on the inline
     * timer scrubber via JS (Chromium's HostFunction injection runs in
     * the page context, no PointerEvent constructor latency). The
     * SliderField rewrite (Phase 2) targets ≤ 50 ms/event end-to-end;
     * audio reuses the same component so the budget transfers.
     *
     * We measure the wall-clock spread across 30 synthetic pointermove
     * events on the inline timer scrubber's native <input type="range">.
     * Browser engines coalesce pointermoves to ≤ 1 per frame (~16ms),
     * so the realistic floor sits around 16 ms/event; the assertion
     * keeps the ceiling at 50 ms to absorb headless variance.
     */
    test('the inline timer scrubber sustains ≤ 50 ms/event under sustained drag', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)

        const scrubber = sandbox.locator('[data-cy="origam-audio-scrubber"]').first()
        await expect(scrubber).toBeVisible({ timeout: 8000 })

        const perMs = await scrubber.evaluate((node) => {
            const input = node.querySelector('input[type="range"]') as HTMLInputElement | null
            if (!input) return Number.NaN
            const rect = input.getBoundingClientRect()
            const startX = rect.left + 4
            const endX = rect.right - 4
            const y = rect.top + rect.height / 2
            const count = 30
            const start = performance.now()
            for (let i = 0; i < count; i++) {
                const x = startX + ((endX - startX) * i) / (count - 1)
                input.dispatchEvent(new PointerEvent('pointermove', {
                    clientX: x,
                    clientY: y,
                    bubbles: true,
                    cancelable: true,
                    pointerType: 'mouse'
                }))
                input.dispatchEvent(new Event('input', { bubbles: true }))
            }
            const elapsed = performance.now() - start
            return elapsed / count
        })

         
        console.log(`[probe] inline timer scrubber per-event: ${ perMs.toFixed(2) } ms`)
        expect(Number.isFinite(perMs)).toBe(true)
        expect(perMs).toBeLessThanOrEqual(50)
    })

    test('the waveform mini scrubber sustains ≤ 50 ms/event under sustained drag', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)

        const waveform = sandbox.locator('[data-cy="origam-audio-waveform-slider"]').first()
        await expect(waveform).toBeVisible({ timeout: 8000 })

        const perMs = await waveform.evaluate((node) => {
            const input = node.querySelector('input[type="range"]') as HTMLInputElement | null
            if (!input) return Number.NaN
            const rect = input.getBoundingClientRect()
            const startX = rect.left + 4
            const endX = rect.right - 4
            const y = rect.top + rect.height / 2
            const count = 30
            const start = performance.now()
            for (let i = 0; i < count; i++) {
                const x = startX + ((endX - startX) * i) / (count - 1)
                input.dispatchEvent(new PointerEvent('pointermove', {
                    clientX: x,
                    clientY: y,
                    bubbles: true,
                    cancelable: true,
                    pointerType: 'mouse'
                }))
                input.dispatchEvent(new Event('input', { bubbles: true }))
            }
            const elapsed = performance.now() - start
            return elapsed / count
        })

         
        console.log(`[probe] waveform mini scrubber per-event: ${ perMs.toFixed(2) } ms`)
        expect(Number.isFinite(perMs)).toBe(true)
        expect(perMs).toBeLessThanOrEqual(50)
    })
})
