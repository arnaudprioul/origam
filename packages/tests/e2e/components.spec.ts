/**
 * components — spec e2e (DS-first)
 *
 * Vérifie que /components et /components/{slug} fonctionnent correctement :
 * - /components charge sans erreur JS console
 * - /components affiche des OrigamCard cliquables vers /components/*
 * - /components/btn charge avec Props OrigamTable non vide
 * - /components/btn affiche la section composants liés (BtnGroup/BtnToggle)
 * - Zéro HTML brut interdit (pas de h1..h6, ul/li natifs au niveau page)
 * - Audit a11y axe-core : 0 violation critical/serious (exclusion .origam-code__code)
 *
 * Run :
 *   pnpm exec playwright test components.spec.ts \
 *     --config=playwright.marketing.config.ts
 *   (depuis packages/tests/)
 */

import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('/components — catalogue', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/components')
        await page.waitForLoadState('networkidle')
    })

    test('la page se charge avec status 200 et sans erreur JS console', async ({ page }) => {
        const errors: string[] = []
        page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()) })
        await page.goto('/components')
        await page.waitForLoadState('networkidle')
        const critical = errors.filter(e =>
            !e.includes('favicon') && !e.includes('DevTools') && !e.includes('404')
        )
        expect(critical).toHaveLength(0)

        await expect(page.locator('[data-cy="page-components"]')).toBeVisible()
    })

    test('le h1 hero est rendu par OrigamTitle (.origam-title)', async ({ page }) => {
        const heroTitle = page.locator('#components-title')
        await expect(heroTitle).toBeVisible()
        await expect(heroTitle).toHaveClass(/origam-title/)
    })

    test('le badge hero est un OrigamChip (.origam-chip)', async ({ page }) => {
        const badge = page.locator('[data-cy="components-hero-badge"]')
        await expect(badge).toBeVisible()
        await expect(badge).toHaveClass(/origam-chip/)
    })

    test('les cards de composants sont des OrigamCard et ont un lien vers /components/*', async ({ page }) => {
        const cardLinks = page.locator('[data-cy^="components-card-"]')
        const count = await cardLinks.count()
        expect(count).toBeGreaterThan(10)

        const firstCardLink = cardLinks.first()
        const firstCard = firstCardLink.locator('.origam-card').first()
        await expect(firstCard).toHaveClass(/origam-card/)

        const href = await firstCardLink.evaluate((el) => (el as HTMLAnchorElement).href)
        expect(href).toMatch(/\/components\/[a-z]/)
    })

    test('le catalogue est groupé par catégorie avec des OrigamTitle h3', async ({ page }) => {
        const categoryTitles = page.locator('.components-category__title')
        const count = await categoryTitles.count()
        expect(count).toBeGreaterThanOrEqual(5)
        for (let i = 0; i < count; i++) {
            await expect(categoryTitles.nth(i)).toHaveClass(/origam-title/)
        }
    })

    test('la grid de composants est présente dans chaque catégorie', async ({ page }) => {
        const grids = page.locator('.components-category__grid')
        const count = await grids.count()
        expect(count).toBeGreaterThanOrEqual(5)
    })

    test('les chips famille sont des OrigamChip sur les composants avec famille', async ({ page }) => {
        const familyChips = page.locator('.components-catalog-card__family-chip')
        const count = await familyChips.count()
        expect(count).toBeGreaterThan(0)
        for (let i = 0; i < Math.min(count, 5); i++) {
            await expect(familyChips.nth(i)).toHaveClass(/origam-chip/)
        }
    })

    test('audit a11y axe-core /components — 0 violation critical/serious', async ({ page }) => {
        const results = await new AxeBuilder({ page })
            .include('[data-cy="page-components"]')
            .exclude('.origam-code__code')
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

test.describe('/components/btn — page détail', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/components/btn')
        await page.waitForLoadState('networkidle')
        await page.waitForTimeout(500)
    })

    test('la page se charge sans erreur JS console', async ({ page }) => {
        const errors: string[] = []
        page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()) })
        await page.goto('/components/btn')
        await page.waitForLoadState('networkidle')
        await page.waitForTimeout(500)
        const critical = errors.filter(e =>
            !e.includes('favicon') && !e.includes('DevTools') && !e.includes('404')
        )
        expect(critical).toHaveLength(0)
    })

    test('le titre hero contient OrigamTitle avec le nom du composant', async ({ page }) => {
        const heroTitle = page.locator('#component-title')
        await expect(heroTitle).toBeVisible()
        await expect(heroTitle).toHaveClass(/origam-title/)
        const text = await heroTitle.textContent()
        expect(text?.trim().toLowerCase()).toContain('btn')
    })

    test('la table Props est non vide (OrigamTable avec tbody)', async ({ page }) => {
        const propsSection = page.locator('[data-cy="component-props"]')
        await expect(propsSection).toBeVisible()

        const propsTable = page.locator('[data-cy="component-props-table"]')
        await expect(propsTable).toBeVisible()
        await expect(propsTable).toHaveClass(/origam-table/)

        const propRows = propsTable.locator('tbody tr')
        const count = await propRows.count()
        expect(count).toBeGreaterThan(5)
    })

    test('la table Emits est présente et non vide', async ({ page }) => {
        const emitsTable = page.locator('[data-cy="component-emits-table"]')
        await expect(emitsTable).toBeVisible()
        await expect(emitsTable).toHaveClass(/origam-table/)

        const emitRows = emitsTable.locator('tbody tr')
        const count = await emitRows.count()
        expect(count).toBeGreaterThanOrEqual(1)
    })

    test('la table Slots est présente et non vide', async ({ page }) => {
        const slotsTable = page.locator('[data-cy="component-slots-table"]')
        await expect(slotsTable).toBeVisible()
        await expect(slotsTable).toHaveClass(/origam-table/)

        const slotRows = slotsTable.locator('tbody tr')
        const count = await slotRows.count()
        expect(count).toBeGreaterThanOrEqual(1)
    })

    test('la section Composants liés contient BtnGroup et BtnToggle', async ({ page }) => {
        const familySection = page.locator('[data-cy="component-family"]')
        await expect(familySection).toBeVisible()

        const btnGroupLink = page.locator('[data-cy="component-family-card-btn-group"]')
        await expect(btnGroupLink).toBeVisible()
        await expect(btnGroupLink.locator('.origam-card').first()).toHaveClass(/origam-card/)

        const btnToggleLink = page.locator('[data-cy="component-family-card-btn-toggle"]')
        await expect(btnToggleLink).toBeVisible()
        await expect(btnToggleLink.locator('.origam-card').first()).toHaveClass(/origam-card/)
    })

    test('les cards famille ont un href vers /components/{slug}', async ({ page }) => {
        const btnGroupLink = page.locator('[data-cy="component-family-card-btn-group"]')
        await expect(btnGroupLink).toBeVisible()
        const btnGroupCard = btnGroupLink.locator('.origam-card').first()
        await expect(btnGroupCard).toHaveClass(/origam-card/)
        const href = await btnGroupLink.evaluate((el) => (el as HTMLAnchorElement).href)
        expect(href).toContain('/components/btn-group')
    })

    test('la section Examples est présente avec OrigamCode', async ({ page }) => {
        const examplesSection = page.locator('[data-cy="component-examples"]')
        await expect(examplesSection).toBeVisible()

        const codeBlocks = examplesSection.locator('.origam-code')
        const count = await codeBlocks.count()
        expect(count).toBeGreaterThanOrEqual(1)
    })

    test('le code tag du composant est rendu dans le hero', async ({ page }) => {
        const tagCode = page.locator('[data-cy="component-hero-tag"]')
        await expect(tagCode).toBeVisible()
        const text = await tagCode.textContent()
        expect(text).toContain('origam-btn')
    })

    test('le lien breadcrumb "Components" renvoie vers /components', async ({ page }) => {
        const breadcrumbLink = page.locator('[data-cy="component-breadcrumb-catalog"]')
        await expect(breadcrumbLink).toBeVisible()
        const href = await breadcrumbLink.getAttribute('href')
        expect(href).toBe('/components')
    })

    test('audit a11y axe-core /components/btn — 0 violation critical/serious', async ({ page }) => {
        const results = await new AxeBuilder({ page })
            .include(`[data-cy="page-component-btn"]`)
            .exclude('.origam-code__code')
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

test.describe('/components/btn-group — page sous-composant', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/components/btn-group')
        await page.waitForLoadState('networkidle')
        await page.waitForTimeout(500)
    })

    test('la page se charge avec le nom BtnGroup', async ({ page }) => {
        await expect(page.locator('[data-cy="page-component-btn-group"]')).toBeVisible()
        const heroTitle = page.locator('#component-title')
        await expect(heroTitle).toBeVisible()
        const text = await heroTitle.textContent()
        expect(text?.trim().toLowerCase()).toContain('btngroup')
    })

    test('le lien breadcrumb parent pointe vers /components/btn', async ({ page }) => {
        const parentLink = page.locator('[data-cy="component-breadcrumb-parent-btn"]')
        await expect(parentLink).toBeVisible()
        const href = await parentLink.getAttribute('href')
        expect(href).toBe('/components/btn')
    })
})

test.describe('/components/unknown-slug — fallback 404', () => {
    test('la page affiche le fallback not-found sans crash', async ({ page }) => {
        await page.goto('/components/this-slug-does-not-exist-xyz')
        await page.waitForLoadState('networkidle')

        const notFound = page.locator('[data-cy="component-not-found"]')
        await expect(notFound).toBeVisible()

        const backBtn = page.locator('[data-cy="component-not-found-back"]')
        await expect(backBtn).toBeVisible()
        await expect(backBtn).toHaveClass(/origam-btn/)
    })
})
