import { expect, test, type Page } from '@playwright/test'

/**
 * OrigamList — runtime assertions per story Variant.
 *
 * Story URL: /story/components-stories-list-origamlist-story-vue
 */

const sandboxOf = (page: Page) => page.frameLocator('iframe[src*="__sandbox"]')

const openVariant = async (page: Page, variant: string) => {
    await page.goto('/story/components-stories-list-origamlist-story-vue')
    await page.waitForLoadState('networkidle')
    await page.getByText(variant, { exact: true }).first().click()
    await page.waitForTimeout(800)
}

// ─── Density ──────────────────────────────────────────────────────────────────

test.describe('OrigamList — Density', () => {
    test('density class lands on list items', async ({ page }) => {
        await openVariant(page, 'Density')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="list-density"]').first()).toBeVisible({ timeout: 8000 })
        const childClasses = await sandbox.locator('[data-cy="list-density"] .origam-list-item').evaluateAll(els =>
            els.map(el => el.className)
        )
        expect(childClasses.length).toBeGreaterThan(0)
        for (const cls of childClasses) {
            expect(cls).toMatch(/origam-list-item--density-(default|compact|comfortable)/)
        }
    })
})

// ─── Color ────────────────────────────────────────────────────────────────────

test.describe('OrigamList — Color', () => {
    test('color variant renders without errors', async ({ page }) => {
        await openVariant(page, 'Color')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="list-color"]').first()).toBeVisible({ timeout: 8000 })
        const count = await sandbox.locator('[data-cy="list-color"] .origam-list-item').count()
        expect(count).toBeGreaterThan(0)
    })
})

// ─── Rounded ──────────────────────────────────────────────────────────────────

test.describe('OrigamList — Rounded', () => {
    test('rounded class is applied', async ({ page }) => {
        await openVariant(page, 'Rounded')
        const sandbox = sandboxOf(page)
        const list = sandbox.locator('[data-cy="list-rounded"]').first()
        await expect(list).toBeVisible({ timeout: 8000 })
        const cls = await list.evaluate(el => el.className)
        expect(cls).toMatch(/origam-list--rounded|origam--rounded/)
    })
})

// ─── Border ───────────────────────────────────────────────────────────────────

test.describe('OrigamList — Border', () => {
    test('border modifier class is applied', async ({ page }) => {
        await openVariant(page, 'Border')
        const sandbox = sandboxOf(page)
        const list = sandbox.locator('[data-cy="list-border"]').first()
        await expect(list).toBeVisible({ timeout: 8000 })
        const cls = await list.evaluate(el => el.className)
        expect(cls).toMatch(/origam-list--border|origam--border/)
    })
})

// ─── Elevation ────────────────────────────────────────────────────────────────

test.describe('OrigamList — Elevation', () => {
    test('elevation variant renders without errors', async ({ page }) => {
        await openVariant(page, 'Elevation')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="list-elevation"]').first()).toBeVisible({ timeout: 8000 })
    })
})

// ─── Lines ────────────────────────────────────────────────────────────────────

test.describe('OrigamList — Lines', () => {
    test('lines modifier class is applied to the list', async ({ page }) => {
        await openVariant(page, 'Lines')
        const sandbox = sandboxOf(page)
        const list = sandbox.locator('[data-cy="list-lines"]').first()
        await expect(list).toBeVisible({ timeout: 8000 })
        const cls = await list.evaluate(el => el.className)
        expect(cls).toMatch(/origam-list--(one|two|three)-line/)
    })
})

// ─── Modifiers ────────────────────────────────────────────────────────────────

test.describe('OrigamList — Modifiers', () => {
    test('list renders in modifiers variant', async ({ page }) => {
        await openVariant(page, 'Modifiers')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="list-modifiers"]').first()).toBeVisible({ timeout: 8000 })
        const count = await sandbox.locator('[data-cy="list-modifiers"] .origam-list-item').count()
        expect(count).toBe(3)
    })
})

// ─── Items prop ───────────────────────────────────────────────────────────────

test.describe('OrigamList — Items prop', () => {
    test('renders items from the items prop', async ({ page }) => {
        await openVariant(page, 'Items prop')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="list-items"]').first()).toBeVisible({ timeout: 8000 })
        const count = await sandbox.locator('[data-cy="list-items"] .origam-list-item').count()
        expect(count).toBeGreaterThan(0)
    })
})

// ─── Group ────────────────────────────────────────────────────────────────────

test.describe('OrigamList — Group', () => {
    test('renders list groups', async ({ page }) => {
        await openVariant(page, 'Group')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="list-group"]').first()).toBeVisible({ timeout: 8000 })
        const groupCount = await sandbox.locator('[data-cy="list-group"] .origam-list-group').count()
        expect(groupCount).toBe(2)
    })

    test('group items expand on activator click', async ({ page }) => {
        await openVariant(page, 'Group')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="list-group-fruits"]').first()).toBeVisible({ timeout: 8000 })
        await sandbox.locator('[data-cy="list-group-fruits"] .origam-list-group__header').first().click()
        await page.waitForTimeout(400)
        await expect(sandbox.locator('[data-cy="list-group-apple"]').first()).toBeVisible()
    })
})

// ─── Subheader ────────────────────────────────────────────────────────────────

test.describe('OrigamList — Subheader', () => {
    test('renders subheaders correctly', async ({ page }) => {
        await openVariant(page, 'Subheader')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="list-subheader"]').first()).toBeVisible({ timeout: 8000 })
        await expect(sandbox.locator('[data-cy="list-subheader-a"]').first()).toBeVisible()
        await expect(sandbox.locator('[data-cy="list-subheader-b"]').first()).toBeVisible()
    })
})

// ─── Slot: default ────────────────────────────────────────────────────────────

test.describe('OrigamList — Slot: default', () => {
    test('renders explicit children in default slot', async ({ page }) => {
        await openVariant(page, 'Slot — default')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="list-slot-default"]').first()).toBeVisible({ timeout: 8000 })
        await expect(sandbox.locator('[data-cy="list-slot-alpha"]').first()).toBeVisible()
        await expect(sandbox.locator('[data-cy="list-slot-gamma"]').first()).toBeVisible()
    })
})

// ─── Slot: item ───────────────────────────────────────────────────────────────

test.describe('OrigamList — Slot: item', () => {
    test('custom item slot renders with icon', async ({ page }) => {
        await openVariant(page, 'Slot — item')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="list-slot-item"]').first()).toBeVisible({ timeout: 8000 })
        const customItems = await sandbox.locator('[data-cy="list-slot-item-custom"]').count()
        expect(customItems).toBeGreaterThan(0)
    })
})

// ─── Slot: subheader ──────────────────────────────────────────────────────────

test.describe('OrigamList — Slot: subheader', () => {
    test('custom subheader slot renders', async ({ page }) => {
        await openVariant(page, 'Slot — subheader')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="list-slot-subheader"]').first()).toBeVisible({ timeout: 8000 })
    })
})

// ─── Slot: groupActivator ─────────────────────────────────────────────────────

test.describe('OrigamList — Slot: groupActivator', () => {
    test('custom groupActivator slot renders', async ({ page }) => {
        await openVariant(page, 'Slot — groupActivator')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="list-slot-group-activator"]').first()).toBeVisible({ timeout: 8000 })
    })
})

// ─── Emit: update:selected ────────────────────────────────────────────────────

test.describe('OrigamList — Emit: update:selected', () => {
    test('emit variant renders selectable items', async ({ page }) => {
        await openVariant(page, 'Emit — update:selected')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="list-emit-selected"]').first()).toBeVisible({ timeout: 8000 })
        const count = await sandbox.locator('[data-cy="list-emit-selected"] .origam-list-item').count()
        expect(count).toBeGreaterThan(0)
    })
})

// ─── Emit: click:select ───────────────────────────────────────────────────────

test.describe('OrigamList — Emit: click:select', () => {
    test('emit variant renders selectable items', async ({ page }) => {
        await openVariant(page, 'Emit — click:select')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="list-emit-click-select"]').first()).toBeVisible({ timeout: 8000 })
        const count = await sandbox.locator('[data-cy="list-emit-click-select"] .origam-list-item').count()
        expect(count).toBeGreaterThan(0)
    })
})

// ─── Emit: update:opened ──────────────────────────────────────────────────────

test.describe('OrigamList — Emit: update:opened', () => {
    test('emit variant renders with groups', async ({ page }) => {
        await openVariant(page, 'Emit — update:opened')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="list-emit-opened"]').first()).toBeVisible({ timeout: 8000 })
    })
})

// ─── Playground ───────────────────────────────────────────────────────────────

test.describe('OrigamList — Default', () => {
    test('renders without errors', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="list-playground"]').first()).toBeVisible({ timeout: 8000 })
        const count = await sandbox.locator('[data-cy="list-playground"] .origam-list-item').count()
        expect(count).toBe(3)
    })
})
