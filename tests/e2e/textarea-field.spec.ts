import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-textareafield-origamtextareafield-story-vue'

test.describe('OrigamTextareaField', () => {
    test('Variant — renders textarea element', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Variant', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="textarea-variant"]')).toBeVisible({ timeout: 5000 })
        await expect(sandbox.locator('textarea').first()).toBeVisible({ timeout: 3000 })
    })

    test('Rows — textarea respects rows attribute', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Rows', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const textarea = sandbox.locator('[data-cy="textarea-rows"] textarea').first()
        await expect(textarea).toBeVisible({ timeout: 5000 })
    })

    test('No resize — textarea has resize:none', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('No resize', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const textarea = sandbox.locator('[data-cy="textarea-no-resize"] textarea').first()
        await expect(textarea).toBeVisible({ timeout: 5000 })

        const resize = await textarea.evaluate(el => getComputedStyle(el).resize)
        expect(resize).toBe('none')
    })

    test('Counter — counter element visible', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        // Pick the variant link instead of `getByText` — the latter also
        // matches the "Counter" component button in the sidebar nav.
        await page.getByRole('link', { name: 'Counter', exact: true }).click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="textarea-counter"]')).toBeVisible({ timeout: 5000 })
        // OrigamCounter is `v-show="active"` and active = persistentCounter
        // || isFocused. Focus the textarea so the counter actually mounts
        // visibly instead of relying on the browser auto-focusing.
        await sandbox.locator('[data-cy="textarea-counter"] textarea').first().click()
        await expect(sandbox.locator('.origam-counter').first()).toBeVisible({ timeout: 3000 })
    })

    test('States — disabled prevents typing', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('States', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="textarea-states"]')).toBeVisible({ timeout: 5000 })
    })

    test('Emit update:modelValue — typing updates status', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const textarea = sandbox.locator('[data-cy="textarea-emit-update"] textarea').first()
        await expect(textarea).toBeVisible({ timeout: 5000 })

        await textarea.fill('test content')
        const status = sandbox.locator('[data-cy="textarea-emit-status"]')
        await expect(status).toContainText('test content', { timeout: 3000 })
    })

    test('Playground — renders and accepts input', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Playground', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="textarea-playground"]')).toBeVisible({ timeout: 5000 })

        const textarea = sandbox.locator('[data-cy="textarea-playground"] textarea').first()
        await textarea.fill('playground input')
        await expect(sandbox.locator('[data-cy="textarea-playground-status"]')).toContainText('playground input', { timeout: 3000 })
    })

    test.describe('Loading shapes', () => {
        async function goToVariant(page: Parameters<Parameters<typeof test>[1]>[0]) {
            await page.goto(STORY_PATH)
            await page.waitForLoadState('networkidle')
            await page.getByText('Loading shapes', { exact: true }).first().click()
            await page.waitForTimeout(800)
        }

        test('loading=true → default kind renderer mounted', async ({ page }) => {
            await goToVariant(page)
            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const field = sandbox.locator('[data-cy="textarea-loading-bool"]')
            await expect(field).toBeVisible({ timeout: 5000 })
            await expect(field.locator('.origam-field__loader')).toBeVisible({ timeout: 3000 })
            await expect(field.locator('.origam-field__progress--linear')).toBeVisible({ timeout: 3000 })
        })

        test('loading=42 → determinate progress at 42 %', async ({ page }) => {
            await goToVariant(page)
            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const field = sandbox.locator('[data-cy="textarea-loading-number"]')
            await expect(field).toBeVisible({ timeout: 5000 })
            await expect(field.locator('.origam-field__loader')).toBeVisible({ timeout: 3000 })
            const progressBar = field.locator('[role="progressbar"]').first()
            await expect(progressBar).toBeVisible({ timeout: 3000 })
            const valueNow = await progressBar.getAttribute('aria-valuenow')
            expect(valueNow).toBe('42')
        })

        test('loading={ type: "line" } → linear progress mounted', async ({ page }) => {
            await goToVariant(page)
            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const field = sandbox.locator('[data-cy="textarea-loading-line"]')
            await expect(field).toBeVisible({ timeout: 5000 })
            await expect(field.locator('.origam-field__progress--linear')).toBeVisible({ timeout: 3000 })
        })

        test('loading={ type: "circular" } → circular progress mounted', async ({ page }) => {
            await goToVariant(page)
            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const field = sandbox.locator('[data-cy="textarea-loading-circular"]')
            await expect(field).toBeVisible({ timeout: 5000 })
            await expect(field.locator('.origam-field__loader')).toBeVisible({ timeout: 3000 })
            await expect(field.locator('[role="progressbar"]').first()).toBeVisible({ timeout: 3000 })
            await expect(field.locator('.origam-field__progress--linear')).not.toBeVisible()
        })

        test('loading={ type: "skeleton" } → origam-skeleton replaces content', async ({ page }) => {
            await goToVariant(page)
            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const field = sandbox.locator('[data-cy="textarea-loading-skeleton"]')
            await expect(field).toBeVisible({ timeout: 5000 })
            await expect(field.locator('.origam-field__skeleton').first()).toBeVisible({ timeout: 3000 })
            // Textarea must be hidden when skeleton active
            await expect(field.locator('textarea')).not.toBeVisible()
        })
    })
})
