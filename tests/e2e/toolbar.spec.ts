import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-toolbar-origamtoolbar-story-vue'

test.describe('OrigamToolbar', () => {
	test('Basic — toolbar renders with title', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Basic', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const toolbar = sandbox.locator('[data-cy="toolbar-basic"]')
		await expect(toolbar).toBeVisible({ timeout: 5000 })
		await expect(toolbar).toHaveClass(/origam-toolbar/)
	})

	test('Color — toolbar renders with color controls', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Color', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const toolbar = sandbox.locator('[data-cy="toolbar-color"]')
		await expect(toolbar).toBeVisible({ timeout: 5000 })
	})

	test('Elevation — toolbar renders with elevation control', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Elevation', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const toolbar = sandbox.locator('[data-cy="toolbar-elevation"]')
		await expect(toolbar).toBeVisible({ timeout: 5000 })
	})

	test('Rounded — toolbar renders with rounded control', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Rounded', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const toolbar = sandbox.locator('[data-cy="toolbar-rounded"]')
		await expect(toolbar).toBeVisible({ timeout: 5000 })
	})

	test('Density — toolbar renders with density control', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Density', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const toolbar = sandbox.locator('[data-cy="toolbar-density"]')
		await expect(toolbar).toBeVisible({ timeout: 5000 })
	})

	test('Modifiers — collapse modifier adds collapse class', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Modifiers', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const toolbar = sandbox.locator('[data-cy="toolbar-modifiers"]')
		await expect(toolbar).toBeVisible({ timeout: 5000 })
	})

	test('Slot — prepend — prepend area renders button', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Slot — prepend', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const toolbar = sandbox.locator('[data-cy="toolbar-slot-prepend"]')
		await expect(toolbar).toBeVisible({ timeout: 5000 })
		const prepend = sandbox.locator('.origam-toolbar__prepend')
		await expect(prepend).toBeVisible({ timeout: 5000 })
	})

	test('Slot — append — append area renders buttons', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Slot — append', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const toolbar = sandbox.locator('[data-cy="toolbar-slot-append"]')
		await expect(toolbar).toBeVisible({ timeout: 5000 })
		const appendArea = sandbox.locator('.origam-toolbar__append')
		await expect(appendArea).toBeVisible({ timeout: 5000 })
	})

	test('Slot — content — content area is visible', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Slot — content', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const toolbar = sandbox.locator('[data-cy="toolbar-slot-content"]')
		await expect(toolbar).toBeVisible({ timeout: 5000 })
	})

	test('Slot — title — custom title renders inside toolbar', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Slot — title', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const toolbar = sandbox.locator('[data-cy="toolbar-slot-title"]')
		await expect(toolbar).toBeVisible({ timeout: 5000 })
	})

	test('Playground — toolbar renders with all controls', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Playground', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const toolbar = sandbox.locator('[data-cy="toolbar-playground"]')
		await expect(toolbar).toBeVisible({ timeout: 5000 })
		await expect(toolbar).toHaveClass(/origam-toolbar/)
	})
})
