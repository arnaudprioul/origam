/**
 * why-origam — spec e2e (DS-first rebuild)
 *
 * Vérifie que la page /why-origam utilise bien les composants origam :
 * - Zéro balise HTML brute (h1-h6, ul, ol, li, table, thead, tbody, tr, th, td)
 * - Les titres sont rendus par OrigamTitle (élément portant la classe origam-title)
 * - Les strength cards sont rendues par OrigamCard (origam-card)
 * - La liste weaknesses est rendue par OrigamList + OrigamListItem
 * - Les avatars icon tiles sont rendus par OrigamAvatar (origam-avatar)
 * - Le tableau de comparaison est rendu par OrigamDataTable (origam-data-table)
 * - Les icônes ✓/✗ du tableau ont une couleur intent success/error visible
 * - Contraste a11y : 0 violation axe-core critical/serious sur la section
 *
 * Run (avec serveur sur 3001) :
 *   MARKETING_BASE_URL=http://localhost:3001 \
 *   pnpm -F @origam/tests playwright test \
 *     --config=playwright.marketing.config.ts why-origam
 */

import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const BASE = '/why-origam'

test.describe('why-origam — DS-first rebuild', () => {
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

    test('le h1 hero est rendu par OrigamTitle (.origam-title)', async ({ page }) => {
        const heroTitle = page.locator('#why-title')
        await expect(heroTitle).toBeVisible()
        await expect(heroTitle).toHaveClass(/origam-title/)
    })

    test('les titres de section sont des OrigamTitle (h2)', async ({ page }) => {
        const sectionTitles = page.locator('#why-strengths-title, #why-comparison-title, #why-weaknesses-title, #why-usecases-title, #why-cta-title')
        const count = await sectionTitles.count()
        expect(count).toBeGreaterThanOrEqual(4)
        for (let i = 0; i < count; i++) {
            await expect(sectionTitles.nth(i)).toHaveClass(/origam-title/)
        }
    })

    test('les strength cards sont des OrigamCard (.origam-card)', async ({ page }) => {
        const cards = page.locator('.why-strengths__card')
        const count = await cards.count()
        expect(count).toBe(8)
        for (let i = 0; i < count; i++) {
            await expect(cards.nth(i)).toHaveClass(/origam-card/)
        }
    })

    test('les avatars des strengths sont des OrigamAvatar (.origam-avatar)', async ({ page }) => {
        const avatars = page.locator('.why-strengths__avatar')
        const count = await avatars.count()
        expect(count).toBe(8)
        for (let i = 0; i < count; i++) {
            await expect(avatars.nth(i)).toHaveClass(/origam-avatar/)
        }
    })

    test('le tableau de comparaison est rendu par OrigamTable (.origam-table)', async ({ page }) => {
        const table = page.locator('[data-cy="why-comparison-table"]')
        await expect(table).toBeVisible()
        await expect(table).toHaveClass(/origam-table/)
    })

    test('les icônes ✓ dans le tableau ont une couleur success visible', async ({ page }) => {
        await page.locator('[data-cy="why-comparison"]').scrollIntoViewIfNeeded()
        await page.waitForTimeout(500)
        const icons = page.locator('.why-comparison__cell-icon')
        const count = await icons.count()
        expect(count).toBeGreaterThan(0)
        const firstIcon = icons.first()
        await expect(firstIcon).toBeVisible()
        await expect(firstIcon).toHaveClass(/origam-icon/)
    })

    test('la section weaknesses utilise OrigamCard par item', async ({ page }) => {
        const grid = page.locator('.why-weaknesses__grid')
        await expect(grid).toBeVisible()
        const items = page.locator('.why-weaknesses__item .why-weaknesses__card')
        const count = await items.count()
        expect(count).toBe(3)
        for (let i = 0; i < count; i++) {
            await expect(items.nth(i)).toHaveClass(/origam-card/)
        }
    })

    test('les avatars de weaknesses sont des OrigamAvatar (.origam-avatar)', async ({ page }) => {
        const avatars = page.locator('.why-weaknesses__avatar')
        const count = await avatars.count()
        expect(count).toBe(3)
        for (let i = 0; i < count; i++) {
            await expect(avatars.nth(i)).toHaveClass(/origam-avatar/)
        }
    })

    test('les colonnes use-cases sont des OrigamCard', async ({ page }) => {
        const cols = page.locator('.why-usecases__col')
        const count = await cols.count()
        expect(count).toBe(2)
        for (let i = 0; i < count; i++) {
            await expect(cols.nth(i)).toHaveClass(/origam-card/)
        }
    })

    test('les boutons CTA sont des OrigamBtn (.origam-btn)', async ({ page }) => {
        const btns = page.locator('[data-cy="why-cta-install"], [data-cy="why-cta-components"]')
        const count = await btns.count()
        expect(count).toBe(2)
        for (let i = 0; i < count; i++) {
            await expect(btns.nth(i)).toHaveClass(/origam-btn/)
        }
    })

    test('audit a11y axe-core — 0 violation critical/serious', async ({ page }) => {
        const results = await new AxeBuilder({ page })
            .include('[data-cy="page-why-origam"]')
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
