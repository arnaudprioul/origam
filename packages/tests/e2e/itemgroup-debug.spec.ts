import { test } from '@playwright/test'

const STORY_PATH = '/story/components-stories-itemgroup-origamitem-story-vue'

test.setTimeout(180_000)

test('DEBUG itemgroup — multiple/tiles take 1/4 of available width', async ({ page }) => {
    await page.goto(STORY_PATH)
    await page.waitForLoadState('networkidle')

    // Pick the "Multiple — tiles (checkbox)" variant
    await page.getByText('Prop — multiple (checkbox-style tiles)', { exact: true }).last().click({ timeout: 10_000 })
    await page.waitForTimeout(1500)

    const sandbox = page.frameLocator('iframe[src*="__sandbox"]')

    // Find the grid container (the inline-styled grid wrapper around origam-item)
    const tiles = await sandbox.locator('.demo-tile').all()
     
    console.log(`tiles count: ${tiles.length}`)

    if (tiles.length === 0) {
         
        console.log('NO TILES FOUND — variant did not load')
        return
    }

    const measurements = await sandbox.locator('.demo-tile').evaluateAll((els) => {
        return els.map((el) => {
            const rect = el.getBoundingClientRect()
            const parent = el.parentElement!  // origam-item div
            const parentRect = parent.getBoundingClientRect()
            const grandparent = parent.parentElement!  // grid div
            const gpRect = grandparent.getBoundingClientRect()
            return {
                tileW: Math.round(rect.width),
                tileH: Math.round(rect.height),
                parentW: Math.round(parentRect.width),
                gridW: Math.round(gpRect.width),
                pctOfGrid: ((rect.width / gpRect.width) * 100).toFixed(1) + '%',
            }
        })
    })

     
    console.log(JSON.stringify(measurements, null, 2))

    await sandbox.locator('.demo-tile').first().screenshot({ path: '/tmp/tile-first.png' })
    // Capture the whole group
    const groupHandle = sandbox.locator('[data-cy="item-tiles"]')
    if (await groupHandle.count() > 0) {
        await groupHandle.screenshot({ path: '/tmp/tiles-group.png' })
    }
})
