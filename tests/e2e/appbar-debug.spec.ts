import { test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-app-origamappbar-story-vue'

test.setTimeout(180_000)

test('DEBUG appbar — btn shape: square + transparent at rest', async ({ page }) => {
    await page.goto(STORY_PATH)
    await page.waitForLoadState('networkidle')
    for (const title of ['Playground', 'Default', 'Basic']) {
        const loc = page.getByText(title, { exact: true }).last()
        if (await loc.count().catch(() => 0)) {
            await loc.click({ timeout: 5_000 }).catch(() => {})
            break
        }
    }
    await page.waitForTimeout(2000)

    const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
    const bar = sandbox.locator('.origam-app-bar').first()
    if (await bar.count().catch(() => 0) === 0) {
        // eslint-disable-next-line no-console
        console.log('No app-bar found, skipping.')
        return
    }
    const sample = await bar.evaluate((root) => {
        const btn = root.querySelector('.origam-btn') as HTMLElement | null
        if (!btn) return null
        const r = btn.getBoundingClientRect()
        const cs = getComputedStyle(btn)
        const barCs = getComputedStyle(root as HTMLElement)
        return {
            bg: cs.backgroundColor,
            color: cs.color,
            radius: cs.borderRadius,
            size: `${Math.round(r.width)} × ${Math.round(r.height)}`,
            classes: btn.className,
            // Read the cascading CSS vars to trace WHICH rule wins.
            bgBaseFromBar: barCs.getPropertyValue('--bg-base').trim(),
            btnBgVar: cs.getPropertyValue('--origam-btn---background-color').trim(),
            inlineStyle: btn.getAttribute('style') ?? '(none)',
            parentTag: btn.parentElement?.tagName,
            parentClasses: btn.parentElement?.className,
        }
    })
    // eslint-disable-next-line no-console
    console.log('app-bar btn:', JSON.stringify(sample, null, 2))

    await bar.screenshot({ path: '/tmp/appbar-default.png' })
})
