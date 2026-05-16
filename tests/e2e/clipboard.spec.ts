import { expect, test, type Page } from '@playwright/test'

/**
 * OrigamClipboard — runtime probes for the copy pipeline, the
 * auto-resetting `copied` state, the scoped default slot, the
 * ARIA-live feedback overlay and the @error emit.
 *
 * Each test patches `navigator.clipboard.writeText` inside the
 * sandbox iframe so we never depend on the OS clipboard permission
 * dialog. The stub records its calls on `window.__clip` so we can
 * assert on the exact payload written.
 */

const STORY = '/story/stories-components-stories-clipboard-origamclipboard-story-vue'

const sandboxOf = (page: Page) =>
    page.frameLocator('iframe[src*="__sandbox"]')

const openVariant = async (page: Page, title: string) => {
    await page.goto(STORY)
    await page.waitForLoadState('networkidle')
    await page.getByText(title, { exact: true }).first().click()
    await page.waitForTimeout(400)
}

const stubClipboard = async (page: Page) => {
    const sandbox = sandboxOf(page)
    await sandbox.locator('body').evaluate(() => {
        ;(window as unknown as { __clip: string[] }).__clip = []
        Object.defineProperty(navigator, 'clipboard', {
            configurable: true,
            value: {
                writeText: async (text: string) => {
                    ;(window as unknown as { __clip: string[] }).__clip.push(text)
                }
            }
        })
    })
}

test.describe('OrigamClipboard — Playground (smoke + ARIA + default trigger)', () => {
    test('mounts and renders the default icon trigger', async ({ page }) => {
        await openVariant(page, 'Playground')
        await stubClipboard(page)
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="clipboard-playground-host"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const trigger = host.locator('[data-cy="clipboard-default-trigger"]').first()
        await expect(trigger).toBeVisible()
    })

    test('default trigger writes the prop value to navigator.clipboard', async ({ page }) => {
        await openVariant(page, 'Playground')
        await stubClipboard(page)
        const sandbox = sandboxOf(page)

        const trigger = sandbox.locator('[data-cy="clipboard-default-trigger"]').first()
        await trigger.click()
        await page.waitForTimeout(150)

        const calls = await sandbox.locator('body').evaluate(() => (window as unknown as { __clip: string[] }).__clip)
        expect(calls.length).toBe(1)
        expect(calls[0]).toBe('arnaud@example.com')
    })

    test('default trigger ARIA label flips to "copied" after a successful copy', async ({ page }) => {
        await openVariant(page, 'Playground')
        await stubClipboard(page)
        const sandbox = sandboxOf(page)

        const trigger = sandbox.locator('[data-cy="clipboard-default-trigger"]').first()

        // Before copy.
        await expect(trigger).toHaveAttribute('aria-label', /copy to clipboard/i)

        await trigger.click()
        await page.waitForTimeout(150)

        await expect(trigger).toHaveAttribute('aria-label', /copied to clipboard/i)
    })
})

test.describe('OrigamClipboard — feedbackMode: button (default)', () => {
    test('label span appears after copy, pill absent', async ({ page }) => {
        await openVariant(page, 'feedbackMode — button (default)')
        await stubClipboard(page)
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="clipboard-mode-button-host"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        // Before copy — no label span
        await expect(host.locator('.origam-clipboard__default-label')).toHaveCount(0)

        const trigger = host.locator('[data-cy="clipboard-default-trigger"]').first()
        await trigger.click()
        await page.waitForTimeout(150)

        // After copy — label present, pill absent
        await expect(host.locator('.origam-clipboard__default-label')).toBeVisible()
        await expect(host.locator('[data-cy="origam-clipboard-feedback"]')).toHaveCount(0)

        const labelText = await host.locator('.origam-clipboard__default-label').textContent()
        expect(labelText?.trim()).toBe('Copied!')
    })
})

test.describe('OrigamClipboard — feedbackMode: pill', () => {
    test('pill appears after copy with aria-live, label span absent', async ({ page }) => {
        await openVariant(page, 'feedbackMode — pill')
        await stubClipboard(page)
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="clipboard-mode-pill-host"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        // Before copy — pill absent
        await expect(host.locator('[data-cy="origam-clipboard-feedback"]')).toHaveCount(0)

        const trigger = host.locator('[data-cy="clipboard-default-trigger"]').first()
        await trigger.click()
        await page.waitForTimeout(150)

        // After copy — pill present, label span absent
        const pill = host.locator('[data-cy="origam-clipboard-feedback"]').first()
        await expect(pill).toBeVisible()
        await expect(pill).toHaveAttribute('aria-live', 'polite')
        await expect(pill).toHaveAttribute('role', 'status')
        await expect(host.locator('.origam-clipboard__default-label')).toHaveCount(0)
    })
})

test.describe('OrigamClipboard — feedbackMode: both', () => {
    test('both label span and pill appear after copy', async ({ page }) => {
        await openVariant(page, 'feedbackMode — both')
        await stubClipboard(page)
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="clipboard-mode-both-host"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const trigger = host.locator('[data-cy="clipboard-default-trigger"]').first()
        await trigger.click()
        await page.waitForTimeout(150)

        await expect(host.locator('.origam-clipboard__default-label')).toBeVisible()
        await expect(host.locator('[data-cy="origam-clipboard-feedback"]')).toBeVisible()
    })
})

test.describe('OrigamClipboard — feedbackMode: none', () => {
    test('neither label span nor pill appear after copy, @copy counter increments', async ({ page }) => {
        await openVariant(page, 'feedbackMode — none')
        await stubClipboard(page)
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="clipboard-mode-none-host"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const trigger = host.locator('[data-cy="clipboard-default-trigger"]').first()
        await trigger.click()
        await page.waitForTimeout(150)

        await expect(host.locator('.origam-clipboard__default-label')).toHaveCount(0)
        await expect(host.locator('[data-cy="origam-clipboard-feedback"]')).toHaveCount(0)

        // @copy still fires — counter reflects it
        const counter = sandbox.locator('[data-cy="clipboard-mode-none-counter"]').first()
        await expect(counter).toHaveText('1')
    })
})

test.describe('OrigamClipboard — Default trigger (no slot)', () => {
    test('renders the content-copy icon when no slot is provided', async ({ page }) => {
        await openVariant(page, 'Default — no slot (auto-rendered icon button)')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="clipboard-default-host"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const iconHtml = await host.locator('.origam-clipboard__default-icon').first().innerHTML()
        expect(iconHtml).toContain('mdi-content-copy')
    })

    test('default trigger label flips to feedback text while copied', async ({ page }) => {
        await openVariant(page, 'Default — no slot (auto-rendered icon button)')
        await stubClipboard(page)
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="clipboard-default-host"]').first()
        const trigger = host.locator('[data-cy="clipboard-default-trigger"]').first()

        await trigger.click()
        await page.waitForTimeout(150)

        await expect(host.locator('.origam-clipboard__default-label')).toBeVisible()
        const labelText = await host.locator('.origam-clipboard__default-label').textContent()
        expect(labelText?.trim()).toBe('Copied!')
    })
})

test.describe('OrigamClipboard — Slot default (scoped)', () => {
    test('scoped slot receives `copy` and writes the value through', async ({ page }) => {
        await openVariant(page, 'Slot — default scoped (custom button)')
        await stubClipboard(page)
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="clipboard-slot-default-host"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        // Default icon trigger should NOT be rendered when a slot is provided.
        const builtIn = await host.locator('[data-cy="clipboard-default-trigger"]').count()
        expect(builtIn).toBe(0)

        const customTrigger = host.locator('[data-cy="clipboard-slot-default-trigger"]').first()
        await expect(customTrigger).toBeVisible()
        await expect(customTrigger).toContainText(/copy api key/i)

        await customTrigger.click()
        await page.waitForTimeout(150)

        const calls = await sandbox.locator('body').evaluate(() => (window as unknown as { __clip: string[] }).__clip)
        expect(calls).toEqual(['my-api-key-12345'])
    })

    test('scoped `copied` binding flips the slot label during feedback window', async ({ page }) => {
        await openVariant(page, 'Slot — default scoped (custom button)')
        await stubClipboard(page)
        const sandbox = sandboxOf(page)

        const customTrigger = sandbox.locator('[data-cy="clipboard-slot-default-trigger"]').first()
        await expect(customTrigger).toContainText(/copy api key/i)

        await customTrigger.click()
        await page.waitForTimeout(150)
        await expect(customTrigger).toContainText(/copied/i)
    })
})

test.describe('OrigamClipboard — Slot feedback + ARIA-live', () => {
    test('feedbackMode="pill" + custom #feedback slot renders the pill with aria-live=polite', async ({ page }) => {
        await openVariant(page, 'Slot — feedback (custom pill)')
        await stubClipboard(page)
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="clipboard-slot-feedback-host"]').first()
        const trigger = host.locator('[data-cy="clipboard-default-trigger"]').first()

        // No feedback pill before copy.
        await expect(host.locator('[data-cy="clipboard-slot-feedback-custom"]')).toHaveCount(0)

        await trigger.click()
        await page.waitForTimeout(150)

        const pill = host.locator('[data-cy="origam-clipboard-feedback"]').first()
        await expect(pill).toBeVisible()
        await expect(pill).toHaveAttribute('aria-live', 'polite')
        await expect(pill).toHaveAttribute('role', 'status')

        const customText = await host.locator('[data-cy="clipboard-slot-feedback-custom"]').first().textContent()
        expect(customText?.trim()).toBe('Saved to clipboard')
    })
})

test.describe('OrigamClipboard — Emits', () => {
    test('@copy emits once per successful write — counter increments', async ({ page }) => {
        await openVariant(page, 'Emit — @copy (counter)')
        await stubClipboard(page)
        const sandbox = sandboxOf(page)

        const counter = sandbox.locator('[data-cy="clipboard-emit-copy-counter"]').first()
        await expect(counter).toHaveText('0')

        const trigger = sandbox.locator('[data-cy="clipboard-emit-copy-host"] [data-cy="clipboard-default-trigger"]').first()
        await trigger.click()
        await page.waitForTimeout(150)
        await expect(counter).toHaveText('1')

        await trigger.click()
        await page.waitForTimeout(150)
        await expect(counter).toHaveText('2')
    })

    test('@error fires when the platform refuses the write', async ({ page }) => {
        await openVariant(page, 'Emit — @error (simulated)')
        const sandbox = sandboxOf(page)

        // Arm the error mode (overrides clipboard + execCommand).
        await sandbox.locator('[data-cy="clipboard-emit-error-arm"]').first().click()

        const trigger = sandbox.locator('[data-cy="clipboard-emit-error-host"] [data-cy="clipboard-default-trigger"]').first()
        await trigger.click()
        await page.waitForTimeout(200)

        const errMessage = sandbox.locator('[data-cy="clipboard-emit-error-message"]').first()
        const text = await errMessage.textContent()
        expect(text?.trim()).not.toBe('no error yet')
        expect(text?.trim()).toMatch(/clipboard|denial|failed/i)
    })
})

test.describe('OrigamClipboard — Disabled', () => {
    test('disabled trigger does NOT write to the clipboard', async ({ page }) => {
        await openVariant(page, 'Prop — disabled')
        await stubClipboard(page)
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="clipboard-disabled-host"]').first()
        const trigger = host.locator('[data-cy="clipboard-default-trigger"]').first()

        await expect(trigger).toBeDisabled()

        // Force a click — disabled buttons reject the click event.
        await trigger.click({ force: true }).catch(() => undefined)
        await page.waitForTimeout(150)

        const calls = await sandbox.locator('body').evaluate(() => (window as unknown as { __clip?: string[] }).__clip ?? [])
        expect(calls.length).toBe(0)
    })
})
