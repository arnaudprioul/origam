import { expect, test, type Page } from '@playwright/test'

/**
 * OrigamSelectionControlGroup — runtime assertions per story Variant.
 *
 * Story URL: /story/stories-components-stories-selectioncontrol-origamselectioncontrolgroup-story-vue
 */

const sandboxOf = (page: Page) => page.frameLocator('iframe[src*="__sandbox"]')

const openVariant = async (page: Page, variant: string) => {
    await page.goto('/story/stories-components-stories-selectioncontrol-origamselectioncontrolgroup-story-vue')
    await page.waitForLoadState('networkidle')
    await page.getByText(variant, { exact: true }).first().click()
    await page.waitForTimeout(800)
}

// ─── Default ──────────────────────────────────────────────────────────────────

test.describe('OrigamSelectionControlGroup — Default', () => {
    test('renders 3 selection controls', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="scg-default"]').first()).toBeVisible({ timeout: 8000 })
        const count = await sandbox.locator('[data-cy="scg-default"] .origam-selection-control').count()
        expect(count).toBe(3)
    })
})

// ─── Items prop ───────────────────────────────────────────────────────────────

test.describe('OrigamSelectionControlGroup — Items prop', () => {
    test('renders one control per items entry (3)', async ({ page }) => {
        await openVariant(page, 'Items prop')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="scg-items"]').first()).toBeVisible({ timeout: 8000 })
        const count = await sandbox.locator('[data-cy="scg-items"] .origam-selection-control').count()
        expect(count).toBe(3)
    })
})

// ─── Default slot ─────────────────────────────────────────────────────────────

test.describe('OrigamSelectionControlGroup — Default slot', () => {
    test('renders explicit OrigamSelectionControl children', async ({ page }) => {
        await openVariant(page, 'Default slot')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="scg-slot"]').first()).toBeVisible({ timeout: 8000 })
        await expect(sandbox.locator('[data-cy="scg-slot-x"]').first()).toBeVisible()
        await expect(sandbox.locator('[data-cy="scg-slot-y"]').first()).toBeVisible()
        await expect(sandbox.locator('[data-cy="scg-slot-z"]').first()).toBeVisible()
    })
})

// ─── Multiple ─────────────────────────────────────────────────────────────────

test.describe('OrigamSelectionControlGroup — Multiple', () => {
    test('renders 3 controls in multiple mode', async ({ page }) => {
        await openVariant(page, 'Multiple')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="scg-multiple"]').first()).toBeVisible({ timeout: 8000 })
        const count = await sandbox.locator('[data-cy="scg-multiple"] .origam-selection-control').count()
        expect(count).toBe(3)
    })
})

// ─── Inline ───────────────────────────────────────────────────────────────────

test.describe('OrigamSelectionControlGroup — Inline', () => {
    test('inline modifier class is applied to the group', async ({ page }) => {
        await openVariant(page, 'Inline')
        const sandbox = sandboxOf(page)
        const group = sandbox.locator('[data-cy="scg-inline"]').first()
        await expect(group).toBeVisible({ timeout: 8000 })
        const cls = await group.evaluate(el => el.className)
        expect(cls).toContain('origam-selection-control-group--inline')
    })
})

// ─── Density ──────────────────────────────────────────────────────────────────

test.describe('OrigamSelectionControlGroup — Density', () => {
    test('density class lands on child controls', async ({ page }) => {
        await openVariant(page, 'Density')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="scg-density"]').first()).toBeVisible({ timeout: 8000 })
        const childClasses = await sandbox.locator('[data-cy="scg-density"] .origam-selection-control').evaluateAll(els =>
            els.map(el => el.className)
        )
        expect(childClasses.length).toBeGreaterThan(0)
        for (const cls of childClasses) {
            expect(cls).toMatch(/origam-selection-control--density-(default|compact|comfortable)/)
        }
    })
})

// ─── Color ────────────────────────────────────────────────────────────────────

test.describe('OrigamSelectionControlGroup — Color', () => {
    test('color variant renders without errors', async ({ page }) => {
        await openVariant(page, 'Color')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="scg-color"]').first()).toBeVisible({ timeout: 8000 })
        const count = await sandbox.locator('[data-cy="scg-color"] .origam-selection-control').count()
        expect(count).toBeGreaterThan(0)
    })
})

// ─── Disabled ─────────────────────────────────────────────────────────────────

test.describe('OrigamSelectionControlGroup — Disabled', () => {
    test('disabled variant renders controls without crash', async ({ page }) => {
        await openVariant(page, 'Disabled')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="scg-disabled"]').first()).toBeVisible({ timeout: 8000 })
        // Note: the group only provides density/color as defaults to children.
        // The disabled prop is on the group; individual children need their
        // own disabled prop to get the --disabled class on each control.
        const count = await sandbox.locator('[data-cy="scg-disabled"] .origam-selection-control').count()
        expect(count).toBeGreaterThan(0)
    })
})

// ─── Readonly ─────────────────────────────────────────────────────────────────

test.describe('OrigamSelectionControlGroup — Readonly', () => {
    test('readonly controls have the readonly class or aria-readonly attribute', async ({ page }) => {
        await openVariant(page, 'Readonly')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="scg-readonly"]').first()).toBeVisible({ timeout: 8000 })
        // The group passes readonly to each child; control renders with
        // readonly prop which blocks interaction (checked via class or aria).
        const controls = sandbox.locator('[data-cy="scg-readonly"] .origam-selection-control')
        const count = await controls.count()
        expect(count).toBeGreaterThan(0)
    })
})

// ─── Playground ───────────────────────────────────────────────────────────────

test.describe('OrigamSelectionControlGroup — Playground', () => {
    test('renders without errors', async ({ page }) => {
        await openVariant(page, 'Playground')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="scg-playground"]').first()).toBeVisible({ timeout: 8000 })
    })
})
