import { test, expect } from '@playwright/test'

const STORY_PATH = '/story/components-stories-pagination-origampagination-story-vue'

test.setTimeout(180_000)

test('DEBUG pagination — default mode active is neutral gray (not violet)', async ({ page }) => {
    await page.goto(STORY_PATH)
    await page.waitForLoadState('networkidle')
    // Activate the first available Variant so the sandbox iframe mounts.
    // We try a few common titles in order; the first match wins.
    const candidates = ['Default', 'Default', 'Basic', 'Sizes — small · default · large (stacked rows)']
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

     
    console.log('=== pagination active vs inactive ===')
     
    console.log(JSON.stringify(sample, null, 2))

    await sandbox.locator('.origam-pagination').first().screenshot({ path: '/tmp/pagination-active.png' })

    // Assert: active bg is NOT transparent (the bug we just fixed)
    expect(sample.active).not.toBeNull()
    expect(sample.active?.bg).not.toBe('rgba(0, 0, 0, 0)')
    // Assert active bg != inactive bg
    expect(sample.contrastPair.activeBg).not.toBe(sample.contrastPair.inactiveBg)
    // Assert active bg is derived from transparent + black 30 % = 30 % black overlay.
    // Chrome reports `color-mix(in srgb, …)` outputs in the new color() syntax,
    // both forms are equivalent.
    expect(sample.active?.bg).toMatch(/^(rgba\(0,\s*0,\s*0,\s*0\.3\)|color\(srgb\s+0\s+0\s+0\s*\/\s*0\.3\))$/)
})

test('DEBUG pagination — colored mode active stays primary fill', async ({ page }) => {
    await page.goto(STORY_PATH)
    await page.waitForLoadState('networkidle')
    // Try to land on a primary/colored variant if exposed; otherwise
    // any variant works — the test will look for a `--colored` modifier.
    const coloredCandidates = ['Primary', 'Colored', 'With color']
    for (const title of coloredCandidates) {
        const loc = page.getByText(title, { exact: true }).last()
        if (await loc.count().catch(() => 0)) {
            await loc.click({ timeout: 5_000 }).catch(() => {})
            break
        }
    }
    await page.waitForTimeout(2000)

    const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
    const colored = sandbox.locator('.origam-pagination.origam-pagination--colored').first()
    const exists = await colored.count().catch(() => 0)
    if (!exists) {
        // No colored variant available in the story — that's fine,
        // just log it so the user sees we tried.
         
        console.log('(no --colored variant exposed in story — skipping colored mode assertion)')
        return
    }
    const sample = await colored.evaluate((root) => {
        const active = root.querySelector('.origam-pagination__item--is-active .origam-btn') as HTMLElement | null
        if (!active) return null
        const cs = getComputedStyle(active)
        return { bg: cs.backgroundColor, color: cs.color }
    })
     
    console.log('=== colored mode active ===', JSON.stringify(sample))
    expect(sample?.bg).toBe('rgb(124, 58, 237)') // primary violet
})
