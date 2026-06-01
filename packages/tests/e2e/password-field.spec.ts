import { expect, test } from '@playwright/test'

const STORY_PATH = '/story/components-stories-passwordfield-origampasswordfield-story-vue'

// Helper — switch to a Variant via its sidebar link. We use
// `getByRole('link', { name, exact })` (CLAUDE.md rule) instead of the
// brittle `getByText` selector that catches multiple matches when a
// Variant title also appears as a label string elsewhere on the page.
const goToVariant = async (page: import('@playwright/test').Page, name: string) => {
    await page.goto(STORY_PATH)
    await page.waitForLoadState('networkidle')
    await page.getByRole('link', { name, exact: true }).click()
    await page.waitForTimeout(800)
}

test.describe('OrigamPasswordField — 6 display modes (PDF-aligned)', () => {
    // ─── MODE 1 — Strength bar ───────────────────────────────────────────
    test('Strength bar — 4 segments mounted; typing strong password colours 3+ of them', async ({ page }) => {
        await goToVariant(page, 'Strength bar')

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const wrapper = sandbox.locator('[data-cy="password-field-strength-bar"]')
        await expect(wrapper).toBeVisible({ timeout: 5000 })

        // 4 segments must be mounted regardless of value (always rendered
        // when `strengthBar=true`, just with different colours).
        const segments = sandbox.locator('[data-cy="password-field-strength-bar"] ~ * .origam-password-field__strength-segment, [data-cy="password-field-strength-bar"] .origam-password-field__strength-segment')
        // The strength-segment is rendered inside the field's `#details`
        // slot, which is a sibling of the wrapper. Use the broader span
        // locator to target across both possible DOM ancestors.
        const allSegments = sandbox.locator('.origam-password-field__strength-segment').first()
        await expect(allSegments).toBeAttached({ timeout: 5000 })

        const segmentCount = await sandbox.locator('.origam-password-field__strength-segment').count()
        expect(segmentCount).toBe(4)

        // Type a password that should land at level=good (score=3):
        // length>=8 (+1), digit (+1), mixed-case (+1) = 3 → good.
        const input = wrapper.locator('input').first()
        await input.fill('Abc12345!')

        // After typing, the bar's `[data-strength-score]` should be >=3.
        const bar = sandbox.locator('.origam-password-field__strength').first()
        await expect(bar).toHaveAttribute('data-strength-score', /[34]/, { timeout: 3000 })

        // Count coloured segments (those WITH a level modifier, not --empty).
        const colouredCount = await sandbox.locator(
            '.origam-password-field__strength-segment--weak, .origam-password-field__strength-segment--fair, .origam-password-field__strength-segment--good, .origam-password-field__strength-segment--strong'
        ).count()
        expect(colouredCount).toBeGreaterThanOrEqual(3)
    })

    // ─── MODE 2 — Requirements (list) ────────────────────────────────────
    test('Requirements (list) — 4 rules mounted; typing 12345678 ticks min-length + number only', async ({ page }) => {
        await goToVariant(page, 'Requirements (list)')

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const wrapper = sandbox.locator('[data-cy="password-field-requirements-list"]')
        await expect(wrapper).toBeVisible({ timeout: 5000 })

        // 4 list items mounted, each with the data-requirement-id from
        // DEFAULT_PASSWORD_REQUIREMENTS.
        const items = sandbox.locator('.origam-password-field__requirements--list .origam-password-field__requirement')
        await expect(items).toHaveCount(4, { timeout: 3000 })

        // Type a password that satisfies only min-length + number.
        const input = wrapper.locator('input').first()
        await input.fill('12345678')

        // Expect 2 satisfied + 2 pending.
        await expect(sandbox.locator('.origam-password-field__requirement[data-requirement-id="min-length"]')).toHaveAttribute('data-satisfied', 'true', { timeout: 3000 })
        await expect(sandbox.locator('.origam-password-field__requirement[data-requirement-id="number"]')).toHaveAttribute('data-satisfied', 'true', { timeout: 3000 })
        await expect(sandbox.locator('.origam-password-field__requirement[data-requirement-id="uppercase"]')).toHaveAttribute('data-satisfied', 'false', { timeout: 3000 })
        await expect(sandbox.locator('.origam-password-field__requirement[data-requirement-id="special"]')).toHaveAttribute('data-satisfied', 'false', { timeout: 3000 })
    })

    // ─── MODE 3 — Requirements (tiles) ───────────────────────────────────
    test('Requirements (tiles) — chips mount instead of <li>', async ({ page }) => {
        await goToVariant(page, 'Requirements (tiles)')

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const wrapper = sandbox.locator('[data-cy="password-field-requirements-tiles"]')
        await expect(wrapper).toBeVisible({ timeout: 5000 })

        // Tiles container present, list container absent.
        await expect(sandbox.locator('.origam-password-field__requirements--tiles')).toBeVisible({ timeout: 3000 })
        await expect(sandbox.locator('.origam-password-field__requirements--list')).toHaveCount(0)

        // 4 chips mounted (one per default rule).
        const chips = sandbox.locator('.origam-password-field__requirement-chip')
        await expect(chips).toHaveCount(4, { timeout: 3000 })

        // Type a value that satisfies only "uppercase" → 1 chip flips
        // to satisfied.
        const input = wrapper.locator('input').first()
        await input.fill('Aa')
        await expect(sandbox.locator('.origam-password-field__requirement-chip[data-requirement-id="uppercase"]')).toHaveAttribute('data-satisfied', 'true', { timeout: 3000 })
    })

    // ─── MODE 4 — Partially filled ───────────────────────────────────────
    test('Partially filled — pre-seeded value renders some satisfied + some pending', async ({ page }) => {
        await goToVariant(page, 'Partially filled')

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const wrapper = sandbox.locator('[data-cy="password-field-partial"]')
        await expect(wrapper).toBeVisible({ timeout: 5000 })

        // Story seeds the model with "Abcd1" (length=5, mixed case, digit).
        // Expect:
        //   uppercase  → satisfied
        //   number     → satisfied
        //   min-length → pending (length=5)
        //   special    → pending
        const upperRow = sandbox.locator('.origam-password-field__requirement[data-requirement-id="uppercase"]').first()
        const numberRow = sandbox.locator('.origam-password-field__requirement[data-requirement-id="number"]').first()
        const minLenRow = sandbox.locator('.origam-password-field__requirement[data-requirement-id="min-length"]').first()
        const specialRow = sandbox.locator('.origam-password-field__requirement[data-requirement-id="special"]').first()

        await expect(upperRow).toHaveAttribute('data-satisfied', 'true', { timeout: 3000 })
        await expect(numberRow).toHaveAttribute('data-satisfied', 'true', { timeout: 3000 })
        await expect(minLenRow).toHaveAttribute('data-satisfied', 'false', { timeout: 3000 })
        await expect(specialRow).toHaveAttribute('data-satisfied', 'false', { timeout: 3000 })

        // Strength bar should show at least one (but fewer than 4) segment
        // coloured — the partial state.
        const colouredCount = await sandbox.locator(
            '.origam-password-field__strength-segment--weak, .origam-password-field__strength-segment--fair, .origam-password-field__strength-segment--good, .origam-password-field__strength-segment--strong'
        ).count()
        expect(colouredCount).toBeGreaterThan(0)
        expect(colouredCount).toBeLessThan(4)
    })

    // ─── MODE 5 — Minimal ────────────────────────────────────────────────
    test('Minimal — no strength bar, no requirements, no toggle eye', async ({ page }) => {
        await goToVariant(page, 'Minimal')

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const wrapper = sandbox.locator('[data-cy="password-field-minimal"]')
        await expect(wrapper).toBeVisible({ timeout: 5000 })

        // Strength-bar segments must NOT be in the DOM at all.
        const segmentCount = await sandbox.locator('[data-cy="password-field-minimal"] ~ * .origam-password-field__strength-segment, [data-cy="password-field-minimal"] .origam-password-field__strength-segment').count()
        // Use a more direct scoped count: the panel only contains this
        // Variant, so a count across the sandbox is also valid.
        const totalSegments = await sandbox.locator('.origam-password-field__strength-segment').count()
        expect(totalSegments).toBe(0)

        // Requirements checklist must NOT exist.
        const reqs = await sandbox.locator('.origam-password-field__requirements').count()
        expect(reqs).toBe(0)

        // Toggle eye must NOT exist.
        const toggles = await sandbox.locator('.origam-password-field__toggle-icon').count()
        expect(toggles).toBe(0)

        // The input itself must still be functional — fill + status reflect.
        const input = wrapper.locator('input').first()
        await input.fill('whatever')
        await expect(sandbox.locator('[data-cy="password-field-minimal-status"]')).toContainText('(set)', { timeout: 3000 })
    })

    // ─── MODE 6 — Combined ───────────────────────────────────────────────
    test('Combined — both strength bar AND requirements list mounted', async ({ page }) => {
        await goToVariant(page, 'Combined (bar + list)')

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const wrapper = sandbox.locator('[data-cy="password-field-combined"]')
        await expect(wrapper).toBeVisible({ timeout: 5000 })

        // Both surfaces present.
        await expect(sandbox.locator('.origam-password-field__strength').first()).toBeVisible({ timeout: 3000 })
        await expect(sandbox.locator('.origam-password-field__requirements--list').first()).toBeVisible({ timeout: 3000 })

        // 4 segments + 4 rules.
        await expect(sandbox.locator('.origam-password-field__strength-segment')).toHaveCount(4)
        await expect(sandbox.locator('.origam-password-field__requirements--list .origam-password-field__requirement')).toHaveCount(4)

        // Typing a strong password flips everything to satisfied.
        const input = wrapper.locator('input').first()
        await input.fill('Abcdef123!@#')
        await expect(sandbox.locator('.origam-password-field__requirement[data-requirement-id="min-length"]')).toHaveAttribute('data-satisfied', 'true', { timeout: 3000 })
        await expect(sandbox.locator('.origam-password-field__requirement[data-requirement-id="uppercase"]')).toHaveAttribute('data-satisfied', 'true', { timeout: 3000 })
        await expect(sandbox.locator('.origam-password-field__requirement[data-requirement-id="number"]')).toHaveAttribute('data-satisfied', 'true', { timeout: 3000 })
        await expect(sandbox.locator('.origam-password-field__requirement[data-requirement-id="special"]')).toHaveAttribute('data-satisfied', 'true', { timeout: 3000 })

        // Strength bar should be at level=strong with all 4 coloured.
        const bar = sandbox.locator('.origam-password-field__strength').first()
        await expect(bar).toHaveAttribute('data-strength-level', 'strong', { timeout: 3000 })
    })
})

// ─── Legacy regression tests (kept from previous spec) ──────────────────
test.describe('OrigamPasswordField — legacy variants', () => {
    test('Show/hide icons — toggle button visible', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Prop — onIcon & offIcon', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="passwordfield-icons"]')).toBeVisible({ timeout: 5000 })
        await expect(sandbox.locator('.origam-field__append-inner').first()).toBeVisible({ timeout: 3000 })
    })

    test('Show/hide — initial input type is password', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Prop — onIcon & offIcon', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const input = sandbox.locator('input[type="password"]').first()
        await expect(input).toBeVisible({ timeout: 5000 })
    })

    test('Strength requirements — popup variant still mounts', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Prop — requirements', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="passwordfield-requirements"]')).toBeVisible({ timeout: 5000 })
    })

    test('States — disabled password field visible', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Prop — disabled, readonly & error', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="passwordfield-states"]')).toBeVisible({ timeout: 5000 })
    })

    test('Emit update:modelValue — typing updates status', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Emit — update:modelValue', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        const input = sandbox.locator('[data-cy="passwordfield-emit-update"] input').first()
        await expect(input).toBeVisible({ timeout: 5000 })

        await input.fill('secret123')
        const status = sandbox.locator('[data-cy="passwordfield-emit-status"]')
        await expect(status).toContainText('(set)', { timeout: 3000 })
    })

    test('Playground — renders without errors', async ({ page }) => {
        await page.goto(STORY_PATH)
        await page.waitForLoadState('networkidle')
        await page.getByText('Default', { exact: true }).first().click()
        await page.waitForTimeout(800)

        const sandbox = page.frameLocator('iframe[src*="__sandbox"]')
        await expect(sandbox.locator('[data-cy="passwordfield-playground"]')).toBeVisible({ timeout: 5000 })
    })
})
