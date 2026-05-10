import { test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-btn-origambtn-story-vue'

test('DEBUG btn loader — inspect line / circular / skeleton DOM + styles', async ({ page }) => {
    await page.goto(STORY_PATH)
    await page.waitForLoadState('networkidle')
    await page.getByText('Loading shapes', { exact: true }).last().click({ timeout: 5000 })
    await page.waitForTimeout(800)

    const sandbox = page.frameLocator('iframe[src*="__sandbox"]')

    for (const dataCy of ['btn-loading-line', 'btn-loading-circular-override', 'btn-loading-skeleton']) {
        const btn = sandbox.locator(`[data-cy="${dataCy}"]`).first()
        await btn.scrollIntoViewIfNeeded()
        const report = await btn.evaluate((el) => {
            const cs = getComputedStyle(el)
            const rect = el.getBoundingClientRect()
            const progress = el.querySelector('.origam-btn__progress')
            const progressCs = progress ? getComputedStyle(progress as Element) : null
            const progressRect = progress ? (progress as Element).getBoundingClientRect() : null
            return {
                tag: el.tagName,
                classes: el.className,
                btnSize: { w: rect.width, h: rect.height },
                btnPosition: cs.position,
                btnOverflow: cs.overflow,
                hasProgressEl: !!progress,
                progressClasses: progress ? (progress as Element).className : null,
                progressPosition: progressCs?.position ?? null,
                progressInset: progressCs ? `${progressCs.top} / ${progressCs.right} / ${progressCs.bottom} / ${progressCs.left}` : null,
                progressSize: progressRect ? { w: progressRect.width, h: progressRect.height } : null,
                progressHeight: progressCs?.height ?? null,
                progressMargin: progressCs?.margin ?? null,
                progressTop: progressCs?.top ?? null,
                progressLeft: progressCs?.left ?? null,
                progressInlineStyle: (progress as HTMLElement | null)?.getAttribute('style') ?? null,
                innerHTML: el.innerHTML.replace(/\s+/g, ' ').slice(0, 500),
            }
        })
        // eslint-disable-next-line no-console
        console.log(`\n=== ${dataCy} ===`)
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(report, null, 2))
    }
})
