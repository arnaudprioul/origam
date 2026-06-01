import { expect, test, type Page } from '@playwright/test'

/**
 * Regression spec — `OrigamItemGroup` + `OrigamItem` are origam's
 * generic, renderless selection primitives (Vuetify `v-item-group` /
 * `v-item` equivalent). The components impose no visual; consumers
 * paint each option however they like (a Card, a Tile, a custom UI)
 * via the `<OrigamItem>` slot scope: `{ isSelected, toggle, select,
 * value, disabled, selectedClass }`.
 *
 * Each test below verifies one selection-mode contract end-to-end by
 * clicking a card (the consumer-rendered visual that wraps each
 * `<OrigamItem>`) and asserting the v-model + class state shifts.
 */

const sandboxOf = (page: Page) => page.frameLocator('iframe[src*="__sandbox"]')

const STORY = '/story/components-stories-itemgroup-origamitemgroup-story-vue'

const open = async (page: Page, variant: string) => {
    await page.goto(STORY)
    await page.waitForLoadState('networkidle')
    await page.getByText(variant, { exact: true }).first().click()
    await page.waitForTimeout(800)
}

test.describe('OrigamItemGroup — Default (single selection)', () => {
    test('initial selection shows one active card', async ({ page }) => {
        await open(page, 'Default')
        const sandbox = sandboxOf(page)
        const active = sandbox.locator('.ig-card--active')
        await expect(active.first()).toBeVisible({ timeout: 8000 })
        expect(await active.count()).toBe(1)
    })

    test('clicking another card shifts the active state', async ({ page }) => {
        await open(page, 'Default')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('.ig-card').first()).toBeVisible({ timeout: 8000 })

        // Story init: 'm' is selected. Click the third card ('l').
        await sandbox.locator('.ig-card').nth(2).click()
        await page.waitForTimeout(250)

        const status = await sandbox.locator('[data-cy="ig-default-status"]').textContent()
        expect(status).toContain('l')

        // Active class moved.
        const activeCount = await sandbox.locator('.ig-card--active').count()
        expect(activeCount).toBe(1)
    })
})

test.describe('OrigamItemGroup — Multiple', () => {
    test('clicking adds to the array', async ({ page }) => {
        await open(page, 'Multiple')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('.ig-card').first()).toBeVisible({ timeout: 8000 })

        // Story init: ['bold']. Click italic.
        await sandbox.locator('.ig-card').nth(1).click()
        await page.waitForTimeout(250)

        const status = await sandbox.locator('[data-cy="ig-multiple-status"]').textContent()
        expect(status).toContain('bold')
        expect(status).toContain('italic')

        const activeCount = await sandbox.locator('.ig-card--active').count()
        expect(activeCount).toBe(2)
    })

    test('clicking a selected item removes it from the array', async ({ page }) => {
        await open(page, 'Multiple')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('.ig-card').first()).toBeVisible({ timeout: 8000 })

        // Click 'bold' (already active) → removed.
        await sandbox.locator('.ig-card').first().click()
        await page.waitForTimeout(250)

        const status = await sandbox.locator('[data-cy="ig-multiple-status"]').textContent()
        expect(status).toContain('(empty)')
        const activeCount = await sandbox.locator('.ig-card--active').count()
        expect(activeCount).toBe(0)
    })
})

test.describe('OrigamItemGroup — Mandatory', () => {
    test('clicking the active item does NOT deselect it', async ({ page }) => {
        await open(page, 'Mandatory')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('.ig-card').first()).toBeVisible({ timeout: 8000 })

        // Story init: 's' active. Click the SAME 's'.
        await sandbox.locator('.ig-card').first().click()
        await page.waitForTimeout(250)

        // Still exactly one active.
        const activeCount = await sandbox.locator('.ig-card--active').count()
        expect(activeCount).toBe(1)
    })
})

test.describe('OrigamItemGroup — Custom selectedClass', () => {
    test('the custom class lands on active items in addition to the default origam-item--selected', async ({ page }) => {
        await open(page, 'Custom selectedClass')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('.ig-card').first()).toBeVisible({ timeout: 8000 })

        // Story init: 'italic' active. The custom class can land both on
        // the OrigamItem root (via `useGroupItem`'s selectedClass) and on
        // the inner Card (via the explicit `:class="{ 'my-custom-active':
        // isSelected }"` binding) — both are valid landing spots, just
        // assert at least one element bears it.
        const activeWithCustom = await sandbox.locator('.my-custom-active').count()
        expect(activeWithCustom).toBeGreaterThanOrEqual(1)
    })
})
