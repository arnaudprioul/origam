import { expect, test, type Page } from '@playwright/test'

/**
 * OrigamClipboard — runtime probes for the copy pipeline, the
 * auto-resetting `copied` state, the default trigger label flip, the
 * scoped default slot and the @error emit.
 *
 * Each test patches `navigator.clipboard.writeText` inside the sandbox
 * iframe so we never depend on the OS clipboard permission dialog. The
 * stub records its calls on `window.__clip` so we can assert on the
 * exact payload written.
 */

const STORY = '/story/components-stories-clipboard-origamclipboard-story-vue'

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

test.describe('OrigamClipboard — Default', () => {
    test('mounts and renders the default icon trigger', async ({ page }) => {
        await openVariant(page, 'Default')
        await stubClipboard(page)
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="clipboard-playground-host"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const trigger = host.locator('[data-cy="origam-clipboard-default-trigger"]').first()
        await expect(trigger).toBeVisible()
    })

    test('default trigger writes the prop value to navigator.clipboard', async ({ page }) => {
        await openVariant(page, 'Default')
        await stubClipboard(page)
        const sandbox = sandboxOf(page)

        const trigger = sandbox.locator('[data-cy="origam-clipboard-default-trigger"]').first()
        await trigger.click()
        await page.waitForTimeout(150)

        const calls = await sandbox.locator('body').evaluate(() => (window as unknown as { __clip: string[] }).__clip)
        expect(calls.length).toBe(1)
        expect(calls[0]).toBe('arnaud@example.com')
    })

    test('default trigger ARIA label flips to "copied" after a successful copy', async ({ page }) => {
        await openVariant(page, 'Default')
        await stubClipboard(page)
        const sandbox = sandboxOf(page)

        const trigger = sandbox.locator('[data-cy="origam-clipboard-default-trigger"]').first()
        await expect(trigger).toHaveAttribute('aria-label', /copy to clipboard/i)

        await trigger.click()
        await page.waitForTimeout(150)
        await expect(trigger).toHaveAttribute('aria-label', /copied to clipboard/i)
    })
})

test.describe('OrigamClipboard — default trigger label flip', () => {
    test('label span appears next to the icon when copied (and only then)', async ({ page }) => {
        await openVariant(page, 'Default — no slot (auto-rendered icon button)')
        await stubClipboard(page)
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="clipboard-default-host"]').first()
        await expect(host).toBeVisible()

        // Before copy: no label
        await expect(host.locator('.origam-clipboard__default-label')).toHaveCount(0)

        await host.locator('[data-cy="origam-clipboard-default-trigger"]').click()
        await page.waitForTimeout(150)
        await expect(host.locator('.origam-clipboard__default-label')).toBeVisible()
        await expect(host.locator('.origam-clipboard__default-label')).toHaveText('Copied!')
    })

    test('label disappears after feedbackDuration ms', async ({ page }) => {
        await openVariant(page, 'Default — no slot (auto-rendered icon button)')
        await stubClipboard(page)
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="clipboard-default-host"]').first()
        await host.locator('[data-cy="origam-clipboard-default-trigger"]').click()
        await expect(host.locator('.origam-clipboard__default-label')).toBeVisible()

        // Default feedbackDuration in the playground/no-slot variant is 2000 ms.
        await page.waitForTimeout(2200)
        await expect(host.locator('.origam-clipboard__default-label')).toHaveCount(0)
    })
})

test.describe('OrigamClipboard — custom scoped slot', () => {
    test('the scoped slot receives { copy, copied } and renders custom trigger', async ({ page }) => {
        await openVariant(page, 'Slot — default scoped (custom button)')
        await stubClipboard(page)
        const sandbox = sandboxOf(page)

        const trigger = sandbox.locator('[data-cy="clipboard-slot-default-trigger"]').first()
        await expect(trigger).toBeVisible()
        await expect(trigger).toHaveText(/Copy API key/i)

        await trigger.click()
        await page.waitForTimeout(150)
        await expect(trigger).toHaveText(/Copied!/i)
    })
})

test.describe('OrigamClipboard — emits', () => {
    test('emit @copy increments the counter on each click', async ({ page }) => {
        await openVariant(page, 'Emit — @copy (counter)')
        await stubClipboard(page)
        const sandbox = sandboxOf(page)

        const trigger = sandbox.locator('[data-cy="clipboard-emit-copy-host"] [data-cy="origam-clipboard-default-trigger"]').first()
        const counter = sandbox.locator('[data-cy="clipboard-emit-copy-counter"]').first()

        await trigger.click()
        await page.waitForTimeout(120)
        await expect(counter).toHaveText('1')

        // Wait for the copied window to expire before clicking again
        await page.waitForTimeout(2200)
        await trigger.click()
        await page.waitForTimeout(120)
        await expect(counter).toHaveText('2')
    })

    test('emit @error fires when the pipeline fails', async ({ page }) => {
        await openVariant(page, 'Emit — @error (simulated)')
        const sandbox = sandboxOf(page)

        await sandbox.locator('[data-cy="clipboard-emit-error-arm"]').click()
        await sandbox.locator('[data-cy="clipboard-emit-error-host"] [data-cy="origam-clipboard-default-trigger"]').click()
        await page.waitForTimeout(200)

        const message = sandbox.locator('[data-cy="clipboard-emit-error-message"]').first()
        await expect(message).not.toHaveText('no error yet')
        await expect(message).toContainText(/denial|simulated/i)
    })
})

test.describe('OrigamClipboard — disabled', () => {
    test('disabled trigger does not write nor emit @copy', async ({ page }) => {
        await openVariant(page, 'Prop — disabled')
        await stubClipboard(page)
        const sandbox = sandboxOf(page)

        const trigger = sandbox.locator('[data-cy="clipboard-disabled-host"] [data-cy="origam-clipboard-default-trigger"]').first()
        await expect(trigger).toBeDisabled()

        // Click should be a no-op; the click won't reach the handler when the
        // button is disabled, but we still verify __clip stays empty.
        await trigger.click({ force: true }).catch(() => {})
        await page.waitForTimeout(150)

        const calls = await sandbox.locator('body').evaluate(() => (window as unknown as { __clip: string[] }).__clip ?? [])
        expect(calls.length).toBe(0)
    })
})
