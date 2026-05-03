import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-app-origamapp-story-vue'

test.describe('OrigamApp', () => {
	test('Default — app shell renders with toolbar and main', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Default', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const app = sandbox.locator('[data-cy="app-default-inner"]')
		await expect(app).toBeVisible({ timeout: 5000 })
		await expect(app).toHaveClass(/origam-app/)
	})

	test('Default — toolbar renders inside app', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Default', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const toolbar = sandbox.locator('[data-cy="app-default-toolbar"]')
		await expect(toolbar).toBeVisible({ timeout: 5000 })
	})

	test('Default — main area renders inside app', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Default', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const main = sandbox.locator('[data-cy="app-default-main"]')
		await expect(main).toBeVisible({ timeout: 5000 })
	})

	test('With Drawer — drawer toggle button renders', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('With Drawer', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const toggle = sandbox.locator('[data-cy="app-drawer-toggle"]')
		await expect(toggle).toBeVisible({ timeout: 5000 })
	})

	test('With Drawer — navigation drawer renders inside app', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('With Drawer', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const nav = sandbox.locator('[data-cy="app-drawer-nav"]')
		await expect(nav).toBeVisible({ timeout: 5000 })
	})

	test('Full height — app renders with fullHeight control', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Full height', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const app = sandbox.locator('[data-cy="app-fullheight"]')
		await expect(app).toBeVisible({ timeout: 5000 })
	})

	test('Slot — default — app renders with slot content', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Slot — default', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const app = sandbox.locator('[data-cy="app-slot-default"]')
		await expect(app).toBeVisible({ timeout: 5000 })
	})

	test('Playground — app renders with playground controls', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Playground', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const app = sandbox.locator('[data-cy="app-playground"]')
		await expect(app).toBeVisible({ timeout: 5000 })
		await expect(app).toHaveClass(/origam-app/)
	})
})
