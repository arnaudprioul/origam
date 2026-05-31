/**
 * HomeKpis — spec e2e T2
 *
 * Asserts :
 *  1. La section #kpis est présente dans le DOM avec aria-labelledby="kpis-title".
 *  2. Le titre <h2> "origam by the numbers" est visible.
 *  3. La liste de stats est un <dl>.
 *  4. Les 5 paires valeur/label sont rendues (<dd> + <dt>).
 *  5. Les valeurs attendues sont exactement : 95 · 29 · 100% · <50kb · MIT.
 *  6. Les labels attendus sont présents.
 *  7. A11y de base : pas de violation axe-core sur la section.
 *
 * Run :
 *   pnpm -F @origam/tests playwright test \
 *     --config=playwright.marketing.config.ts home-kpis
 *
 * Pré-requis : dev server marketing sur http://localhost:3000.
 */

import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const BASE = '/'

const EXPECTED_VALUES = ['95', '29', '100%', '<50kb', 'MIT']
const EXPECTED_LABELS = ['Components', 'Chart primitives', 'WCAG 2.1 AA', 'Tree-shakable', 'Open source']

test.describe('HomeKpis — T2', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(BASE)
        await page.waitForLoadState('networkidle')
    })

    test('section #kpis est dans le DOM avec aria-labelledby', async ({ page }) => {
        const section = page.locator('#kpis')
        await expect(section).toBeAttached()
        await expect(section).toHaveAttribute('aria-labelledby', 'kpis-title')
    })

    test('<h2> titre "origam by the numbers" est visible', async ({ page }) => {
        const heading = page.locator('#kpis h2#kpis-title')
        await expect(heading).toBeVisible()
        await expect(heading).toHaveText('origam by the numbers')
    })

    test('la liste de stats est un <dl>', async ({ page }) => {
        const dl = page.locator('#kpis dl')
        await expect(dl).toBeAttached()
    })

    test('5 items <dd> (valeurs) présents', async ({ page }) => {
        const dds = page.locator('#kpis dd')
        await expect(dds).toHaveCount(5)
    })

    test('5 items <dt> (labels) présents', async ({ page }) => {
        const dts = page.locator('#kpis dt')
        await expect(dts).toHaveCount(5)
    })

    for (const value of EXPECTED_VALUES) {
        test(`valeur "${value}" est rendue dans un <dd>`, async ({ page }) => {
            const dd = page.locator(`#kpis dd`).filter({ hasText: value })
            await expect(dd).toBeVisible()
        })
    }

    for (const label of EXPECTED_LABELS) {
        test(`label "${label}" est rendu dans un <dt>`, async ({ page }) => {
            const dt = page.locator(`#kpis dt`).filter({ hasText: label })
            await expect(dt).toBeVisible()
        })
    }

    test('a11y — pas de violation axe-core critique sur la section kpis', async ({ page }) => {
        const results = await new AxeBuilder({ page })
            .include('#kpis')
            .analyze()

        const critical = results.violations.filter(v => v.impact === 'critical' || v.impact === 'serious')

        expect(
            critical,
            `a11y violations critiques/sérieuses sur #kpis :\n` +
            critical.map(v => `  [${v.impact}] ${v.id}: ${v.description}`).join('\n')
        ).toHaveLength(0)
    })

})
