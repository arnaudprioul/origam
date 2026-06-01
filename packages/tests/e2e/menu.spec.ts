import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/components-stories-menu-origammenu-story-vue'

/**
 * OrigamMenu — runtime behavioural specs.
 *
 * Pre-rewrite, every spec only asserted "the activator button renders".
 * The "Title" spec was additionally flaky because `getByText('Title',
 * { exact: true })` matched both the variant tab AND the OrigamTitle
 * entry in the components sidebar. The suite passed while a real
 * regression shipped: the popup wrapper had `background: #fff` +
 * `box-shadow` painting the entire teleport target whenever the menu
 * opened (same family of bug as the Tooltip wrapper-bg fix). Replacing
 * the toy assertions with computed-CSS + visibility checks on the
 * actual popup body (`.origam-menu__content`) catches the regression
 * if it ever returns.
 */

test.describe('OrigamMenu', () => {
	test('Default — popup opens, body has surface bg/radius/shadow, items render', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Default', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="menu-default-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
		await activator.click()
		await page.waitForTimeout(500)

		// Wrapper must be transparent (no full-iframe rectangle).
		const wrapperBg = await sandbox.locator('.origam-menu')
			.evaluate(el => getComputedStyle(el).backgroundColor)
		expect(wrapperBg).toBe('rgba(0, 0, 0, 0)')

		// Popup body carries the visual surface.
		const menuBody = sandbox.locator('.origam-menu__content')
		await expect(menuBody).toBeVisible({ timeout: 5000 })
		const bodyStyles = await menuBody.evaluate(el => {
			const cs = getComputedStyle(el)
			return {
				bg:           cs.backgroundColor,
				borderRadius: cs.borderRadius,
				boxShadow:    cs.boxShadow,
				display:      cs.display
			}
		})
		expect(bodyStyles.bg).not.toBe('rgba(0, 0, 0, 0)')
		expect(bodyStyles.borderRadius).toBe('8px')
		expect(bodyStyles.boxShadow).not.toBe('none')
		expect(bodyStyles.display).toBe('inline-block')

		// Items render (default story seeds Edit / Duplicate / Delete).
		await expect(sandbox.locator('.origam-menu__items')).toBeVisible({ timeout: 5000 })
		await expect(sandbox.locator('.origam-menu__items')).toContainText('Edit')
		await expect(sandbox.locator('.origam-menu__items')).toContainText('Duplicate')
		await expect(sandbox.locator('.origam-menu__items')).toContainText('Delete')
	})

	test('Title — subheader renders inside popup', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Prop — title', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="menu-title-activator"]')
		await expect(activator).toBeVisible({ timeout: 5000 })
		await activator.click()
		await page.waitForTimeout(500)

		const menuBody = sandbox.locator('.origam-menu__content')
		await expect(menuBody).toBeVisible({ timeout: 5000 })
		await expect(menuBody.locator('.origam-menu__title')).toContainText('Actions')
	})

	test('Open on hover — popup opens on hover, without click', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Prop — openOnHover', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="menu-hover-activator"]')
		await activator.hover()
		await page.waitForTimeout(800)

		await expect(sandbox.locator('.origam-menu__content')).toBeVisible({ timeout: 5000 })
	})

	test('Slot — default — custom content renders inside popup', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Slot — default', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="menu-slot-default-activator"]')
		await activator.click()
		await page.waitForTimeout(500)

		const slotContent = sandbox.locator('[data-cy="menu-slot-default-content"]')
		await expect(slotContent).toBeVisible({ timeout: 5000 })
		await expect(slotContent).toContainText('Custom slot')
		await expect(slotContent).toContainText('Any markup is fine here')
	})

	test('Offset — popup opens, location strategy emits anchor-origin token', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Prop — offset', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="menu-offset-activator"]')
		await activator.click()
		await page.waitForTimeout(500)

		const anchorOrigin = await sandbox.locator('.origam-overlay__content')
			.evaluate(el => getComputedStyle(el).getPropertyValue('--origam-overlay-anchor-origin').trim())
		// Anchor-origin format is `${side} ${align}` where both come from
		// the same set: `top|bottom|left|right|center|start|end`. The
		// strategy can flip the popup to whatever fits the viewport, so
		// don't pin a specific value — just prove the token is set.
		expect(anchorOrigin).toMatch(/^(top|bottom|left|right|center|start|end) (top|bottom|left|right|center|start|end)$/)
	})

	test('Emit — update:modelValue — popup opens on click', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="menu-emit-activator"]')
		await activator.click()
		await page.waitForTimeout(500)

		await expect(sandbox.locator('.origam-menu__content')).toBeVisible({ timeout: 5000 })
	})

	test('Playground — default state opens menu on click', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Default', { exact: true }).first().click()
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		const activator = sandbox.locator('[data-cy="menu-playground-activator"]')
		await activator.click()
		await page.waitForTimeout(500)

		await expect(sandbox.locator('.origam-menu__content')).toBeVisible({ timeout: 5000 })
	})
})
