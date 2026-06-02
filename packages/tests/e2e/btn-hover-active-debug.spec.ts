import { test, expect } from '@playwright/test'

const STORY_PATH = '/story/components-stories-btn-origambtn-story-vue'

test.setTimeout(180_000)

test('DEBUG btn — hover and active produce DIFFERENT bg colors for primary intent', async ({ page }) => {
    await page.goto(STORY_PATH)
    await page.waitForLoadState('networkidle')

    // Navigate to the Variant that renders btns with bgColor="primary".
    // "Prop — color & bgColor" has data-cy="btn-color-primary" with
    // bg-color="primary" — this is the only Variant where colorStyles
    // emits an inline background-color that changes per state
    // (rest / hover / active via tokenStylesForIntent + bgRole).
    const variantLink = page.getByText('Prop — color & bgColor', { exact: true }).last()
    await variantLink.click({ timeout: 10_000 })
    await page.waitForTimeout(2000)

    const sandbox = page.frameLocator('iframe[src*="__sandbox"]')

    // Target the primary btn that has bg-color="primary" applied.
    // This btn has a data-cy attribute set directly in the story.
    const btn = sandbox.locator('[data-cy="btn-color-primary"]')
    const btnCount = await btn.count().catch(() => 0)
    if (!btnCount) {
        console.log('btn-color-primary not found — story may have changed')
        return
    }

    // Read resting background-color (inline style from colorStyles when resting).
    const rest = await btn.evaluate((el: HTMLElement) => getComputedStyle(el).backgroundColor)

    // Hover: trigger mouseenter on the btn element inside the iframe.
    await btn.hover({ force: true })
    await page.waitForTimeout(200)
    const hovered = await btn.evaluate((el: HTMLElement) => getComputedStyle(el).backgroundColor)

    // Active: simulate mousedown via dispatchEvent inside the iframe so that
    // coordinates stay relative to the sandbox frame (page.mouse.down() would
    // target coordinates in the outer page frame and miss the element).
    await btn.dispatchEvent('mousedown', { bubbles: true, cancelable: true })
    await page.waitForTimeout(200)
    const active = await btn.evaluate((el: HTMLElement) => getComputedStyle(el).backgroundColor)
    await btn.dispatchEvent('mouseup', { bubbles: true, cancelable: true })

    console.log('=== btn bg progression ===')
    console.log(JSON.stringify({ rest, hovered, active }, null, 2))

    await btn.screenshot({ path: '/tmp/btn-progression.png' })

    // Assertions: at minimum, rest / hover / active must differ from each other.
    // The regression being guarded here was hover === active because the JS collapsed
    // isActive into the 'hover' role in useStateEffect (bgRole stayed 'hover' even
    // during mousedown because isActive was not flipping to true).
    if (rest && hovered) expect(hovered).not.toBe(rest)
    if (rest && active) expect(active).not.toBe(rest)
    if (hovered && active) expect(active).not.toBe(hovered)
})
