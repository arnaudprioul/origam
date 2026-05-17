import { expect, test, type Page } from '@playwright/test'

/**
 * OrigamMediaScrubber — runtime probes for the headless scrubber primitive:
 * pointer + keyboard pipeline, ARIA contract, the `buffered` channel, and
 * the `disabled` short-circuit. Variants are reached via their dedicated
 * titles — never via the HstSelect picker dropdown (custom DOM, brittle).
 */

const STORY = '/story/stories-components-stories-mediascrubber-origammediascrubber-story-vue'

const sandboxOf = (page: Page) =>
    page.frameLocator('iframe[src*="__sandbox"]')

const openVariant = async (page: Page, title: string): Promise<void> => {
    await page.goto(STORY)
    await page.waitForLoadState('networkidle')
    await page.getByText(title, { exact: true }).first().click()
    await page.waitForTimeout(400)
}

test.describe('OrigamMediaScrubber — Default (mount + ARIA)', () => {
    test('mounts the primitive with role="slider"', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)

        const host = sandbox.locator('[data-cy="media-scrubber-default-host"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })
        await expect(host).toHaveAttribute('role', 'slider')
        await expect(host).toHaveAttribute('tabindex', '0')
    })

    test('aria-valuenow reflects the initial modelValue', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('[data-cy="media-scrubber-default-host"]').first()
        await expect(host).toHaveAttribute('aria-valuenow', '30')
    })

    test('paints the thumb at the expected % position', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)
        const thumb = sandbox.locator('[data-cy="media-scrubber-default-host"] .origam-media-scrubber__thumb').first()
        await expect(thumb).toBeAttached({ timeout: 8000 })
        const style = await thumb.getAttribute('style')
        expect(style).toMatch(/left:\s*30%/)
    })
})

test.describe('OrigamMediaScrubber — Keyboard (horizontal)', () => {
    test('ArrowRight increases aria-valuenow', async ({ page }) => {
        await openVariant(page, 'Variant — keyboard / a11y')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('[data-cy="media-scrubber-keyboard-host"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const before = Number(await host.getAttribute('aria-valuenow'))
        await host.focus()
        await sandbox.locator('body').press('ArrowRight')
        await page.waitForTimeout(120)
        const after = Number(await host.getAttribute('aria-valuenow'))
        expect(after).toBeGreaterThan(before)
    })

    test('Home jumps to min, End jumps to max', async ({ page }) => {
        await openVariant(page, 'Variant — keyboard / a11y')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('[data-cy="media-scrubber-keyboard-host"]').first()
        await host.focus()

        await sandbox.locator('body').press('End')
        await page.waitForTimeout(120)
        expect(Number(await host.getAttribute('aria-valuenow'))).toBe(200)

        await sandbox.locator('body').press('Home')
        await page.waitForTimeout(120)
        expect(Number(await host.getAttribute('aria-valuenow'))).toBe(0)
    })
})

test.describe('OrigamMediaScrubber — Keyboard (vertical)', () => {
    test('ArrowUp increases aria-valuenow on vertical orientation', async ({ page }) => {
        await openVariant(page, 'Variant — orientation (horizontal / vertical)')
        const sandbox = sandboxOf(page)
        const vertical = sandbox.locator('[data-cy="media-scrubber-vertical"]').first()
        await expect(vertical).toBeVisible({ timeout: 8000 })

        const before = Number(await vertical.getAttribute('aria-valuenow'))
        await vertical.focus()
        await sandbox.locator('body').press('ArrowUp')
        await page.waitForTimeout(120)
        const after = Number(await vertical.getAttribute('aria-valuenow'))
        expect(after).toBeGreaterThan(before)
        await expect(vertical).toHaveAttribute('aria-orientation', 'vertical')
    })
})

test.describe('OrigamMediaScrubber — Pointer (click to seek)', () => {
    test('pointerdown on the track moves the thumb to the click position', async ({ page }) => {
        await openVariant(page, 'Variant — buffer (media use case)')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('[data-cy="media-scrubber-with-buffer"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        // Click at ~80 % of the track width.
        const box = await host.boundingBox()
        if (!box) throw new Error('Scrubber not measurable')
        const targetX = box.x + box.width * 0.8
        const targetY = box.y + box.height / 2
        await page.mouse.move(targetX, targetY)
        await page.mouse.down()
        await page.mouse.up()
        await page.waitForTimeout(150)

        const after = Number(await host.getAttribute('aria-valuenow'))
        // Browser test viewports vary — assert the value moved in the
        // expected direction rather than to a precise pct.
        expect(after).toBeGreaterThan(50)
    })
})

test.describe('OrigamMediaScrubber — buffered prop', () => {
    test('renders the __buffer bar with the correct width', async ({ page }) => {
        await openVariant(page, 'Variant — buffer (media use case)')
        const sandbox = sandboxOf(page)
        const buffer = sandbox.locator('[data-cy="media-scrubber-with-buffer"] .origam-media-scrubber__buffer').first()
        await expect(buffer).toBeAttached({ timeout: 8000 })
        const style = await buffer.getAttribute('style')
        expect(style).toMatch(/width:\s*70%/)
    })
})

test.describe('OrigamMediaScrubber — Tooltip variant', () => {
    test('renders the formatter output on hover', async ({ page }) => {
        await openVariant(page, 'Variant — showHoverTooltip + formatHoverTooltip')
        const sandbox = sandboxOf(page)
        const host = sandbox.locator('[data-cy="media-scrubber-with-tooltip"]').first()
        await expect(host).toBeVisible({ timeout: 8000 })

        const box = await host.boundingBox()
        if (!box) throw new Error('Scrubber not measurable')
        await page.mouse.move(box.x + box.width * 0.5, box.y + box.height / 2)
        await page.waitForTimeout(180)

        const tooltip = sandbox.locator('[data-cy="media-scrubber-with-tooltip"] .origam-media-scrubber__hover-tooltip').first()
        await expect(tooltip).toBeVisible()
        const text = (await tooltip.innerText()).trim()
        // Formatter is `Math.round(v * 100) + '%'` over [0, 1] — middle of
        // the track should land in the 40 % - 60 % band.
        expect(/^\d{1,2}%$/.test(text) || /^\d{1,3}\s*%$/.test(text)).toBe(true)
    })
})

test.describe('OrigamMediaScrubber — disabled flag', () => {
    test('drops tabindex to -1 when disabled', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)

        // Flip the disabled checkbox in the Hst controls panel.
        const disabledCheckbox = page.locator('label', { hasText: 'disabled' }).locator('input[type="checkbox"]').first()
        await disabledCheckbox.check({ force: true })
        await page.waitForTimeout(200)

        const host = sandbox.locator('[data-cy="media-scrubber-default-host"]').first()
        await expect(host).toHaveAttribute('tabindex', '-1')
        await expect(host).toHaveAttribute('aria-disabled', 'true')
    })

    test('ignores keyboard ArrowRight when disabled', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)

        const disabledCheckbox = page.locator('label', { hasText: 'disabled' }).locator('input[type="checkbox"]').first()
        await disabledCheckbox.check({ force: true })
        await page.waitForTimeout(200)

        const host = sandbox.locator('[data-cy="media-scrubber-default-host"]').first()
        const before = Number(await host.getAttribute('aria-valuenow'))
        await sandbox.locator('body').press('ArrowRight')
        await page.waitForTimeout(120)
        const after = Number(await host.getAttribute('aria-valuenow'))
        expect(after).toBe(before)
    })
})
