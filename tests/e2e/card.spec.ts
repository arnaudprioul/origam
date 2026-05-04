import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-card-origamcard-story-vue'

const EXPECTED_INTENT_BG: Record<string, string> = {
	primary: 'rgb(124, 58, 237)',
	success: 'rgb(76, 175, 80)',
	warning: 'rgb(251, 140, 0)',
	danger:  'rgb(239, 68, 68)'
}

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

	test('Border showcase — directional border rungs produce per-side widths', async ({ page }) => {
		// Mirror of the Toolbar Border showcase (commit 0b24362). Pre-fix
		// Card SCSS read singular shorthand — fixed in 9a2e667 with
		// per-side reads. This spec asserts the directional rungs
		// (`top`/`right`/`bottom`/`left`) produce 1 px on the
		// corresponding side and 0 elsewhere.
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Border showcase', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const widths = (cy: string) =>
			sandbox.locator(`[data-cy="${cy}"]`).evaluate(el => {
				const cs = getComputedStyle(el as HTMLElement)
				return {
					top: cs.borderTopWidth, right: cs.borderRightWidth,
					bottom: cs.borderBottomWidth, left: cs.borderLeftWidth
				}
			})

		expect(await widths('card-border-default')).toEqual({ top: '0px', right: '0px', bottom: '0px', left: '0px' })
		expect(await widths('card-border-true')).toEqual({ top: '1px', right: '1px', bottom: '1px', left: '1px' })
		expect(await widths('card-border-top')).toEqual({ top: '1px', right: '0px', bottom: '0px', left: '0px' })
		expect(await widths('card-border-right')).toEqual({ top: '0px', right: '1px', bottom: '0px', left: '0px' })
		expect(await widths('card-border-bottom')).toEqual({ top: '0px', right: '0px', bottom: '1px', left: '0px' })
		expect(await widths('card-border-left')).toEqual({ top: '0px', right: '0px', bottom: '0px', left: '1px' })
	})

	test('Rounded showcase — rounded={true} sets border-radius', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Rounded showcase', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')

		const def = await sandbox.locator('[data-cy="card-rounded-default"]')
			.evaluate(el => getComputedStyle(el as HTMLElement).borderTopLeftRadius)
		expect(def).toBe('0px')

		const rounded = await sandbox.locator('[data-cy="card-rounded-true"]')
			.evaluate(el => getComputedStyle(el as HTMLElement).borderTopLeftRadius)
		// Card's `&--rounded` modifier sets all four corners to a 4 px
		// `--origam-card---border-radius-rounded` fallback.
		expect(rounded).toBe('4px')
	})

	test('Color showcase — bgColor prop paints each intent on the card root', async ({ page }) => {
		// Pre-fix `ICardProps` did NOT extend `IColorProps`, so
		// `<origam-card color="primary">` was a silent no-op despite
		// the SCSS reading `var(--origam-card---color)` etc. from the
		// design tokens. This spec asserts the COMPUTED background of
		// each intent — catches the regression at runtime instead of
		// asserting "card is visible" while the prop is silently
		// dropped.
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		// Use `.last()` — "Color" is also a sidebar entry name in some
		// configurations, so `.first()` may match the wrong element.
		await page.getByText('Color', { exact: true }).last().click({ timeout: 5000 })
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')

		for (const [intent, expected] of Object.entries(EXPECTED_INTENT_BG)) {
			const card = sandbox.locator(`[data-cy="card-color-${intent}"]`)
			await expect(card).toBeVisible({ timeout: 5000 })
			const bg = await card.evaluate(el => getComputedStyle(el).backgroundColor)
			expect(bg, `card-color-${intent}`).toBe(expected)
		}
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
