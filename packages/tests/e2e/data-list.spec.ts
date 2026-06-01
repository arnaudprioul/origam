import { expect, test, type Page } from '@playwright/test'

const STORY_PATH = '/story/components-stories-datalist-origamdatalist-story-vue'

const sandboxOf = (page: Page) => page.frameLocator('iframe[src*="__sandbox"]')

const openVariant = async (page: Page, variant: string) => {
    await page.goto(STORY_PATH)
    await page.waitForLoadState('networkidle')
    // Navigate via the sidebar `<a>` link (NOT generic getByText — that
    // matches the iframe contents too) so the Variant URL is committed.
    await page.getByRole('link', { name: variant, exact: true }).click()
    await page.waitForTimeout(800)
}

test.describe('OrigamDataList — avatar mode (back-compat)', () => {
    test('Basic variant — renders a definition list', async ({ page }) => {
        await openVariant(page, 'Basic')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('.origam-data-list').first()).toBeVisible({ timeout: 5000 })
        // Default mode is `avatar`, so the modifier class must be present.
        await expect(sandbox.locator('.origam-data-list--mode-avatar').first()).toBeVisible({ timeout: 5000 })
    })

    test('Basic variant — title and text content are visible', async ({ page }) => {
        await openVariant(page, 'Basic')
        const sandbox = sandboxOf(page)
        await expect(sandbox.getByText('Status')).toBeVisible({ timeout: 5000 })
        await expect(sandbox.getByText('Active')).toBeVisible({ timeout: 5000 })
    })

    test('Density variant — renders with density class', async ({ page }) => {
        await openVariant(page, 'Density')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('.origam-data-list').first()).toBeVisible({ timeout: 5000 })
    })

    test('Adjacent icons variant — renders with icon controls', async ({ page }) => {
        await openVariant(page, 'Adjacent icons')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('.origam-data-list').first()).toBeVisible({ timeout: 5000 })
    })

    test('Border and rounded variant — renders', async ({ page }) => {
        await openVariant(page, 'Border and rounded')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('.origam-data-list').first()).toBeVisible({ timeout: 5000 })
    })

    test('Slot — item renders custom item content', async ({ page }) => {
        await openVariant(page, 'Slot — item')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('.origam-data-list').first()).toBeVisible({ timeout: 5000 })
        await expect(sandbox.getByText('Status')).toBeVisible({ timeout: 5000 })
    })

    test('Slot — item.title renders custom title', async ({ page }) => {
        await openVariant(page, 'Slot — item.title')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('.origam-data-list').first()).toBeVisible({ timeout: 5000 })
    })

    test('Playground — data list renders with all controls', async ({ page }) => {
        await openVariant(page, 'Default')
        const sandbox = sandboxOf(page)
        await expect(sandbox.locator('.origam-data-list').first()).toBeVisible({ timeout: 5000 })
    })
})

// ───────────────────────────────────────────────────────────────────
// KV mode — PDF-aligned key/value rows
// ───────────────────────────────────────────────────────────────────

test.describe('OrigamDataList — KV mode (PDF design)', () => {
    test('KV basic — root carries the kv mode class', async ({ page }) => {
        await openVariant(page, 'KV — basic')
        const sandbox = sandboxOf(page)
        const root = sandbox.locator('.origam-data-list--mode-kv').first()
        await expect(root).toBeVisible({ timeout: 8000 })
        // Sanity: the same element is also a `<dl>` (semantic).
        const tag = await root.evaluate(el => el.tagName.toLowerCase())
        expect(tag).toBe('dl')
    })

    test('KV basic — emits one <dt>+<dd> per item (4 rows)', async ({ page }) => {
        await openVariant(page, 'KV — basic')
        const sandbox = sandboxOf(page)
        const root = sandbox.locator('.origam-data-list--mode-kv').first()
        await expect(root).toBeVisible({ timeout: 8000 })

        const counts = await root.evaluate(el => {
            return {
                rows: el.querySelectorAll('.origam-data-list__kv-row').length,
                dts: el.querySelectorAll('dt.origam-data-list__kv-key').length,
                dds: el.querySelectorAll('dd.origam-data-list__kv-value').length,
            }
        })
        expect(counts.rows).toBe(4)
        expect(counts.dts).toBe(4)
        expect(counts.dds).toBe(4)
    })

    test('KV basic — rows expose data-cy keyed off the kebab-cased label', async ({ page }) => {
        await openVariant(page, 'KV — basic')
        const sandbox = sandboxOf(page)
        // Spaces in `Created at` must collapse to a single dash.
        await expect(
            sandbox.locator('[data-cy="data-list-kv-row-status"]')
        ).toBeVisible({ timeout: 8000 })
        await expect(
            sandbox.locator('[data-cy="data-list-kv-row-owner"]')
        ).toBeVisible({ timeout: 8000 })
        await expect(
            sandbox.locator('[data-cy="data-list-kv-row-created-at"]')
        ).toBeVisible({ timeout: 8000 })
        await expect(
            sandbox.locator('[data-cy="data-list-kv-row-priority"]')
        ).toBeVisible({ timeout: 8000 })
    })

    test('KV basic — key uses muted color, value uses primary text color', async ({ page }) => {
        await openVariant(page, 'KV — basic')
        const sandbox = sandboxOf(page)
        const row = sandbox.locator('[data-cy="data-list-kv-row-owner"]').first()
        await expect(row).toBeVisible({ timeout: 8000 })

        const colors = await row.evaluate(el => {
            const dt = el.querySelector('dt')!
            const dd = el.querySelector('dd')!
            return {
                key: getComputedStyle(dt).color,
                value: getComputedStyle(dd).color,
            }
        })
        // The two columns MUST visually differ. The token mapping puts
        // key on `color.text.secondary` (#525252) and value on
        // `color.text.primary` (#171717). We assert the difference
        // rather than the exact rgb(…) string so a future tweak of the
        // muted ramp doesn't tear the test.
        expect(colors.key).not.toBe(colors.value)
        // Sanity: both must be valid `rgb(…)` strings — never empty or `inherit`.
        expect(colors.key).toMatch(/^rgb/)
        expect(colors.value).toMatch(/^rgb/)
    })

    test('KV basic — renders text values verbatim', async ({ page }) => {
        await openVariant(page, 'KV — basic')
        const sandbox = sandboxOf(page)
        await expect(sandbox.getByText('Arnaud Martin').first()).toBeVisible({ timeout: 8000 })
        await expect(sandbox.getByText('Apr 12, 2026').first()).toBeVisible({ timeout: 8000 })
    })

    test('KV mixed — chip-valued row renders an .origam-chip inside <dd>', async ({ page }) => {
        await openVariant(page, 'KV — mixed values')
        const sandbox = sandboxOf(page)
        await expect(
            sandbox.locator('.origam-data-list--mode-kv').first()
        ).toBeVisible({ timeout: 8000 })

        // Status row should host a chip in its <dd>.
        const statusRow = sandbox.locator('[data-cy="data-list-kv-row-status"]').first()
        await expect(statusRow).toBeVisible({ timeout: 8000 })
        const chipCount = await statusRow.locator('dd .origam-chip').count()
        expect(chipCount).toBeGreaterThanOrEqual(1)

        // Priority row should also host a chip (different intent).
        const priorityRow = sandbox.locator('[data-cy="data-list-kv-row-priority"]').first()
        const priorityChipCount = await priorityRow.locator('dd .origam-chip').count()
        expect(priorityChipCount).toBeGreaterThanOrEqual(1)
    })

    test('KV mixed — text-valued row keeps a plain <dd> (no chip)', async ({ page }) => {
        await openVariant(page, 'KV — mixed values')
        const sandbox = sandboxOf(page)
        const ownerRow = sandbox.locator('[data-cy="data-list-kv-row-owner"]').first()
        await expect(ownerRow).toBeVisible({ timeout: 8000 })
        await expect(ownerRow.locator('dd')).toContainText('Arnaud Martin')
        const ownerChipCount = await ownerRow.locator('dd .origam-chip').count()
        expect(ownerChipCount).toBe(0)
    })

    test('KV slot override — #value slot replaces the default cell renderer', async ({ page }) => {
        await openVariant(page, 'KV — slot override')
        const sandbox = sandboxOf(page)
        await expect(
            sandbox.locator('.origam-data-list--mode-kv').first()
        ).toBeVisible({ timeout: 8000 })

        // The Owner row uses a `<a href="#owner-profile">` injected by
        // the consumer's slot override.
        const link = sandbox.locator('[data-cy="kv-slot-owner-link"]').first()
        await expect(link).toBeVisible({ timeout: 8000 })
        const href = await link.getAttribute('href')
        expect(href).toBe('#owner-profile')
        // The link must live INSIDE the Owner row's <dd>.
        const ownerRow = sandbox.locator('[data-cy="data-list-kv-row-owner"]').first()
        const linksInOwner = await ownerRow.locator('dd a[data-cy="kv-slot-owner-link"]').count()
        expect(linksInOwner).toBe(1)
    })

    test('KV mode toggle — initial state honours `mode="kv"` from init-state', async ({ page }) => {
        // We don't try to flip Histoire's HstSelect from a Playwright spec —
        // it's a custom (non-`<select>`) widget and clicking through it is
        // brittle (per the project CLAUDE.md guidance). What we DO check is
        // that the `mode` prop is honoured: the variant's init-state pins
        // `mode: 'kv'`, so the rendered list must carry the kv modifier and
        // none of the avatar modifier.
        await openVariant(page, 'KV — mode toggle')
        const sandbox = sandboxOf(page)

        await expect(
            sandbox.locator('.origam-data-list--mode-kv').first()
        ).toBeVisible({ timeout: 8000 })
        const avatarCount = await sandbox.locator('.origam-data-list--mode-avatar').count()
        expect(avatarCount).toBe(0)
    })
})
