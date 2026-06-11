/**
 * home-cta.spec.ts — T7 HomeCta section (DS-first rebuild)
 *
 * Asserts the rebuilt, DS-first CTA contract:
 *  - bare <section> (no Card wrapper) with the cta-glow gradient background
 *  - H2 via OrigamTitle, aria target on a <span id> (OrigamTitle drops id)
 *  - install snippet rendered by OrigamCode `copyable` (no manual copy btn,
 *    no useCopy) — copy control is the DS button [data-cy="origam-code-copy"]
 *  - "Read docs" OrigamBtn linking to /docs, carrying the shared Hero glow
 *
 * Prerequisites: marketing dev server at http://localhost:3000 (or
 * MARKETING_BASE_URL env var). Run with:
 *   pnpm -F @origam/tests playwright test --config=playwright.marketing.config.ts
 *   e2e/home-cta.spec.ts
 */

import { expect, test } from '@playwright/test'

test.describe('HomeCta section — T7 (DS-first)', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/', { waitUntil: 'networkidle' })
    })

    // ── 1. Section presence & labelling ───────────────────────────────────

    test('section has aria-labelledby pointing to #cta-title', async ({ page }) => {
        const section = page.locator('section.home-cta')
        await expect(section).toBeVisible()
        await expect(section).toHaveAttribute('aria-labelledby', 'cta-title')

        // OrigamTitle now carries the `id` on its rendered <h2> root (DS fix),
        // so the aria-labelledby target IS the heading element itself.
        const target = page.locator('h2#cta-title')
        await expect(target).toBeVisible()
    })

    // ── 2. H2 title ────────────────────────────────────────────────────────

    test('h2 renders "Ready to ship faster?" from i18n', async ({ page }) => {
        const title = page.locator('section.home-cta h2')
        await expect(title).toBeVisible()
        await expect(title).toContainText('Ready to ship faster?')
    })

    test('section contains a single <h2> element', async ({ page }) => {
        const headings = page.locator('section.home-cta h2')
        await expect(headings).toHaveCount(1)
    })

    // ── 3. Description ─────────────────────────────────────────────────────

    test('description <p> is visible and non-empty', async ({ page }) => {
        const desc = page.locator('section.home-cta p.home-cta__description')
        await expect(desc).toBeVisible()
        await expect(desc).toContainText('origam in 30 seconds')
    })

    // ── 4. Read docs CTA (OrigamBtn) ───────────────────────────────────────

    test('Read docs button renders and links to /docs', async ({ page }) => {
        const btn = page.locator('[data-cy="cta-btn-docs"]')
        await expect(btn).toBeVisible()
        await expect(btn).toContainText('Read docs')
        await expect(btn).toHaveAttribute('href', '/docs')
    })

    test('Read docs button is keyboard-focusable', async ({ page }) => {
        const btn = page.locator('[data-cy="cta-btn-docs"]')
        await btn.focus()
        await expect(btn).toBeFocused()
    })

    // ── 5. Install snippet via OrigamCode copyable ─────────────────────────

    test('install snippet rendered by OrigamCode (<figure><pre><code>)', async ({ page }) => {
        const code = page.locator('[data-cy="cta-install-command"]')
        await expect(code).toBeVisible()
        await expect(code).toContainText('npm install origam')

        const pre = page.locator('section.home-cta figure pre code')
        await expect(pre).toBeAttached()
    })

    test('OrigamCode copy button present and keyboard-reachable', async ({ page }) => {
        const copyBtn = page.locator('section.home-cta [data-cy="origam-code-copy"]')
        await expect(copyBtn).toBeVisible()
        await copyBtn.focus()
        await expect(copyBtn).toBeFocused()
    })

    // ── 6. Sobre computed-style assertions (≥3) ────────────────────────────

    test('Sobre — la section CTA peint le gradient cta-glow', async ({ page }) => {
        const section = page.locator('section.home-cta')
        const bgImage = await section.evaluate(el => getComputedStyle(el).backgroundImage)
        expect(bgImage).toContain('radial-gradient')
        // cta-glow uses the action-primary purple at low alpha
        expect(bgImage).toContain('124, 58, 237')
    })

    test('Sobre — le H2 CTA est à la taille display cta (64px)', async ({ page }) => {
        const title = page.locator('section.home-cta h2.home-cta__title')
        const styles = await title.evaluate(el => {
            const s = getComputedStyle(el)
            return { size: s.fontSize, color: s.color }
        })
        // --origam-font-size---cta = 4rem = 64px
        expect(styles.size).toBe('64px')
        // sobre text---primary = #0A0A0A = rgb(10, 10, 10)
        expect(styles.color).toBe('rgb(10, 10, 10)')
    })

    test('Sobre — le bouton "Read docs" porte le glow primaire partagé', async ({ page }) => {
        const btn = page.locator('[data-cy="cta-btn-docs"]')
        const shadow = await btn.evaluate(el => getComputedStyle(el).boxShadow)
        // glow-primary references the action-primary purple at .5 alpha
        expect(shadow).not.toBe('none')
        expect(shadow).toContain('124, 58, 237')
    })

    // ── 7. No raw i18n key leakage ─────────────────────────────────────────

    test('no raw i18n key appears in the section text', async ({ page }) => {
        const section = page.locator('section.home-cta')
        const text = await section.textContent()
        expect(text).not.toContain('home.cta.')
    })

    // ── 8. No legacy manual-copy artefacts ─────────────────────────────────

    test('no leftover manual copy button (replaced by OrigamCode)', async ({ page }) => {
        await expect(page.locator('[data-cy="cta-copy-btn"]')).toHaveCount(0)
    })
})
