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
        // align with the activator's left edge — even when the activator
        // spans the full viewport width. Tested with NO wrapper injection
        // (real condition in the Histoire sandbox where the Select fills
        // the iframe). This catches both:
        //   • the 8px top gap from the Menu's default `offset: 8` →
        //     overridden to `offset: 0`
        //   • the 12px left shift from the connected location strategy's
        //     defensive `viewportMargin: 12` → overridden to `0` so the
        //     dropdown is allowed to sit flush with the activator's edge.
        test('dropdown is flush with activator (no top/left gap)', async ({ page }) => {
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

        // List items inside the dropdown carry an `onClick` handler from
        // `menuListItemProps` but no explicit `link` prop. Pre-fix
        // `OrigamListItem.isClickable` short-circuited on `props.link`,
        // killing cursor:pointer / ripple / keyboard activation. Items
        // must read as clickable whenever they have any of: link mode,
        // href/to, an onClick listener, or a value inside a list.
        // Re-focusing a non-autocomplete Select that already has a
        // selection used to write the selected title into `search` (i.e.
        // the inner `<input value>`). Combined with the always-rendered
        // `.origam-select__selection` div that ALSO shows the title,
        // the field would visibly read "Germany Germany" after pick →
        // tab-out → tab-back. The watcher now only syncs search↔model
        // in autocomplete mode where the input is actually editable.
        // After picking an item in an autocomplete select, the input
        // value is left at the picked title (so the user can refine).
        // Pre-fix the `.origam-select__selection` chip kept `display:
        // flex; position: static; width: 66px` while only fading to
        // `opacity: 0` — it stayed in the flex row and pushed the
        // `<input>` 70px to the right. The visible "Germany" then
        // appeared mid-field instead of flush with the inline padding.
        test('autocomplete: input stays flush-left after picking', async ({ page }) => {
            await page.goto(STORY_PATH)
            await page.waitForLoadState('networkidle')
            await page.getByText('Autocomplete', { exact: true }).first().click()
            await page.waitForTimeout(800)

            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const select = sandbox.locator('[data-cy="select-autocomplete"]')
            await expect(select).toBeVisible({ timeout: 5000 })

            await select.locator('.origam-field').first().click()
            await sandbox.locator('.origam-list-item').nth(1).click() // Germany
            await page.waitForTimeout(400)

            // The hidden selection chip must NOT take layout space.
            const layout = await select.evaluate(el => {
                const sel = el.querySelector('.origam-select__selection') as HTMLElement
                const input = el.querySelector('input') as HTMLInputElement
                const cs = (e: HTMLElement) => getComputedStyle(e)
                return {
                    selectionPosition: cs(sel).position,
                    selectionOpacity: cs(sel).opacity,
                    inputLeft: input.getBoundingClientRect().left,
                    fieldLeft: (el.querySelector('.origam-field__input') as HTMLElement)
                        .getBoundingClientRect().left,
                }
            })
            // Faded out
            expect(parseFloat(layout.selectionOpacity)).toBe(0)
            // Removed from layout flow
            expect(layout.selectionPosition).toBe('absolute')
            // Input sits within the chip's normal inline padding band —
            // not 50+ px to the right of where the field starts. Pre-fix
            // the offset was ~70px (the invisible selection chip's flex
            // item width); now it's just the field's `padding-inline`
            // tokens (~16px on the default size).
            expect(layout.inputLeft - layout.fieldLeft).toBeLessThan(24)

            // Belt-and-suspenders: the input itself must NOT carry an
            // additional `padding-inline` that would stack on top of the
            // wrapper's padding. Pre-fix the autocomplete-single rule
            // was `padding-inline: inherit`, which copied the wrapper's
            // 16px onto the input → text started 48px from the field's
            // left (16 outer + 16 wrapper + 16 inherited).
            const inputPadding = await select.locator('input').first().evaluate(el => {
                const cs = getComputedStyle(el)
                return { left: cs.paddingLeft, right: cs.paddingRight }
            })
            expect(inputPadding.left).toBe('0px')
            expect(inputPadding.right).toBe('0px')
        })

        test('selection is not duplicated after re-focus', async ({ page }) => {
            await page.goto(STORY_PATH)
            await page.waitForLoadState('networkidle')
            await page.getByText('Items — string list', { exact: true }).first().click()
            await page.waitForTimeout(800)

            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const select = sandbox.locator('[data-cy="select-string"]')
            await expect(select).toBeVisible({ timeout: 5000 })

            // Pick Germany
            await select.locator('.origam-field').first().click()
            await sandbox.locator('.origam-list-item').nth(1).click()
            await page.waitForTimeout(400)

            // Tab out, tab back — re-fires the focus watcher
            await page.keyboard.press('Tab')
            await page.waitForTimeout(200)
            await page.keyboard.press('Shift+Tab')
            await page.waitForTimeout(400)

            // Inner input must stay empty — only the .origam-select__selection
            // div is allowed to render the selected title in non-autocomplete
            // mode.
            const inputValue = await select.locator('input').first()
                .evaluate(el => (el as HTMLInputElement).value)
            expect(inputValue).toBe('')

            // The selection div carries the title once
            const selectionText = await select.locator('.origam-select__selection').first()
                .evaluate(el => el.textContent?.trim())
            expect(selectionText).toBe('Germany')
        })

        // Dropdown items use the Material 3 / v-select 48px row instead
        // of the OrigamListItem default 56px (Material 2 sidebar list).
        // 56px reads as too sparse inside a dropdown — pre-fix five items
        // ate ~280px of vertical real-estate; the user reported it as a
        // spacing bug. Override scoped to `.origam-select__content` only,
        // so other lists (sidebar, nav, …) keep the 56px baseline.
        // Every text source the user sees inside / around the field —
        // floating label, typed input, picked text, selection chip, AND
        // dropdown item titles — must land at the same X coordinate.
        // Pre-fix: typed input landed at 16px (input was `position:
        // absolute; left: 0` ignoring the wrapper's 16px padding) while
        // picked text landed at 32px (input flipped to `position:
        // static` once a sibling selection chip existed) and dropdown
        // items also landed at 16px. Picking an item caused a visible
        // 16px horizontal jump, and the dropdown didn't align with the
        // field. Now everything pinned at 32px.
        // Click into an autocomplete-single field that already has a
        // selection → the input's text gets fully selected so the next
        // keystroke REPLACES it. Pre-fix the cursor landed at the end
        // and typing appended (`France` + `S` → `FranceS`, which then
        // matched nothing in the filter and looked broken).
        // Same contract as the tab-flow above, but exercised with a real
        // mouse click — the user's actual flow. Pre-fix the focus
        // watcher fired on the false→true transition and ran select()
        // through the `forwardRefs` proxy, but two things broke the
        // selection: (1) `forwardRefs` filters `$`-prefixed keys so
        // `origamTextFieldRef.value.$el` was undefined, and (2) the
        // microtask `nextTick` resolved BEFORE the click cycle's
        // cursor-placement + the TextField's `handleFocus` chain ran,
        // so any select() that did fire was clobbered immediately
        // after. The fix DOM-queries the input via `vm.proxy.$el` and
        // schedules through `setTimeout(0)` (macrotask) so it lands
        // AFTER all the click-cycle synchronous work.
        test('autocomplete-single: mouse re-click also selects-all', async ({ page }) => {
            await page.goto(STORY_PATH)
            await page.waitForLoadState('networkidle')
            await page.getByText('Autocomplete', { exact: true }).first().click()
            await page.waitForTimeout(800)

            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const select = sandbox.locator('[data-cy="select-autocomplete"]')
            await expect(select).toBeVisible({ timeout: 5000 })

            // Pick France, then close the menu via Escape so we can
            // re-click on the closed/already-focused field.
            await select.locator('.origam-field').first().click()
            await sandbox.locator('.origam-list-item').first().click()
            await page.waitForTimeout(400)

            // Click the field again — the user's exact gesture.
            await select.locator('.origam-field').first().click()
            await page.waitForTimeout(100) // setTimeout(0) latency

            const sel = await select.locator('input').first().evaluate(el => {
                const i = el as HTMLInputElement
                return { value: i.value, selStart: i.selectionStart, selEnd: i.selectionEnd }
            })
            expect(sel.value).toBe('France')
            expect(sel.selStart).toBe(0)
            expect(sel.selEnd).toBe(sel.value.length)

            // Typing replaces
            await page.keyboard.type('XX')
            await page.waitForTimeout(200)
            const final = await select.locator('input').first().evaluate(el => (el as HTMLInputElement).value)
            expect(final).toBe('XX')
        })

        test('autocomplete-single: re-focus selects-all so typing replaces', async ({ page }) => {
            await page.goto(STORY_PATH)
            await page.waitForLoadState('networkidle')
            await page.getByText('Autocomplete', { exact: true }).first().click()
            await page.waitForTimeout(800)

            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const select = sandbox.locator('[data-cy="select-autocomplete"]')
            await expect(select).toBeVisible({ timeout: 5000 })

            // Pick France
            await select.locator('.origam-field').first().click()
            await sandbox.locator('.origam-list-item').first().click()
            await page.waitForTimeout(400)

            // Re-focus via tab cycle (avoids the click-outside scrim)
            await page.keyboard.press('Tab')
            await page.waitForTimeout(200)
            await page.keyboard.press('Shift+Tab')
            await page.waitForTimeout(400)

            // The whole input value must be selected
            const sel = await select.locator('input').first().evaluate(el => {
                const i = el as HTMLInputElement
                return { value: i.value, selectionStart: i.selectionStart, selectionEnd: i.selectionEnd }
            })
            expect(sel.value).toBe('France')
            expect(sel.selectionStart).toBe(0)
            expect(sel.selectionEnd).toBe(sel.value.length)

            // Typing replaces — not appends
            await page.keyboard.type('Sp')
            await page.waitForTimeout(400)
            const finalValue = await select.locator('input').first()
                .evaluate(el => (el as HTMLInputElement).value)
            expect(finalValue).toBe('Sp')
        })

        test('text alignment is consistent across all field states', async ({ page }) => {
            await page.goto(STORY_PATH)
            await page.waitForLoadState('networkidle')
            await page.getByText('Autocomplete', { exact: true }).first().click()
            await page.waitForTimeout(800)

            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const select = sandbox.locator('[data-cy="select-autocomplete"]')
            await expect(select).toBeVisible({ timeout: 5000 })

            const labelLeft = await sandbox.locator('[data-cy="select-autocomplete"] .origam-field__label')
                .first().evaluate(el => el.getBoundingClientRect().left)

            await select.locator('.origam-field').first().click()
            await expect(sandbox.locator('.origam-list-item').first()).toBeVisible({ timeout: 2000 })
            const itemLeft = await sandbox.locator('.origam-list-item__title')
                .first().evaluate(el => el.getBoundingClientRect().left)

            await select.locator('input').first().focus()
            await page.keyboard.type('Fran')
            await page.waitForTimeout(400)
            const typedLeft = await select.locator('input').first()
                .evaluate(el => el.getBoundingClientRect().left)

            await sandbox.locator('.origam-list-item').first().click()
            await page.waitForTimeout(400)
            const pickedLeft = await select.locator('input').first()
                .evaluate(el => el.getBoundingClientRect().left)

            // All four positions must align — round to the nearest pixel
            // so sub-pixel rendering quirks don't fail the assertion.
            const positions = [labelLeft, itemLeft, typedLeft, pickedLeft].map(Math.round)
            console.log('text positions:', { label: positions[0], item: positions[1], typed: positions[2], picked: positions[3] })
            // Max-min spread must be 0 (or 1 for sub-pixel)
            expect(Math.max(...positions) - Math.min(...positions)).toBeLessThanOrEqual(1)
        })

        test('dropdown list items use the 48px menu height', async ({ page }) => {
            await page.goto(STORY_PATH)
            await page.waitForLoadState('networkidle')
            await page.getByText('Items — string list', { exact: true }).first().click()
            await page.waitForTimeout(800)

            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const select = sandbox.locator('[data-cy="select-string"]')
            await expect(select).toBeVisible({ timeout: 5000 })

            await select.locator('.origam-field').first().click()
            await expect(sandbox.locator('.origam-list-item').first()).toBeVisible({ timeout: 2000 })

            const itemHeight = await sandbox.locator('.origam-list-item').first()
                .evaluate(el => el.getBoundingClientRect().height)
            expect(itemHeight).toBe(48)
        })

        test('list items show cursor:pointer (clickable affordance)', async ({ page }) => {
            await page.goto(STORY_PATH)
            await page.waitForLoadState('networkidle')
            await page.getByText('Items — string list', { exact: true }).first().click()
            await page.waitForTimeout(800)

            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const select = sandbox.locator('[data-cy="select-string"]')
            await expect(select).toBeVisible({ timeout: 5000 })

            await select.locator('.origam-field').first().click()
            await expect(sandbox.locator('.origam-list-item').first()).toBeVisible({ timeout: 2000 })

            const cursor = await sandbox.locator('.origam-list-item').first()
                .evaluate(el => getComputedStyle(el).cursor)
            expect(cursor).toBe('pointer')

            const hasLinkClass = await sandbox.locator('.origam-list-item').first()
                .evaluate(el => el.classList.contains('origam-list-item--link'))
            expect(hasLinkClass).toBe(true)
        })

        // Hover state layer — Material-style overlay must transition from
        // 0 (resting) to a visible ~0.08 opacity on hover. Pre-fix the
        // SCSS rule applied 0.12 to BOTH resting AND hover states (a 3×3
        // selector cross with `&` matching everything), AND the overlay
        // was painted with `--origam-color__overlay---scrim` (`#ffffff` in
        // the light theme) — so a white overlay sat at 12% on a white
        // menu surface, producing zero perceptible change at any state.
        test('list items have a visible hover state layer', async ({ page }) => {
            await page.goto(STORY_PATH)
            await page.waitForLoadState('networkidle')
            await page.getByText('Items — string list', { exact: true }).first().click()
            await page.waitForTimeout(800)

            const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
            const select = sandbox.locator('[data-cy="select-string"]')
            await expect(select).toBeVisible({ timeout: 5000 })

            await select.locator('.origam-field').first().click()
            await expect(sandbox.locator('.origam-list-item').first()).toBeVisible({ timeout: 2000 })

            const firstItem = sandbox.locator('.origam-list-item').first()
            const secondItem = sandbox.locator('.origam-list-item').nth(1)

            // Resting overlay must be invisible
            const restingOpacity = await firstItem.locator('.origam-list-item__overlay').first()
                .evaluate(el => parseFloat(getComputedStyle(el).opacity))
            expect(restingOpacity).toBe(0)

            // Hover the second item — its overlay must reveal
            const box = await secondItem.boundingBox()
            expect(box).not.toBeNull()
            await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2)
            await page.waitForTimeout(300)

            const hoverOpacity = await secondItem.locator('.origam-list-item__overlay').first()
                .evaluate(el => parseFloat(getComputedStyle(el).opacity))
            expect(hoverOpacity).toBeGreaterThan(0.05)

            // The non-hovered item stays at rest
            const otherStillResting = await firstItem.locator('.origam-list-item__overlay').first()
                .evaluate(el => parseFloat(getComputedStyle(el).opacity))
            expect(otherStillResting).toBe(0)

            // Overlay color must contrast the surface — `currentColor`
            // from text means a dark overlay on a light menu (or vice-versa).
            const bg = await secondItem.locator('.origam-list-item__overlay').first()
                .evaluate(el => getComputedStyle(el).backgroundColor)
            // Forbid the "scrim white on white menu" miscolour
            expect(bg).not.toBe('rgb(255, 255, 255)')
        })

        test.describe('Loading shapes', () => {
            async function goToVariant(page: Parameters<Parameters<typeof test>[1]>[0]) {
                await page.goto(STORY_PATH)
                await page.waitForLoadState('networkidle')
                await page.getByText('Loading shapes', { exact: true }).first().click()
                await page.waitForTimeout(800)
            }

            test('loading=true → default kind renderer mounted', async ({ page }) => {
                await goToVariant(page)
                const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
                const field = sandbox.locator('[data-cy="select-loading-bool"]')
                await expect(field).toBeVisible({ timeout: 5000 })
                await expect(field.locator('.origam-field__loader')).toBeVisible({ timeout: 3000 })
                await expect(field.locator('.origam-field__progress--linear')).toBeVisible({ timeout: 3000 })
            })

            test('loading=42 → determinate progress at 42 %', async ({ page }) => {
                await goToVariant(page)
                const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
                const field = sandbox.locator('[data-cy="select-loading-number"]')
                await expect(field).toBeVisible({ timeout: 5000 })
                await expect(field.locator('.origam-field__loader')).toBeVisible({ timeout: 3000 })
                const progressBar = field.locator('[role="progressbar"]').first()
                await expect(progressBar).toBeVisible({ timeout: 3000 })
                const valueNow = await progressBar.getAttribute('aria-valuenow')
                expect(valueNow).toBe('42')
            })

            test('loading={ type: "line" } → linear progress mounted', async ({ page }) => {
                await goToVariant(page)
                const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
                const field = sandbox.locator('[data-cy="select-loading-line"]')
                await expect(field).toBeVisible({ timeout: 5000 })
                await expect(field.locator('.origam-field__progress--linear')).toBeVisible({ timeout: 3000 })
            })

            test('loading={ type: "circular" } → circular progress mounted', async ({ page }) => {
                await goToVariant(page)
                const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
                const field = sandbox.locator('[data-cy="select-loading-circular"]')
                await expect(field).toBeVisible({ timeout: 5000 })
                await expect(field.locator('.origam-field__loader')).toBeVisible({ timeout: 3000 })
                await expect(field.locator('[role="progressbar"]').first()).toBeVisible({ timeout: 3000 })
                await expect(field.locator('.origam-field__progress--linear')).not.toBeVisible()
            })

            test('loading={ type: "skeleton" } → origam-skeleton replaces content', async ({ page }) => {
                await goToVariant(page)
                const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
                const field = sandbox.locator('[data-cy="select-loading-skeleton"]')
                await expect(field).toBeVisible({ timeout: 5000 })
                await expect(field.locator('.origam-field__skeleton').first()).toBeVisible({ timeout: 3000 })
                // Input must be hidden when skeleton active
                await expect(field.locator('input')).not.toBeVisible()
            })
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
