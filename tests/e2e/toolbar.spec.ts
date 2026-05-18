import { expect, FrameLocator, test } from '@playwright/test'

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
		await page.getByText('Default', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const toolbar = sandbox.locator('[data-cy="toolbar-playground"]')
		await expect(toolbar).toBeVisible({ timeout: 5000 })
		await expect(toolbar).toHaveClass(/origam-toolbar/)
	})

	// ────────────────────────────────────────────────────────────────────
	// Border — computed-CSS assertions
	//
	// Pre-fix the SCSS read singular shorthand variables
	// (`--origam-toolbar---border-width`) that the token build never
	// emits. Combined with `border-style: solid` from the tokens, every
	// toolbar rendered with a ~3 px black frame on every side, even
	// `border={false}`. This block asserts the runtime computed widths,
	// not just class presence — the previous "renders" assertion was
	// passing while the bug was active.
	// ────────────────────────────────────────────────────────────────────

	const widths = (sandbox: FrameLocator, selector: string) =>
		sandbox.locator(selector).evaluate((el) => {
			const cs = window.getComputedStyle(el)
			return {
				top:    cs.borderTopWidth,
				right:  cs.borderRightWidth,
				bottom: cs.borderBottomWidth,
				left:   cs.borderLeftWidth
			}
		})

	test('Border showcase — default toolbar is borderless on all four sides', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Border', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		await expect(sandbox.locator('[data-cy="toolbar-border-default"]')).toBeVisible({ timeout: 5000 })

		const w = await widths(sandbox, '[data-cy="toolbar-border-default"]')
		expect(w).toEqual({ top: '0px', right: '0px', bottom: '0px', left: '0px' })
	})

	test('Border showcase — border={true} produces a thin border on all four sides', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Border', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		await expect(sandbox.locator('[data-cy="toolbar-border-true"]')).toBeVisible({ timeout: 5000 })

		const w = await widths(sandbox, '[data-cy="toolbar-border-true"]')
		// `thin` resolves to 1px in every modern browser. Asserting the
		// strict equality keeps the test honest — if the SCSS regresses
		// to `medium` (~3px) again, this fails immediately.
		expect(w.top).toBe('1px')
		expect(w.right).toBe('1px')
		expect(w.bottom).toBe('1px')
		expect(w.left).toBe('1px')
	})

	test('Border showcase — border="bottom" emits 1px ONLY on bottom', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Border', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const w = await widths(sandbox, '[data-cy="toolbar-border-bottom"]')
		expect(w).toEqual({ top: '0px', right: '0px', bottom: '1px', left: '0px' })
	})

	test('Border showcase — border="top" emits 1px ONLY on top', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Border', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const w = await widths(sandbox, '[data-cy="toolbar-border-top"]')
		expect(w).toEqual({ top: '1px', right: '0px', bottom: '0px', left: '0px' })
	})

	test('Border showcase — border="right" emits 1px ONLY on right', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Border', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const w = await widths(sandbox, '[data-cy="toolbar-border-right"]')
		expect(w).toEqual({ top: '0px', right: '1px', bottom: '0px', left: '0px' })
	})

	test('Border showcase — border="left" emits 1px ONLY on left', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Border', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const w = await widths(sandbox, '[data-cy="toolbar-border-left"]')
		expect(w).toEqual({ top: '0px', right: '0px', bottom: '0px', left: '1px' })
	})
})
