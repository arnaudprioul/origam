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

/**
 * Selected-chip contrast (#28) — the active theme chip (data-active="true")
 * pairs a solid brand-colour fill with its own text colour. `OrigamChip`
 * binds resting-state `color` as an INLINE style (useBothColor →
 * --origam-color__action--primary---fgSubtle), which always outranks any
 * external CSS rule regardless of specificity — so every theme's active-chip
 * text override needed `!important` to actually take effect. Verified via
 * WCAG contrast ratio (not just "is it white/dark") because the fix for
 * ecom/apple/sobre dark mode required darkening the fill itself, not just
 * swapping to white text (their brand accent is too light for white text
 * to reach 4.5:1 even once the inline-style override works).
 */
test.describe('HomeThemes section · selected chip contrast (#28)', () => {
    const COMBOS: Array<{ theme: string; mode: 'light' | 'dark' }> = [
        { theme: 'sobre', mode: 'light' }, { theme: 'sobre', mode: 'dark' },
        { theme: 'glass', mode: 'light' }, { theme: 'glass', mode: 'dark' },
        { theme: 'cartoon', mode: 'light' }, { theme: 'cartoon', mode: 'dark' },
        { theme: 'geek', mode: 'light' }, { theme: 'geek', mode: 'dark' },
        { theme: 'ecom', mode: 'light' }, { theme: 'ecom', mode: 'dark' },
        { theme: 'editorial', mode: 'light' }, { theme: 'editorial', mode: 'dark' },
        { theme: 'apple', mode: 'light' }, { theme: 'apple', mode: 'dark' },
        { theme: 'material', mode: 'light' }, { theme: 'material', mode: 'dark' }
    ]

    function relativeLuminance ({ r, g, b }: { r: number; g: number; b: number }): number {
        const linearize = (c: number): number => {
            const s = c / 255
            return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
        }
        return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)
    }

    function parseRgb (value: string): { r: number; g: number; b: number } | null {
        const m = value.match(/rgba?\(([^)]+)\)/)
        if (!m) return null
        const [r, g, b] = m[1].split(',').map(s => parseFloat(s.trim()))
        return { r, g, b }
    }

    function contrastRatio (fg: string, bg: string): number | null {
        const fgRgb = parseRgb(fg)
        const bgRgb = parseRgb(bg)
        if (!fgRgb || !bgRgb) return null
        const l1 = relativeLuminance(fgRgb)
        const l2 = relativeLuminance(bgRgb)
        const [lighter, darker] = l1 > l2 ? [l1, l2] : [l2, l1]
        return (lighter + 0.05) / (darker + 0.05)
    }

    for (const { theme, mode } of COMBOS) {
        test(`selected "${theme}" chip text meets 4.5:1 against its fill — ${mode}`, async ({ page }) => {
            await page.context().addCookies([
                { name: 'origam-theme', value: theme, url: 'http://localhost:3000' },
                { name: 'origam-mode', value: mode, url: 'http://localhost:3000' }
            ])
            await page.goto('/', { waitUntil: 'networkidle' })

            const chip = page.locator(`[data-cy="themes-chip-${theme}"]`)
            await expect(chip).toBeVisible()
            await expect(chip).toHaveAttribute('data-active', 'true')

            const styles = await chip.evaluate((el) => {
                const cs = getComputedStyle(el)
                return { color: cs.color, backgroundColor: cs.backgroundColor }
            })

            const ratio = contrastRatio(styles.color, styles.backgroundColor)
            expect(ratio, `could not parse computed colours: ${JSON.stringify(styles)}`).not.toBeNull()
            expect(
                ratio!,
                `selected chip text/fill contrast is ${ratio} under ${theme}/${mode} ` +
                `(color=${styles.color}, background=${styles.backgroundColor}) — WCAG AA needs >= 4.5`
            ).toBeGreaterThanOrEqual(4.5)
        })
    }
})
