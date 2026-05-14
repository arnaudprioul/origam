import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-contextualmenu-origamcontextualmenu-story-vue'

test.describe('OrigamContextualMenu', () => {
	test('Default — right-click zone renders', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Default (right-click)', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const zone = sandbox.locator('[data-cy="contextual-menu-default-zone"]')
		await expect(zone).toBeVisible({ timeout: 5000 })
	})

	test('Default — right-click opens contextual menu', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Default (right-click)', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const zone = sandbox.locator('[data-cy="contextual-menu-default-zone"]')
		await expect(zone).toBeVisible({ timeout: 5000 })

		await zone.click({ button: 'right' })
		await page.waitForTimeout(500)

		const menu = sandbox.locator('.origam-menu')
		await expect(menu).toBeVisible({ timeout: 5000 })
	})

	test('With title — right-click zone renders', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('With title', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const zone = sandbox.locator('[data-cy="contextual-menu-title-zone"]')
		await expect(zone).toBeVisible({ timeout: 5000 })
	})

	test('Rich items (icons) — right-click zone renders', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Rich items (icons)', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const zone = sandbox.locator('[data-cy="contextual-menu-icons-zone"]')
		await expect(zone).toBeVisible({ timeout: 5000 })
	})

	test('Slot — default — right-click zone renders for custom content', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Slot — default', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const zone = sandbox.locator('[data-cy="contextual-menu-slot-zone"]')
		await expect(zone).toBeVisible({ timeout: 5000 })
	})

	test('Emit — update:modelValue — right-click zone renders', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const zone = sandbox.locator('[data-cy="contextual-menu-emit-zone"]')
		await expect(zone).toBeVisible({ timeout: 5000 })
	})

	test('Playground — right-click zone renders', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Playground', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const zone = sandbox.locator('[data-cy="contextual-menu-playground-zone"]')
		await expect(zone).toBeVisible({ timeout: 5000 })
	})
})
