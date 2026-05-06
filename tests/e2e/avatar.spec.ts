import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-avatar-origamavatar-story-vue'

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
		await page.getByText('Color', { exact: true }).last().click({ timeout: 5000 })
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		for (const [intent, expected] of Object.entries(EXPECTED_INTENT_BG)) {
			const avatar = sandbox.locator(`[data-cy="avatar-color-${intent}"]`)
			await expect(avatar).toBeVisible({ timeout: 5000 })
			const bg = await avatar.evaluate(el => getComputedStyle(el).backgroundColor)
			expect(bg, `avatar-color-${intent}`).toBe(expected)
		}
	})
})
