/**
 * home-themes.spec.ts — T6 HomeThemes section
 *
 * Asserts:
 * 1. The <section> renders with aria-labelledby="themes-title".
 * 2. Eyebrow <p> contains the i18n value "THEMING".
 * 3. <h2> title is present and non-empty.
 * 4. Exactly 7 brand chips are rendered.
 * 5. Exactly 4 preview tiles are rendered.
 * 6. Both tooling mentions (tokens.studio / Style Dictionary v4) are visible.
 * 7. No raw i18n key leakage.
 *
 * Prerequisites: marketing dev server at http://localhost:3000 (or
 * MARKETING_BASE_URL env var). Run with:
 *   pnpm -F @origam/tests playwright test --config=playwright.marketing.config.ts
 *   e2e/home-themes.spec.ts
 */

import { expect, test } from '@playwright/test'

test.describe('HomeThemes section', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/', { waitUntil: 'networkidle' })
    })

    // ── 1. Section presence & labelling ───────────────────────────────────

    test('section has aria-labelledby pointing to h2#themes-title', async ({ page }) => {
        const section = page.locator('section.home-themes')
        await expect(section).toBeVisible()
        await expect(section).toHaveAttribute('aria-labelledby', 'themes-title')

        const h2 = page.locator('#themes-title')
        await expect(h2).toBeVisible()
    })

    // ── 2. Eyebrow ─────────────────────────────────────────────────────────

    test('eyebrow <p> renders i18n text "THEMING"', async ({ page }) => {
        const eyebrow = page.locator('section.home-themes p.home-themes__eyebrow')
        await expect(eyebrow).toBeVisible()
        await expect(eyebrow).toContainText('THEMING')
    })

    // ── 3. H2 title ────────────────────────────────────────────────────────

    test('h2 title is a non-empty <h2> element', async ({ page }) => {
        // OrigamTitle renders the <h2>; the aria-target id lives on the inner
        // <span id="themes-title"> (OrigamTitle ignores `id`).
        const h2 = page.locator('section.home-themes h2:has(#themes-title)')
        await expect(h2).toBeVisible()
        const text = await h2.textContent()
        expect(text?.trim().length).toBeGreaterThan(0)
    })

    test('h2 title contains expected text', async ({ page }) => {
        const h2 = page.locator('section.home-themes h2:has(#themes-title)')
        await expect(h2).toContainText('One design system')
    })

    // ── 4. Exactly 7 brand chips ───────────────────────────────────────────

    test('renders exactly 7 brand chips', async ({ page }) => {
        const chips = page.locator('section.home-themes .home-themes__chips .origam-chip')
        await expect(chips).toHaveCount(7)
    })

    test('all 7 brand chip labels are visible', async ({ page }) => {
        const section = page.locator('section.home-themes')
        await expect(section).toContainText('Glass')
        await expect(section).toContainText('Geek')
        await expect(section).toContainText('Cartoon')
        await expect(section).toContainText('Editorial')
        await expect(section).toContainText('Material')
        await expect(section).toContainText('Ecom')
        await expect(section).toContainText('Apple')
    })

    test('chips have data-cy attributes', async ({ page }) => {
        const chipKeys = ['glass', 'geek', 'cartoon', 'editorial', 'material', 'ecom', 'apple']
        for (const key of chipKeys) {
            const chip = page.locator(`[data-cy="themes-chip-${key}"]`)
            await expect(chip).toBeVisible()
        }
    })

    // ── 5. Exactly 4 preview tiles ─────────────────────────────────────────

    test('renders exactly 4 preview tiles', async ({ page }) => {
        const tiles = page.locator('section.home-themes [data-cy^="themes-preview-"]')
        await expect(tiles).toHaveCount(4)
    })

    test('all 4 preview tile labels are visible (real theme ids)', async ({ page }) => {
        const section = page.locator('section.home-themes')
        await expect(section).toContainText('light.json')
        await expect(section).toContainText('dark.json')
        await expect(section).toContainText('editorial.json')
        await expect(section).toContainText('ecom.json')
    })

    test('preview tiles have data-cy attributes', async ({ page }) => {
        const tileKeys = ['light', 'dark', 'editorial', 'ecom']
        for (const key of tileKeys) {
            const tile = page.locator(`[data-cy="themes-preview-${key}"]`)
            await expect(tile).toBeVisible()
        }
    })

    test('each preview tile has a Button element', async ({ page }) => {
        const tiles = page.locator('[data-cy^="themes-preview-"]')
        const count = await tiles.count()
        expect(count).toBe(4)

        for (let i = 0; i < count; i++) {
            const tile = tiles.nth(i)
            const btn = tile.locator('.origam-btn')
            await expect(btn).toBeVisible()
        }
    })

    // ── Theming proof: tiles are powered by OrigamThemeProvider, NOT hardcoded
    //    hex — each tile's surface resolves from its own theme's
    //    `--origam-color__surface---default`. Assert ≥2 distinct surfaces.

    test('preview tiles render distinct theme surfaces (theming is live)', async ({ page }) => {
        const surfaceBg = async (key: string) =>
            page.locator(`[data-cy="themes-tile-surface-${key}"]`)
                .evaluate(el => getComputedStyle(el).backgroundColor)

        const light = await surfaceBg('light')
        const dark = await surfaceBg('dark')
        const editorial = await surfaceBg('editorial')
        const ecom = await surfaceBg('ecom')

        expect(light).toBe('rgb(255, 255, 255)')
        expect(dark).toBe('rgb(10, 10, 10)')
        // editorial (#fafaf7) and ecom (#fff7f0) come from their own themes.
        expect(editorial).not.toBe(light)
        expect(ecom).not.toBe(light)
        expect(new Set([light, dark, editorial, ecom]).size).toBeGreaterThanOrEqual(3)
    })

    // ── 6. Tooling mentions ────────────────────────────────────────────────

    test('tokens.studio mention is visible with data-cy', async ({ page }) => {
        const tokensStudio = page.locator('[data-cy="themes-tooling-tokens-studio"]')
        await expect(tokensStudio).toBeVisible()
        await expect(tokensStudio).toContainText('tokens.studio compatible')
    })

    test('Style Dictionary v4 mention is visible with data-cy', async ({ page }) => {
        const styleDictionary = page.locator('[data-cy="themes-tooling-style-dictionary"]')
        await expect(styleDictionary).toBeVisible()
        await expect(styleDictionary).toContainText('Style Dictionary v4')
    })

    // ── 7. Semantic structure ─────────────────────────────────────────────

    test('preview tiles are rendered inside a <ul> with <li> items', async ({ page }) => {
        const list = page.locator('section.home-themes ul.home-themes__previews')
        await expect(list).toBeVisible()

        const items = list.locator('li.home-themes__preview-item')
        await expect(items).toHaveCount(4)
    })

    test('tooling mentions render as 2 OrigamChip pills', async ({ page }) => {
        const pills = page.locator('section.home-themes [data-cy^="themes-tooling-"]')
        await expect(pills).toHaveCount(2)
    })

    // ── 8. No raw i18n key leakage ─────────────────────────────────────────

    test('no raw i18n key appears in the section text', async ({ page }) => {
        const section = page.locator('section.home-themes')
        const text = await section.textContent()
        expect(text).not.toContain('home.themes.')
    })
})
