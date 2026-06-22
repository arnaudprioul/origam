import { test } from '@playwright/test'

const STORY_PATH = '/story/components-stories-btn-origambtn-story-vue'

test('DEBUG btn loader — inspect line / circular / skeleton DOM + styles', async ({ page }) => {
    await page.goto(STORY_PATH)
    await page.waitForLoadState('networkidle')
    await page.getByText('Prop — loading (interactive)', { exact: true }).last().click({ timeout: 5000 })
    await page.waitForTimeout(800)

    const sandbox = page.frameLocator('iframe[src*="__sandbox"]')

    for (const dataCy of ['btn-loading-line', 'btn-loading-line-primary', 'btn-loading-circular-override', 'btn-loading-circular-success', 'btn-loading-skeleton']) {
        const btn = sandbox.locator(`[data-cy="${dataCy}"]`).first()
        await btn.scrollIntoViewIfNeeded()
        const report = await btn.evaluate((el) => {
            const _cs = getComputedStyle(el)
            const rect = el.getBoundingClientRect()
            const progress = el.querySelector('.origam-btn__progress')
            const progressCs = progress ? getComputedStyle(progress as Element) : null
            const progressRect = progress ? (progress as Element).getBoundingClientRect() : null
            // The visible coloured bits inside the progress (linear has __background
            // / __bar; circular has __overlay / __underlay-strokes inside SVG).
            const bg = progress?.querySelector('.origam-progress__background') as Element | null
            const bar = progress?.querySelector('.origam-progress__bar')        as Element | null
            const underlay = progress?.querySelector('.origam-progress__underlay') as SVGElement | null
            const overlay  = progress?.querySelector('.origam-progress__overlay')  as SVGElement | null
            return {
                btnSize: { w: rect.width, h: rect.height },
                progressSize: progressRect ? { w: progressRect.width, h: progressRect.height } : null,
                progressColor: progressCs?.color ?? null,             // <- currentColor source
                bgComputed: bg ? getComputedStyle(bg).backgroundColor : null,
                barComputed: bar ? getComputedStyle(bar).backgroundColor : null,
                underlayStroke: underlay ? getComputedStyle(underlay).stroke : null,
                overlayStroke:  overlay  ? getComputedStyle(overlay).stroke  : null,
            }
        })
         
        console.log(`\n=== ${dataCy} ===`)
         
        console.log(JSON.stringify(report, null, 2))
    }
})
