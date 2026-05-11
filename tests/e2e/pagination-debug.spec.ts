import { test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-pagination-origampagination-story-vue'

test.setTimeout(180_000)

test('DEBUG pagination — size cascade + withInfo Prev/Next text', async ({ page }) => {
    await page.goto(STORY_PATH)
    await page.waitForLoadState('networkidle')

    // ── Sizes Variant ───────────────────────────────────────────────
    await page.getByText('Sizes — small · default · large (stacked rows)', { exact: true })
        .last()
        .click({ timeout: 10_000 })
    await page.waitForTimeout(1500)

    const sandbox = page.frameLocator('iframe[src*="__sandbox"]')

    for (const size of ['small', 'default', 'large']) {
        const report = await sandbox.locator(`[data-cy="pagination-size-${size}"]`).first().evaluate((el) => {
            const firstBtn = el.querySelector('.origam-btn') as HTMLElement | null
            // Check what attributes Vue actually applied to the btn.
            const btnAllAttrs = firstBtn
                ? Array.from(firstBtn.attributes).map((a) => `${a.name}="${a.value.slice(0, 60)}"`)
                : []
            return {
                rootClasses: el.className,
                btnClasses: firstBtn?.className ?? null,
                btnSize: firstBtn ? `${firstBtn.getBoundingClientRect().width.toFixed(1)} × ${firstBtn.getBoundingClientRect().height.toFixed(1)}` : null,
                btnFontSize: firstBtn ? getComputedStyle(firstBtn).fontSize : null,
                btnAttrs: btnAllAttrs,
            }
        })
        // eslint-disable-next-line no-console
        console.log(`\n=== size="${size}" ===`)
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(report, null, 2))
    }

    // ── With Info Variant ───────────────────────────────────────────
    await page.getByText('With info', { exact: true }).last().click({ timeout: 10_000 })
    await page.waitForTimeout(1500)

    const info = await sandbox.locator('[data-cy="pagination-with-info"]').first().evaluate((el) => {
        const infoLabel = el.querySelector('.origam-pagination__info')
        const prev = el.querySelector('.origam-pagination__prev .origam-btn')
        const next = el.querySelector('.origam-pagination__next .origam-btn')
        const pageItems = el.querySelectorAll('.origam-pagination__item')
        return {
            hasInfoLabel: !!infoLabel,
            infoText: infoLabel?.textContent?.trim() ?? null,
            prevText: (prev as HTMLElement | null)?.innerText?.trim() ?? null,
            prevClasses: prev?.className ?? null,
            nextText: (next as HTMLElement | null)?.innerText?.trim() ?? null,
            nextClasses: next?.className ?? null,
            visiblePageItems: pageItems.length,
            pageItemTexts: Array.from(pageItems).map((el) => (el as HTMLElement).innerText.trim()),
        }
    })
    // eslint-disable-next-line no-console
    console.log(`\n=== withInfo ===`)
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(info, null, 2))
})
