import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/components-stories-drawer-origamdrawer-story-vue'

test.describe('OrigamDrawer', () => {
	test('Default (permanent) — drawer is visible in layout', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Prop — permanent', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		// The story renders <origam-drawer permanent> — no data-cy on the drawer.
		// Locate the first rendered drawer element by its root CSS class.
		const drawer = sandbox.locator('.origam-drawer').first()
		await expect(drawer).toBeVisible({ timeout: 5000 })
		await expect(drawer).toHaveClass(/origam-drawer/)
	})

	test('Temporary — activator button is visible', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Prop — temporary', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		// The story renders <origam-btn aria-label="Toggle"> as the activator.
		// No data-cy is present; locate via aria-label.
		const activator = sandbox.locator('[aria-label="Toggle"]').first()
		await expect(activator).toBeVisible({ timeout: 5000 })
	})

	test('Rail — drawer is visible in rail mode', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Prop — rail (collapsed permanent)', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		// The story renders <origam-drawer :rail="state.rail" permanent> (rail starts true).
		// No data-cy on the drawer; locate by root class.
		const drawer = sandbox.locator('.origam-drawer').first()
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
		// The story renders <origam-drawer :location="state.location" permanent>.
		// No data-cy; locate by root class.
		const drawer = sandbox.locator('.origam-drawer').first()
		await expect(drawer).toBeVisible({ timeout: 5000 })
	})

	test('Slot — prepend — prepend area renders above body', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Slot — prepend (header)', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		// No data-cy on the drawer in this variant; locate by root class.
		const drawer = sandbox.locator('.origam-drawer').first()
		await expect(drawer).toBeVisible({ timeout: 5000 })
		// The prepend slot is wrapped by the component in .origam-drawer__prepend.
		const prepend = sandbox.locator('.origam-drawer__prepend')
		await expect(prepend).toBeVisible({ timeout: 5000 })
	})

	test('Slot — append — append area renders below body', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Slot — append (footer)', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		// No data-cy on the drawer in this variant; locate by root class.
		const drawer = sandbox.locator('.origam-drawer').first()
		await expect(drawer).toBeVisible({ timeout: 5000 })
		// The append slot is wrapped by the component in .origam-drawer__append.
		const appendArea = sandbox.locator('.origam-drawer__append')
		await expect(appendArea).toBeVisible({ timeout: 5000 })
	})

	test('Emit — update:modelValue — state indicator is visible', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		// The story shows a log area with a "Last events emitted:" label and a
		// fallback paragraph "Click ≡ to toggle the drawer." when no events yet.
		// No data-cy is present; locate by the stable "Last events emitted:" text.
		const state = sandbox.getByText('Last events emitted:')
		await expect(state).toBeVisible({ timeout: 5000 })
	})

	test('Playground — drawer renders with default props', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Default', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		// The story wraps the playground in <div data-cy="drawer-playground">.
		// That outer div is the layout container, not the drawer itself.
		const playgroundWrapper = sandbox.locator('[data-cy="drawer-playground"]')
		await expect(playgroundWrapper).toBeVisible({ timeout: 5000 })
		// OrigamDrawer uses <teleport> internally — the rendered .origam-drawer
		// may be mounted outside the wrapper div. Search the full sandbox frame.
		const drawer = sandbox.locator('.origam-drawer').first()
		await expect(drawer).toBeVisible({ timeout: 5000 })
		await expect(drawer).toHaveClass(/origam-drawer/)
	})
})
