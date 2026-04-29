import { expect, test, type Page } from '@playwright/test'

/**
 * OrigamList — runtime assertions per story Variant.
 *
 * Story URL: /story/stories-components-stories-list-origamlist-story-vue
 */

const sandboxOf = (page: Page) => page.frameLocator('iframe[src*="__sandbox"]')

const openVariant = async (page: Page, variant: string) => {
    await page.goto('/story/stories-components-stories-list-origamlist-story-vue')
    await page.waitForLoadState('networkidle')
    await page.getByText(variant, { exact: true }).first().click()
    await page.waitForTimeout(800)
}

// ─── Default ──────────────────────────────────────────────────────────────────

test.describe('OrigamList — Default', () => {
    test('renders 3 list items', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="list-default"]').first()).toBeVisible({ timeout: 8000 })
        const count = await sandbox.locator('[data-cy="list-default"] .origam-list-item').count()
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

// ─── Default slot (explicit children + subheader) ─────────────────────────────

test.describe('OrigamList — Default slot', () => {
    test('renders OrigamListItem children in default slot', async ({ page }) => {
        await openVariant(page, 'Default slot')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="list-slot"]').first()).toBeVisible({ timeout: 8000 })
        await expect(sandbox.locator('[data-cy="list-slot-alpha"]').first()).toBeVisible()
        await expect(sandbox.locator('[data-cy="list-slot-gamma"]').first()).toBeVisible()
    })

    test('renders OrigamListSubheader children in default slot', async ({ page }) => {
        await openVariant(page, 'Default slot')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="list-slot-subheader-a"]').first()).toBeVisible({ timeout: 8000 })
        await expect(sandbox.locator('[data-cy="list-slot-subheader-b"]').first()).toBeVisible()
    })
})

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

// ─── BgColor ──────────────────────────────────────────────────────────────────

test.describe('OrigamList — BgColor', () => {
    test('bgColor variant renders without errors', async ({ page }) => {
        await openVariant(page, 'BgColor')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="list-bgcolor"]').first()).toBeVisible({ timeout: 8000 })
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

// ─── Lines ────────────────────────────────────────────────────────────────────

test.describe('OrigamList — Lines', () => {
    test('lines modifier class is applied to the list', async ({ page }) => {
        await openVariant(page, 'Lines')
        const sandbox = sandboxOf(page)
        const list = sandbox.locator('[data-cy="list-lines"]').first()
        await expect(list).toBeVisible({ timeout: 8000 })
        const cls = await list.evaluate(el => el.className)
        // Actual class pattern: origam-list--{value}-line (e.g. origam-list--one-line)
        expect(cls).toMatch(/origam-list--(one|two|three)-line/)
    })
})

// ─── Slim ─────────────────────────────────────────────────────────────────────

test.describe('OrigamList — Slim', () => {
    test('slim modifier class is applied', async ({ page }) => {
        await openVariant(page, 'Slim')
        const sandbox = sandboxOf(page)
        const list = sandbox.locator('[data-cy="list-slim"]').first()
        await expect(list).toBeVisible({ timeout: 8000 })
        const cls = await list.evaluate(el => el.className)
        expect(cls).toContain('origam-list--slim')
    })
})

// ─── Nav ──────────────────────────────────────────────────────────────────────

test.describe('OrigamList — Nav', () => {
    test('nav modifier class is applied', async ({ page }) => {
        await openVariant(page, 'Nav')
        const sandbox = sandboxOf(page)
        const list = sandbox.locator('[data-cy="list-nav"]').first()
        await expect(list).toBeVisible({ timeout: 8000 })
        const cls = await list.evaluate(el => el.className)
        expect(cls).toContain('origam-list--nav')
    })
})

// ─── Playground ───────────────────────────────────────────────────────────────

test.describe('OrigamList — Playground', () => {
    test('renders without errors', async ({ page }) => {
        await openVariant(page, 'Playground')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="list-playground"]').first()).toBeVisible({ timeout: 8000 })
    })
})
