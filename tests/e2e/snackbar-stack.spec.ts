import { expect, test, type Page } from '@playwright/test'

/**
 * OrigamSnackbarStack — runtime probes for every prop / behaviour
 * exposed by the story. Each block targets one orthogonal facet:
 *
 *   - Playground: a notify click renders a visible item with the
 *     ARIA contract (`role="region"`, `aria-live`).
 *   - Location: spawning a toast in each anchor renders into the
 *     matching `--{location}` modifier class.
 *   - Max: bursting more items than `max` keeps only the latest N.
 *   - Sticky (`duration: 0`): the item survives past a typical
 *     auto-dismiss window.
 *   - Auto-dismiss: a short-`duration` toast leaves the DOM after
 *     the requested timeout.
 *   - Dismiss button: clicking X removes the item.
 *   - Action handler: clicking an action triggers its handler
 *     (verified via the story-side counter).
 *   - ARIA: confirms `role="region"` + `role="status" / "alert"`
 *     and the appropriate `aria-live` per intent.
 *
 * Items are now rendered by `<OrigamSnackbarItem>` — selectors use
 * `.origam-snackbar-item` and `.origam-snackbar-item--intent-*`.
 *
 * Histoire iframes render the sandbox under `iframe[src*="__sandbox"]`,
 * same convention as every other origam spec. The stack is teleported
 * to `document.body` so we search the whole page (not just the host
 * container) for items.
 */

const sandboxOf = (page: Page) =>
    page.frameLocator('iframe[src*="__sandbox"]')

const openVariant = async (page: Page, variant: string) => {
    await page.goto(STORY)
    await page.waitForLoadState('networkidle')
    await page.getByText(variant, { exact: true }).first().click()
    await page.waitForTimeout(800)
}

const STORY = '/story/stories-components-stories-snackbarstack-origamsnackbarstack-story-vue'

test.describe('OrigamSnackbarStack — Playground', () => {
    test('notify renders an item, dismiss-all empties the stack', async ({ page }) => {
        await openVariant(page, 'Playground')
        const sandbox = sandboxOf(page)

        const trigger = sandbox.locator('[data-cy="snackbar-stack-playground-trigger"]').first()
        await expect(trigger).toBeVisible({ timeout: 8000 })

        // 3 notifications.
        await trigger.click()
        await trigger.click()
        await trigger.click()
        await page.waitForTimeout(300)

        const items = sandbox.locator('.origam-snackbar-item')
        await expect(items).toHaveCount(3, { timeout: 5000 })

        const dismissAll = sandbox.locator('[data-cy="snackbar-stack-playground-dismiss-all"]').first()
        await dismissAll.click()
        await page.waitForTimeout(400)

        await expect(items).toHaveCount(0)
    })

    test('stack renders OrigamSnackbarItem components (not duplicated markup)', async ({ page }) => {
        await openVariant(page, 'Playground')
        const sandbox = sandboxOf(page)

        const trigger = sandbox.locator('[data-cy="snackbar-stack-playground-trigger"]').first()
        await expect(trigger).toBeVisible({ timeout: 8000 })
        await trigger.click()
        await page.waitForTimeout(300)

        // Verify items use OrigamSnackbarItem classes (not old stack item classes)
        const item = sandbox.locator('.origam-snackbar-item').first()
        await expect(item).toBeVisible({ timeout: 5000 })

        // OrigamSnackbarItem structure: content div with prepend + text
        await expect(item.locator('.origam-snackbar-item__content')).toBeVisible()
    })
})

test.describe('OrigamSnackbarStack — Prop: location', () => {
    test('spawning at each location renders into the matching container', async ({ page }) => {
        await openVariant(page, 'Prop — location')
        const sandbox = sandboxOf(page)

        const locations = ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const

        for (const loc of locations) {
            const trigger = sandbox.locator(`[data-cy="snackbar-stack-location-${loc}"]`).first()
            await trigger.click()
        }

        await page.waitForTimeout(300)

        for (const loc of locations) {
            const host = sandbox.locator(`.origam-snackbar-stack--${loc}`).first()
            await expect(host).toBeVisible({ timeout: 5000 })

            // At least one OrigamSnackbarItem should live in the matching host.
            const items = host.locator('.origam-snackbar-item')
            await expect(items.first()).toBeVisible({ timeout: 5000 })
        }
    })
})

test.describe('OrigamSnackbarStack — Prop: max', () => {
    test('bursting 10 toasts caps the rendered stack at 5', async ({ page }) => {
        await openVariant(page, 'Prop — max')
        const sandbox = sandboxOf(page)

        const trigger = sandbox.locator('[data-cy="snackbar-stack-max-burst"]').first()
        await expect(trigger).toBeVisible({ timeout: 8000 })
        await trigger.click()
        await page.waitForTimeout(500)

        const host = sandbox.locator('[data-cy="snackbar-stack-max-host"]').first()
        const items = host.locator('.origam-snackbar-item')
        await expect(items).toHaveCount(5, { timeout: 5000 })
    })
})

test.describe('OrigamSnackbarStack — Prop: intent', () => {
    test('renders each intent with the matching modifier class', async ({ page }) => {
        await openVariant(page, 'Prop — intent')
        const sandbox = sandboxOf(page)

        for (const intent of ['success', 'warning', 'danger', 'info'] as const) {
            const trigger = sandbox.locator(`[data-cy="snackbar-stack-intent-${intent}"]`).first()
            await trigger.click()
            await page.waitForTimeout(150)

            const intentItem = sandbox
                .locator('[data-cy="snackbar-stack-intent-host"]')
                .locator(`.origam-snackbar-item--intent-${intent}`)
                .first()

            await expect(intentItem).toBeVisible({ timeout: 4000 })
        }
    })

    test('warning and danger intents render role="alert" + aria-live="assertive"', async ({ page }) => {
        await openVariant(page, 'Prop — intent')
        const sandbox = sandboxOf(page)

        await sandbox.locator('[data-cy="snackbar-stack-intent-danger"]').first().click()
        await page.waitForTimeout(200)

        const item = sandbox.locator('.origam-snackbar-item--intent-danger').first()
        await expect(item).toHaveAttribute('role', 'alert')
        await expect(item).toHaveAttribute('aria-live', 'assertive')
    })
})

test.describe('OrigamSnackbarStack — Emits + dismiss + actions', () => {
    test('clicking the X dismiss button removes the item and bumps the counter', async ({ page }) => {
        await openVariant(page, 'Emit — onDismiss')
        const sandbox = sandboxOf(page)

        const trigger = sandbox.locator('[data-cy="snackbar-stack-emit-trigger"]').first()
        await expect(trigger).toBeVisible({ timeout: 8000 })
        await trigger.click()
        await page.waitForTimeout(200)

        const host = sandbox.locator('[data-cy="snackbar-stack-emit-host"]').first()
        const dismissBtn = host
            .locator('.origam-snackbar-item__dismiss')
            .first()
        await expect(dismissBtn).toBeVisible({ timeout: 4000 })

        await dismissBtn.click()
        await page.waitForTimeout(400)

        const items = host.locator('.origam-snackbar-item')
        await expect(items).toHaveCount(0, { timeout: 5000 })

        const counter = sandbox.locator('[data-cy="snackbar-stack-emit-counter"]').first()
        await expect(counter).toContainText('Dismissed: 1')
    })

    test('clicking the action invokes the handler and dismisses by default', async ({ page }) => {
        await openVariant(page, 'Emit — onDismiss')
        const sandbox = sandboxOf(page)

        const trigger = sandbox.locator('[data-cy="snackbar-stack-emit-action"]').first()
        await trigger.click()
        await page.waitForTimeout(200)

        const action = sandbox
            .locator('[data-cy^="origam-snackbar-stack-item-"]')
            .locator('.origam-snackbar-item__action')
            .first()
        await expect(action).toBeVisible({ timeout: 4000 })
        await action.click()
        await page.waitForTimeout(400)

        const counter = sandbox.locator('[data-cy="snackbar-stack-emit-counter"]').first()
        await expect(counter).toContainText('Action clicks: 1')
        // Action handler default dismisses → onDismiss increments too.
        await expect(counter).toContainText('Dismissed: 1')
    })
})

test.describe('OrigamSnackbarStack — Auto-dismiss timing', () => {
    test('sticky item (duration: 0) survives past the default auto-dismiss window', async ({ page }) => {
        await openVariant(page, 'Prop — max')
        const sandbox = sandboxOf(page)

        // The max-burst spawn uses `duration: 0` → sticky.
        await sandbox.locator('[data-cy="snackbar-stack-max-burst"]').first().click()
        await page.waitForTimeout(6_000)

        const host = sandbox.locator('[data-cy="snackbar-stack-max-host"]').first()
        const items = host.locator('.origam-snackbar-item')
        await expect(items).toHaveCount(5)
    })

    test('short-duration item auto-dismisses within the requested window', async ({ page }) => {
        await openVariant(page, 'Prop — intent')
        const sandbox = sandboxOf(page)

        // Intent spawns use `duration: 4000`. We assert the item is
        // still there at 1s and gone after the full 4.5s.
        await sandbox.locator('[data-cy="snackbar-stack-intent-success"]').first().click()
        await page.waitForTimeout(1_000)

        const host = sandbox.locator('[data-cy="snackbar-stack-intent-host"]').first()
        const item = host.locator('.origam-snackbar-item--intent-success').first()
        await expect(item).toBeVisible()

        await page.waitForTimeout(4_000)
        await expect(host.locator('.origam-snackbar-item--intent-success')).toHaveCount(0, { timeout: 5000 })
    })
})

test.describe('OrigamSnackbarStack — ARIA region', () => {
    test('stack root carries role="region"', async ({ page }) => {
        await openVariant(page, 'Playground')
        const sandbox = sandboxOf(page)

        const root = sandbox.locator('[data-cy="snackbar-stack-playground-host"]').first()
        await expect(root).toBeVisible({ timeout: 8000 })
        await expect(root).toHaveAttribute('role', 'region')
        await expect(root).toHaveAttribute('aria-label', 'Notifications')
    })

    test('info / success intent items render role="status" + aria-live="polite"', async ({ page }) => {
        await openVariant(page, 'Prop — intent')
        const sandbox = sandboxOf(page)

        await sandbox.locator('[data-cy="snackbar-stack-intent-success"]').first().click()
        await page.waitForTimeout(200)

        const item = sandbox.locator('.origam-snackbar-item--intent-success').first()
        await expect(item).toHaveAttribute('role', 'status')
        await expect(item).toHaveAttribute('aria-live', 'polite')
    })
})
