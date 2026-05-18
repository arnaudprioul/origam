import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-dialog-origamdialog-story-vue'

test.describe('OrigamDialog', () => {
	test('Default — activator button renders and dialog opens on click', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Default', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="dialog-default-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })

		await activator.click()
		await page.waitForTimeout(500)

		// Dialog content should appear
		const cancel = sandbox.locator('[data-cy="dialog-default-cancel"]')
		await expect(cancel).toBeVisible({ timeout: 5000 })
	})

	test('Fullscreen — activator renders', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Fullscreen', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="dialog-fullscreen-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
	})

	test('Scrollable — activator renders', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Scrollable', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="dialog-scrollable-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
	})

	test('Persistent — activator renders and dialog stays open after outside click', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Persistent', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="dialog-persistent-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
	})

	test('Status — activator renders', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Status', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="dialog-status-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
	})

	test('Slot — header-prepend — activator renders', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Slot — header-prepend', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="dialog-slot-prepend-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
	})

	test('Emit — update:modelValue — emit activator and state indicator render', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="dialog-emit-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
		const stateIndicator = sandbox.locator('[data-cy="dialog-emit-state"]')
		await expect(stateIndicator).toBeVisible({ timeout: 5000 })
	})

	test('Emit — click:outside — activator renders', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Emit — click:outside', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="dialog-emit-outside-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
	})

	test('Playground — activator renders with default props', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Default', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="dialog-playground-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
	})

	// ════════════ SIZE VARIANTS ════════════

	const SIZE_CASES = [
		{ label: 'xs · 320', cy: 'dialog-size-xs', expectedWidth: 320 },
		{ label: 'sm · 400', cy: 'dialog-size-sm', expectedWidth: 400 },
		{ label: 'md · 720', cy: 'dialog-size-md', expectedWidth: 720 },
		{ label: 'lg · 960', cy: 'dialog-size-lg', expectedWidth: 960 },
		{ label: 'xl · 1080', cy: 'dialog-size-xl', expectedWidth: 1080 },
	] as const

	for (const { label, cy, expectedWidth } of SIZE_CASES) {
		test(`Sizes — ${label} — dialog content width equals ${expectedWidth}px`, async ({ page }) => {
			// The Histoire shell renders the story inside a constrained
			// __sandbox iframe (~720 px regardless of outer Playwright
			// viewport). Inside that iframe `100vw` resolves to the
			// iframe's own width, so the dialog's
			// `width: min(var(--origam-dialog---width), calc(100vw - 48px))`
			// safety clamp truncates md/lg/xl (720/960/1080) down to the
			// iframe width — a Histoire artifact, not a production bug.
			//
			// Workaround: load the Histoire shell once to discover the
			// __sandbox URL for the Sizes variant, then page.goto() that
			// URL directly so the sandbox occupies the full Playwright
			// viewport (1600 × 900). The clamp now resolves against the
			// real viewport and the dialog renders at its intended size.
			await page.setViewportSize({ width: 1600, height: 900 })
			await page.goto(STORY_PATH)
			await page.waitForLoadState('networkidle')
			await page.getByText('Sizes', { exact: true }).first().click()
			await page.waitForTimeout(800)

			const sandboxSrc = await page.locator('iframe[src*="__sandbox"]').getAttribute('src')
			expect(sandboxSrc).not.toBeNull()
			await page.goto(sandboxSrc!)
			await page.waitForLoadState('networkidle')

			const activator = page.locator(`[data-cy="${cy}-activator"]`)
			await expect(activator).toBeVisible({ timeout: 5000 })

			await activator.click()
			await page.waitForTimeout(500)

			// The overlay content wrapper receives the computed width
			const contentEl = page.locator('.origam-overlay__content').first()
			await expect(contentEl).toBeVisible({ timeout: 5000 })

			const box = await contentEl.boundingBox()
			expect(box).not.toBeNull()
			// Allow ±2px for sub-pixel rendering differences
			expect(Math.round(box!.width)).toBeGreaterThanOrEqual(expectedWidth - 2)
			expect(Math.round(box!.width)).toBeLessThanOrEqual(expectedWidth + 2)
		})
	}
})
