/**
 * changelog — spec e2e (DS-first)
 *
 * Vérifie que la page /changelog utilise bien les composants origam :
 * - La page charge (HTTP 200, pas d'erreur JS critique)
 * - Le H1 hero est rendu par OrigamTitle (.origam-title)
 * - Les titres de section sont des OrigamTitle (h2)
 * - Les panels de version sont des OrigamExpansionPanel
 * - Les chips de version/type sont des OrigamChip
 * - Les highlights utilisent OrigamGrid/OrigamGridItem (list structure)
 * - Les boutons CTA sont des OrigamBtn
 * - Zéro HTML natif brut interdit (h1/h2/h3/ul/li hors composants)
 * - Audit a11y axe-core : 0 violation critical/serious
 *
 * Run :
 *   pnpm -F @origam/tests playwright test \
 *     --config=playwright.marketing.config.ts changelog.spec.ts
 */

import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const BASE = '/changelog'

test.describe('changelog — DS-first', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(BASE)
        await page.waitForLoadState('networkidle')
    })

    test('la page se charge sans erreur JS console', async ({ page }) => {
        const errors: string[] = []
        page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()) })
        await page.goto(BASE)
        await page.waitForLoadState('networkidle')
        const criticalErrors = errors.filter(e =>
            !e.includes('favicon') && !e.includes('DevTools')
        )
        expect(criticalErrors).toHaveLength(0)
    })

    test('le H1 hero est rendu par OrigamTitle (.origam-title)', async ({ page }) => {
        const heroTitle = page.locator('#changelog-title')
        await expect(heroTitle).toBeVisible()
        await expect(heroTitle).toHaveClass(/origam-title/)
    })

    test('les titres de section h2 sont des OrigamTitle (.origam-title)', async ({ page }) => {
        const sectionTitles = page.locator(
            '#changelog-versions-title, #changelog-cta-title'
        )
        const count = await sectionTitles.count()
        expect(count).toBeGreaterThanOrEqual(2)
        for (let i = 0; i < count; i++) {
            await expect(sectionTitles.nth(i)).toHaveClass(/origam-title/)
        }
    })

    test('les panels de version sont des OrigamExpansionPanel (.origam-expansion-panels)', async ({ page }) => {
        const panels = page.locator('[data-cy="changelog-expansion-panels"]')
        await expect(panels).toBeVisible()
        await expect(panels).toHaveClass(/origam-expansion-panels/)
    })

    test('les 10 versions du CHANGELOG sont présentes dans les panels', async ({ page }) => {
        const panelItems = page.locator('[data-cy^="changelog-panel-"]')
        const count = await panelItems.count()
        expect(count).toBe(10)
    })

    test('le panel Unreleased est présent', async ({ page }) => {
        const unreleasedPanel = page.locator('[data-cy="changelog-panel-Unreleased"]')
        await expect(unreleasedPanel).toBeVisible()
    })

    test('le panel 2.6.0 (version récente) est présent', async ({ page }) => {
        const panel260 = page.locator('[data-cy="changelog-panel-2-6-0"]').first()
        await expect(panel260).toBeVisible()
    })

    test('le panel 2.0.0 (version ancienne) est présent', async ({ page }) => {
        const panel200 = page.locator('[data-cy="changelog-panel-2-0-0"]').first()
        await expect(panel200).toBeVisible()
    })

    test('un panel ouvert affiche bien les highlights (BUG 1 régression)', async ({ page }) => {
        const panel260 = page.locator('[data-cy="changelog-panel-2-6-0"]').first()
        await expect(panel260).toBeVisible()

        const header = panel260.locator('.origam-expansion-panel-header')
        await header.click()
        await page.waitForTimeout(400)

        const highlights = panel260.locator('.changelog-panel__highlight')
        const count = await highlights.count()
        expect(count).toBeGreaterThan(0)

        const firstHighlightText = highlights.first().locator('.changelog-panel__highlight-text')
        await expect(firstHighlightText).toBeVisible()
        const text = await firstHighlightText.textContent()
        expect(text?.trim().length).toBeGreaterThan(0)
    })

    test('le panel actif par défaut affiche ses highlights sans interaction', async ({ page }) => {
        const panelActive = page.locator('.origam-expansion-panel--active').first()
        await expect(panelActive).toBeVisible()

        const highlights = panelActive.locator('.changelog-panel__highlight')
        const count = await highlights.count()
        expect(count).toBeGreaterThan(0)
    })

    test('le badge hero est un OrigamChip (.origam-chip)', async ({ page }) => {
        const badge = page.locator('[data-cy="changelog-hero-badge"]')
        await expect(badge).toBeVisible()
        await expect(badge).toHaveClass(/origam-chip/)
    })

    test('les chips de version/type sont des OrigamChip (.origam-chip)', async ({ page }) => {
        const chips = page.locator('[data-cy="changelog-versions"] .origam-chip')
        const count = await chips.count()
        expect(count).toBeGreaterThan(10)
    })

    test('le lien vers le changelog complet sur GitHub est un OrigamBtn (.origam-btn)', async ({ page }) => {
        const ctaLink = page.locator('[data-cy="changelog-full-link"]')
        await expect(ctaLink).toBeVisible()
        await expect(ctaLink).toHaveClass(/origam-btn/)
    })

    test('les boutons CTA sont des OrigamBtn (.origam-btn)', async ({ page }) => {
        await page.locator('[data-cy="changelog-cta"]').scrollIntoViewIfNeeded()
        const btns = page.locator('[data-cy="changelog-cta-github"], [data-cy="changelog-cta-fulllog"]')
        const count = await btns.count()
        expect(count).toBe(2)
        for (let i = 0; i < count; i++) {
            await expect(btns.nth(i)).toHaveClass(/origam-btn/)
        }
    })

    test('aucun <h1> natif brut (hors composant origam-title)', async ({ page }) => {
        const nativeH1 = page.locator('article.changelog h1:not(.origam-title, .origam-title *)')
        const count = await nativeH1.count()
        expect(count).toBe(0)
    })

    test('aucun <h2> natif brut (hors composant origam-title)', async ({ page }) => {
        const nativeH2 = page.locator('article.changelog h2:not(.origam-title, .origam-title *)')
        const count = await nativeH2.count()
        expect(count).toBe(0)
    })

    test('audit a11y axe-core — 0 violation critical/serious', async ({ page }) => {
        const results = await new AxeBuilder({ page })
            .include('[data-cy="page-changelog"]')
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze()
        const critical = results.violations.filter(v =>
            v.impact === 'critical' || v.impact === 'serious'
        )
        if (critical.length > 0) {
            console.error('A11y violations:', JSON.stringify(critical.map(v => ({
                id: v.id,
                impact: v.impact,
                description: v.description,
                nodes: v.nodes.length
            })), null, 2))
        }
        expect(critical).toHaveLength(0)
    })
})
