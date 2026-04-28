import { expect, test, type Page } from '@playwright/test'

/**
 * Lot C1 — OrigamBtnToggle runtime probes.
 *
 * Each Variant tests one orthogonal facet of the selection contract:
 *   - default (single selection): clicking switches the active class
 *     to the chosen item; the v-model status text reflects the value.
 *   - multiple: an array v-model accumulates selections.
 *   - mandatory: clicking the active item DOES NOT deselect it.
 *   - disabled: clicks on disabled buttons don't change selection.
 *
 * Note the selectedClass default is `origam-btn-group-item--active`
 * (set by OrigamBtnToggle's `useGroup` registration) — that's the
 * source of truth for "is this item selected".
 */

const sandboxOf = (page: Page) =>
    page.frameLocator('iframe[src*="__sandbox"]')

const openVariant = async (page: Page, storyPath: string, variant: string) => {
    await page.goto(storyPath)
    await page.waitForLoadState('networkidle')
    await page.getByText(variant, { exact: true }).first().click()
    await page.waitForTimeout(800)
}

const STORY = '/story/stories-components-stories-btn-origambtntoggle-story-vue'

// `useGroup` toggles `origam-btn--active` on each child via the
// `selectedClass` ref it injects through `useGroupItem`. That's our
// runtime contract for "is this item selected".
const SELECTED_CLASS = 'origam-btn--active'

// ─── Default (single) ──────────────────────────────────────────────────────

test.describe('OrigamBtnToggle — single selection', () => {
    test('initial v-model puts the matching item in the active class', async ({ page }) => {
        await openVariant(page, STORY, 'Default')
        const sandbox = sandboxOf(page)

        const toggle = sandbox.locator('.origam-btn-toggle').first()
        await expect(toggle).toBeVisible({ timeout: 8000 })

        // story default is `center`
        const active = await sandbox.locator(`.${SELECTED_CLASS}`).count()
        expect(active).toBe(1)

        const activeText = await sandbox.locator(`.${SELECTED_CLASS}`).first().locator('.origam-btn__content').textContent()
        expect((activeText || '').trim()).toBe('Center')
    })

    test('clicking another button moves the selection there', async ({ page }) => {
        await openVariant(page, STORY, 'Default')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('.origam-btn-toggle').first()).toBeVisible({ timeout: 8000 })

        await sandbox.locator('[data-cy="bt-default-right"]').click()
        await page.waitForTimeout(200)

        const status = await sandbox.locator('[data-cy="bt-default-status"]').textContent()
        expect(status).toContain('right')

        const active = await sandbox.locator(`.${SELECTED_CLASS}`).count()
        expect(active).toBe(1)
    })
})

// ─── Multiple ──────────────────────────────────────────────────────────────

test.describe('OrigamBtnToggle — multiple selection', () => {
    test('clicking a second item appends to the v-model array', async ({ page }) => {
        await openVariant(page, STORY, 'Multiple')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('.origam-btn-toggle').first()).toBeVisible({ timeout: 8000 })

        // story default is ['bold']
        const status0 = await sandbox.locator('[data-cy="bt-multiple-status"]').textContent()
        expect(status0).toContain('bold')

        await sandbox.locator('[data-cy="bt-multiple-italic"]').click()
        await page.waitForTimeout(200)

        const status1 = await sandbox.locator('[data-cy="bt-multiple-status"]').textContent()
        expect(status1).toContain('bold')
        expect(status1).toContain('italic')

        // Both should now be visually active.
        const activeCount = await sandbox.locator(`.${SELECTED_CLASS}`).count()
        expect(activeCount).toBe(2)
    })

    test('clicking a selected item removes it from the array', async ({ page }) => {
        await openVariant(page, STORY, 'Multiple')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('.origam-btn-toggle').first()).toBeVisible({ timeout: 8000 })

        // initially `bold` is selected. Click it again.
        await sandbox.locator('[data-cy="bt-multiple-bold"]').click()
        await page.waitForTimeout(200)

        const status = await sandbox.locator('[data-cy="bt-multiple-status"]').textContent()
        expect(status).toContain('(empty)')
        const activeCount = await sandbox.locator(`.${SELECTED_CLASS}`).count()
        expect(activeCount).toBe(0)
    })
})

// ─── Mandatory ─────────────────────────────────────────────────────────────

test.describe('OrigamBtnToggle — mandatory', () => {
    test('clicking the active item does NOT deselect it', async ({ page }) => {
        await openVariant(page, STORY, 'Mandatory')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('.origam-btn-toggle').first()).toBeVisible({ timeout: 8000 })

        // story default = `default`
        await sandbox.locator('[data-cy="bt-mandatory-default"]').click()
        await page.waitForTimeout(200)

        const status = await sandbox.locator('[data-cy="bt-mandatory-status"]').textContent()
        expect(status).toContain('default')
        const activeCount = await sandbox.locator(`.${SELECTED_CLASS}`).count()
        expect(activeCount).toBe(1)
    })
})

// ─── Disabled ──────────────────────────────────────────────────────────────

test.describe('OrigamBtnToggle — disabled', () => {
    test('clicks on disabled buttons do not change the selection', async ({ page }) => {
        await openVariant(page, STORY, 'Disabled')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('.origam-btn-toggle').first()).toBeVisible({ timeout: 8000 })

        const status0 = await sandbox.locator('[data-cy="bt-disabled-status"]').textContent()

        // Force the click — disabled buttons normally swallow pointer
        // events so without `force` Playwright would refuse.
        await sandbox.locator('[data-cy="bt-disabled-a"]').click({ force: true })
        await page.waitForTimeout(200)

        const status1 = await sandbox.locator('[data-cy="bt-disabled-status"]').textContent()
        expect(status1).toBe(status0)
    })
})

// ─── Density forwarding ────────────────────────────────────────────────────

test.describe('OrigamBtnToggle — forwards density to the underlying group', () => {
    test('the toggle renders a btn-group with the selected density modifier', async ({ page }) => {
        await openVariant(page, STORY, 'Density')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('.origam-btn-toggle').first()).toBeVisible({ timeout: 8000 })

        const group = sandbox.locator('.origam-btn-group').first()
        const cls = await group.evaluate(el => el.className)
        expect(cls).toContain('origam-btn-group--density-default')
    })
})
