import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-card-origamcard-story-vue'

test.describe('OrigamCard', () => {
	test('Basic — card renders with title and text', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Basic', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const card = sandbox.locator('[data-cy="card-basic"]')
		await expect(card).toBeVisible({ timeout: 5000 })
	})

	test('Elevation — card element is visible and receives elevation class', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Elevation', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const card = sandbox.locator('[data-cy="card-elevation"]')
		await expect(card).toBeVisible({ timeout: 5000 })
		// Card root element must have the origam-card class
		await expect(card).toHaveClass(/origam-card/)
	})

	test('Rounded — card receives rounded class', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Rounded', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const card = sandbox.locator('[data-cy="card-rounded"]')
		await expect(card).toBeVisible({ timeout: 5000 })
	})

	test('Border — card element is visible', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Border', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const card = sandbox.locator('[data-cy="card-border"]')
		await expect(card).toBeVisible({ timeout: 5000 })
	})

	test('Density — card density class changes with control', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Density', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const card = sandbox.locator('[data-cy="card-density"]')
		await expect(card).toBeVisible({ timeout: 5000 })
	})

	test('Header (adjacent) — card renders with header area', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Header (adjacent)', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const card = sandbox.locator('[data-cy="card-adjacent"]')
		await expect(card).toBeVisible({ timeout: 5000 })
	})

	test('States — disabled card has disabled class', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('States', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const card = sandbox.locator('[data-cy="card-states"]')
		await expect(card).toBeVisible({ timeout: 5000 })
	})

	test('Image — card renders with asset region', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Image', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const card = sandbox.locator('[data-cy="card-image"]')
		await expect(card).toBeVisible({ timeout: 5000 })
		// Asset element must be present
		const asset = sandbox.locator('.origam-card__asset')
		await expect(asset).toBeVisible({ timeout: 5000 })
	})

	test('Slot — default — custom content renders inside card', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Slot — default', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const card = sandbox.locator('[data-cy="card-slot-default"]')
		await expect(card).toBeVisible({ timeout: 5000 })
	})

	test('Slot — header — custom header renders', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Slot — header', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const card = sandbox.locator('[data-cy="card-slot-header"]')
		await expect(card).toBeVisible({ timeout: 5000 })
	})

	test('Slot — footer — footer renders inside card', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Slot — footer', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const card = sandbox.locator('[data-cy="card-slot-footer"]')
		await expect(card).toBeVisible({ timeout: 5000 })
		const footer = sandbox.locator('.origam-card__footer')
		await expect(footer).toBeVisible({ timeout: 5000 })
	})

	test('Slot — loader — custom loader renders when loading', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Slot — loader', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const card = sandbox.locator('[data-cy="card-slot-loader"]')
		await expect(card).toBeVisible({ timeout: 5000 })
	})

	test('Slot — asset — custom asset slot renders', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Slot — asset', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const card = sandbox.locator('[data-cy="card-slot-asset"]')
		await expect(card).toBeVisible({ timeout: 5000 })
	})

	test('Emit — click:prepend — prepend area is visible', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Emit — click:prepend', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const card = sandbox.locator('[data-cy="card-emit-prepend"]')
		await expect(card).toBeVisible({ timeout: 5000 })
	})

	test('Emit — click:append — append area is visible', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Emit — click:append', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const card = sandbox.locator('[data-cy="card-emit-append"]')
		await expect(card).toBeVisible({ timeout: 5000 })
	})

	test('Playground — card renders with all default props', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Playground', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const card = sandbox.locator('[data-cy="card-playground"]')
		await expect(card).toBeVisible({ timeout: 5000 })
		await expect(card).toHaveClass(/origam-card/)
	})
})
