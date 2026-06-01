import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/components-stories-badge-origambadge-story-vue'

// Badge uses `useColorEffect` which emits the `bgHover` rung at rest
// for action intents (primary maps to `#6d28d9` / rgb(109, 40, 217)).
// Feedback intents stay on the canonical `bg`.
const EXPECTED_INTENT_BG: Record<string, string> = {
	primary: 'rgb(109, 40, 217)',
	success: 'rgb(76, 175, 80)',
	warning: 'rgb(251, 140, 0)',
	danger:  'rgb(239, 68, 68)'
}

test.describe('OrigamBadge', () => {
	test('Color showcase — bgColor paints each intent on the badge body', async ({ page }) => {
		await page.goto(STORY_PATH)
		await page.waitForLoadState('networkidle')
		await page.getByText('Prop — color & bgColor', { exact: true }).last().click({ timeout: 5000 })
		await page.waitForTimeout(800)

		const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
		for (const [intent, expected] of Object.entries(EXPECTED_INTENT_BG)) {
			// Badge wraps a child slot — `[data-cy="badge-color-*"]` lands
			// on the wrapper. The bg lives on the inner `__badge` element.
			const badge = sandbox.locator(`[data-cy="badge-color-${intent}"] .origam-badge__badge`)
			await expect(badge).toBeVisible({ timeout: 5000 })
			const bg = await badge.evaluate(el => getComputedStyle(el).backgroundColor)
			expect(bg, `badge-color-${intent}`).toBe(expected)
		}
	})
})
