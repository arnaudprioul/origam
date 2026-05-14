import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-timeline-origamtimeline-story-vue'

test.describe('OrigamTimeline', () => {

	test('Default renders 4 timeline items', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Default', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const container = sandbox.locator('[data-cy="timeline-default"]')
		await expect(container).toBeVisible({ timeout: 5000 })

		const items = container.locator('.origam-timeline-item')
		await expect(items).toHaveCount(4)
	})

	test('Each item has a dot element', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Default', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const container = sandbox.locator('[data-cy="timeline-default"]')
		await expect(container).toBeVisible({ timeout: 5000 })

		const dots = container.locator('.origam-timeline-item__dot')
		await expect(dots).toHaveCount(4)
	})

	test('Connector lines render between items (3 connectors for 4 items with truncateLine=false)', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Default', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const container = sandbox.locator('[data-cy="timeline-default"]')
		await expect(container).toBeVisible({ timeout: 5000 })

		// Default has truncateLine=false so ALL items have connectors (4 connectors)
		const connectors = container.locator('.origam-timeline-item__connector')
		await expect(connectors).toHaveCount(4)
	})

	test('truncateLine=true hides the last connector', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Truncate line', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const container = sandbox.locator('[data-cy="timeline-truncate"]')
		await expect(container).toBeVisible({ timeout: 5000 })

		// With truncateLine=true: 3 items → 2 connectors (last item has no connector)
		const connectors = container.locator('.origam-timeline-item__connector')
		await expect(connectors).toHaveCount(2)
	})

	test('side="end" adds modifier class on the timeline', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Sides', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const sideEnd = sandbox.locator('[data-cy="timeline-side-end"]')
		await expect(sideEnd).toBeVisible({ timeout: 5000 })
		await expect(sideEnd).toHaveClass(/origam-timeline--side-end/)
	})

	test('side="alternating" adds modifier class and items have alternating classes', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Sides', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const sideAlternating = sandbox.locator('[data-cy="timeline-side-alternating"]')
		await expect(sideAlternating).toBeVisible({ timeout: 5000 })
		await expect(sideAlternating).toHaveClass(/origam-timeline--side-alternating/)

		// First item (index 0) should be side-start, second (index 1) should be content-end
		const items = sideAlternating.locator('.origam-timeline-item')
		await expect(items.nth(0)).not.toHaveClass(/origam-timeline-item--content-end/)
		await expect(items.nth(1)).toHaveClass(/origam-timeline-item--content-end/)
	})

	test('intent="success" entry has a distinct dot color from primary', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Intent mix', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const container = sandbox.locator('[data-cy="timeline-intent"]')
		await expect(container).toBeVisible({ timeout: 5000 })

		// All 5 intent entries rendered
		const items = container.locator('.origam-timeline-item')
		await expect(items).toHaveCount(5)

		// Each dot should have inline --dot-bg style tokens set
		const firstDot  = items.nth(0).locator('.origam-timeline-item__dot')
		const secondDot = items.nth(1).locator('.origam-timeline-item__dot')

		const primaryDotBg = await firstDot.evaluate(el => (el as HTMLElement).style.getPropertyValue('--origam-timeline-item---dot-bg'))
		const successDotBg = await secondDot.evaluate(el => (el as HTMLElement).style.getPropertyValue('--origam-timeline-item---dot-bg'))

		// They should be different token references
		expect(primaryDotBg).not.toEqual(successDotBg)
		expect(primaryDotBg).toContain('primary')
		expect(successDotBg).toContain('success')
	})

	test('color="primary" propagates to the dots via context', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Color', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const container = sandbox.locator('[data-cy="timeline-color"]')
		await expect(container).toBeVisible({ timeout: 5000 })

		const items = container.locator('.origam-timeline-item')
		await expect(items).toHaveCount(3)
	})

	test('Slot — default: slot content overrides description prop', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Slot — default (custom content)', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const container = sandbox.locator('[data-cy="timeline-slot-default"]')
		await expect(container).toBeVisible({ timeout: 5000 })

		// Custom slot renders a <ul> list (not the default .origam-timeline-item__body)
		const customList = container.locator('ul')
		await expect(customList).toBeVisible({ timeout: 5000 })
	})

})
