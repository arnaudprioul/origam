import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-stepper-origamstepper-story-vue'

test.describe('OrigamStepper', () => {
	test('Default variant renders 4 step items', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Default', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const stepper = sandbox.locator('[data-cy="stepper-default"]')
		await expect(stepper).toBeVisible({ timeout: 5000 })

		const items = stepper.locator('.origam-stepper-item')
		await expect(items).toHaveCount(4)
	})

	test('orientation="vertical" adds modifier class origam-stepper--vertical', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Vertical', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const stepper = sandbox.locator('[data-cy="stepper-vertical"]')
		await expect(stepper).toBeVisible({ timeout: 5000 })
		await expect(stepper).toHaveClass(/origam-stepper--vertical/)
	})

	test('orientation="vertical" has computed flex-direction column', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Vertical', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const stepper = sandbox.locator('[data-cy="stepper-vertical"]')
		await expect(stepper).toBeVisible({ timeout: 5000 })

		const flexDir = await stepper.evaluate(el => getComputedStyle(el).flexDirection)
		expect(flexDir).toBe('column')
	})

	test('Active item indicator has a different background than pending indicator', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Default', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const stepper = sandbox.locator('[data-cy="stepper-default"]')
		await expect(stepper).toBeVisible({ timeout: 5000 })

		const activeIndicator = stepper.locator('.origam-stepper-item__indicator--active').first()
		const pendingIndicator = stepper.locator('.origam-stepper-item__indicator--pending').first()

		await expect(activeIndicator).toBeVisible()
		await expect(pendingIndicator).toBeVisible()

		const activeBg = await activeIndicator.evaluate(el => getComputedStyle(el).backgroundColor)
		const pendingBg = await pendingIndicator.evaluate(el => getComputedStyle(el).backgroundColor)

		// Active and pending must have different background colors
		expect(activeBg).not.toBe(pendingBg)
	})

	test('Done items show the checkmark icon class', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Status mix', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const stepper = sandbox.locator('[data-cy="stepper-status-mix"]')
		await expect(stepper).toBeVisible({ timeout: 5000 })

		// Two done items in status mix
		const doneIndicators = stepper.locator('.origam-stepper-item__indicator--done')
		await expect(doneIndicators).toHaveCount(2)

		// Each done indicator contains an icon (from OrigamIcon)
		const firstDoneIcon = doneIndicators.first().locator('.origam-icon')
		await expect(firstDoneIcon).toBeVisible()
	})

	test('Connectors render between items (count = items.length - 1)', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Default', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const stepper = sandbox.locator('[data-cy="stepper-default"]')
		await expect(stepper).toBeVisible({ timeout: 5000 })

		// 4 items → 3 connectors
		const connectors = stepper.locator('.origam-stepper__connector')
		await expect(connectors).toHaveCount(3)
	})

	test('Clickable item click updates the active step', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Clickable', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const stepper = sandbox.locator('[data-cy="stepper-clickable"]')
		await expect(stepper).toBeVisible({ timeout: 5000 })

		// Click the third step item (index 2)
		const thirdItem = stepper.locator('[data-cy="stepper-item-2"]')
		await expect(thirdItem).toBeVisible({ timeout: 5000 })
		await thirdItem.click()
		await page.waitForTimeout(300)

		// Third item should now be active
		await expect(thirdItem).toHaveClass(/origam-stepper-item--active/)
	})

	test('Item with status="error" renders the error indicator class', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Status mix', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const stepper = sandbox.locator('[data-cy="stepper-status-mix"]')
		await expect(stepper).toBeVisible({ timeout: 5000 })

		const errorIndicator = stepper.locator('.origam-stepper-item__indicator--error')
		await expect(errorIndicator).toHaveCount(1)
		await expect(errorIndicator).toBeVisible()
	})

	test('Error indicator has distinct background color from pending', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Status mix', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const stepper = sandbox.locator('[data-cy="stepper-status-mix"]')
		await expect(stepper).toBeVisible({ timeout: 5000 })

		const errorIndicator = stepper.locator('.origam-stepper-item__indicator--error').first()
		const pendingIndicator = stepper.locator('.origam-stepper-item__indicator--pending').first()

		const errorBg = await errorIndicator.evaluate(el => getComputedStyle(el).backgroundColor)
		const pendingBg = await pendingIndicator.evaluate(el => getComputedStyle(el).backgroundColor)

		expect(errorBg).not.toBe(pendingBg)
	})
})
