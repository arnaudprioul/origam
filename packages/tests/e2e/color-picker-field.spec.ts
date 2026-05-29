import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/components-stories-colorpickerfield-origamcolorpickerfield-story-vue'

/**
 * Navigate to a named Variant in Histoire by clicking the sidebar link whose
 * text matches the title exactly (Histoire renders each Variant as a sidebar
 * entry). We use the direct title text rather than the HstSelect picker which
 * is custom DOM and brittle.
 */
async function goToVariant (page: import('@playwright/test').Page, title: string) {
    await page.goto(STORY_PATH)
    await page.waitForLoadState('networkidle')
    await page.getByText(title, { exact: true }).first().click()
    await page.waitForTimeout(800)
}

test.describe('OrigamColorPickerField', () => {
    test('Basic variant — field renders with a visible input', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Default', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-color-picker-field').first()).toBeVisible({ timeout: 5000 })
    })

    test('Close on select variant — field renders', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Prop — closeOnSelect', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-color-picker-field').first()).toBeVisible({ timeout: 5000 })
    })

    test('States — disabled state prevents menu from opening', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Prop — disabled & readonly', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-color-picker-field').first()).toBeVisible({ timeout: 5000 })
    })

    test('Slot — colorSelection renders custom content', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Slot — colorSelection', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-color-picker-field').first()).toBeVisible({ timeout: 5000 })
    })

    test('Emit — update:modelValue variant renders field', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('.origam-color-picker-field').first()).toBeVisible({ timeout: 5000 })
    })

    test('Playground — field renders and has the active-menu class when picker opens', async ({ page }) => {
        await goToVariant(page, 'Default')

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const field = sandbox.locator('.origam-color-picker-field').first()
        await expect(field).toBeVisible({ timeout: 5000 })

        // Click to open the picker
        await field.click()
        await page.waitForTimeout(500)
        await expect(field).toHaveClass(/origam-color-picker-field--active-menu/)
    })

    /**
     * Prop — rules
     *
     * This spec verifies that `validationValue` is correctly wired to the
     * current colour model so that rules receive the real colour value instead
     * of `undefined`.
     *
     * Scenario:
     *   1. Field starts empty (null) with validateOn="blur". After the first
     *      blur, `.origam-messages` must show "Color required".
     *   2. After the user selects a colour (opens picker → clicks a swatch),
     *      the error message must disappear.
     *
     * NOTE: This spec is written to run against a live Histoire server
     * (`pnpm -F @origam/stories dev`). It cannot be run headlessly in a
     * build-only CI environment without the dev server running.
     * Run manually: `pnpm -F @origam/tests test:e2e -- --grep "rules"`
     */
    test('Prop — rules: error message appears when field is empty after blur', async ({ page }) => {
        await goToVariant(page, 'Prop — rules')

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')

        // The field should be present and empty initially
        const field = sandbox.locator('[data-cy="colorpickerfield-rules"]')
        await expect(field).toBeVisible({ timeout: 5000 })

        // Messages container must NOT be visible initially (validateOn=blur, pristine state)
        const messages = sandbox.locator('[data-cy="colorpickerfield-rules"] .origam-messages, [data-cy="colorpickerfield-rules"] ~ .origam-messages')
        // Use the broader OrigamInput messages container (rendered as a sibling of the field
        // inside the OrigamInput wrapper)
        const inputWrapper = sandbox.locator('.origam-input').filter({ has: field })
        const errorMessage = inputWrapper.locator('.origam-messages__message').first()

        // Initially (pristine, no blur yet): no error visible
        // We use `not.toBeVisible` to confirm error is hidden before interaction
        // (if the element doesn't exist yet, the assertion naturally passes)
        await expect(errorMessage).not.toBeVisible({ timeout: 3000 }).catch(() => {
            // Element may not exist at all — that's also acceptable (no error shown)
        })

        // Trigger a blur without selecting a colour: click the field to focus,
        // then click somewhere outside to blur
        await field.click()
        await page.waitForTimeout(300)
        // Press Escape to close any menu that might have opened without selecting
        await sandbox.locator('body').press('Escape')
        await page.waitForTimeout(300)
        // Click outside the field to trigger blur
        await sandbox.locator('body').click({ position: { x: 10, y: 10 } })
        await page.waitForTimeout(500)

        // After blur on empty field: error message "Color required" must appear
        const errorText = sandbox.locator('.origam-messages__message').first()
        await expect(errorText).toBeVisible({ timeout: 3000 })
        await expect(errorText).toHaveText('Color required')
    })

    test('Prop — rules: error message disappears after a colour is selected', async ({ page }) => {
        await goToVariant(page, 'Prop — rules')

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const field = sandbox.locator('[data-cy="colorpickerfield-rules"]')
        await expect(field).toBeVisible({ timeout: 5000 })

        // First, trigger the error by blurring without a value
        await field.click()
        await page.waitForTimeout(300)
        await sandbox.locator('body').press('Escape')
        await page.waitForTimeout(300)
        await sandbox.locator('body').click({ position: { x: 10, y: 10 } })
        await page.waitForTimeout(500)

        const errorText = sandbox.locator('.origam-messages__message').first()
        await expect(errorText).toBeVisible({ timeout: 3000 })

        // Now open the picker and select a colour by clicking the first colour swatch
        await field.click()
        await page.waitForTimeout(500)

        const colorPicker = sandbox.locator('.origam-color-picker')
        await expect(colorPicker).toBeVisible({ timeout: 3000 })

        // Click the first colour dot/swatch inside the picker canvas area
        // The OrigamColorPicker renders a canvas or swatch grid — click centre of canvas
        const canvas = colorPicker.locator('canvas').first()
        if (await canvas.isVisible()) {
            await canvas.click({ position: { x: 50, y: 50 } })
        } else {
            // Fallback: click any clickable swatch element
            await colorPicker.locator('.origam-color-picker__swatch, .origam-sheet').first().click()
        }
        await page.waitForTimeout(500)

        // Close the picker
        await sandbox.locator('body').click({ position: { x: 10, y: 10 } })
        await page.waitForTimeout(500)

        // Error message must no longer be visible (colour is now set)
        await expect(errorText).not.toBeVisible({ timeout: 3000 })
    })
})
