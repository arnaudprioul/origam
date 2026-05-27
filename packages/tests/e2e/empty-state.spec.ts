import { expect, test, type Page } from '@playwright/test'

/**
 * OrigamEmptyState — runtime probes for each preset / prop / slot
 * exposed by the story. Each test exercises one orthogonal facet:
 *
 *   - Default: smoke-test that the component mounts and exposes
 *     the `role="status"` + `aria-live="polite"` contract.
 *   - Prop — preset: each preset paints the expected MDI class on
 *     the icon AND swaps the rendered intent modifier class.
 *   - Prop — size: each size paints a measurably different icon
 *     font-size, so silently-ignored size props can't slip in.
 *   - Slot — icon / actions / default: each slot resolves and the
 *     correct DOM is rendered.
 */

const sandboxOf = (page: Page) =>
    page.frameLocator('iframe[src*="__sandbox"]')

const openVariant = async (page: Page, storyPath: string, variant: string) => {
    await page.goto(storyPath)
    await page.waitForLoadState('networkidle')
    await page.getByText(variant, { exact: true }).first().click()
    await page.waitForTimeout(400)
}

const STORY = '/story/stories-components-stories-emptystate-origamemptystate-story-vue'

test.describe('OrigamEmptyState — Default (smoke + ARIA)', () => {
    test('mounts and exposes role=status + aria-live=polite on the root', async ({ page }) => {
        await openVariant(page, STORY, 'Default')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="empty-state-playground-host"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const role = await host.evaluate((el) => el.getAttribute('role'))
        const ariaLive = await host.evaluate((el) => el.getAttribute('aria-live'))
        expect(role).toBe('status')
        expect(ariaLive).toBe('polite')
    })

    test('renders the title and description from props', async ({ page }) => {
        await openVariant(page, STORY, 'Default')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="empty-state-playground-host"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const titleText = await host.locator('.origam-empty-state__title').textContent()
        const descText = await host.locator('.origam-empty-state__description').textContent()
        expect(titleText?.trim()).toBe('No items yet')
        expect(descText?.trim()).toBe('Create your first item to get started.')
    })

    test('icon container is marked aria-hidden', async ({ page }) => {
        await openVariant(page, STORY, 'Default')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="empty-state-playground-host"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const ariaHidden = await host.locator('.origam-empty-state__icon').first().evaluate((el) =>
            el.getAttribute('aria-hidden')
        )
        expect(ariaHidden).toBe('true')
    })
})

test.describe('OrigamEmptyState — Prop preset', () => {
    test('preset=no-data renders the database-off icon', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — preset')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="empty-state-preset-no-data"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const iconHtml = await host.locator('.origam-empty-state__icon').first().innerHTML()
        expect(iconHtml).toContain('mdi-database-off-outline')
    })

    test('preset=no-results renders the magnify-close icon', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — preset')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="empty-state-preset-no-results"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const iconHtml = await host.locator('.origam-empty-state__icon').first().innerHTML()
        expect(iconHtml).toContain('mdi-magnify-close')
    })

    test('preset=error renders the alert-circle icon and intent-danger modifier', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — preset')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="empty-state-preset-error"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const iconHtml = await host.locator('.origam-empty-state__icon').first().innerHTML()
        expect(iconHtml).toContain('mdi-alert-circle-outline')

        const classList = await host.evaluate((el) => el.className)
        expect(classList).toContain('origam-empty-state--intent-danger')
    })

    test('preset=offline renders the wifi-off icon and intent-warning modifier', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — preset')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="empty-state-preset-offline"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const iconHtml = await host.locator('.origam-empty-state__icon').first().innerHTML()
        expect(iconHtml).toContain('mdi-wifi-off')

        const classList = await host.evaluate((el) => el.className)
        expect(classList).toContain('origam-empty-state--intent-warning')
    })

    test('preset=locked renders the lock-outline icon and intent-secondary modifier', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — preset')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="empty-state-preset-locked"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const iconHtml = await host.locator('.origam-empty-state__icon').first().innerHTML()
        expect(iconHtml).toContain('mdi-lock-outline')

        const classList = await host.evaluate((el) => el.className)
        expect(classList).toContain('origam-empty-state--intent-secondary')
    })

    test('preset values produce pairwise-distinct icon colors', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — preset')
        const sandbox = sandboxOf(page)

        const readColor = async (selector: string): Promise<string> => {
            const host = sandbox.locator(selector).first()
            await expect(host).toBeVisible({ timeout: 8000 })
            return await host.locator('.origam-empty-state__icon').first().evaluate((el) =>
                getComputedStyle(el).color
            )
        }

        const noData = await readColor('[data-cy="empty-state-preset-no-data"]')
        const error = await readColor('[data-cy="empty-state-preset-error"]')
        const offline = await readColor('[data-cy="empty-state-preset-offline"]')
        const locked = await readColor('[data-cy="empty-state-preset-locked"]')

        // All four should be defined and the three intent-tinted ones
        // must differ from each other AND from the neutral default.
        expect(noData).not.toBe('')
        expect(error).not.toBe(noData)
        expect(offline).not.toBe(noData)
        expect(locked).not.toBe(noData)
        expect(error).not.toBe(offline)
        expect(error).not.toBe(locked)
        expect(offline).not.toBe(locked)
    })
})

test.describe('OrigamEmptyState — Prop size', () => {
    test('each size renders a measurably different icon font-size', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — size')
        const sandbox = sandboxOf(page)

        const readIconSize = async (selector: string): Promise<number> => {
            const host = sandbox.locator(selector).first()
            await expect(host).toBeVisible({ timeout: 8000 })
            return await host.locator('.origam-empty-state__icon').first().evaluate((el) =>
                parseFloat(getComputedStyle(el).fontSize)
            )
        }

        const sm = await readIconSize('[data-cy="empty-state-size-sm"]')
        const md = await readIconSize('[data-cy="empty-state-size-md"]')
        const lg = await readIconSize('[data-cy="empty-state-size-lg"]')

        expect(sm).toBeGreaterThan(0)
        expect(md).toBeGreaterThan(sm)
        expect(lg).toBeGreaterThan(md)
    })

    test('each size renders the correct modifier class', async ({ page }) => {
        await openVariant(page, STORY, 'Prop — size')
        const sandbox = sandboxOf(page)

        const readClass = async (selector: string): Promise<string> => {
            const host = sandbox.locator(selector).first()
            await expect(host).toBeVisible({ timeout: 8000 })
            return await host.evaluate((el) => el.className)
        }

        const sm = await readClass('[data-cy="empty-state-size-sm"]')
        const md = await readClass('[data-cy="empty-state-size-md"]')
        const lg = await readClass('[data-cy="empty-state-size-lg"]')

        expect(sm).toContain('origam-empty-state--size-sm')
        expect(md).toContain('origam-empty-state--size-md')
        expect(lg).toContain('origam-empty-state--size-lg')
    })
})

test.describe('OrigamEmptyState — Slot icon', () => {
    test('custom SVG slot replaces the default icon', async ({ page }) => {
        await openVariant(page, STORY, 'Slot — icon (custom illustration)')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="empty-state-icon-slot-host"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const svg = sandbox.locator('[data-cy="empty-state-icon-slot-svg"]').first()
        await expect(svg).toBeVisible({ timeout: 8000 })

        // The built-in OrigamIcon glyph should NOT be present.
        const iconCount = await host.locator('.origam-empty-state__icon-glyph').count()
        expect(iconCount).toBe(0)
    })
})

test.describe('OrigamEmptyState — Slot actions', () => {
    test('1-action slot renders a single button', async ({ page }) => {
        await openVariant(page, STORY, 'Slot — actions (1 vs 2 buttons)')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="empty-state-actions-one"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const cta = sandbox.locator('[data-cy="empty-state-actions-one-create"]').first()
        await expect(cta).toBeVisible({ timeout: 8000 })

        const text = await cta.textContent()
        expect(text?.trim()).toBe('Create project')
    })

    test('2-action slot renders both buttons inside the actions container', async ({ page }) => {
        await openVariant(page, STORY, 'Slot — actions (1 vs 2 buttons)')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="empty-state-actions-two"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const create = sandbox.locator('[data-cy="empty-state-actions-two-create"]').first()
        const importBtn = sandbox.locator('[data-cy="empty-state-actions-two-import"]').first()
        await expect(create).toBeVisible({ timeout: 8000 })
        await expect(importBtn).toBeVisible({ timeout: 8000 })

        const actionsHtml = await host.locator('.origam-empty-state__actions').innerHTML()
        expect(actionsHtml).toContain('empty-state-actions-two-create')
        expect(actionsHtml).toContain('empty-state-actions-two-import')
    })
})

test.describe('OrigamEmptyState — Slot default', () => {
    test('default slot replaces the entire built-in layout', async ({ page }) => {
        await openVariant(page, STORY, 'Slot — default (fully custom)')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="empty-state-default-slot-host"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const custom = sandbox.locator('[data-cy="empty-state-default-slot-custom"]').first()
        await expect(custom).toBeVisible({ timeout: 8000 })

        // The built-in icon / title / description blocks should NOT render.
        const builtInBlocks = await host.locator('.origam-empty-state__icon').count()
        const builtInTitle = await host.locator('.origam-empty-state__title').count()
        const builtInDesc = await host.locator('.origam-empty-state__description').count()
        expect(builtInBlocks).toBe(0)
        expect(builtInTitle).toBe(0)
        expect(builtInDesc).toBe(0)

        // Root still carries the ARIA contract.
        const role = await host.evaluate((el) => el.getAttribute('role'))
        const ariaLive = await host.evaluate((el) => el.getAttribute('aria-live'))
        expect(role).toBe('status')
        expect(ariaLive).toBe('polite')
    })
})
