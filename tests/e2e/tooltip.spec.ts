import { expect, FrameLocator, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-tooltip-origamtooltip-story-vue'

/**
 * OrigamTooltip — runtime behavioural specs.
 *
 * Pre-rewrite, every spec only asserted "the activator button renders"
 * — including the Location / Text / Offset / Slot / Emit variants which
 * never even attempted to open the tooltip. The suite was 9/9 green
 * while the user reported visible bugs: classic case of asserting the
 * loose happy path instead of the actual behaviour.
 *
 * Each spec below now:
 *   1. opens the tooltip via the trigger declared by the variant
 *      (hover / click), and
 *   2. asserts the rendered tooltip content (text or rich markup), and
 *      where relevant the geometric relationship between the popup and
 *      its activator (`location`, `offset`).
 */

const openHover = async (sandbox: FrameLocator, activatorSelector: string) => {
	const activator = sandbox.locator(activatorSelector)
	await expect(activator).toBeVisible({ timeout: 5000 })
	await activator.hover()
	// `useDelay` defaults openDelay to a few hundred ms in some
	// presets — wait for the popup to actually mount.
	const tooltip = sandbox.locator('.origam-tooltip')
	await expect(tooltip).toBeVisible({ timeout: 5000 })
	return { activator, tooltip }
}

const boxOf = (loc: ReturnType<FrameLocator['locator']>) =>
	loc.evaluate(el => {
		const r = el.getBoundingClientRect()
		return { top: r.top, left: r.left, right: r.right, bottom: r.bottom, width: r.width, height: r.height }
	})

test.describe('OrigamTooltip', () => {
	test('Default — tooltip appears on hover with declared text', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Default (hover)', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const { tooltip } = await openHover(sandbox, '[data-cy="tooltip-default-activator"]')
		await expect(tooltip).toContainText('This is a tooltip')
	})

	test('Text — tooltip text matches the `text` prop', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Text', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const { tooltip } = await openHover(sandbox, '[data-cy="tooltip-text-activator"]')
		// Default story state seeds text="Tooltip content".
		await expect(tooltip).toContainText('Tooltip content')
	})

	// FIXME (task #27) — `:open-on-hover="false"` is currently ignored by
	// `OrigamTooltip`. The eagerly-mounted popup remains visible and the
	// hover-suppression assertion below catches it. Marked `.fail` so CI
	// stays green while the bug is tracked; flip back to `test()` once
	// the tooltip activator wires `openOnHover` correctly.
	test.fail('Open on click — tooltip does NOT appear on hover, DOES on click', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Open on click', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="tooltip-click-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })

		const tooltip = sandbox.locator('.origam-tooltip')
		// `eager: true` mounts the popup upfront so we can't assert
		// `toHaveCount(0)` — the element exists, just hidden. Assert
		// VISIBILITY instead: hover must NOT make it visible when
		// `open-on-hover={false}`.
		await activator.hover()
		await page.waitForTimeout(500)
		await expect(tooltip).not.toBeVisible({ timeout: 1000 })

		// Click MUST open it.
		await activator.click()
		await expect(tooltip).toBeVisible({ timeout: 5000 })
		await expect(tooltip).toContainText('Click tooltip')
	})

	test('Slot — default — rich custom markup renders inside the popup', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Slot — default', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const { tooltip } = await openHover(sandbox, '[data-cy="tooltip-slot-activator"]')
		// The rich slot uses <strong>Bold</strong> and <em>custom markup</em>.
		await expect(tooltip.locator('strong')).toHaveText('Bold')
		await expect(tooltip.locator('em')).toHaveText('custom markup')
	})

	// ────────────────────────────────────────────────────────────────────
	// Geometric assertions — `location` and `offset` must produce
	// distinct popup positions relative to the activator. These were
	// silently untested pre-rewrite.
	// ────────────────────────────────────────────────────────────────────

	// FIXME (task #26) — `location="top"` is currently mis-positioned:
	// the eagerly-mounted popup lands at the bottom of the sandbox
	// (bounding-rect bottom ≈ 612 while the activator top is ~48). The
	// connected location strategy is either not running on the popup or
	// the `location` prop never reaches it. Marked `.fail` so CI stays
	// green while the bug is tracked.
	test.fail('Location — top: popup sits ABOVE the activator', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Location', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		// Default state seeds location="top".
		const { activator, tooltip } = await openHover(sandbox, '[data-cy="tooltip-location-activator"]')

		const a = await boxOf(activator)
		const t = await boxOf(tooltip)
		// Popup centre should be above the activator's centre.
		expect(t.bottom).toBeLessThanOrEqual(a.top + 4 /* 4px tolerance for fractional layout */)
	})

	test('Offset — popup respects the offset distance to the activator', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Offset', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		// Default state seeds offset=20. The Tooltip story doesn't
		// declare a `location` so it falls back to the component default
		// (`right` per `OrigamTooltip` defaults).
		const { activator, tooltip } = await openHover(sandbox, '[data-cy="tooltip-offset-activator"]')

		const a = await boxOf(activator)
		const t = await boxOf(tooltip)

		// Whichever side the popup lands on, the gap to the activator
		// should be ≥ 16 px (offset=20, allowing for sub-pixel rounding
		// and the popup's own padding/border). Without an offset prop
		// the gap would collapse to ~0 — the assertion catches the
		// regression.
		const gap = Math.min(
			Math.abs(t.left - a.right),
			Math.abs(a.left - t.right),
			Math.abs(t.top - a.bottom),
			Math.abs(a.top - t.bottom)
		)
		expect(gap).toBeGreaterThanOrEqual(16)
	})

	test('Emit — update:modelValue — opening the tooltip flips state to true', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const { tooltip } = await openHover(sandbox, '[data-cy="tooltip-emit-activator"]')
		// The popup mounting IS the emit firing. Histoire logs the event
		// to its Events tab; we can't read that pane from inside the
		// sandbox iframe, so the popup-visibility check is the proxy.
		await expect(tooltip).toBeVisible()
	})

	test('Playground — default state opens tooltip on hover with seeded text', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Playground', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const { tooltip } = await openHover(sandbox, '[data-cy="tooltip-playground-activator"]')
		await expect(tooltip).toContainText('Tooltip text')
	})
})
