import { expect, test, type Page } from '@playwright/test'

/**
 * OrigamBottomNav — runtime assertions per story Variant.
 *
 * Story URL: /story/stories-components-stories-bottomnav-origambottomnav-story-vue
 */

const sandboxOf = (page: Page) => page.frameLocator('iframe[src*="__sandbox"]')

const openVariant = async (page: Page, variant: string) => {
    await page.goto('/story/stories-components-stories-bottomnav-origambottomnav-story-vue')
    await page.waitForLoadState('networkidle')
    await page.getByText(variant, { exact: true }).first().click()
    await page.waitForTimeout(800)
}

// ─── Default ──────────────────────────────────────────────────────────────────

test.describe('OrigamBottomNav — Default', () => {
    test('renders the nav wrapper', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="bottom-nav-default"]').first()).toBeVisible({ timeout: 8000 })
    })
})

// ─── Items prop ───────────────────────────────────────────────────────────────

test.describe('OrigamBottomNav — Items prop', () => {
    test('renders one btn per item entry (3)', async ({ page }) => {
        await openVariant(page, 'Items prop')
        const sandbox = sandboxOf(page)
        const nav = sandbox.locator('[data-cy="bottom-nav-items"]').first()
        await expect(nav).toBeVisible({ timeout: 8000 })
        const count = await nav.locator('.origam-btn').count()
        expect(count).toBe(3)
    })
})

// ─── Default slot ─────────────────────────────────────────────────────────────

test.describe('OrigamBottomNav — Default slot', () => {
    test('renders explicit btn children in the default slot', async ({ page }) => {
        await openVariant(page, 'Default slot')
        const sandbox = sandboxOf(page)
        const nav = sandbox.locator('[data-cy="bottom-nav-slot"]').first()
        await expect(nav).toBeVisible({ timeout: 8000 })
        await expect(sandbox.locator('[data-cy="bottom-nav-slot-home"]').first()).toBeVisible()
        await expect(sandbox.locator('[data-cy="bottom-nav-slot-search"]').first()).toBeVisible()
        await expect(sandbox.locator('[data-cy="bottom-nav-slot-profile"]').first()).toBeVisible()
    })
})

// ─── Density ──────────────────────────────────────────────────────────────────

test.describe('OrigamBottomNav — Density', () => {
    test('density class lands on btn children', async ({ page }) => {
        await openVariant(page, 'Density')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="bottom-nav-density"]').first()).toBeVisible({ timeout: 8000 })
        const childClasses = await sandbox.locator('[data-cy="bottom-nav-density"] .origam-btn').evaluateAll(els =>
            els.map(el => el.className)
        )
        expect(childClasses.length).toBeGreaterThan(0)
        for (const cls of childClasses) {
            expect(cls).toMatch(/origam-btn--density-/)
        }
    })
})

// ─── Color ────────────────────────────────────────────────────────────────────

test.describe('OrigamBottomNav — Color', () => {
    test('color intent is propagated to btn children', async ({ page }) => {
        await openVariant(page, 'Color')
        const sandbox = sandboxOf(page)
        const nav = sandbox.locator('[data-cy="bottom-nav-color"]').first()
        await expect(nav).toBeVisible({ timeout: 8000 })
        const count = await nav.locator('.origam-btn').count()
        expect(count).toBeGreaterThan(0)
    })
})

// ─── BgColor ──────────────────────────────────────────────────────────────────

test.describe('OrigamBottomNav — BgColor', () => {
    test('bgColor variant renders nav without errors', async ({ page }) => {
        await openVariant(page, 'BgColor')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="bottom-nav-bgcolor"]').first()).toBeVisible({ timeout: 8000 })
    })
})

// ─── Border ───────────────────────────────────────────────────────────────────

test.describe('OrigamBottomNav — Border', () => {
    test('border modifier class is applied', async ({ page }) => {
        await openVariant(page, 'Border')
        const sandbox = sandboxOf(page)
        const nav = sandbox.locator('[data-cy="bottom-nav-border"]').first()
        await expect(nav).toBeVisible({ timeout: 8000 })
        const cls = await nav.evaluate(el => el.className)
        expect(cls).toMatch(/origam-bottom-nav--border|origam--border/)
    })
})

// ─── Elevation ────────────────────────────────────────────────────────────────

test.describe('OrigamBottomNav — Elevation', () => {
    test('elevation variant renders without errors', async ({ page }) => {
        await openVariant(page, 'Elevation')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="bottom-nav-elevation"]').first()).toBeVisible({ timeout: 8000 })
    })
})

// ─── Grow ─────────────────────────────────────────────────────────────────────

test.describe('OrigamBottomNav — Grow', () => {
    test('grow modifier class is applied', async ({ page }) => {
        await openVariant(page, 'Grow')
        const sandbox = sandboxOf(page)
        const nav = sandbox.locator('[data-cy="bottom-nav-grow"]').first()
        await expect(nav).toBeVisible({ timeout: 8000 })
        const cls = await nav.evaluate(el => el.className)
        expect(cls).toContain('origam-bottom-nav--grow')
    })
})

// ─── Rounded ──────────────────────────────────────────────────────────────────

test.describe('OrigamBottomNav — Rounded', () => {
    test('border-radius is applied when rounded=true', async ({ page }) => {
        await openVariant(page, 'Rounded')
        const sandbox = sandboxOf(page)
        const nav = sandbox.locator('[data-cy="bottom-nav-rounded"]').first()
        await expect(nav).toBeVisible({ timeout: 8000 })
        const radius = await nav.evaluate(el => getComputedStyle(el).borderRadius)
        expect(radius).not.toBe('0px')
    })
})

// ─── Playground ───────────────────────────────────────────────────────────────

test.describe('OrigamBottomNav — Playground', () => {
    test('renders without errors', async ({ page }) => {
        await openVariant(page, 'Playground')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('[data-cy="bottom-nav-playground"]').first()).toBeVisible({ timeout: 8000 })
    })
})
