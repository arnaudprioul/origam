import { test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-timeline-origamtimeline-story-vue'

test.setTimeout(180_000)

test('DEBUG timeline — size cascade + horizontal orientation', async ({ page }) => {
    await page.goto(STORY_PATH)
    await page.waitForLoadState('networkidle')

    // ── Size / Density variant ────────────────────────────────────────
    await page.getByText('Size / Density', { exact: true }).last().click({ timeout: 5000 })
    await page.waitForTimeout(800)

    const sandbox = page.frameLocator('iframe[src*="__sandbox"]')

    for (const size of ['x-small', 'small', 'default', 'large', 'x-large']) {
        await sandbox.locator('[data-cy="timeline-size-density"]').first().evaluate((el, sz) => {
            el.classList.remove(
                'origam-timeline--size-x-small',
                'origam-timeline--size-small',
                'origam-timeline--size-default',
                'origam-timeline--size-large',
                'origam-timeline--size-x-large',
            )
            el.classList.add(`origam-timeline--size-${sz}`)
        }, size)

        const report = await sandbox.locator('[data-cy="timeline-size-density"]').first().evaluate((el) => {
            const cs = getComputedStyle(el)
            const dot = el.querySelector('.origam-timeline-item__dot') as HTMLElement | null
            const track = el.querySelector('.origam-timeline-item__track') as HTMLElement | null
            const title = el.querySelector('.origam-timeline-item__title') as HTMLElement | null
            return {
                dotSizeVar: cs.getPropertyValue('--origam-timeline---dot-size').trim(),
                trackWidthVar: cs.getPropertyValue('--origam-timeline---track-width').trim(),
                gapVar: cs.getPropertyValue('--origam-timeline---gap').trim(),
                titleFontVar: cs.getPropertyValue('--origam-timeline---title-font-size').trim(),
                dotComputed: dot ? `${getComputedStyle(dot).width} × ${getComputedStyle(dot).height}` : null,
                trackComputed: track ? getComputedStyle(track).width : null,
                titleComputed: title ? getComputedStyle(title).fontSize : null,
            }
        })
        // eslint-disable-next-line no-console
        console.log(`\n=== size="${size}" ===`)
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(report, null, 2))
    }

    // ── Horizontal variant ──────────────────────────────────────────
    await page.getByText('Orientation — horizontal (scroll-snap slider)', { exact: true }).last().click({ timeout: 5000 })
    await page.waitForTimeout(1000)

    const h = await sandbox.locator('[data-cy="timeline-horizontal"]').first().evaluate((el) => {
        const wrapper = el.querySelector('.origam-timeline__track-wrapper') as HTMLElement | null
        const items = Array.from(el.querySelectorAll('.origam-timeline-item')) as HTMLElement[]
        const firstItem = items[0]
        const lastItem = items[items.length - 1]
        const firstTrack = firstItem?.querySelector('.origam-timeline-item__track') as HTMLElement | null
        const lastConnector = lastItem?.querySelector('.origam-timeline-item__connector') as HTMLElement | null
        return {
            rootClasses: el.className,
            rootFlexDirection: getComputedStyle(el).flexDirection,
            hasWrapper: !!wrapper,
            wrapperFlexDirection: wrapper ? getComputedStyle(wrapper).flexDirection : null,
            wrapperScrollSnap: wrapper ? getComputedStyle(wrapper).scrollSnapType : null,
            wrapperOverflowX: wrapper ? getComputedStyle(wrapper).overflowX : null,
            itemCount: items.length,
            firstItemClasses: firstItem?.className ?? null,
            firstItemFlexDirection: firstItem ? getComputedStyle(firstItem).flexDirection : null,
            firstItemSnapAlign: firstItem ? getComputedStyle(firstItem).scrollSnapAlign : null,
            firstTrackFlexDirection: firstTrack ? getComputedStyle(firstTrack).flexDirection : null,
            lastConnectorDisplay: lastConnector ? getComputedStyle(lastConnector).display : null,
        }
    })
    // eslint-disable-next-line no-console
    console.log(`\n=== orientation="horizontal" ===`)
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(h, null, 2))
})
