import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/components-stories-skeleton-origamskeleton-story-vue'

test.describe('OrigamSkeleton', () => {
	test('Default variant renders an .origam-skeleton element', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Default', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const el = sandbox.locator('[data-cy="skeleton-default"]')
		await expect(el).toBeVisible({ timeout: 5000 })
		await expect(el).toHaveClass(/origam-skeleton/)
	})

	test('variant="circular" produces border-radius: 50% computed style', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Variants', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const circular = sandbox.locator('[data-cy="skeleton-variant-circular"]')
		await expect(circular).toBeVisible({ timeout: 5000 })
		const borderRadius = await circular.evaluate(el => getComputedStyle(el).borderRadius)
		// Skeleton circular binds `--origam-skeleton---border-radius-circular` to
		// `radius.full` = `9999px` — the project's "pill / circle" rung used by
		// every component (Avatar, Chip, Badge, …). `50%` would only work at
		// width===height; `9999px` is dimension-agnostic and matches the rest
		// of the design system.
		expect(borderRadius).toBe('9999px')
	})

	test('variant="card" renders 3 nested .origam-skeleton elements', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Variants', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const card = sandbox.locator('[data-cy="skeleton-variant-card"]')
		await expect(card).toBeVisible({ timeout: 5000 })
		// card composes 1 rectangular (image) + 3 text lines = 4 .origam-skeleton elements
		const innerSkeletons = card.locator('.origam-skeleton')
		await expect(innerSkeletons).toHaveCount(4)
	})

	test('pulse=true adds class origam-skeleton--pulse', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Pulse animation', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const el = sandbox.locator('[data-cy="skeleton-pulse"]')
		await expect(el).toBeVisible({ timeout: 5000 })
		await expect(el).toHaveClass(/origam-skeleton--pulse/)
	})

	test('loading=false does NOT render skeleton — renders slot fallback instead', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Loading toggle', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')

		// Default state: loading=true → skeleton visible, slot hidden
		const skeleton = sandbox.locator('[data-cy="skeleton-loading"]')
		await expect(skeleton).toBeVisible({ timeout: 5000 })

		const slotContent = sandbox.locator('[data-cy="skeleton-slot-content"]')
		await expect(slotContent).not.toBeVisible()
	})

	test('variant="list-item" renders a circular avatar + 2 text lines', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Variants', { exact: true }).first().click({ timeout: 5000 })
		await page.waitForTimeout(600)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const listItem = sandbox.locator('[data-cy="skeleton-variant-list-item"]')
		await expect(listItem).toBeVisible({ timeout: 5000 })

		const circular = listItem.locator('.origam-skeleton--circular')
		await expect(circular).toHaveCount(1)

		const textLines = listItem.locator('.origam-skeleton--text')
		await expect(textLines).toHaveCount(2)
	})
})
