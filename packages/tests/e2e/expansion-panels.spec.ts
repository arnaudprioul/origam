import { expect, test, type Page } from '@playwright/test'

/**
 * OrigamExpansionPanels — runtime assertions per story Variant.
 *
 * Story URL: /story/components-stories-expansionpanel-origamexpansionpanels-story-vue
 */

const sandboxOf = (page: Page) => page.frameLocator('iframe[src*="__sandbox"]')

const openVariant = async (page: Page, variant: string) => {
    await page.goto('/story/components-stories-expansionpanel-origamexpansionpanels-story-vue')
    await page.waitForLoadState('networkidle')
    await page.getByText(variant, { exact: true }).first().click()
    await page.waitForTimeout(800)
}

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

// ─── Elevation ────────────────────────────────────────────────────────────────

test.describe('OrigamExpansionPanels — Elevation', () => {
    test('elevation variant renders without errors', async ({ page }) => {
        await openVariant(page, 'Elevation')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="expansion-elevation"]').first()).toBeVisible({ timeout: 8000 })
    })
})

// ─── Icons ────────────────────────────────────────────────────────────────────

test.describe('OrigamExpansionPanels — Icons', () => {
    test('panels render with icon variant controls', async ({ page }) => {
        await openVariant(page, 'Icons')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="expansion-icons"]').first()).toBeVisible({ timeout: 8000 })
        const count = await sandbox.locator('[data-cy="expansion-icons"] .origam-expansion-panel').count()
        expect(count).toBe(2)
    })
})

// ─── Layout ───────────────────────────────────────────────────────────────────

test.describe('OrigamExpansionPanels — Layout', () => {
    test('layout variant renders 3 panels', async ({ page }) => {
        await page.goto('/story/components-stories-expansionpanel-origamexpansionpanels-story-vue')
        await page.waitForLoadState('networkidle')
        // Click the sidebar variant item that is exact "Layout" within the story nav
        await page.locator('.histoire-story-variant-link, [class*="variant"]').getByText('Layout', { exact: true }).first().click()
        await page.waitForTimeout(1200)
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="expansion-layout"]').first()).toBeVisible({ timeout: 10000 })
        const count = await sandbox.locator('[data-cy="expansion-layout"] .origam-expansion-panel').count()
        expect(count).toBe(3)
    })
})

// ─── Selection ────────────────────────────────────────────────────────────────

test.describe('OrigamExpansionPanels — Selection', () => {
    test('selection variant renders panels', async ({ page }) => {
        await openVariant(page, 'Selection')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="expansion-selection"]').first()).toBeVisible({ timeout: 8000 })
        const count = await sandbox.locator('[data-cy="expansion-selection"] .origam-expansion-panel').count()
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

// ─── Slot: default ────────────────────────────────────────────────────────────

test.describe('OrigamExpansionPanels — Slot: default', () => {
    test('renders explicit OrigamExpansionPanel children with slot-based title', async ({ page }) => {
        await openVariant(page, 'Slot — default')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="expansion-slot-default"]').first()).toBeVisible({ timeout: 8000 })
        await expect(sandbox.locator('[data-cy="expansion-slot-p1"]').first()).toBeVisible()
        await expect(sandbox.locator('[data-cy="expansion-slot-p2"]').first()).toBeVisible()
    })
})

// ─── Slot: item ───────────────────────────────────────────────────────────────

test.describe('OrigamExpansionPanels — Slot: item', () => {
    test('custom item slot renders 3 panels', async ({ page }) => {
        await openVariant(page, 'Slot — item')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="expansion-slot-item"]').first()).toBeVisible({ timeout: 8000 })
        const count = await sandbox.locator('[data-cy="expansion-slot-item"] .origam-expansion-panel').count()
        expect(count).toBe(3)
    })
})

// ─── Slot: header ─────────────────────────────────────────────────────────────

test.describe('OrigamExpansionPanels — Slot: header', () => {
    test('custom header slot renders', async ({ page }) => {
        await openVariant(page, 'Slot — header')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="expansion-slot-header"]').first()).toBeVisible({ timeout: 8000 })
        await expect(sandbox.locator('[data-cy="expansion-slot-header-custom"]').first()).toBeVisible()
    })
})

// ─── Slot: title ──────────────────────────────────────────────────────────────

test.describe('OrigamExpansionPanels — Slot: title', () => {
    test('custom title slot renders', async ({ page }) => {
        await openVariant(page, 'Slot — title')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="expansion-slot-title"]').first()).toBeVisible({ timeout: 8000 })
    })
})

// ─── Emit: update:modelValue ──────────────────────────────────────────────────

test.describe('OrigamExpansionPanels — Emit: update:modelValue', () => {
    test('emit variant renders clickable panels', async ({ page }) => {
        await openVariant(page, 'Emit — update:modelValue')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="expansion-emit-model"]').first()).toBeVisible({ timeout: 8000 })
        const headers = sandbox.locator('[data-cy="expansion-emit-model"] .origam-expansion-panel-header')
        const headerCount = await headers.count()
        expect(headerCount).toBeGreaterThan(0)
    })
})

// ─── Emit: group:selected ─────────────────────────────────────────────────────

test.describe('OrigamExpansionPanels — Emit: group:selected', () => {
    test('emit variant renders panels that can fire group:selected', async ({ page }) => {
        await openVariant(page, 'Emit — group:selected')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="expansion-emit-selected"]').first()).toBeVisible({ timeout: 8000 })
        await expect(sandbox.locator('[data-cy="expansion-emit-selected-p1"]').first()).toBeVisible()
        await expect(sandbox.locator('[data-cy="expansion-emit-selected-p2"]').first()).toBeVisible()
    })
})

// ─── Playground ───────────────────────────────────────────────────────────────

test.describe('OrigamExpansionPanels — Default', () => {
    test('renders without errors', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="expansion-playground"]').first()).toBeVisible({ timeout: 8000 })
        const count = await sandbox.locator('[data-cy="expansion-playground"] .origam-expansion-panel').count()
        expect(count).toBe(3)
    })
})
