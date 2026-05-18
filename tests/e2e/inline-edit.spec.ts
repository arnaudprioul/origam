import { expect, test, type Page } from '@playwright/test'

/**
 * OrigamInlineEdit — runtime probes for the edit-in-place state
 * machine, the v-model round-trip, the validator (sync + async),
 * keyboard handling (Enter / Esc) and ARIA wiring (aria-label,
 * aria-invalid, role=alert).
 *
 * In edit mode the `<input>` / `<textarea>` is now rendered inside
 * `<OrigamTextField>` / `<OrigamTextareaField>`. The `data-cy`
 * attribute targets the field root; the actual focusable element is
 * `[data-cy="origam-inline-edit-input"] input` (or `textarea`).
 *
 * When `showActions=true`, Confirm and Cancel buttons are rendered
 * inside the field's `appendInner` slot — NOT as siblings of the field.
 *
 * Variants are reached via their dedicated titles — never via the
 * HstSelect picker dropdown (custom DOM, brittle).
 */

const STORY = '/story/stories-components-stories-inlineedit-origaminlineedit-story-vue'

const sandboxOf = (page: Page) =>
    page.frameLocator('iframe[src*="__sandbox"]')

const openVariant = async (page: Page, title: string): Promise<void> => {
    await page.goto(STORY)
    await page.waitForLoadState('networkidle')
    await page.getByText(title, { exact: true }).first().click()
    await page.waitForTimeout(400)
}

/** Locate the actual <input> inside the OrigamTextField field wrapper. */
const inputInField = (sandbox: ReturnType<typeof sandboxOf>, hostCy: string) =>
    sandbox.locator(`[data-cy="${hostCy}"] [data-cy="origam-inline-edit-input"] input`).first()

/** Locate the actual <textarea> inside the OrigamTextareaField field wrapper. */
const textareaInField = (sandbox: ReturnType<typeof sandboxOf>, hostCy: string) =>
    sandbox.locator(`[data-cy="${hostCy}"] [data-cy="origam-inline-edit-input"] textarea`).first()

/** Locate the field root element (OrigamTextField / OrigamTextareaField). */
const fieldRoot = (sandbox: ReturnType<typeof sandboxOf>, hostCy: string) =>
    sandbox.locator(`[data-cy="${hostCy}"] [data-cy="origam-inline-edit-input"]`).first()

test.describe('OrigamInlineEdit — Default (display → edit transition)', () => {
    test('mounts with the display affordance visible (not the input)', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)

        const display = sandbox.locator('[data-cy="inline-edit-playground-host"] [data-cy="origam-inline-edit-display"]').first()
        await expect(display).toBeVisible({ timeout: 8000 })

        const field = sandbox.locator('[data-cy="inline-edit-playground-host"] [data-cy="origam-inline-edit-input"]')
        await expect(field).toHaveCount(0)
    })

    test('clicking the display switches to edit mode (input visible, draft = current value)', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)

        const display = sandbox.locator('[data-cy="inline-edit-playground-host"] [data-cy="origam-inline-edit-display"]').first()
        await display.click()

        const input = inputInField(sandbox, 'inline-edit-playground-host')
        await expect(input).toBeVisible()
        await expect(input).toHaveValue('Initial title')
    })

    test('Enter confirms, the input disappears, the v-model state updates', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)

        const display = sandbox.locator('[data-cy="inline-edit-playground-host"] [data-cy="origam-inline-edit-display"]').first()
        await display.click()

        const input = inputInField(sandbox, 'inline-edit-playground-host')
        await input.fill('Updated title')
        await input.press('Enter')

        await expect(sandbox.locator('[data-cy="inline-edit-playground-host"] [data-cy="origam-inline-edit-input"]')).toHaveCount(0)
        const state = sandbox.locator('[data-cy="inline-edit-playground-state"]').first()
        await expect(state).toHaveText('Updated title')
    })

    test('Esc cancels, the value is unchanged', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)

        const display = sandbox.locator('[data-cy="inline-edit-playground-host"] [data-cy="origam-inline-edit-display"]').first()
        await display.click()

        const input = inputInField(sandbox, 'inline-edit-playground-host')
        await input.fill('Discarded change')
        await input.press('Escape')

        await expect(sandbox.locator('[data-cy="inline-edit-playground-host"] [data-cy="origam-inline-edit-input"]')).toHaveCount(0)
        const state = sandbox.locator('[data-cy="inline-edit-playground-state"]').first()
        await expect(state).toHaveText('Initial title')
    })

    test('display button carries an `aria-label` that quotes the current value', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)

        const display = sandbox.locator('[data-cy="inline-edit-playground-host"] [data-cy="origam-inline-edit-display"]').first()
        await expect(display).toHaveAttribute('aria-label', /edit initial title/i)
    })
})

test.describe('OrigamInlineEdit — Validator (sync)', () => {
    test('a sync validator returning a string surfaces in a role=alert AND keeps the editor open', async ({ page }) => {
        await openVariant(page, 'Prop — validate (min length)')
        const sandbox = sandboxOf(page)

        const display = sandbox.locator('[data-cy="inline-edit-validate-min-host"] [data-cy="origam-inline-edit-display"]').first()
        await display.click()

        const input = inputInField(sandbox, 'inline-edit-validate-min-host')
        await input.fill('ab')
        await input.press('Enter')

        // Editor still open.
        await expect(input).toBeVisible()

        const error = sandbox.locator('[data-cy="inline-edit-validate-min-host"] [data-cy="origam-inline-edit-error"]').first()
        await expect(error).toBeVisible()
        await expect(error).toHaveAttribute('role', 'alert')
        await expect(error).toContainText(/min 3 chars/i)
        await expect(input).toHaveAttribute('aria-invalid', 'true')
    })

    test('a valid sync value commits and clears the error', async ({ page }) => {
        await openVariant(page, 'Prop — validate (min length)')
        const sandbox = sandboxOf(page)

        const display = sandbox.locator('[data-cy="inline-edit-validate-min-host"] [data-cy="origam-inline-edit-display"]').first()
        await display.click()

        const input = inputInField(sandbox, 'inline-edit-validate-min-host')
        await input.fill('hello')
        await input.press('Enter')

        await expect(sandbox.locator('[data-cy="inline-edit-validate-min-host"] [data-cy="origam-inline-edit-input"]')).toHaveCount(0)
    })
})

test.describe('OrigamInlineEdit — Validator (async)', () => {
    test('async Promise.reject path: validator returning a string keeps the editor open and shows the error', async ({ page }) => {
        await openVariant(page, 'Prop — validate (async API check, 30% fail)')
        const sandbox = sandboxOf(page)

        // Force Math.random into the "fail" branch so the test is deterministic.
        await sandbox.locator('body').evaluate(() => {
            const original = Math.random
            Math.random = () => 0
            // Restore after a few seconds so the rest of the Variant
            // does not break later assertions.
            setTimeout(() => { Math.random = original }, 5000)
        })

        const display = sandbox.locator('[data-cy="inline-edit-validate-async-host"] [data-cy="origam-inline-edit-display"]').first()
        await display.click()

        const input = inputInField(sandbox, 'inline-edit-validate-async-host')
        await input.fill('bob')
        await input.press('Enter')

        // Wait past the simulated 800ms latency.
        await page.waitForTimeout(1200)

        // Editor still open, error surfaced via role=alert.
        await expect(input).toBeVisible()
        const error = sandbox.locator('[data-cy="inline-edit-validate-async-host"] [data-cy="origam-inline-edit-error"]').first()
        await expect(error).toBeVisible()
        await expect(error).toContainText(/already taken/i)
    })
})

test.describe('OrigamInlineEdit — Disabled', () => {
    test('disabled display does NOT enter edit mode on click', async ({ page }) => {
        await openVariant(page, 'Prop — disabled')
        const sandbox = sandboxOf(page)

        const display = sandbox.locator('[data-cy="inline-edit-disabled-host"] [data-cy="origam-inline-edit-display"]').first()
        await expect(display).toBeDisabled()

        await display.click({ force: true }).catch(() => undefined)
        await expect(sandbox.locator('[data-cy="inline-edit-disabled-host"] [data-cy="origam-inline-edit-input"]')).toHaveCount(0)
    })
})

test.describe('OrigamInlineEdit — Slots', () => {
    test('#display slot lets the consumer render a custom affordance (h2) that still drives edit mode', async ({ page }) => {
        await openVariant(page, 'Slot — display (h2 custom rendering)')
        const sandbox = sandboxOf(page)

        const trigger = sandbox.locator('[data-cy="inline-edit-slot-display-trigger"]').first()
        await expect(trigger).toBeVisible({ timeout: 8000 })

        // The default button affordance should NOT be in the DOM when
        // the consumer supplies a #display slot.
        const builtIn = await sandbox.locator('[data-cy="inline-edit-slot-display-host"] [data-cy="origam-inline-edit-display"]').count()
        expect(builtIn).toBe(0)

        await trigger.click()
        await expect(inputInField(sandbox, 'inline-edit-slot-display-host')).toBeVisible()
    })

    test('#actions slot — clicking the cancel button reverts the draft', async ({ page }) => {
        await openVariant(page, 'Slot — actions (Confirm / Cancel buttons)')
        const sandbox = sandboxOf(page)

        const display = sandbox.locator('[data-cy="inline-edit-slot-actions-host"] [data-cy="origam-inline-edit-display"]').first()
        await display.click()

        const input = inputInField(sandbox, 'inline-edit-slot-actions-host')
        await input.fill('Something else')

        const cancelBtn = sandbox.locator('[data-cy="inline-edit-slot-actions-cancel"]').first()
        await cancelBtn.click()

        await expect(sandbox.locator('[data-cy="inline-edit-slot-actions-host"] [data-cy="origam-inline-edit-input"]')).toHaveCount(0)
        await expect(sandbox.locator('[data-cy="inline-edit-slot-actions-host"] [data-cy="origam-inline-edit-display"]')).toContainText('My item')
    })
})

test.describe('OrigamInlineEdit — Prop showActions=false (default, keyboard only)', () => {
    test('no action buttons are rendered when showActions is false', async ({ page }) => {
        await openVariant(page, 'Prop — showActions (default false, keyboard only)')
        const sandbox = sandboxOf(page)

        // The display affordance is present.
        const display = sandbox.locator('[data-cy="inline-edit-show-actions-false-host"] [data-cy="origam-inline-edit-display"]').first()
        await expect(display).toBeVisible({ timeout: 8000 })

        // No action buttons rendered in display mode.
        await expect(sandbox.locator('[data-cy="inline-edit-show-actions-false-host"] [data-cy="origam-inline-edit-actions-display"]')).toHaveCount(0)
    })

    test('keyboard Enter confirms, Escape cancels — showActions=false does not break keyboard', async ({ page }) => {
        await openVariant(page, 'Prop — showActions (default false, keyboard only)')
        const sandbox = sandboxOf(page)

        const display = sandbox.locator('[data-cy="inline-edit-show-actions-false-host"] [data-cy="origam-inline-edit-display"]').first()
        await display.click()

        const input = inputInField(sandbox, 'inline-edit-show-actions-false-host')
        await input.fill('New keyboard value')
        await input.press('Enter')

        const state = sandbox.locator('[data-cy="inline-edit-show-actions-false-state"]').first()
        await expect(state).toHaveText('New keyboard value')
    })
})

test.describe('OrigamInlineEdit — Prop showActions=true', () => {
    test('Edit button is visible in display mode', async ({ page }) => {
        await openVariant(page, 'Prop — showActions=true')
        const sandbox = sandboxOf(page)

        const editBtn = sandbox.locator('[data-cy="origam-inline-edit-action-edit"]').first()
        await expect(editBtn).toBeVisible({ timeout: 8000 })
    })

    test('Confirm and Cancel buttons are NOT visible in display mode', async ({ page }) => {
        await openVariant(page, 'Prop — showActions=true')
        const sandbox = sandboxOf(page)

        await expect(sandbox.locator('[data-cy="origam-inline-edit-action-confirm"]')).toHaveCount(0)
        await expect(sandbox.locator('[data-cy="origam-inline-edit-action-cancel"]')).toHaveCount(0)
    })

    test('clicking Edit button enters edit mode (OrigamTextField visible with input inside)', async ({ page }) => {
        await openVariant(page, 'Prop — showActions=true')
        const sandbox = sandboxOf(page)

        const editBtn = sandbox.locator('[data-cy="origam-inline-edit-action-edit"]').first()
        await editBtn.click()

        const input = inputInField(sandbox, 'inline-edit-show-actions-true-host')
        await expect(input).toBeVisible()
    })

    test('Confirm and Cancel buttons are inside the field (appendInner), Edit button is hidden', async ({ page }) => {
        await openVariant(page, 'Prop — showActions=true')
        const sandbox = sandboxOf(page)

        const editBtn = sandbox.locator('[data-cy="origam-inline-edit-action-edit"]').first()
        await editBtn.click()

        // Confirm and Cancel are inside the field element.
        const fieldEl = fieldRoot(sandbox, 'inline-edit-show-actions-true-host')
        await expect(fieldEl.locator('[data-cy="origam-inline-edit-action-confirm"]').first()).toBeVisible()
        await expect(fieldEl.locator('[data-cy="origam-inline-edit-action-cancel"]').first()).toBeVisible()

        // Edit button is gone.
        await expect(sandbox.locator('[data-cy="origam-inline-edit-action-edit"]')).toHaveCount(0)
    })

    test('clicking Confirm commits the new value and exits edit mode', async ({ page }) => {
        await openVariant(page, 'Prop — showActions=true')
        const sandbox = sandboxOf(page)

        const editBtn = sandbox.locator('[data-cy="origam-inline-edit-action-edit"]').first()
        await editBtn.click()

        const input = inputInField(sandbox, 'inline-edit-show-actions-true-host')
        await input.fill('Saved via button')

        const confirmBtn = sandbox.locator('[data-cy="origam-inline-edit-action-confirm"]').first()
        await confirmBtn.click()

        await expect(sandbox.locator('[data-cy="inline-edit-show-actions-true-host"] [data-cy="origam-inline-edit-input"]')).toHaveCount(0)
        const state = sandbox.locator('[data-cy="inline-edit-show-actions-true-state"]').first()
        await expect(state).toHaveText('Saved via button')
    })

    test('clicking Cancel exits edit mode WITHOUT updating the value', async ({ page }) => {
        await openVariant(page, 'Prop — showActions=true')
        const sandbox = sandboxOf(page)

        const editBtn = sandbox.locator('[data-cy="origam-inline-edit-action-edit"]').first()
        await editBtn.click()

        const input = inputInField(sandbox, 'inline-edit-show-actions-true-host')
        await input.fill('Discarded change')

        const cancelBtn = sandbox.locator('[data-cy="origam-inline-edit-action-cancel"]').first()
        await cancelBtn.click()

        await expect(sandbox.locator('[data-cy="inline-edit-show-actions-true-host"] [data-cy="origam-inline-edit-input"]')).toHaveCount(0)
        const state = sandbox.locator('[data-cy="inline-edit-show-actions-true-state"]').first()
        await expect(state).toHaveText('With action buttons')
    })

    test('keyboard shortcuts still work in parallel with showActions=true (Enter confirms)', async ({ page }) => {
        await openVariant(page, 'Prop — showActions=true')
        const sandbox = sandboxOf(page)

        const editBtn = sandbox.locator('[data-cy="origam-inline-edit-action-edit"]').first()
        await editBtn.click()

        const input = inputInField(sandbox, 'inline-edit-show-actions-true-host')
        await input.fill('Saved via Enter')
        await input.press('Enter')

        const state = sandbox.locator('[data-cy="inline-edit-show-actions-true-state"]').first()
        await expect(state).toHaveText('Saved via Enter')
    })
})

test.describe('OrigamInlineEdit — Prop showActions=true + multiline', () => {
    test('Edit button is visible in display mode', async ({ page }) => {
        await openVariant(page, 'Prop — showActions=true + multiline')
        const sandbox = sandboxOf(page)

        const editBtn = sandbox.locator('[data-cy="inline-edit-show-actions-multiline-host"] [data-cy="origam-inline-edit-action-edit"]').first()
        await expect(editBtn).toBeVisible({ timeout: 8000 })
    })

    test('clicking Edit enters multiline mode — OrigamTextareaField with textarea visible', async ({ page }) => {
        await openVariant(page, 'Prop — showActions=true + multiline')
        const sandbox = sandboxOf(page)

        const editBtn = sandbox.locator('[data-cy="inline-edit-show-actions-multiline-host"] [data-cy="origam-inline-edit-action-edit"]').first()
        await editBtn.click()

        const textarea = textareaInField(sandbox, 'inline-edit-show-actions-multiline-host')
        await expect(textarea).toBeVisible()
    })

    test('Confirm and Cancel buttons are inside the OrigamTextareaField (appendInner)', async ({ page }) => {
        await openVariant(page, 'Prop — showActions=true + multiline')
        const sandbox = sandboxOf(page)

        const editBtn = sandbox.locator('[data-cy="inline-edit-show-actions-multiline-host"] [data-cy="origam-inline-edit-action-edit"]').first()
        await editBtn.click()

        const fieldEl = fieldRoot(sandbox, 'inline-edit-show-actions-multiline-host')
        await expect(fieldEl.locator('[data-cy="origam-inline-edit-action-confirm"]').first()).toBeVisible()
        await expect(fieldEl.locator('[data-cy="origam-inline-edit-action-cancel"]').first()).toBeVisible()
    })

    test('clicking Confirm commits the new value', async ({ page }) => {
        await openVariant(page, 'Prop — showActions=true + multiline')
        const sandbox = sandboxOf(page)

        const editBtn = sandbox.locator('[data-cy="inline-edit-show-actions-multiline-host"] [data-cy="origam-inline-edit-action-edit"]').first()
        await editBtn.click()

        const textarea = textareaInField(sandbox, 'inline-edit-show-actions-multiline-host')
        await textarea.fill('Saved multiline via button')

        const confirmBtn = sandbox.locator('[data-cy="inline-edit-show-actions-multiline-host"] [data-cy="origam-inline-edit-action-confirm"]').first()
        await confirmBtn.click()

        await expect(sandbox.locator('[data-cy="inline-edit-show-actions-multiline-host"] [data-cy="origam-inline-edit-input"]')).toHaveCount(0)
        const state = sandbox.locator('[data-cy="inline-edit-show-actions-multiline-state"]').first()
        await expect(state).toHaveText('Saved multiline via button')
    })

    test('clicking Cancel exits without saving', async ({ page }) => {
        await openVariant(page, 'Prop — showActions=true + multiline')
        const sandbox = sandboxOf(page)

        const editBtn = sandbox.locator('[data-cy="inline-edit-show-actions-multiline-host"] [data-cy="origam-inline-edit-action-edit"]').first()
        await editBtn.click()

        const textarea = textareaInField(sandbox, 'inline-edit-show-actions-multiline-host')
        await textarea.fill('Discarded multiline change')

        const cancelBtn = sandbox.locator('[data-cy="inline-edit-show-actions-multiline-host"] [data-cy="origam-inline-edit-action-cancel"]').first()
        await cancelBtn.click()

        await expect(sandbox.locator('[data-cy="inline-edit-show-actions-multiline-host"] [data-cy="origam-inline-edit-input"]')).toHaveCount(0)
        const state = sandbox.locator('[data-cy="inline-edit-show-actions-multiline-state"]').first()
        await expect(state).toHaveText('Multiline with action buttons')
    })
})

test.describe('OrigamInlineEdit — Prop showActions=true + disabled', () => {
    test('Edit button is disabled when the component is disabled', async ({ page }) => {
        await openVariant(page, 'Prop — showActions=true + disabled')
        const sandbox = sandboxOf(page)

        const editBtn = sandbox.locator('[data-cy="origam-inline-edit-show-actions-disabled-host"] [data-cy="origam-inline-edit-action-edit"]').first()
        await expect(editBtn).toBeDisabled({ timeout: 8000 })
    })
})

test.describe('OrigamInlineEdit — Emits', () => {
    test('@confirm / @cancel / @validate-error emit the expected counts', async ({ page }) => {
        await openVariant(page, 'Emit — confirm / cancel / validate-error (logs)')
        const sandbox = sandboxOf(page)

        const display = sandbox.locator('[data-cy="inline-edit-emits-host"] [data-cy="origam-inline-edit-display"]').first()

        // Cancel path.
        await display.click()
        const input1 = inputInField(sandbox, 'inline-edit-emits-host')
        await input1.fill('zzz')
        await input1.press('Escape')

        await expect(sandbox.locator('[data-cy="inline-edit-emits-cancel"]').first()).toHaveText('1')

        // Validate-error path (too short).
        await display.click()
        const input2 = inputInField(sandbox, 'inline-edit-emits-host')
        await input2.fill('ab')
        await input2.press('Enter')

        await expect(sandbox.locator('[data-cy="inline-edit-emits-error"]').first()).toContainText(/min/i)

        // Confirm path.
        await input2.fill('Hello world')
        await input2.press('Enter')

        await expect(sandbox.locator('[data-cy="inline-edit-emits-confirm"]').first()).toHaveText('1')
    })
})
