/**
 * home-showcase.spec.ts — T5 HomeShowcase section
 *
 * Asserts:
 * 1. The <section> renders with aria-labelledby="showcase-title".
 * 2. Eyebrow <p> contains the i18n fallback "SHOWCASE".
 * 3. <h2> title is present and non-empty.
 * 4. "View all" link points to /components.
 * 5. Data table is rendered with exactly 5 rows (tbody > tr).
 * 6. Data table headers contain Name, Owner, Status columns.
 * 7. Sparkline chart SVG is present.
 * 8. Exactly 3 switch inputs are rendered.
 * 9. Exactly 6 chip elements are rendered.
 * 10. AvatarGroup is rendered with at least one avatar.
 * 11. No raw i18n key leaks into the section text.
 * 12. Basic a11y: section landmark has an accessible name.
 *
 * Prerequisites: marketing dev server at http://localhost:3000 (or
 * MARKETING_BASE_URL env var). Run with:
 *   pnpm -F @origam/tests playwright test --config=playwright.marketing.config.ts
 *   e2e/home-showcase.spec.ts
 */

import { expect, test } from '@playwright/test'

test.describe('HomeShowcase section', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/', { waitUntil: 'networkidle' })
    })

    // ── 1. Section presence & labelling ───────────────────────────────────

    test('section has aria-labelledby pointing to h2#showcase-title', async ({ page }) => {
        const section = page.locator('section.home-showcase')
        await expect(section).toBeVisible()
        await expect(section).toHaveAttribute('aria-labelledby', 'showcase-title')

        const h2 = page.locator('#showcase-title')
        await expect(h2).toBeVisible()
    })

    // ── 2. Eyebrow ─────────────────────────────────────────────────────────

    test('eyebrow <p> renders i18n text "SHOWCASE"', async ({ page }) => {
        const eyebrow = page.locator('section.home-showcase p.home-showcase__eyebrow')
        await expect(eyebrow).toBeVisible()
        await expect(eyebrow).toContainText('SHOWCASE')
    })

    // ── 3. H2 title ────────────────────────────────────────────────────────

    test('h2 title is a non-empty <h2> element', async ({ page }) => {
        // OrigamTitle renders the <h2> and now carries the aria-target `id`
        // on that <h2> root directly (DS fix).
        const h2 = page.locator('section.home-showcase h2#showcase-title')
        await expect(h2).toBeVisible()
        const text = await h2.textContent()
        expect(text?.trim().length).toBeGreaterThan(0)
    })

    // ── 4. View all link ───────────────────────────────────────────────────

    test('"View all" link points to /components', async ({ page }) => {
        const link = page.locator('section.home-showcase a[data-cy="showcase-view-all"]')
        await expect(link).toBeVisible()
        await expect(link).toHaveAttribute('href', '/components')
        const text = await link.textContent()
        expect(text?.trim().length).toBeGreaterThan(0)
    })

    // ── 5. Data table — 5 rows ─────────────────────────────────────────────

    test('data table renders exactly 5 data rows', async ({ page }) => {
        const table = page.locator('[data-cy="showcase-data-table"]')
        await expect(table).toBeVisible()

        const rows = table.locator('tbody tr')
        await expect(rows).toHaveCount(5)
    })

    // ── 6. Data table headers ──────────────────────────────────────────────

    test('data table headers contain Name, Owner and Status columns', async ({ page }) => {
        const table = page.locator('[data-cy="showcase-data-table"]')
        await expect(table).toContainText('Name')
        await expect(table).toContainText('Owner')
        await expect(table).toContainText('Status')
    })

    // ── 7. Data table content — known row values ───────────────────────────

    test('data table contains expected row data', async ({ page }) => {
        const table = page.locator('[data-cy="showcase-data-table"]')
        await expect(table).toContainText('Aurora release')
        await expect(table).toContainText('Arnaud')
        await expect(table).toContainText('Tokens v2')
        await expect(table).toContainText('Léa')
        await expect(table).toContainText('A11y audit')
        await expect(table).toContainText('Chart engine')
        await expect(table).toContainText('New theme')
    })

    // ── 8. Sparkline chart ─────────────────────────────────────────────────

    test('sparkline SVG is rendered inside the chart widget', async ({ page }) => {
        const sparkline = page.locator('[data-cy="showcase-sparkline"]')
        await expect(sparkline).toBeVisible()

        const svg = sparkline.locator('svg')
        await expect(svg).toBeVisible()
    })

    // ── 9. Switch — 3 variants ─────────────────────────────────────────────

    test('renders exactly 3 switch inputs', async ({ page }) => {
        const switches = page.locator('section.home-showcase input[type="checkbox"]')
        await expect(switches).toHaveCount(3)
    })

    // ── 10. Chips — 6 intents ──────────────────────────────────────────────

    test('renders exactly 6 chips', async ({ page }) => {
        const chips = page.locator('[data-cy="showcase-chip-group"] .origam-chip')
        await expect(chips).toHaveCount(6)
    })

    test('chip intents are all represented', async ({ page }) => {
        const chipGroup = page.locator('[data-cy="showcase-chip-group"]')
        await expect(chipGroup).toBeVisible()
        await expect(chipGroup).toContainText('Primary')
        await expect(chipGroup).toContainText('Neutral')
        await expect(chipGroup).toContainText('Success')
        await expect(chipGroup).toContainText('Warning')
        await expect(chipGroup).toContainText('Danger')
        await expect(chipGroup).toContainText('Info')
    })

    // ── 11. Avatar group ───────────────────────────────────────────────────

    test('avatar group renders with visible avatars', async ({ page }) => {
        const group = page.locator('[data-cy="showcase-avatar-group"]')
        await expect(group).toBeVisible()

        const avatars = group.locator('.origam-avatar')
        const count = await avatars.count()
        expect(count).toBeGreaterThanOrEqual(1)
    })

    // ── 12. Grid semantic list ─────────────────────────────────────────────

    test('showcase grid is a <ul> containing <li> items', async ({ page }) => {
        const list = page.locator('section.home-showcase ul.home-showcase__grid')
        await expect(list).toBeVisible()

        const items = list.locator('li.home-showcase__item')
        const count = await items.count()
        expect(count).toBeGreaterThanOrEqual(5)
    })

    // ── 13. No raw i18n key leakage ────────────────────────────────────────

    test('no raw i18n key appears in the section text', async ({ page }) => {
        const section = page.locator('section.home-showcase')
        const text = await section.textContent()
        expect(text).not.toContain('home.showcase.')
    })
})
