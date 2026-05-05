import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/stories-components-stories-select-origamselect-story-vue'

test.describe('OrigamSelect', () => {
    test('Items string list — renders select with label', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Items — string list', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="select-string"]')).toBeVisible({ timeout: 5000 })
        await expect(sandbox.locator('[data-cy="select-string"] input').first()).toBeVisible({ timeout: 3000 })
    })

    test('Items object list — renders with item-title/value mapping', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Items — object list', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="select-object"]')).toBeVisible({ timeout: 5000 })
    })

    test('Multiple — multiple selection field renders', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Multiple', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="select-multiple"]')).toBeVisible({ timeout: 5000 })
    })

    test('Chips — chips mode renders', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Chips', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="select-chips"]')).toBeVisible({ timeout: 5000 })
    })

    test('Autocomplete — filter input renders', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Autocomplete', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="select-autocomplete"]')).toBeVisible({ timeout: 5000 })
    })

    test('States — disabled select renders', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('States', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="select-states"]')).toBeVisible({ timeout: 5000 })
    })

    // Note on click target: in non-autocomplete mode the inner `<input>`
    // has `pointer-events: none` (the wrapping `.origam-field__input` is
    // the click surface — that's how a `<select>`-like UX works without
    // letting the user type freely). Tests that click the input directly
    // hit a no-op. Click `.origam-field` (the activator parent) instead.
    test('Emit update:modelValue — selecting item updates status', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="select-emit-update"]')).toBeVisible({ timeout: 5000 })

        // Click the field wrapper to open the menu (input has pointer-events:none).
        await sandbox.locator('[data-cy="select-emit-update"] .origam-field').first().click()
        await page.waitForTimeout(500)

        // Click first item in the dropdown
        const menuItem = sandbox.locator('.origam-list-item').first()
        await expect(menuItem).toBeVisible({ timeout: 2000 })
        await menuItem.click()
        const status = sandbox.locator('[data-cy="select-emit-status"]')
        await expect(status).not.toContainText('value = null', { timeout: 3000 })
    })

    test('Emit update:menu — opening dropdown fires event', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — update:menu', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="select-emit-menu"]')).toBeVisible({ timeout: 5000 })
        await sandbox.locator('[data-cy="select-emit-menu"] .origam-field').first().click()
        // Menu opens → list visible
        await expect(sandbox.locator('.origam-list').first()).toBeVisible({ timeout: 2000 })
    })

    test('No data — no data text visible when items is empty', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('No data', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="select-no-data"]')).toBeVisible({ timeout: 5000 })
        // Open dropdown via the field wrapper.
        await sandbox.locator('[data-cy="select-no-data"] .origam-field').first().click()
        await page.waitForTimeout(400)
        // No data text should appear in the list
        const list = sandbox.locator('.origam-list').first()
        await expect(list).toBeVisible({ timeout: 2000 })
        await expect(list).toContainText('Nothing found', { timeout: 2000 })
    })

    test('Playground — renders and allows selection', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Playground', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="select-playground"]')).toBeVisible({ timeout: 5000 })
        await expect(sandbox.locator('[data-cy="select-playground-status"]')).toContainText('value =', { timeout: 3000 })
    })

    // ─────────────────────────────────────────────────────────────────────
    // Dropdown surface contract
    // ─────────────────────────────────────────────────────────────────────
    // (1) The visible menu surface (`.origam-menu__content`) must span at
    //     least the width of the activator — selects feel broken when the
    //     dropdown is narrower than the field that opened it.
    // (2) The reveal animation must be the `OrigamExpandY` transition
    //     (Material-style "drop down"), not the default scale-from-corner.
    test.describe('dropdown surface', () => {
        test('menu width matches activator width', async ({ page }) => {
            await page.goto(STORY_PATH)
            await page.waitForLoadState('networkidle')
            await page.getByText('Items — string list', { exact: true }).first().click()
            await page.waitForTimeout(800)

            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const select = sandbox.locator('[data-cy="select-string"]')
            await expect(select).toBeVisible({ timeout: 5000 })

            await select.locator('.origam-field').first().click()
            await expect(sandbox.locator('.origam-list').first()).toBeVisible({ timeout: 2000 })

            const activatorBox = await select.locator('.origam-field').first().boundingBox()
            const menuContentBox = await sandbox.locator('.origam-menu__content').first().boundingBox()
            const listItemBox = await sandbox.locator('.origam-list-item').first().boundingBox()

            expect(activatorBox).not.toBeNull()
            expect(menuContentBox).not.toBeNull()
            expect(listItemBox).not.toBeNull()

            // Visible surface ≥ activator width (the contract)
            expect(menuContentBox!.width).toBeGreaterThanOrEqual(activatorBox!.width - 1)
            // List-items also fill the surface — no narrow column inside a wide menu
            expect(listItemBox!.width).toBeGreaterThanOrEqual(activatorBox!.width - 1)
        })

        // The dropdown must touch the activator's bottom edge (no gap) and
        // align with the activator's left edge. Tested in a constrained
        // wrapper because the Histoire iframe artificially makes the
        // activator span the full viewport — that triggers the location
        // strategy's `viewportMargin` (12px) edge guard, which would mask
        // the offset:0 fix on the Select itself.
        test('dropdown is flush with activator (no top/left gap)', async ({ page }) => {
            await page.goto(STORY_PATH)
            await page.waitForLoadState('networkidle')
            await page.getByText('Items — string list', { exact: true }).first().click()
            await page.waitForTimeout(800)

            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const select = sandbox.locator('[data-cy="select-string"]')
            await expect(select).toBeVisible({ timeout: 5000 })

            // Constrain the activator so it doesn't fill the iframe — mimics
            // a real layout where the Select sits inside a column, a card,
            // a form-row, etc.
            await select.evaluate(el => {
                const parent = el.parentElement
                if (parent) {
                    parent.style.maxWidth = '320px'
                    parent.style.marginLeft = '40px'
                    parent.style.marginTop = '40px'
                }
            })
            await page.waitForTimeout(200)

            await select.locator('.origam-field').first().click()
            await expect(sandbox.locator('.origam-list').first()).toBeVisible({ timeout: 2000 })

            const activatorBox = await select.locator('.origam-field').first().boundingBox()
            const overlayBox = await sandbox.locator('.origam-overlay__content').first().boundingBox()
            expect(activatorBox).not.toBeNull()
            expect(overlayBox).not.toBeNull()

            // Top: dropdown's top edge sits exactly on the activator's bottom edge
            const topGap = overlayBox!.y - (activatorBox!.y + activatorBox!.height)
            expect(Math.round(topGap)).toBe(0)

            // Left: dropdown's left edge aligns with the activator's left edge
            const leftGap = overlayBox!.x - activatorBox!.x
            expect(Math.round(leftGap)).toBe(0)
        })

        test('open animation uses OrigamExpandY transition', async ({ page }) => {
            await page.goto(STORY_PATH)
            await page.waitForLoadState('networkidle')
            await page.getByText('Items — string list', { exact: true }).first().click()
            await page.waitForTimeout(800)

            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const select = sandbox.locator('[data-cy="select-string"]')
            await expect(select).toBeVisible({ timeout: 5000 })

            // Click then read the transition classes mid-animation. The
            // expand-y transition adds `origam-transition--expand-y-*` on
            // the transitioning element while it animates.
            await select.locator('.origam-field').first().click()
            await page.waitForTimeout(50)

            const classes = await sandbox.locator('.origam-overlay__content').first()
                .evaluate(el => Array.from(el.classList))
            const expandY = classes.filter(c => c.includes('expand-y'))
            const translateScale = classes.filter(c => c.includes('translate-scale'))
            // Must be expand-y, not the default scale
            expect(expandY.length).toBeGreaterThan(0)
            expect(translateScale).toEqual([])
        })
    })
})
