import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/components-stories-snackbar-origamsnackbar-story-vue'

test.describe('OrigamSnackbar', () => {
	test('Default — trigger button renders and snackbar shows on click', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Default', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const trigger = sandbox.locator('[data-cy="snackbar-default-trigger"]')
		await expect(trigger).toBeVisible({ timeout: 5000 })

		await trigger.click()
		await page.waitForTimeout(600)

		const snackbar = sandbox.locator('[data-cy="snackbar-default"]')
		await expect(snackbar).toBeVisible({ timeout: 5000 })
		await expect(snackbar).toHaveClass(/origam-snackbar--active/)
	})

	test('Location — trigger button renders', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Location', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const trigger = sandbox.locator('[data-cy="snackbar-location-trigger"]')
		await expect(trigger).toBeVisible({ timeout: 5000 })
	})

	test('Timeout — trigger button renders', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Timeout', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const trigger = sandbox.locator('[data-cy="snackbar-timeout-trigger"]')
		await expect(trigger).toBeVisible({ timeout: 5000 })
	})

	test('Timer bar — trigger renders and snackbar with timer class appears', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Timer bar', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const trigger = sandbox.locator('[data-cy="snackbar-timer-trigger"]')
		await expect(trigger).toBeVisible({ timeout: 5000 })

		await trigger.click()
		await page.waitForTimeout(600)

		const snackbar = sandbox.locator('[data-cy="snackbar-timer"]')
		await expect(snackbar).toHaveClass(/origam-snackbar--timer/, { timeout: 5000 })
	})

	test('Multi-line — trigger renders', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Multi-line', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const trigger = sandbox.locator('[data-cy="snackbar-multiline-trigger"]')
		await expect(trigger).toBeVisible({ timeout: 5000 })
	})

	test('Status — trigger renders', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Status', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const trigger = sandbox.locator('[data-cy="snackbar-status-trigger"]')
		await expect(trigger).toBeVisible({ timeout: 5000 })
	})

	test('Slot — action — trigger renders and action button appears when open', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Slot — action', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const trigger = sandbox.locator('[data-cy="snackbar-action-trigger"]')
		await expect(trigger).toBeVisible({ timeout: 5000 })

		await trigger.click()
		await page.waitForTimeout(600)

		const actionBtn = sandbox.locator('[data-cy="snackbar-action-btn"]')
		await expect(actionBtn).toBeVisible({ timeout: 5000 })
	})

	test('Slot — text — trigger renders', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Slot — text', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const trigger = sandbox.locator('[data-cy="snackbar-text-trigger"]')
		await expect(trigger).toBeVisible({ timeout: 5000 })
	})

	test('Emit — update:modelValue — trigger and state indicator render', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const trigger = sandbox.locator('[data-cy="snackbar-emit-trigger"]')
		await expect(trigger).toBeVisible({ timeout: 5000 })
		const stateIndicator = sandbox.locator('[data-cy="snackbar-emit-state"]')
		await expect(stateIndicator).toBeVisible({ timeout: 5000 })
	})

	test('Playground — trigger button renders', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Default', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const trigger = sandbox.locator('[data-cy="snackbar-playground-trigger"]')
		await expect(trigger).toBeVisible({ timeout: 5000 })
	})
})
