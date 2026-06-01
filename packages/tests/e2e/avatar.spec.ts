import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/components-stories-avatar-origamavatar-story-vue'

const EXPECTED_INTENT_BG: Record<string, string> = {
	primary: 'rgb(124, 58, 237)',
	success: 'rgb(76, 175, 80)',
	warning: 'rgb(251, 140, 0)',
	danger:  'rgb(239, 68, 68)'
}

test.describe('OrigamAvatar', () => {
	test('Color showcase — bgColor prop paints each intent on the avatar root', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		// `.last()` because the sidebar may also surface a "Color" entry
		// further up the alphabet.
		await page.getByText('Prop — color & bgColor', { exact: true }).last().click({ timeout: 5000 })
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		for (const [intent, expected] of Object.entries(EXPECTED_INTENT_BG)) {
			const avatar = sandbox.locator(`[data-cy="avatar-color-${intent}"]`)
			await expect(avatar).toBeVisible({ timeout: 5000 })
			const bg = await avatar.evaluate(el => getComputedStyle(el).backgroundColor)
			expect(bg, `avatar-color-${intent}`).toBe(expected)
		}
	})

	test.describe('Rounded — shaped / shaped-invert corner asymmetry', () => {
		test('shaped — TL and BR are rounded, TR and BL are 0', async ({ page }) => {
			await page.goto(STORY_PATH)
			await page.waitForLoadState('networkidle')
			await page.getByText('Prop — rounded', { exact: true }).first().click()
			await page.waitForTimeout(800)

			const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
			const avatar = sandbox.locator('[data-cy="avatar-rounded-shaped"]')
			await expect(avatar).toBeVisible({ timeout: 5000 })

			const radii = await avatar.evaluate(el => {
				const cs = getComputedStyle(el as HTMLElement)
				return {
					tl: cs.borderTopLeftRadius,
					tr: cs.borderTopRightRadius,
					br: cs.borderBottomRightRadius,
					bl: cs.borderBottomLeftRadius
				}
			})
			expect(radii.tl, 'top-left should be rounded').not.toBe('0px')
			expect(radii.br, 'bottom-right should be rounded').not.toBe('0px')
			expect(radii.tr, 'top-right should be 0').toBe('0px')
			expect(radii.bl, 'bottom-left should be 0').toBe('0px')
			expect(radii.tl).toBe(radii.br)
		})

		test('shaped-invert — TR and BL are rounded, TL and BR are 0', async ({ page }) => {
			await page.goto(STORY_PATH)
			await page.waitForLoadState('networkidle')
			await page.getByText('Prop — rounded', { exact: true }).first().click()
			await page.waitForTimeout(800)

			const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
			const avatar = sandbox.locator('[data-cy="avatar-rounded-shaped-invert"]')
			await expect(avatar).toBeVisible({ timeout: 5000 })

			const radii = await avatar.evaluate(el => {
				const cs = getComputedStyle(el as HTMLElement)
				return {
					tl: cs.borderTopLeftRadius,
					tr: cs.borderTopRightRadius,
					br: cs.borderBottomRightRadius,
					bl: cs.borderBottomLeftRadius
				}
			})
			expect(radii.tr, 'top-right should be rounded').not.toBe('0px')
			expect(radii.bl, 'bottom-left should be rounded').not.toBe('0px')
			expect(radii.tl, 'top-left should be 0').toBe('0px')
			expect(radii.br, 'bottom-right should be 0').toBe('0px')
			expect(radii.tr).toBe(radii.bl)
		})
	})
})
