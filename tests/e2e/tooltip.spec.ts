import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-tooltip-origamtooltip-story-vue'

test.describe('OrigamTooltip', () => {
	test('Default — activator button renders', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Default (hover)', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="tooltip-default-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
	})

	test('Default — tooltip appears on hover', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Default (hover)', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="tooltip-default-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })

		await activator.hover()
		await page.waitForTimeout(800)

		const tooltip = sandbox.locator('.origam-tooltip')
		await expect(tooltip).toBeVisible({ timeout: 5000 })
	})

	test('Location — activator renders with location control', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Location', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="tooltip-location-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
	})

	test('Text — activator renders with text control', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Text', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="tooltip-text-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
	})

	test('Open on click — activator renders; tooltip shows on click', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Open on click', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="tooltip-click-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })

		await activator.click()
		await page.waitForTimeout(600)

		const tooltip = sandbox.locator('.origam-tooltip')
		await expect(tooltip).toBeVisible({ timeout: 5000 })
	})

	test('Offset — activator renders with offset control', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Offset', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="tooltip-offset-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
	})

	test('Slot — default — activator renders for rich tooltip', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Slot — default', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="tooltip-slot-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
	})

	test('Emit — update:modelValue — activator renders', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="tooltip-emit-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
	})

	test('Playground — activator renders with default props', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Playground', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="tooltip-playground-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
	})
})
