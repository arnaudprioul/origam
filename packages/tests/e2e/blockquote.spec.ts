import { expect, test, type Page } from '@playwright/test'

/**
 * OrigamBlockquote — runtime probes for each variant and prop exposed
 * by the story. Each test exercises one orthogonal facet:
 *
 *   - Default: smoke-test that the component mounts as a
 *     `<blockquote>` and exposes the `cite` attribute when set.
 *   - Prop — variant: `default` paints a left accent bar; `pull` adds
 *     top + bottom rules.
 *   - Prop — lang: `variant="quoted"` swaps the decorative glyphs per
 *     locale (« » for fr, “ ” for en).
 *   - Author + Source: the attribution `<footer>` renders both labels.
 *   - Slot — author: the slot rendering wins over the prop value.
 */

const sandboxOf = (page: Page) =>
    page.frameLocator('iframe[src*="__sandbox"]')

const openVariant = async (page: Page, storyPath: string, variant: string) => {
    await page.goto(storyPath)
    await page.waitForLoadState('networkidle')
    await page.getByText(variant, { exact: true }).last().click()
    // Wait for the sandbox iframe to finish loading the selected Variant.
    // 400 ms was too short — the iframe src is set asynchronously by Histoire
    // after the click and the Vue component hydrates afterward.
    await page.waitForTimeout(1500)
}

const STORY = '/story/components-stories-blockquote-origamblockquote-story-vue'

test.describe('OrigamBlockquote — Default (smoke + ARIA)', () => {
    test('mounts as a native <blockquote> element', async ({ page }) => {
        await openVariant(page, STORY, 'Default')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="blockquote-playground-host"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const tag = await host.evaluate((el) => el.tagName.toLowerCase())
        expect(tag).toBe('blockquote')
    })

    test('cite prop lands on the cite HTML attribute', async ({ page }) => {
        await openVariant(page, STORY, 'Default')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="blockquote-playground-host"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const cite = await host.evaluate((el) => el.getAttribute('cite'))
        expect(cite).toBe('https://lkml.org/lkml/2003/8/26/142')
    })

    test('renders the author + source in the attribution footer', async ({ page }) => {
        await openVariant(page, STORY, 'Default')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="blockquote-playground-host"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const footerText = await host.locator('.origam-blockquote__attribution').textContent()
        expect(footerText).toContain('Linus Torvalds')
        expect(footerText).toContain('LKML, 2003')
        // The em-dash prefix is part of the visible label.
        expect(footerText?.trim().startsWith('—')).toBe(true)
    })
})

test.describe('OrigamBlockquote — Prop variant', () => {
    test('variant=default paints a left accent bar (::before, bgColor-driven)', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — variant')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="blockquote-variant-default"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        // The accent bar is a `::before` pseudo (decoupled from the `border`
        // prop), so we measure its width — not a real border.
        const barWidth = await host.evaluate((el) =>
            getComputedStyle(el, '::before').width
        )
        expect(barWidth).not.toBe('')
        expect(barWidth).not.toBe('0px')
    })

    test('variant=pull paints top + bottom rules (::before / ::after)', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — variant')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="blockquote-variant-pull"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const heights = await host.evaluate((el) => ({
            top: getComputedStyle(el, '::before').height,
            bottom: getComputedStyle(el, '::after').height
        }))
        expect(heights.top).not.toBe('0px')
        expect(heights.bottom).not.toBe('0px')
    })

    test('variant=minimal carries a thin accent bar (::before, bgColor-driven)', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — variant')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="blockquote-variant-minimal"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const barWidth = await host.evaluate((el) =>
            getComputedStyle(el, '::before').width
        )
        // Every variant now carries a bgColor-driven accent bar → non-zero.
        expect(barWidth).not.toBe('0px')
    })
})

test.describe('OrigamBlockquote — Prop lang (decorative background glyph)', () => {
    test('lang=fr renders French opening guillemet « as background glyph', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — lang')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy=”blockquote-lang-fr”]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const bgMark = await host.locator('.origam-blockquote__mark--bg').textContent()
        expect(bgMark).toContain('«')

        const closeMark = host.locator('.origam-blockquote__mark--close')
        await expect(closeMark).toHaveCount(0)
    })

    test('lang=en renders English opening curly quote “ as background glyph', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — lang')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy=”blockquote-lang-en”]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const bgMark = await host.locator('.origam-blockquote__mark--bg').textContent()
        expect(bgMark).toContain('“')

        const closeMark = host.locator('.origam-blockquote__mark--close')
        await expect(closeMark).toHaveCount(0)
    })

    test('lang=de renders German low-9 quote „ as background glyph', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — lang')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy=”blockquote-lang-de”]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const bgMark = await host.locator('.origam-blockquote__mark--bg').textContent()
        expect(bgMark).toContain('„')

        const closeMark = host.locator('.origam-blockquote__mark--close')
        await expect(closeMark).toHaveCount(0)
    })
})

test.describe('OrigamBlockquote — variant quoted background glyph styling', () => {
    test('opening glyph is rendered and close glyph is absent', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — variant (quoted deep dive)')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy=”blockquote-quoted-default”]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const bgMark = host.locator('.origam-blockquote__mark--bg')
        await expect(bgMark).toHaveCount(1)
        await expect(bgMark).toBeVisible()

        const closeMark = host.locator('.origam-blockquote__mark--close')
        await expect(closeMark).toHaveCount(0)
    })

    test('background glyph has position: absolute', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — variant (quoted deep dive)')
        const sandbox = sandboxOf(page)

        const bgMark = sandbox.locator('[data-cy=”blockquote-quoted-default”] .origam-blockquote__mark--bg').first()
        await expect(bgMark).toBeVisible({ timeout: 8000 })

        const position = await bgMark.evaluate((el) => getComputedStyle(el).position)
        expect(position).toBe('absolute')
    })

    test('background glyph has opacity in the range [0.05, 0.15]', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — variant (quoted deep dive)')
        const sandbox = sandboxOf(page)

        const bgMark = sandbox.locator('[data-cy=”blockquote-quoted-default”] .origam-blockquote__mark--bg').first()
        await expect(bgMark).toBeVisible({ timeout: 8000 })

        const opacity = await bgMark.evaluate((el) => parseFloat(getComputedStyle(el).opacity))
        expect(opacity).toBeGreaterThanOrEqual(0.05)
        expect(opacity).toBeLessThanOrEqual(0.15)
    })

    test('background glyph has font-size >= 5rem (80px)', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — variant (quoted deep dive)')
        const sandbox = sandboxOf(page)

        const bgMark = sandbox.locator('[data-cy=”blockquote-quoted-default”] .origam-blockquote__mark--bg').first()
        await expect(bgMark).toBeVisible({ timeout: 8000 })

        const fontSizePx = await bgMark.evaluate((el) => parseFloat(getComputedStyle(el).fontSize))
        expect(fontSizePx).toBeGreaterThanOrEqual(80)
    })

    test('background glyph z-index is lower than the body z-index', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — variant (quoted deep dive)')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy=”blockquote-quoted-default”]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const glyphZIndex = await sandbox.locator('[data-cy=”blockquote-quoted-default”] .origam-blockquote__mark--bg').first().evaluate(
            (el) => parseInt(getComputedStyle(el).zIndex || '0', 10)
        )
        const bodyZIndex = await sandbox.locator('[data-cy=”blockquote-quoted-default”] .origam-blockquote__body').first().evaluate(
            (el) => parseInt(getComputedStyle(el).zIndex || '0', 10)
        )
        expect(glyphZIndex).toBeLessThan(bodyZIndex)
    })

    test('different intent colors produce different glyph colors', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — variant (quoted deep dive)')
        const sandbox = sandboxOf(page)

        const readGlyphColor = async (selector: string): Promise<string> => {
            const glyph = sandbox.locator(`${selector} .origam-blockquote__mark--bg`).first()
            await expect(glyph).toBeVisible({ timeout: 8000 })
            return glyph.evaluate((el) => getComputedStyle(el).color)
        }

        const colorPrimary = await readGlyphColor('[data-cy=”blockquote-quoted-primary”]')
        const colorSuccess = await readGlyphColor('[data-cy=”blockquote-quoted-success”]')
        const colorDanger = await readGlyphColor('[data-cy=”blockquote-quoted-danger”]')

        expect(colorPrimary).not.toBe('')
        expect(colorSuccess).not.toBe('')
        expect(colorDanger).not.toBe('')
        expect(colorPrimary).not.toBe(colorSuccess)
        expect(colorPrimary).not.toBe(colorDanger)
        expect(colorSuccess).not.toBe(colorDanger)
    })
})

test.describe('OrigamBlockquote — Slot author', () => {
    test('custom slot rendering wins over the author prop and renders a link', async ({ page }) => {
        await openVariant(page, STORY, 'Slot — author')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="blockquote-author-slot-host"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const link = sandbox.locator('[data-cy="blockquote-author-slot-link"]').first()
        await expect(link).toBeVisible({ timeout: 8000 })

        const href = await link.evaluate((el) => el.getAttribute('href'))
        const text = await link.textContent()
        expect(href).toContain('Steve_Jobs')
        expect(text?.trim()).toBe('Steve Jobs')
    })
})

test.describe('OrigamBlockquote — Prop color', () => {
    test('different intent colors produce different accent border colors', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — color')
        const sandbox = sandboxOf(page)

        const readBorderColor = async (selector: string): Promise<string> => {
            const host = sandbox.locator(selector).first()
            await expect(host).toBeVisible({ timeout: 8000 })
            return await host.evaluate((el) =>
                getComputedStyle(el).borderInlineStartColor ||
                getComputedStyle(el).borderLeftColor
            )
        }

        const primary = await readBorderColor('[data-cy="blockquote-color-primary"]')
        const danger = await readBorderColor('[data-cy="blockquote-color-danger"]')
        const success = await readBorderColor('[data-cy="blockquote-color-success"]')

        // All three should be defined and pairwise distinct — that's
        // how we catch a silently-ignored color prop.
        expect(primary).not.toBe('')
        expect(danger).not.toBe('')
        expect(success).not.toBe('')
        expect(primary).not.toBe(danger)
        expect(primary).not.toBe(success)
        expect(danger).not.toBe(success)
    })
})
