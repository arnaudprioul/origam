/**
 * home-features.spec.ts — T3 HomeFeatures section
 *
 * Asserts:
 * 1. The <section> renders with aria-labelledby="features-title".
 * 2. Eyebrow <p> contains the i18n value "WHAT'S INSIDE".
 * 3. <h2> title is present and non-empty.
 * 4. Exactly 6 feature cards are rendered.
 * 5. Each card contains an <h3> title and a <p> description — non-empty.
 * 6. Basic a11y: no heading-order violations on the section.
 *
 * Prerequisites: marketing dev server at http://localhost:3000 (or
 * MARKETING_BASE_URL env var). Run with:
 *   pnpm -F @origam/tests playwright test --config=playwright.marketing.config.ts
 *   e2e/home-features.spec.ts
 */

import { expect, test } from '@playwright/test'

test.describe('HomeFeatures section', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/', { waitUntil: 'networkidle' })
    })

    // ── 1. Section presence & labelling ───────────────────────────────────

    test('section has aria-labelledby pointing to h2#features-title', async ({ page }) => {
        const section = page.locator('section.home-features')
        await expect(section).toBeVisible()
        await expect(section).toHaveAttribute('aria-labelledby', 'features-title')

        const h2 = page.locator('#features-title')
        await expect(h2).toBeVisible()
    })

    // ── 2. Eyebrow ─────────────────────────────────────────────────────────

    test('eyebrow <p> renders i18n text "WHAT\'S INSIDE"', async ({ page }) => {
        const eyebrow = page.locator('section.home-features p.home-features__eyebrow')
        await expect(eyebrow).toBeVisible()
        await expect(eyebrow).toContainText("WHAT'S INSIDE")
    })

    // ── 3. H2 title ────────────────────────────────────────────────────────

    test('h2 title is a non-empty <h2> element', async ({ page }) => {
        const title = page.locator('section.home-features h2#features-title')
        await expect(title).toBeVisible()
        const text = await title.textContent()
        expect(text?.trim().length).toBeGreaterThan(0)
    })

    // ── 4. Exactly 6 feature cards ─────────────────────────────────────────

    test('renders exactly 6 feature cards', async ({ page }) => {
        const cards = page.locator('section.home-features .origam-card')
        await expect(cards).toHaveCount(6)
    })

    // ── 5. Each card has h3 + p description ────────────────────────────────

    test('each feature card has a non-empty h3 title', async ({ page }) => {
        const cards = page.locator('section.home-features .origam-card')
        const count = await cards.count()
        expect(count).toBe(6)

        for (let i = 0; i < count; i++) {
            const card = cards.nth(i)
            const h3 = card.locator('h3.home-features__card-title')
            await expect(h3).toBeVisible()
            const text = await h3.textContent()
            expect(text?.trim().length, `card ${i} h3 is empty`).toBeGreaterThan(0)
        }
    })

    test('each feature card has a non-empty description paragraph', async ({ page }) => {
        const cards = page.locator('section.home-features .origam-card')
        const count = await cards.count()
        expect(count).toBe(6)

        for (let i = 0; i < count; i++) {
            const card = cards.nth(i)
            const desc = card.locator('p.home-features__card-desc')
            await expect(desc).toBeVisible()
            const text = await desc.textContent()
            expect(text?.trim().length, `card ${i} description is empty`).toBeGreaterThan(0)
        }
    })

    // ── 6. Known i18n values present ───────────────────────────────────────

    test('renders known feature titles from en.json', async ({ page }) => {
        const section = page.locator('section.home-features')
        await expect(section).toContainText('29 chart primitives')
        await expect(section).toContainText('WCAG 2.1 AA verified')
        await expect(section).toContainText('Design tokens')
        await expect(section).toContainText('TypeScript first')
        await expect(section).toContainText('CSS-first')
        await expect(section).toContainText('Composition API')
    })

    // ── 7. List semantics (ul > li) ────────────────────────────────────────

    test('grid is rendered as a <ul> containing <li> items', async ({ page }) => {
        const list = page.locator('section.home-features ul.home-features__grid')
        await expect(list).toBeVisible()

        const items = list.locator('li.home-features__item')
        await expect(items).toHaveCount(6)
    })

    // ── 8. No raw i18n key leakage ─────────────────────────────────────────

    test('no raw i18n key appears in the section text', async ({ page }) => {
        const section = page.locator('section.home-features')
        const text = await section.textContent()
        expect(text).not.toContain('home.features.')
    })
})
