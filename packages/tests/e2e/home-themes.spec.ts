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
        // OrigamTitle renders the <h2> and now carries the aria-target `id`
        // on that <h2> root directly (DS fix).
        const h2 = page.locator('section.home-themes h2#themes-title')
        await expect(h2).toBeVisible()
        const text = await h2.textContent()
        expect(text?.trim().length).toBeGreaterThan(0)
    })

    test('h2 title contains expected text', async ({ page }) => {
        const h2 = page.locator('section.home-themes h2#themes-title')
        await expect(h2).toContainText('One design system')
    })

    // ── 4. Exactly 8 brand chips (Sobre inclus en v5-phase1) ──────────────

    test('renders exactly 8 brand chips (Sobre + 7 variants)', async ({ page }) => {
        const chips = page.locator('section.home-themes .home-themes__chips .origam-chip')
        await expect(chips).toHaveCount(8)
    })

    test('all 8 brand chip labels are visible', async ({ page }) => {
        const section = page.locator('section.home-themes')
        await expect(section).toContainText('Sobre')
        await expect(section).toContainText('Glass')
        await expect(section).toContainText('Geek')
        await expect(section).toContainText('Cartoon')
        await expect(section).toContainText('Editorial')
        await expect(section).toContainText('Material')
        await expect(section).toContainText('Ecom')
        await expect(section).toContainText('Apple')
    })

    test('chips have data-cy attributes', async ({ page }) => {
        const chipKeys = ['sobre', 'glass', 'geek', 'cartoon', 'editorial', 'material', 'ecom', 'apple']
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

    test('all 4 preview tile labels are visible (v5-phase1: brand-a/brand-b remplacent editorial/ecom)', async ({ page }) => {
        const section = page.locator('section.home-themes')
        await expect(section).toContainText('light.json')
        await expect(section).toContainText('dark.json')
        await expect(section).toContainText('brand-a.json')
        await expect(section).toContainText('brand-b.json')
    })

    test('preview tiles have data-cy attributes', async ({ page }) => {
        const tileKeys = ['light', 'dark', 'brand-a', 'brand-b']
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
        // brand-a (editorial base + surface override #f5f0e8) and brand-b (ecom base + #e8f5f0)
        const brandA = await surfaceBg('brand-a')
        const brandB = await surfaceBg('brand-b')

        expect(light).toBe('rgb(255, 255, 255)')
        expect(dark).toBe('rgb(10, 10, 10)')
        // brand tiles have custom surface overrides — they must differ from white
        expect(brandA).not.toBe(light)
        expect(brandB).not.toBe(light)
        expect(new Set([light, dark, brandA, brandB]).size).toBeGreaterThanOrEqual(3)
    })

    // ── 6. Tooling mentions ────────────────────────────────────────────────
    // En v5-phase1 les tooling mentions sont des <span> dans un <p.home-themes__tooling>,
    // plus des OrigamChip pills avec data-cy. On assert le texte dans la section.

    test('tokens.studio mention is visible in the tooling <p>', async ({ page }) => {
        const tooling = page.locator('section.home-themes p.home-themes__tooling')
        await expect(tooling).toBeVisible()
        await expect(tooling).toContainText('tokens.studio compatible')
    })

    test('Style Dictionary v4 mention is visible in the tooling <p>', async ({ page }) => {
        const tooling = page.locator('section.home-themes p.home-themes__tooling')
        await expect(tooling).toBeVisible()
        await expect(tooling).toContainText('Style Dictionary v4')
    })

    // ── 7. Semantic structure ─────────────────────────────────────────────

    test('preview tiles are rendered inside a <ul> with <li> items', async ({ page }) => {
        const list = page.locator('section.home-themes ul.home-themes__previews')
        await expect(list).toBeVisible()

        const items = list.locator('li.home-themes__preview-item')
        await expect(items).toHaveCount(4)
    })

    test('tooling mentions render as 2 <span> items inside the tooling <p>', async ({ page }) => {
        // En v5-phase1 : plain <span class="home-themes__tooling-item"> dans un <p>,
        // plus des OrigamChip pills avec data-cy.
        const items = page.locator('section.home-themes p.home-themes__tooling .home-themes__tooling-item')
        await expect(items).toHaveCount(2)
    })

    // ── 8. No raw i18n key leakage ─────────────────────────────────────────

    test('no raw i18n key appears in the section text', async ({ page }) => {
        const section = page.locator('section.home-themes')
        const text = await section.textContent()
        expect(text).not.toContain('home.themes.')
    })
})
