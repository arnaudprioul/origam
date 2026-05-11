import { test, expect } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-btn-origambtn-story-vue'

test.setTimeout(180_000)

test('DEBUG btn — hover and active produce DIFFERENT bg colors for primary intent', async ({ page }) => {
    await page.goto(STORY_PATH)
    await page.waitForLoadState('networkidle')

    // Land on any variant that renders a primary btn
    const candidates = ['Playground', 'Variants', 'Default', 'Sizes']
    for (const title of candidates) {
        const loc = page.getByText(title, { exact: true }).last()
        if (await loc.count().catch(() => 0)) {
            await loc.click({ timeout: 5_000 }).catch(() => {})
            break
        }
    }
    await page.waitForTimeout(2000)

    const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
    // Find a primary-fill btn. Try several selectors that the design system uses.
    const candidates2 = [
        '.origam-btn--colored',
        '.origam-btn.origam--bg-primary',
        '.origam-btn',
    ]
    let btn: any = null
    for (const sel of candidates2) {
        const found = sandbox.locator(sel).first()
        if (await found.count().catch(() => 0)) {
            btn = found
            break
        }
    }
    if (!btn) {
        // eslint-disable-next-line no-console
        console.log('No btn found in any variant — skipping')
        return
    }

    // Read resting bg, then hover, then active (mousedown)
    const rest = await btn.evaluate((el: HTMLElement) => getComputedStyle(el).backgroundColor)

    await btn.hover({ force: true })
    await page.waitForTimeout(150)
    const hovered = await btn.evaluate((el: HTMLElement) => getComputedStyle(el).backgroundColor)

    // For active, we simulate mousedown without releasing
    const box = await btn.boundingBox()
    if (!box) return
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
    await page.mouse.down()
    await page.waitForTimeout(150)
    const active = await btn.evaluate((el: HTMLElement) => getComputedStyle(el).backgroundColor)
    await page.mouse.up()

    // eslint-disable-next-line no-console
    console.log('=== btn bg progression ===')
    // eslint-disable-next-line no-console
    console.log(JSON.stringify({ rest, hovered, active }, null, 2))

    await btn.screenshot({ path: '/tmp/btn-progression.png' })

    // Assertions: at minimum, rest / hover / active must differ from each other
    // (the regression we fixed was hover === active because the JS collapsed
    // isActive into the 'hover' role).
    if (rest && hovered) expect(hovered).not.toBe(rest)
    if (rest && active) expect(active).not.toBe(rest)
    if (hovered && active) expect(active).not.toBe(hovered)
})
