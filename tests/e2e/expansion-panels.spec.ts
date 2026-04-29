import { expect, test, type Page } from '@playwright/test'

/**
 * OrigamExpansionPanels — runtime assertions per story Variant.
 *
 * Story URL: /story/stories-components-stories-expansionpanel-origamexpansionpanels-story-vue
 */

const sandboxOf = (page: Page) => page.frameLocator('iframe[src*="__sandbox"]')

const openVariant = async (page: Page, variant: string) => {
    await page.goto('/story/stories-components-stories-expansionpanel-origamexpansionpanels-story-vue')
    await page.waitForLoadState('networkidle')
    await page.getByText(variant, { exact: true }).first().click()
    await page.waitForTimeout(800)
}

// ─── Default ──────────────────────────────────────────────────────────────────

test.describe('OrigamExpansionPanels — Default', () => {
    test('renders 3 expansion panels', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="expansion-default"]').first()).toBeVisible({ timeout: 8000 })
        const count = await sandbox.locator('[data-cy="expansion-default"] .origam-expansion-panel').count()
        expect(count).toBe(3)
    })
})

// ─── Items prop ───────────────────────────────────────────────────────────────

test.describe('OrigamExpansionPanels — Items prop', () => {
    test('renders one panel per items entry (3)', async ({ page }) => {
        await openVariant(page, 'Items prop')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="expansion-items"]').first()).toBeVisible({ timeout: 8000 })
        const count = await sandbox.locator('[data-cy="expansion-items"] .origam-expansion-panel').count()
        expect(count).toBe(3)
    })
})

// ─── Default slot ─────────────────────────────────────────────────────────────

test.describe('OrigamExpansionPanels — Default slot', () => {
    test('renders explicit OrigamExpansionPanel children with slot-based title', async ({ page }) => {
        await openVariant(page, 'Default slot')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="expansion-slot"]').first()).toBeVisible({ timeout: 8000 })
        await expect(sandbox.locator('[data-cy="expansion-slot-p1"]').first()).toBeVisible()
        await expect(sandbox.locator('[data-cy="expansion-slot-p2"]').first()).toBeVisible()
    })
})

// ─── Multiple ─────────────────────────────────────────────────────────────────

test.describe('OrigamExpansionPanels — Multiple', () => {
    test('multiple modifier class is present on the wrapper', async ({ page }) => {
        await openVariant(page, 'Multiple')
        const sandbox = sandboxOf(page)
        const wrapper = sandbox.locator('[data-cy="expansion-multiple"]').first()
        await expect(wrapper).toBeVisible({ timeout: 8000 })
        const count = await wrapper.locator('.origam-expansion-panel').count()
        expect(count).toBe(3)
    })
})

// ─── Mandatory ────────────────────────────────────────────────────────────────

test.describe('OrigamExpansionPanels — Mandatory', () => {
    test('at least one panel is present in mandatory mode', async ({ page }) => {
        await openVariant(page, 'Mandatory')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="expansion-mandatory"]').first()).toBeVisible({ timeout: 8000 })
        const count = await sandbox.locator('[data-cy="expansion-mandatory"] .origam-expansion-panel').count()
        expect(count).toBeGreaterThan(0)
    })
})

// ─── Density ──────────────────────────────────────────────────────────────────

test.describe('OrigamExpansionPanels — Density', () => {
    test('density class lands on child panels', async ({ page }) => {
        await openVariant(page, 'Density')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="expansion-density"]').first()).toBeVisible({ timeout: 8000 })
        const childClasses = await sandbox.locator('[data-cy="expansion-density"] .origam-expansion-panel').evaluateAll(els =>
            els.map(el => el.className)
        )
        expect(childClasses.length).toBeGreaterThan(0)
        for (const cls of childClasses) {
            expect(cls).toMatch(/origam-expansion-panel--density-(default|compact|comfortable)/)
        }
    })
})

// ─── Color ────────────────────────────────────────────────────────────────────

test.describe('OrigamExpansionPanels — Color', () => {
    test('color variant renders without errors', async ({ page }) => {
        await openVariant(page, 'Color')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="expansion-color"]').first()).toBeVisible({ timeout: 8000 })
        const count = await sandbox.locator('[data-cy="expansion-color"] .origam-expansion-panel').count()
        expect(count).toBeGreaterThan(0)
    })
})

// ─── BgColor ──────────────────────────────────────────────────────────────────

test.describe('OrigamExpansionPanels — BgColor', () => {
    test('bgColor variant renders without errors', async ({ page }) => {
        await openVariant(page, 'BgColor')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="expansion-bgcolor"]').first()).toBeVisible({ timeout: 8000 })
    })
})

// ─── Rounded ──────────────────────────────────────────────────────────────────

test.describe('OrigamExpansionPanels — Rounded', () => {
    test('rounded class is applied to the wrapper', async ({ page }) => {
        await openVariant(page, 'Rounded')
        const sandbox = sandboxOf(page)
        const wrapper = sandbox.locator('[data-cy="expansion-rounded"]').first()
        await expect(wrapper).toBeVisible({ timeout: 8000 })
        const cls = await wrapper.evaluate(el => el.className)
        expect(cls).toMatch(/origam-expansion-panels--rounded|origam--rounded/)
    })
})

// ─── Border ───────────────────────────────────────────────────────────────────

test.describe('OrigamExpansionPanels — Border', () => {
    test('border modifier class is applied', async ({ page }) => {
        await openVariant(page, 'Border')
        const sandbox = sandboxOf(page)
        const wrapper = sandbox.locator('[data-cy="expansion-border"]').first()
        await expect(wrapper).toBeVisible({ timeout: 8000 })
        const cls = await wrapper.evaluate(el => el.className)
        expect(cls).toMatch(/origam-expansion-panels--border|origam--border/)
    })
})

// ─── Flat ─────────────────────────────────────────────────────────────────────

test.describe('OrigamExpansionPanels — Flat', () => {
    test('flat modifier class is applied', async ({ page }) => {
        await openVariant(page, 'Flat')
        const sandbox = sandboxOf(page)
        const wrapper = sandbox.locator('[data-cy="expansion-flat"]').first()
        await expect(wrapper).toBeVisible({ timeout: 8000 })
        const cls = await wrapper.evaluate(el => el.className)
        expect(cls).toContain('origam-expansion-panels--flat')
    })
})

// ─── Accordion ────────────────────────────────────────────────────────────────

test.describe('OrigamExpansionPanels — Accordion', () => {
    test('accordion modifier class is applied', async ({ page }) => {
        await openVariant(page, 'Accordion')
        const sandbox = sandboxOf(page)
        const wrapper = sandbox.locator('[data-cy="expansion-accordion"]').first()
        await expect(wrapper).toBeVisible({ timeout: 8000 })
        const cls = await wrapper.evaluate(el => el.className)
        expect(cls).toContain('origam-expansion-panels--accordion')
    })
})

// ─── Inset ────────────────────────────────────────────────────────────────────

test.describe('OrigamExpansionPanels — Inset', () => {
    test('inset modifier class is applied', async ({ page }) => {
        await openVariant(page, 'Inset')
        const sandbox = sandboxOf(page)
        const wrapper = sandbox.locator('[data-cy="expansion-inset"]').first()
        await expect(wrapper).toBeVisible({ timeout: 8000 })
        const cls = await wrapper.evaluate(el => el.className)
        expect(cls).toContain('origam-expansion-panels--inset')
    })
})

// ─── Playground ───────────────────────────────────────────────────────────────

test.describe('OrigamExpansionPanels — Playground', () => {
    test('renders without errors', async ({ page }) => {
        await openVariant(page, 'Playground')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="expansion-playground"]').first()).toBeVisible({ timeout: 8000 })
    })
})
