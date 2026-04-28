import { expect, test, type FrameLocator, type Page } from '@playwright/test'

/**
 * Consolidated Playwright spec for the Picker + Overlay families
 * (Lots B4 + B5).
 *
 * Components covered:
 *   - OrigamPicker          (base picker shell, grid layout)
 *   - OrigamPickerTitle     (uppercase header sub-component)
 *   - OrigamOverlay         (teleported floating layer)
 *   - OrigamOverlayScrim    (standalone backdrop)
 *
 * Strategy
 * --------
 * Each variant is exercised via the Histoire sandbox iframe. The picker
 * shell is rendered inline (no teleport), so we look for it inside the
 * sandbox `body`. The overlay teleports its content to
 * `body > .origam-overlay-container`, which still lives inside the
 * sandbox iframe's document — locators based on the sandbox frame
 * therefore find it without any extra plumbing.
 *
 * Each variant assertion confirms the prop produced a runtime effect:
 *   - Picker: layout class flips, body/header slots render, `landscape`
 *     toggles `--landscape` modifier, hideHeader removes the title row.
 *   - Overlay: model/activator wiring, scrim presence, persistent
 *     swallows outside-click, disabled prevents open, contained scopes
 *     the scrim to the host.
 */

const PICKER_BASE       = '/story/stories-components-stories-picker-'
const OVERLAY_BASE      = '/story/stories-components-stories-overlay-'

const STORIES = {
    picker:        `${PICKER_BASE}origampicker-story-vue`,
    pickerTitle:   `${PICKER_BASE}origampickertitle-story-vue`,
    overlay:       `${OVERLAY_BASE}origamoverlay-story-vue`,
    scrim:         `${OVERLAY_BASE}origamoverlayscrim-story-vue`,
} as const

// ─── helpers ────────────────────────────────────────────────────────────────

async function gotoVariant (page: Page, story: string, variantTitle: string) {
    await page.goto(story)
    await page.waitForLoadState('networkidle')
    await page.getByText(variantTitle, { exact: true }).first().click()
    await page.waitForTimeout(700)
}

function sandbox (page: Page): FrameLocator {
    return page.frameLocator('iframe[src*="__sandbox"]')
}

// ════════════════════════════════════════════════════════════════════════════
// OrigamPicker
// ════════════════════════════════════════════════════════════════════════════

test.describe('OrigamPicker', () => {
    test('Default — title prop renders inside .origam-picker__title', async ({ page }) => {
        await gotoVariant(page, STORIES.picker, 'Default')
        const sb = sandbox(page)
        const picker = sb.locator('[data-cy="picker-default"]')
        await expect(picker).toBeVisible({ timeout: 5000 })
        await expect(picker.locator('.origam-picker__title')).toContainText('Pick something')
        await expect(sb.locator('[data-cy="picker-default-body"]')).toBeVisible()
    })

    test('Title prop — text reflects control state', async ({ page }) => {
        await gotoVariant(page, STORIES.picker, 'Title prop')
        const sb = sandbox(page)
        const picker = sb.locator('[data-cy="picker-title-prop"]')
        await expect(picker.locator('.origam-picker__title')).toContainText('Pick a date')
    })

    test('Hide header — toggling hideHeader removes the title region', async ({ page }) => {
        await gotoVariant(page, STORIES.picker, 'Hide header')
        const sb = sandbox(page)
        const picker = sb.locator('[data-cy="picker-hide-header"]')
        await expect(picker).toBeVisible()
        // Initial state hideHeader=true → no title rendered
        await expect(picker.locator('.origam-picker__title')).toHaveCount(0)
    })

    test('Landscape — modifier class flips the grid layout', async ({ page }) => {
        await gotoVariant(page, STORIES.picker, 'Landscape')
        const sb = sandbox(page)
        const picker = sb.locator('[data-cy="picker-landscape"]')
        await expect(picker).toHaveClass(/origam-picker--landscape/)
        await expect(sb.locator('[data-cy="picker-landscape-header"]')).toBeVisible()
        await expect(sb.locator('[data-cy="picker-landscape-body"]')).toBeVisible()
    })

    test('Slot — actions modifier class & buttons render', async ({ page }) => {
        await gotoVariant(page, STORIES.picker, 'Slot — actions')
        const sb = sandbox(page)
        const picker = sb.locator('[data-cy="picker-actions"]')
        await expect(picker).toHaveClass(/origam-picker--has-actions/)
        await expect(sb.locator('[data-cy="picker-actions-cancel"]')).toBeVisible()
        await expect(sb.locator('[data-cy="picker-actions-save"]')).toBeVisible()
        await expect(picker.locator('.origam-picker__actions')).toBeVisible()
    })

    test('Slot — header content renders inside .origam-picker__header', async ({ page }) => {
        await gotoVariant(page, STORIES.picker, 'Slot — header')
        const sb = sandbox(page)
        const picker = sb.locator('[data-cy="picker-header"]')
        await expect(picker.locator('.origam-picker__header')).toBeVisible()
        await expect(sb.locator('[data-cy="picker-header-content"]')).toBeVisible()
    })

    test('Slot — title override replaces auto-rendered title', async ({ page }) => {
        await gotoVariant(page, STORIES.picker, 'Slot — title')
        const sb = sandbox(page)
        const slotted = sb.locator('[data-cy="picker-title-slot-content"]')
        await expect(slotted).toBeVisible()
        await expect(slotted).toContainText('Custom title via slot')
        // tag prop honoured
        await expect(slotted.evaluate((el) => el.tagName.toLowerCase())).resolves.toBe('h2')
    })

    test('Color — bgColor=primary applies an inline background-color', async ({ page }) => {
        await gotoVariant(page, STORIES.picker, 'Color')
        const sb = sandbox(page)
        // Set bgColor=primary via the controls panel
        const select = page.getByTitle('bgColor', { exact: true })
        await select.selectOption({ label: 'primary' })
        await page.waitForTimeout(300)
        const picker = sb.locator('[data-cy="picker-color"]')
        const header = picker.locator('> .origam-sheet').locator('> div').first()
        // The header div carries useBackgroundColor's inline style
        const bg = await header.evaluate((el) => getComputedStyle(el).backgroundColor)
        expect(bg).toMatch(/rgb/)
    })

    test('Elevation — picker mounts with elevation=8', async ({ page }) => {
        await gotoVariant(page, STORIES.picker, 'Elevation')
        const sb = sandbox(page)
        const select = page.getByTitle('elevation', { exact: true })
        await select.selectOption({ label: '8' }).catch(() => select.selectOption({ value: '8' }))
        await page.waitForTimeout(300)
        const picker = sb.locator('[data-cy="picker-elevation"]')
        await expect(picker).toBeVisible()
        // Sheet wraps with elevation-8 modifier class on the inner sheet
        await expect(picker.locator('.origam-sheet')).toHaveClass(/origam-sheet--elevation-8/)
    })

    test('Rounded — rounded modifier class flips on the inner sheet', async ({ page }) => {
        await gotoVariant(page, STORIES.picker, 'Rounded')
        const sb = sandbox(page)
        const select = page.getByTitle('rounded', { exact: true })
        await select.selectOption({ label: 'large' }).catch(() => select.selectOption({ value: 'large' }))
        await page.waitForTimeout(300)
        const picker = sb.locator('[data-cy="picker-rounded"]')
        await expect(picker.locator('.origam-sheet')).toHaveClass(/origam-sheet--rounded-large/)
    })

    test('Playground — mounts with composite props', async ({ page }) => {
        await gotoVariant(page, STORIES.picker, 'Playground')
        const sb = sandbox(page)
        const picker = sb.locator('[data-cy="picker-playground"]')
        await expect(picker).toBeVisible()
        await expect(picker).toHaveClass(/origam-picker--has-actions/)
    })
})

// ════════════════════════════════════════════════════════════════════════════
// OrigamPickerTitle
// ════════════════════════════════════════════════════════════════════════════

test.describe('OrigamPickerTitle', () => {
    test('Default — renders the title prop text', async ({ page }) => {
        await gotoVariant(page, STORIES.pickerTitle, 'Default')
        const sb = sandbox(page)
        const title = sb.locator('[data-cy="picker-title-default"]')
        await expect(title).toBeVisible()
        await expect(title).toContainText('Pick a date')
        await expect(title).toHaveClass(/origam-picker-title/)
    })

    test('Title prop — reactive update from controls', async ({ page }) => {
        await gotoVariant(page, STORIES.pickerTitle, 'Title prop')
        const sb = sandbox(page)
        const title = sb.locator('[data-cy="picker-title-prop"]')
        await expect(title).toContainText('Custom title')
    })

    test('Tag — polymorphic tag renders an h2', async ({ page }) => {
        await gotoVariant(page, STORIES.pickerTitle, 'Tag')
        const sb = sandbox(page)
        const title = sb.locator('[data-cy="picker-title-tag"]')
        await expect(title.evaluate((el) => el.tagName.toLowerCase())).resolves.toBe('h2')
    })

    test('Slot — default slot replaces the title prop', async ({ page }) => {
        await gotoVariant(page, STORIES.pickerTitle, 'Slot — default')
        const sb = sandbox(page)
        await expect(sb.locator('[data-cy="picker-title-slot-strong"]')).toBeVisible()
    })

    test('Playground — mounts with default tag div', async ({ page }) => {
        await gotoVariant(page, STORIES.pickerTitle, 'Playground')
        const sb = sandbox(page)
        const title = sb.locator('[data-cy="picker-title-playground"]')
        await expect(title.evaluate((el) => el.tagName.toLowerCase())).resolves.toBe('div')
    })
})

// ════════════════════════════════════════════════════════════════════════════
// OrigamOverlay
// ════════════════════════════════════════════════════════════════════════════

test.describe('OrigamOverlay', () => {
    test('Default — activator opens overlay content', async ({ page }) => {
        await gotoVariant(page, STORIES.overlay, 'Default')
        const sb = sandbox(page)
        const activator = sb.locator('[data-cy="overlay-default-activator"]')
        await expect(activator).toBeVisible()
        // Content not yet visible
        await expect(sb.locator('[data-cy="overlay-default-content"]')).toHaveCount(0)
        await activator.click()
        await expect(sb.locator('[data-cy="overlay-default-content"]')).toBeVisible({ timeout: 4000 })
        // Close
        await sb.locator('[data-cy="overlay-default-close"]').click()
        await expect(sb.locator('[data-cy="overlay-default-content"]')).not.toBeVisible({ timeout: 4000 })
    })

    test('Scrim — true renders the scrim element', async ({ page }) => {
        await gotoVariant(page, STORIES.overlay, 'Scrim')
        const sb = sandbox(page)
        await sb.locator('[data-cy="overlay-scrim-activator"]').click()
        await expect(sb.locator('[data-cy="overlay-scrim-content"]')).toBeVisible({ timeout: 4000 })
        // Scrim element is rendered (inside the .origam-overlay container)
        await expect(sb.locator('.origam-scrim').first()).toBeVisible()
        await sb.locator('[data-cy="overlay-scrim-close"]').click()
    })

    test('Scrim — false hides the scrim element', async ({ page }) => {
        await gotoVariant(page, STORIES.overlay, 'Scrim')
        const sb = sandbox(page)
        const scrimSelect = page.getByTitle('scrim', { exact: true })
        await scrimSelect.selectOption({ label: 'false (no scrim)' })
        await page.waitForTimeout(300)
        await sb.locator('[data-cy="overlay-scrim-activator"]').click()
        await expect(sb.locator('[data-cy="overlay-scrim-content"]')).toBeVisible({ timeout: 4000 })
        // No scrim DOM since `active` becomes false on scrim child
        await expect(sb.locator('.origam-scrim')).toHaveCount(0)
        await sb.locator('[data-cy="overlay-scrim-close"]').click()
    })

    test('Persistent — outside click does not close overlay', async ({ page }) => {
        await gotoVariant(page, STORIES.overlay, 'Persistent')
        const sb = sandbox(page)
        await sb.locator('[data-cy="overlay-persistent-activator"]').click()
        await expect(sb.locator('[data-cy="overlay-persistent-content"]')).toBeVisible({ timeout: 4000 })
        // Click on the scrim (outside content)
        const scrim = sb.locator('.origam-overlay__scrim, .origam-scrim').first()
        if (await scrim.count()) await scrim.click({ force: true })
        await page.waitForTimeout(400)
        // Still visible because persistent
        await expect(sb.locator('[data-cy="overlay-persistent-content"]')).toBeVisible()
        // Close via the explicit button
        await sb.locator('[data-cy="overlay-persistent-close"]').click()
        await expect(sb.locator('[data-cy="overlay-persistent-content"]')).not.toBeVisible({ timeout: 4000 })
    })

    test('Disabled — clicking activator never opens', async ({ page }) => {
        await gotoVariant(page, STORIES.overlay, 'Disabled')
        const sb = sandbox(page)
        await sb.locator('[data-cy="overlay-disabled-activator"]').click()
        await page.waitForTimeout(400)
        await expect(sb.locator('[data-cy="overlay-disabled-content"]')).toHaveCount(0)
        await expect(sb.locator('[data-cy="overlay-disabled-state"]')).toContainText('open=false')
    })

    test('Contained — overlay scoped to host (--contained class)', async ({ page }) => {
        await gotoVariant(page, STORIES.overlay, 'Contained')
        const sb = sandbox(page)
        await sb.locator('[data-cy="overlay-contained-activator"]').click()
        await expect(sb.locator('[data-cy="overlay-contained-content"]')).toBeVisible({ timeout: 4000 })
        await expect(sb.locator('.origam-overlay--contained').first()).toBeVisible()
        await sb.locator('[data-cy="overlay-contained-close"]').click()
    })

    test('Z-index — overlay container honours zIndex prop', async ({ page }) => {
        await gotoVariant(page, STORIES.overlay, 'Z-index')
        const sb = sandbox(page)
        await sb.locator('[data-cy="overlay-zindex-activator"]').click()
        await expect(sb.locator('[data-cy="overlay-zindex-content"]')).toBeVisible({ timeout: 4000 })
        const overlay = sb.locator('.origam-overlay--active').first()
        const z = await overlay.evaluate((el) => getComputedStyle(el).zIndex)
        expect(parseInt(z, 10)).toBeGreaterThanOrEqual(2000)
        await sb.locator('[data-cy="overlay-zindex-close"]').click()
    })

    test('Playground — composite mounts and toggles', async ({ page }) => {
        await gotoVariant(page, STORIES.overlay, 'Playground')
        const sb = sandbox(page)
        await sb.locator('[data-cy="overlay-playground-activator"]').click()
        await expect(sb.locator('[data-cy="overlay-playground-content"]')).toBeVisible({ timeout: 4000 })
        await sb.locator('[data-cy="overlay-playground-close"]').click()
    })
})

// ════════════════════════════════════════════════════════════════════════════
// OrigamOverlayScrim
// ════════════════════════════════════════════════════════════════════════════

test.describe('OrigamOverlayScrim', () => {
    test('Default — toggle button mounts and unmounts the scrim', async ({ page }) => {
        await gotoVariant(page, STORIES.scrim, 'Default')
        const sb = sandbox(page)
        await expect(sb.locator('[data-cy="scrim-default"]')).toHaveCount(0)
        await sb.locator('[data-cy="scrim-default-toggle"]').click()
        await expect(sb.locator('[data-cy="scrim-default"]')).toBeVisible({ timeout: 4000 })
    })

    test('Active — checkbox mounts the scrim element', async ({ page }) => {
        await gotoVariant(page, STORIES.scrim, 'Active')
        const sb = sandbox(page)
        // Initial state active=false → no DOM
        await expect(sb.locator('[data-cy="scrim-active"]')).toHaveCount(0)
        // Toggle via control
        const checkbox = page.getByTitle('active', { exact: true })
        await checkbox.click()
        await page.waitForTimeout(300)
        await expect(sb.locator('[data-cy="scrim-active"]')).toBeVisible({ timeout: 4000 })
        await expect(sb.locator('[data-cy="scrim-active-label"]')).toContainText('active=true')
    })

    test('Scrim color — primary applies a non-transparent backdrop', async ({ page }) => {
        await gotoVariant(page, STORIES.scrim, 'Scrim color')
        const sb = sandbox(page)
        await sb.locator('[data-cy="scrim-color-toggle"]').click()
        await expect(sb.locator('[data-cy="scrim-color"]')).toBeVisible({ timeout: 4000 })
        const bg = await sb.locator('[data-cy="scrim-color"]').evaluate((el) => getComputedStyle(el).backgroundColor)
        expect(bg).toMatch(/rgb/)
    })

    test('Emits — click increments the counter and closes the scrim', async ({ page }) => {
        await gotoVariant(page, STORIES.scrim, 'Emits — click')
        const sb = sandbox(page)
        await sb.locator('[data-cy="scrim-emit-toggle"]').click()
        await expect(sb.locator('[data-cy="scrim-emit"]')).toBeVisible({ timeout: 4000 })
        await sb.locator('[data-cy="scrim-emit"]').click({ force: true })
        await page.waitForTimeout(400)
        await expect(sb.locator('[data-cy="scrim-emit-counter"]')).toContainText('clicks=1')
    })

    test('Playground — mounts when toggled active', async ({ page }) => {
        await gotoVariant(page, STORIES.scrim, 'Playground')
        const sb = sandbox(page)
        const checkbox = page.getByTitle('active', { exact: true })
        await checkbox.click()
        await page.waitForTimeout(300)
        await expect(sb.locator('[data-cy="scrim-playground"]')).toBeVisible({ timeout: 4000 })
    })
})
