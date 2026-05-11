import { test, expect } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-pagination-origampagination-story-vue'

test.setTimeout(180_000)

test('DEBUG pagination — active page has strong contrast', async ({ page }) => {
    await page.goto(STORY_PATH)
    await page.waitForLoadState('networkidle')
    // Activate the first available Variant so the sandbox iframe mounts.
    // We try a few common titles in order; the first match wins.
    const candidates = ['Playground', 'Default', 'Basic', 'Sizes — small · default · large (stacked rows)']
    for (const title of candidates) {
        const loc = page.getByText(title, { exact: true }).last()
        if (await loc.count().catch(() => 0)) {
            await loc.click({ timeout: 5_000 }).catch(() => {})
            break
        }
    }
    await page.waitForTimeout(2000)

    const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
    // Wait for at least one pagination root inside the sandbox
    await sandbox.locator('.origam-pagination').first().waitFor({ state: 'visible', timeout: 30_000 })

    // Read computed styles for the active page btn AND a sibling non-active one
    const sample = await sandbox.locator('.origam-pagination').first().evaluate((root) => {
        const active = root.querySelector('.origam-pagination__item--is-active .origam-btn') as HTMLElement | null
        const inactive = root.querySelector('.origam-pagination__item:not(.origam-pagination__item--is-active) .origam-btn') as HTMLElement | null
        const read = (el: HTMLElement | null) => {
            if (!el) return null
            const cs = getComputedStyle(el)
            return {
                bg: cs.backgroundColor,
                color: cs.color,
                border: `${cs.borderWidth} ${cs.borderStyle} ${cs.borderColor}`,
                radius: cs.borderRadius,
                size: `${Math.round(el.getBoundingClientRect().width)} x ${Math.round(el.getBoundingClientRect().height)}`,
                text: el.innerText?.trim(),
            }
        }
        // Also peek at the overlay opacity
        const overlay = active?.querySelector('.origam-btn__overlay') as HTMLElement | null
        return {
            active: read(active),
            inactive: read(inactive),
            overlayOpacity: overlay ? getComputedStyle(overlay).opacity : null,
            // Confirm the contrast really differs
            contrastPair: {
                activeBg: active ? getComputedStyle(active).backgroundColor : null,
                inactiveBg: inactive ? getComputedStyle(inactive).backgroundColor : null,
            },
        }
    })

    // eslint-disable-next-line no-console
    console.log('=== pagination active vs inactive ===')
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(sample, null, 2))

    await sandbox.locator('.origam-pagination').first().screenshot({ path: '/tmp/pagination-active.png' })

    // Assert: active bg is NOT transparent (the bug we just fixed)
    expect(sample.active).not.toBeNull()
    expect(sample.active?.bg).not.toBe('rgba(0, 0, 0, 0)')
    // Assert active bg != inactive bg
    expect(sample.contrastPair.activeBg).not.toBe(sample.contrastPair.inactiveBg)
})
