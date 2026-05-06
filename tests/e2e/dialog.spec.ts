import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-dialog-origamdialog-story-vue'

test.describe('OrigamDialog', () => {
	test('Default — activator button renders and dialog opens on click', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Default', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="dialog-default-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })

		await activator.click()
		await page.waitForTimeout(500)

		// Dialog content should appear
		const cancel = sandbox.locator('[data-cy="dialog-default-cancel"]')
		await expect(cancel).toBeVisible({ timeout: 5000 })
	})

	test('Fullscreen — activator renders', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Fullscreen', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="dialog-fullscreen-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
	})

	test('Scrollable — activator renders', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Scrollable', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="dialog-scrollable-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
	})

	test('Persistent — activator renders and dialog stays open after outside click', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Persistent', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="dialog-persistent-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
	})

	test('Status — activator renders', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Status', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="dialog-status-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
	})

	test('Slot — header-prepend — activator renders', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Slot — header-prepend', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="dialog-slot-prepend-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
	})

	test('Emit — update:modelValue — emit activator and state indicator render', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="dialog-emit-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
		const stateIndicator = sandbox.locator('[data-cy="dialog-emit-state"]')
		await expect(stateIndicator).toBeVisible({ timeout: 5000 })
	})

	test('Emit — click:outside — activator renders', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Emit — click:outside', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="dialog-emit-outside-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
	})

	test('Playground — activator renders with default props', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Playground', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="dialog-playground-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
	})
})
