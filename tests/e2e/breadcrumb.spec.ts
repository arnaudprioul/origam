import { expect, test, type Page } from '@playwright/test'

/**
 * OrigamBreadcrumb — runtime assertions per story Variant.
 *
 * Story URL: /story/stories-components-stories-breadcrumb-origambreadcrumb-story-vue
 */

const sandboxOf = (page: Page) => page.frameLocator('iframe[src*="__sandbox"]')

const openVariant = async (page: Page, variant: string) => {
    await page.goto('/story/stories-components-stories-breadcrumb-origambreadcrumb-story-vue')
    await page.waitForLoadState('networkidle')
    await page.getByText(variant, { exact: true }).first().click()
    await page.waitForTimeout(800)
}

// ─── Default ──────────────────────────────────────────────────────────────────

test.describe('OrigamBreadcrumb — Default', () => {
    test('renders breadcrumb with items', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="breadcrumb-default"]').first()).toBeVisible({ timeout: 8000 })
        const count = await sandbox.locator('[data-cy="breadcrumb-default"] .origam-breadcrumb-item').count()
        expect(count).toBeGreaterThan(0)
    })
})

// ─── Items prop ───────────────────────────────────────────────────────────────

test.describe('OrigamBreadcrumb — Items prop', () => {
    test('renders 3 items from the items prop', async ({ page }) => {
        await openVariant(page, 'Items prop')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="breadcrumb-items"]').first()).toBeVisible({ timeout: 8000 })
        const count = await sandbox.locator('[data-cy="breadcrumb-items"] .origam-breadcrumb-item').count()
        expect(count).toBe(3)
    })
})

// ─── Default slot ─────────────────────────────────────────────────────────────

test.describe('OrigamBreadcrumb — Default slot (explicit children)', () => {
    test('renders OrigamBreadcrumbItem children in the default slot', async ({ page }) => {
        await openVariant(page, 'Default slot')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="breadcrumb-slot"]').first()).toBeVisible({ timeout: 8000 })
        await expect(sandbox.locator('[data-cy="breadcrumb-slot-home"]').first()).toBeVisible()
        await expect(sandbox.locator('[data-cy="breadcrumb-slot-section"]').first()).toBeVisible()
        await expect(sandbox.locator('[data-cy="breadcrumb-slot-current"]').first()).toBeVisible()
    })

    test('renders OrigamBreadcrumbDivider children in the default slot', async ({ page }) => {
        await openVariant(page, 'Default slot')
        const sandbox = sandboxOf(page)
        const dividers = await sandbox.locator('[data-cy^="breadcrumb-slot-div"]').count()
        expect(dividers).toBeGreaterThanOrEqual(2)
    })
})

// ─── Density ──────────────────────────────────────────────────────────────────

test.describe('OrigamBreadcrumb — Density', () => {
    test('density class lands on breadcrumb items', async ({ page }) => {
        await openVariant(page, 'Density')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="breadcrumb-density"]').first()).toBeVisible({ timeout: 8000 })
        const childClasses = await sandbox.locator('[data-cy="breadcrumb-density"] .origam-breadcrumb-item').evaluateAll(els =>
            els.map(el => el.className)
        )
        expect(childClasses.length).toBeGreaterThan(0)
        for (const cls of childClasses) {
            expect(cls).toMatch(/origam-breadcrumb-item--density-(default|compact|comfortable)/)
        }
    })
})

// ─── Color ────────────────────────────────────────────────────────────────────

test.describe('OrigamBreadcrumb — Color', () => {
    test('color variant renders without errors', async ({ page }) => {
        await openVariant(page, 'Color')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="breadcrumb-color"]').first()).toBeVisible({ timeout: 8000 })
        const count = await sandbox.locator('[data-cy="breadcrumb-color"] .origam-breadcrumb-item').count()
        expect(count).toBeGreaterThan(0)
    })
})

// ─── Rounded ──────────────────────────────────────────────────────────────────

test.describe('OrigamBreadcrumb — Rounded', () => {
    test('rounded class is applied', async ({ page }) => {
        await openVariant(page, 'Rounded')
        const sandbox = sandboxOf(page)
        const bc = sandbox.locator('[data-cy="breadcrumb-rounded"]').first()
        await expect(bc).toBeVisible({ timeout: 8000 })
        const cls = await bc.evaluate(el => el.className)
        expect(cls).toMatch(/origam-breadcrumb--rounded|origam--rounded/)
    })
})

// ─── Border ───────────────────────────────────────────────────────────────────

test.describe('OrigamBreadcrumb — Border', () => {
    test('border modifier class is applied', async ({ page }) => {
        await openVariant(page, 'Border')
        const sandbox = sandboxOf(page)
        const bc = sandbox.locator('[data-cy="breadcrumb-border"]').first()
        await expect(bc).toBeVisible({ timeout: 8000 })
        const cls = await bc.evaluate(el => el.className)
        expect(cls).toMatch(/origam-breadcrumb--border|origam--border/)
    })
})

// ─── Divider (string) ─────────────────────────────────────────────────────────

test.describe('OrigamBreadcrumb — Divider (string)', () => {
    test('custom divider string renders between items', async ({ page }) => {
        await openVariant(page, 'Divider (string)')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="breadcrumb-divider-string"]').first()).toBeVisible({ timeout: 8000 })
        const dividers = await sandbox.locator('[data-cy="breadcrumb-divider-string"] .origam-breadcrumb-divider').count()
        expect(dividers).toBeGreaterThan(0)
    })
})

// ─── Divider (icon) ───────────────────────────────────────────────────────────

test.describe('OrigamBreadcrumb — Divider (icon)', () => {
    test('icon divider renders between items', async ({ page }) => {
        await openVariant(page, 'Divider (icon)')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="breadcrumb-divider-icon"]').first()).toBeVisible({ timeout: 8000 })
        const dividers = await sandbox.locator('[data-cy="breadcrumb-divider-icon"] .origam-breadcrumb-divider').count()
        expect(dividers).toBeGreaterThan(0)
    })
})

// ─── Playground ───────────────────────────────────────────────────────────────

test.describe('OrigamBreadcrumb — Playground', () => {
    test('renders without errors', async ({ page }) => {
        await openVariant(page, 'Playground')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="breadcrumb-playground"]').first()).toBeVisible({ timeout: 8000 })
    })
})
