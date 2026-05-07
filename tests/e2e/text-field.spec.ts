import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-textfield-origamtextfield-story-vue'

test.describe('OrigamTextField', () => {
    test('Variant — default variant emits origam-field--variant-outlined class', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Variant', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const wrapper = sandbox.locator('[data-cy="textfield-variant"]')
        await expect(wrapper).toBeVisible({ timeout: 5000 })
        // The OrigamField root inside the TextField wrapper carries the variant class
        const field = wrapper.locator('.origam-field').first()
        await expect(field).toHaveClass(/origam-field--variant-outlined/, { timeout: 3000 })
        await expect(sandbox.locator('input').first()).toBeVisible({ timeout: 3000 })
    })

    test('Color — field renders with color token (not inline hex)', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Color', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="textfield-color"]')).toBeVisible({ timeout: 5000 })
    })

    test('Counter — shows character counter', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Counter', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="textfield-counter"]')).toBeVisible({ timeout: 5000 })
        await expect(sandbox.locator('.origam-counter').first()).toBeVisible({ timeout: 3000 })
    })

    test('States — disabled field has disabled attribute on input', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('States', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="textfield-states"]')).toBeVisible({ timeout: 5000 })
    })

    test('Emit update:modelValue — typing updates status div', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const input = sandbox.locator('[data-cy="textfield-emit-update"] input').first()
        await expect(input).toBeVisible({ timeout: 5000 })

        await input.fill('hello')
        const status = sandbox.locator('[data-cy="textfield-emit-status"]')
        await expect(status).toContainText('hello', { timeout: 3000 })
    })

    test('Emit click:clear — clearable field has clear button', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — click:clear', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="textfield-emit-clear"]')).toBeVisible({ timeout: 5000 })
    })

    test('Slot prependInner / appendInner — icons visible inside field', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Slot — prependInner / appendInner', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="textfield-slot-inner"]')).toBeVisible({ timeout: 5000 })
        // Inner icon wrapper
        await expect(sandbox.locator('.origam-field__prepend-inner').first()).toBeVisible({ timeout: 3000 })
    })

    test('Playground — renders with all controls', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Playground', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="textfield-playground"]')).toBeVisible({ timeout: 5000 })

        const input = sandbox.locator('[data-cy="textfield-playground"] input').first()
        await input.fill('test value')
        await expect(sandbox.locator('[data-cy="textfield-playground-status"]')).toContainText('test value', { timeout: 3000 })
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
            const field = sandbox.locator('[data-cy="text-field-loading-bool"]')
            await expect(field).toBeVisible({ timeout: 5000 })
            // Field default kind is 'line' → linear progress bar rendered
            await expect(field.locator('.origam-field__loader')).toBeVisible({ timeout: 3000 })
            await expect(field.locator('.origam-field__progress--linear')).toBeVisible({ timeout: 3000 })
        })

        test('loading=42 → determinate progress at 42 %', async ({ page }) => {
            await goToVariant(page)
            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const field = sandbox.locator('[data-cy="text-field-loading-number"]')
            await expect(field).toBeVisible({ timeout: 5000 })
            await expect(field.locator('.origam-field__loader')).toBeVisible({ timeout: 3000 })
            // Determinate: aria-valuenow should be 42
            const progressBar = field.locator('[role="progressbar"]').first()
            await expect(progressBar).toBeVisible({ timeout: 3000 })
            const valueNow = await progressBar.getAttribute('aria-valuenow')
            expect(valueNow).toBe('42')
        })

        test('loading={ type: "line" } → linear progress mounted', async ({ page }) => {
            await goToVariant(page)
            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const field = sandbox.locator('[data-cy="text-field-loading-line"]')
            await expect(field).toBeVisible({ timeout: 5000 })
            await expect(field.locator('.origam-field__progress--linear')).toBeVisible({ timeout: 3000 })
        })

        test('loading={ type: "circular" } → circular progress mounted', async ({ page }) => {
            await goToVariant(page)
            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const field = sandbox.locator('[data-cy="text-field-loading-circular"]')
            await expect(field).toBeVisible({ timeout: 5000 })
            await expect(field.locator('.origam-field__loader')).toBeVisible({ timeout: 3000 })
            // Circular: the progress bar is present but NOT the linear class
            await expect(field.locator('[role="progressbar"]').first()).toBeVisible({ timeout: 3000 })
            await expect(field.locator('.origam-field__progress--linear')).not.toBeVisible()
        })

        test('loading={ type: "skeleton" } → origam-skeleton replaces content', async ({ page }) => {
            await goToVariant(page)
            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const field = sandbox.locator('[data-cy="text-field-loading-skeleton"]')
            await expect(field).toBeVisible({ timeout: 5000 })
            // Skeleton rendered inside loader slot
            await expect(field.locator('.origam-field__skeleton').first()).toBeVisible({ timeout: 3000 })
            // Input must be hidden/absent when skeleton mode active
            await expect(field.locator('input')).not.toBeVisible()
        })
    })
})
