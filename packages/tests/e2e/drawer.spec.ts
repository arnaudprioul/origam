import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/components-stories-drawer-origamdrawer-story-vue'

test.describe('OrigamDrawer', () => {
	test('Default (permanent) — drawer is visible in layout', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Prop — permanent', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const drawer = sandbox.locator('[data-cy="drawer-default"]')
		await expect(drawer).toBeVisible({ timeout: 5000 })
		await expect(drawer).toHaveClass(/origam-drawer/)
	})

	test('Temporary — activator button is visible', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Prop — temporary', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="drawer-temporary-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
	})

	test('Rail — drawer is visible in rail mode', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Prop — rail (collapsed permanent)', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const drawer = sandbox.locator('[data-cy="drawer-rail"]')
		await expect(drawer).toBeVisible({ timeout: 5000 })
		// Rail mode should add the rail class
		await expect(drawer).toHaveClass(/origam-drawer--rail/)
	})

	test('Location — drawer shows location text', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Prop — location (left / right / top / bottom)', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const drawer = sandbox.locator('[data-cy="drawer-location"]')
		await expect(drawer).toBeVisible({ timeout: 5000 })
	})

	test('Slot — prepend — prepend area renders above body', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Slot — prepend (header)', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const drawer = sandbox.locator('[data-cy="drawer-slot-prepend"]')
		await expect(drawer).toBeVisible({ timeout: 5000 })
		const prepend = sandbox.locator('.origam-drawer__prepend')
		await expect(prepend).toBeVisible({ timeout: 5000 })
	})

	test('Slot — append — append area renders below body', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Slot — append (footer)', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const drawer = sandbox.locator('[data-cy="drawer-slot-append"]')
		await expect(drawer).toBeVisible({ timeout: 5000 })
		const appendArea = sandbox.locator('.origam-drawer__append')
		await expect(appendArea).toBeVisible({ timeout: 5000 })
	})

	test('Emit — update:modelValue — state indicator is visible', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const state = sandbox.locator('[data-cy="drawer-emit-state"]')
		await expect(state).toBeVisible({ timeout: 5000 })
	})

	test('Playground — drawer renders with default props', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Default', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const drawer = sandbox.locator('[data-cy="drawer-playground"]')
		await expect(drawer).toBeVisible({ timeout: 5000 })
		await expect(drawer).toHaveClass(/origam-drawer/)
	})
})
