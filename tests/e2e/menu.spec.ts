import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-menu-origammenu-story-vue'

test.describe('OrigamMenu', () => {
	test('Default — activator button renders and menu opens on click', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Default', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="menu-default-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })

		await activator.click()
		await page.waitForTimeout(500)

		// Menu overlay should become active
		const menuEl = sandbox.locator('.origam-menu')
		await expect(menuEl).toBeVisible({ timeout: 5000 })
	})

	test('Title — titled menu activator renders', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Title', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="menu-title-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
	})

	test('Open on hover — activator renders', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Open on hover', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="menu-hover-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
	})

	test('Offset — activator renders', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Offset', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="menu-offset-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
	})

	test('Slot — default — activator renders for custom content menu', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Slot — default', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="menu-slot-default-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })

		await activator.click()
		await page.waitForTimeout(500)

		const content = sandbox.locator('[data-cy="menu-slot-default-content"]')
		await expect(content).toBeVisible({ timeout: 5000 })
	})

	test('Emit — update:modelValue — activator renders', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="menu-emit-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
	})

	test('Playground — activator renders with default props', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Playground', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="menu-playground-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
	})
})
