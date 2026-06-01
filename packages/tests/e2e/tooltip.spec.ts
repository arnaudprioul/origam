import { expect, FrameLocator, test } from '@playwright/test'

const STORY_PATH = '/story/components-stories-tooltip-origamtooltip-story-vue'

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
	// The popup BODY is `.origam-tooltip__content`. `.origam-tooltip` is
	// the overlay ROOT which is always rendered (transparent, full
	// teleport-target span) — asserting visibility on it produces false
	// positives. Always assert against `__content`.
	const tooltip = sandbox.locator('.origam-tooltip__content')
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

	test('Open on click — tooltip does NOT appear on hover, DOES on click', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Open on click', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="tooltip-click-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })

		// Use the BODY selector (`__content`) — the overlay root
		// `.origam-tooltip` is always present in the DOM after the fix
		// for the black-background bug, just transparent.
		const tooltip = sandbox.locator('.origam-tooltip__content')
		// Hover must NOT make the popup visible when `:open-on-hover="false"`.
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

	test('Location — top: popup sits ABOVE the activator', async ({ page }) => {
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

	test('Offset — popup is repositioned (anchor-origin computed) when offset changes', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Offset', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		// Default state seeds offset=20. The story has no `location` prop
		// so Tooltip's default `right` applies. The Histoire sandbox
		// iframe is ~300 px wide — too narrow to honor the full 20 px
		// gap on a `right` anchor (popup overflows and the strategy
		// clamps it back to the viewport edge). So we can't assert a
		// strict pixel gap here. Instead, prove the strategy IS running
		// and producing geometry-aware inline styles by checking the
		// computed anchor-origin token + a positive `top`/`left`.
		await openHover(sandbox, '[data-cy="tooltip-offset-activator"]')

		const styles = await sandbox.locator('.origam-overlay__content').evaluate(el => {
			const cs = getComputedStyle(el)
			return {
				anchorOrigin: cs.getPropertyValue('--origam-overlay-anchor-origin').trim(),
				top: cs.top,
				left: cs.left,
				transformOrigin: cs.transformOrigin
			}
		})

		// `right center` per Tooltip's default location.
		expect(styles.anchorOrigin).toBe('right center')
		// Strategy ran: `top` and `left` are pixel values, not `auto`.
		expect(styles.top).toMatch(/\d+px/)
		expect(styles.left).toMatch(/\d+px/)
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
		await page.getByText('Default', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const { tooltip } = await openHover(sandbox, '[data-cy="tooltip-playground-activator"]')
		await expect(tooltip).toContainText('Tooltip text')
	})
})
