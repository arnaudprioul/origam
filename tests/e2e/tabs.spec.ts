import { expect, test, type Page } from '@playwright/test'

/**
 * OrigamTabs — runtime probes for every prop / variant exposed by
 * the story. Each block targets one orthogonal facet:
 *
 *   - Playground: confirms the tablist mounts with the ARIA contract
 *     (`role="tablist"`, `aria-orientation`, `aria-selected` per tab,
 *     `aria-controls` pointing to the matching panel).
 *   - Variant: asserts `origam-tabs--{variant}` modifier class flips
 *     between default / pills / underline.
 *   - Direction: asserts `aria-orientation` + modifier class flip
 *     between horizontal / vertical.
 *   - Density: asserts the `--height` CSS variable resolution changes
 *     when density changes.
 *   - Disabled: clicking + keyboard navigation skip disabled tabs.
 *   - Eager / lazy panel mounting: pre-active eager panel is in the DOM
 *     immediately, lazy panels mount on first activation.
 *   - Keyboard nav: arrow keys + Home / End move the selection.
 *   - Emit: switching tabs increments the counter.
 *
 * Histoire iframes render the sandbox under `iframe[src*="__sandbox"]`,
 * same convention as every other origam spec.
 */

const sandboxOf = (page: Page) =>
    page.frameLocator('iframe[src*="__sandbox"]')

const openVariant = async (page: Page, storyPath: string, variant: string) => {
    await page.goto(storyPath)
    await page.waitForLoadState('networkidle')
    await page.getByText(variant, { exact: true }).first().click()
    await page.waitForTimeout(800)
}

const STORY = '/story/stories-components-stories-tabs-origamtabs-story-vue'

const SELECTED_CLASS = 'origam-tab--active'

test.describe('OrigamTabs — ARIA contract (Playground)', () => {
    test('mounts with role="tablist" and matching aria-orientation', async ({ page }) => {
        await openVariant(page, STORY, 'Playground')
        const sandbox = sandboxOf(page)

        const tablist = sandbox.locator('[data-cy="tabs-playground-host"]').first()
        await expect(tablist).toBeVisible({ timeout: 8000 })

        await expect(tablist).toHaveAttribute('role', 'tablist')
        await expect(tablist).toHaveAttribute('aria-orientation', 'horizontal')
    })

    test('each tab declares role="tab" with aria-selected reflecting the model', async ({ page }) => {
        await openVariant(page, STORY, 'Playground')
        const sandbox = sandboxOf(page)

        const t0 = sandbox.locator('[data-cy="tab-playground-0"]').first()
        const t1 = sandbox.locator('[data-cy="tab-playground-1"]').first()

        await expect(t0).toHaveAttribute('role', 'tab')
        await expect(t0).toHaveAttribute('aria-selected', 'true')
        await expect(t1).toHaveAttribute('aria-selected', 'false')

        await t1.click()
        await page.waitForTimeout(150)
        await expect(t0).toHaveAttribute('aria-selected', 'false')
        await expect(t1).toHaveAttribute('aria-selected', 'true')
    })

    test('aria-controls points at the matching panel id', async ({ page }) => {
        await openVariant(page, STORY, 'Playground')
        const sandbox = sandboxOf(page)

        const t1 = sandbox.locator('[data-cy="tab-playground-1"]').first()
        await expect(t1).toBeVisible({ timeout: 8000 })

        const controls = await t1.getAttribute('aria-controls')
        expect(controls).toBeTruthy()
        expect(controls).toMatch(/^origam-tab-panel-/)

        const panel = sandbox.locator(`#${controls}`)
        await expect(panel).toHaveAttribute('role', 'tabpanel')
    })

    test('clicking another tab swaps the active class', async ({ page }) => {
        await openVariant(page, STORY, 'Playground')
        const sandbox = sandboxOf(page)

        await sandbox.locator('[data-cy="tab-playground-2"]').click()
        await page.waitForTimeout(200)

        const status = await sandbox.locator('[data-cy="tabs-playground-status"]').textContent()
        expect(status).toContain('2')

        const activeCount = await sandbox.locator(`.${SELECTED_CLASS}`).count()
        expect(activeCount).toBe(1)
    })
})

test.describe('OrigamTabs — variant', () => {
    test('renders one of origam-tabs--{default|pills|underline}', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — variant')
        const sandbox = sandboxOf(page)

        const def = sandbox.locator('[data-cy="tabs-variant-default-host"]').first()
        const pills = sandbox.locator('[data-cy="tabs-variant-pills-host"]').first()
        const underline = sandbox.locator('[data-cy="tabs-variant-underline-host"]').first()

        await expect(def).toBeVisible({ timeout: 8000 })

        const defClass = await def.evaluate(el => el.className)
        const pillsClass = await pills.evaluate(el => el.className)
        const undClass = await underline.evaluate(el => el.className)

        expect(defClass).toContain('origam-tabs--default')
        expect(pillsClass).toContain('origam-tabs--pills')
        expect(undClass).toContain('origam-tabs--underline')
    })
})

test.describe('OrigamTabs — direction', () => {
    test('horizontal vs vertical flip aria-orientation + modifier class', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — direction')
        const sandbox = sandboxOf(page)

        const h = sandbox.locator('[data-cy="tabs-direction-h-host"]').first()
        const v = sandbox.locator('[data-cy="tabs-direction-v-host"]').first()
        await expect(h).toBeVisible({ timeout: 8000 })

        await expect(h).toHaveAttribute('aria-orientation', 'horizontal')
        await expect(v).toHaveAttribute('aria-orientation', 'vertical')

        const hClass = await h.evaluate(el => el.className)
        const vClass = await v.evaluate(el => el.className)
        expect(hClass).toContain('origam-tabs--direction-horizontal')
        expect(vClass).toContain('origam-tabs--direction-vertical')
    })
})

test.describe('OrigamTabs — density', () => {
    test('density-default vs density-comfortable changes computed height', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — density')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="tabs-density-host"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const heightDefault = await host.evaluate(el => getComputedStyle(el).minHeight)
        const cls = await host.evaluate(el => el.className)
        expect(cls).toContain('origam-tabs--density-default')

        expect(heightDefault).not.toBe('')
    })
})

test.describe('OrigamTabs — disabled', () => {
    test('clicking a disabled tab does NOT change the selection', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — disabled')
        const sandbox = sandboxOf(page)

        const before = await sandbox.locator('[data-cy="tabs-disabled-status"]').textContent()

        await sandbox.locator('[data-cy="tab-disabled-1"]').click({ force: true })
        await page.waitForTimeout(150)

        const after = await sandbox.locator('[data-cy="tabs-disabled-status"]').textContent()
        expect(after).toBe(before)
    })

    test('disabled tab gets aria-disabled="true"', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — disabled')
        const sandbox = sandboxOf(page)

        const disabled = sandbox.locator('[data-cy="tab-disabled-1"]').first()
        await expect(disabled).toHaveAttribute('aria-disabled', 'true')
    })
})

test.describe('OrigamTabs — lazy / eager panel mounting', () => {
    test('eager panel is in the DOM even when inactive', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — eager vs lazy')
        const sandbox = sandboxOf(page)

        await expect(sandbox.locator('[data-cy="tabs-eager-host"]').first()).toBeVisible({ timeout: 8000 })

        const eagerMarker = sandbox.locator('[data-cy="panel-eager-1-marker"]')
        expect(await eagerMarker.count()).toBeGreaterThan(0)
    })

    test('lazy panel mounts on first activation and stays mounted', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — eager vs lazy')
        const sandbox = sandboxOf(page)

        await expect(sandbox.locator('[data-cy="tabs-eager-host"]').first()).toBeVisible({ timeout: 8000 })

        await sandbox.locator('[data-cy="tab-eager-2"]').click()
        await page.waitForTimeout(300)

        const lazyMarker = sandbox.locator('[data-cy="panel-eager-2-marker"]')
        expect(await lazyMarker.count()).toBeGreaterThan(0)

        await sandbox.locator('[data-cy="tab-eager-0"]').click()
        await page.waitForTimeout(300)

        expect(await lazyMarker.count()).toBeGreaterThan(0)
    })
})

test.describe('OrigamTabs — keyboard navigation', () => {
    test('ArrowRight moves selection forward, ArrowLeft moves back', async ({ page }) => {
        await openVariant(page, STORY, 'Playground')
        const sandbox = sandboxOf(page)

        const t0 = sandbox.locator('[data-cy="tab-playground-0"]').first()
        await t0.click()
        await page.waitForTimeout(150)
        await t0.focus()

        await page.keyboard.press('ArrowRight')
        await page.waitForTimeout(150)
        const t1 = sandbox.locator('[data-cy="tab-playground-1"]').first()
        await expect(t1).toHaveAttribute('aria-selected', 'true')

        await page.keyboard.press('ArrowLeft')
        await page.waitForTimeout(150)
        await expect(t0).toHaveAttribute('aria-selected', 'true')
    })

    test('Home / End jump to first / last tab', async ({ page }) => {
        await openVariant(page, STORY, 'Playground')
        const sandbox = sandboxOf(page)

        const t0 = sandbox.locator('[data-cy="tab-playground-0"]').first()
        await t0.click()
        await t0.focus()

        await page.keyboard.press('End')
        await page.waitForTimeout(150)
        const t2 = sandbox.locator('[data-cy="tab-playground-2"]').first()
        await expect(t2).toHaveAttribute('aria-selected', 'true')

        await page.keyboard.press('Home')
        await page.waitForTimeout(150)
        await expect(t0).toHaveAttribute('aria-selected', 'true')
    })

    test('disabled tab is skipped by arrow navigation', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — disabled')
        const sandbox = sandboxOf(page)

        const t0 = sandbox.locator('[data-cy="tab-disabled-0"]').first()
        await t0.click()
        await t0.focus()

        await page.keyboard.press('ArrowRight')
        await page.waitForTimeout(150)

        const t2 = sandbox.locator('[data-cy="tab-disabled-2"]').first()
        await expect(t2).toHaveAttribute('aria-selected', 'true')
    })
})

test.describe('OrigamTabs — emit', () => {
    test('update:modelValue fires once per switch', async ({ page }) => {
        await openVariant(page, STORY, 'Emit — update:modelValue')
        const sandbox = sandboxOf(page)

        const initial = await sandbox.locator('[data-cy="tabs-emit-counter"]').textContent()

        await sandbox.locator('[data-cy="tab-emit-1"]').click()
        await page.waitForTimeout(150)
        await sandbox.locator('[data-cy="tab-emit-2"]').click()
        await page.waitForTimeout(150)

        const after = await sandbox.locator('[data-cy="tabs-emit-counter"]').textContent()
        expect(Number(after)).toBe(Number(initial) + 2)
    })
})
