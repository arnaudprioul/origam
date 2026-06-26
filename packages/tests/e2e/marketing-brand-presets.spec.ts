/**
 * Brand presets — Theme Builder (/theming).
 *
 * Vérifie que les 8 thèmes de marque (cartoon, apple, geek, glass, editorial,
 * material, ecom, sobre) + origam sont listés dans le select de presets (un
 * preset par thème, pas par mode) et qu'un seed injecte réellement des tokens
 * dans les DEUX modes (light + dark) du state du builder.
 *
 * Prérequis : serveur marketing opérationnel (port 3996 ou MARKETING_BASE_URL).
 * Run : MARKETING_BASE_URL=http://localhost:3996 npx playwright test \
 *         --config=playwright.marketing.config.ts marketing-brand-presets
 */

import { expect, test } from '@playwright/test'

const STORAGE_KEY = 'origam_theme_builder_state'

/** Parse l'array IOrigamTheme[] du bloc de code généré. */
function parseExportedArray (code: string): Record<string, unknown>[] {
    const start = code.indexOf('[')
    const end = code.lastIndexOf(']')
    if (start === -1 || end === -1 || end <= start) return []
    return new Function(`"use strict"; return (${code.slice(start, end + 1)});`)() as Record<string, unknown>[]
}

/** Les 9 labels attendus (un par thème, plus de -light/-dark). */
const EXPECTED_LABELS = [
    'Origam',
    'Cartoon',
    'Apple',
    'Geek',
    'Glass',
    'Editorial',
    'Material',
    'E-commerce',
    'Sobre',
]

/** Labels qui NE doivent PAS être présents (ancien format par mode). */
const UNEXPECTED_LABELS = [
    'Cartoon (light)', 'Cartoon (dark)',
    'Apple (light)',   'Apple (dark)',
    'Origam light',    'Origam dark',
]

test.describe('Brand presets — listing dans le select', () => {
    test('les 9 presets (un par thème) sont listés dans le select de seed', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        await page.evaluate(k => window.localStorage.removeItem(k), STORAGE_KEY)
        await page.reload({ waitUntil: 'networkidle' })

        const presetSelect = page.locator('[data-cy="theming-preset"]')
        await expect(presetSelect).toBeVisible()
        await presetSelect.click()
        await page.waitForTimeout(400)

        const options = await page.locator('[role="option"]').allInnerTexts()
        const trimmedOptions = options.map(o => o.trim())

        for (const label of EXPECTED_LABELS) {
            const found = trimmedOptions.some(o => o === label || o.startsWith(label))
            expect(found, `Preset "${label}" manquant dans le select`).toBe(true)
        }

        for (const label of UNEXPECTED_LABELS) {
            const found = trimmedOptions.some(o => o.includes(label))
            expect(found, `Preset "${label}" ne devrait plus être présent (ancien format par mode)`).toBe(false)
        }

        await page.keyboard.press('Escape')
    })
})

test.describe('Brand presets — seed de tokens (light + dark)', () => {
    test('cartoon seede des tokens dans light ET dark', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')
        await page.evaluate(k => window.localStorage.removeItem(k), STORAGE_KEY)
        await page.reload({ waitUntil: 'networkidle' })

        await page.locator('[data-cy="theming-preset"]').click()
        await page.waitForTimeout(400)

        const cartoonOption = page.locator('[role="option"]').filter({ hasText: 'Cartoon' }).first()
        await cartoonOption.waitFor({ state: 'visible', timeout: 3000 })
        await cartoonOption.click()
        await page.waitForTimeout(400)

        const codeBlock = page.locator('[data-cy="theming-generated-code"]')
        await expect(codeBlock).toBeVisible()
        const code = await codeBlock.innerText()

        expect(code).toContain('--origam-')

        const arr = parseExportedArray(code)
        const lightEntry = arr.find(e => e.mode === 'light')
        const darkEntry = arr.find(e => e.mode === 'dark')

        expect(lightEntry, 'entrée light absente').toBeTruthy()
        expect(darkEntry, 'entrée dark absente').toBeTruthy()

        const lightVars = (lightEntry!.cssVars ?? {}) as Record<string, string>
        const darkVars = (darkEntry!.cssVars ?? {}) as Record<string, string>

        expect(Object.keys(lightVars).length, 'aucun token seeded en light').toBeGreaterThan(0)
        expect(Object.keys(darkVars).length, 'aucun token seeded en dark').toBeGreaterThan(0)

        const hasBorderTokenLight = Object.values(lightVars).some(v => v === '3px')
        expect(hasBorderTokenLight, 'token border 3px attendu dans cartoon light').toBe(true)

        const hasBorderTokenDark = Object.values(darkVars).some(v => v === '3px')
        expect(hasBorderTokenDark, 'token border 3px attendu dans cartoon dark').toBe(true)
    })

    test('editorial seede des tokens light + dark (border-radius: 0px)', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')
        await page.evaluate(k => window.localStorage.removeItem(k), STORAGE_KEY)
        await page.reload({ waitUntil: 'networkidle' })

        await page.locator('[data-cy="theming-preset"]').click()
        await page.waitForTimeout(400)

        const editorialOption = page.locator('[role="option"]').filter({ hasText: 'Editorial' }).first()
        await editorialOption.waitFor({ state: 'visible', timeout: 3000 })
        await editorialOption.click()
        await page.waitForTimeout(400)

        const codeBlock = page.locator('[data-cy="theming-generated-code"]')
        const code = await codeBlock.innerText()
        const arr = parseExportedArray(code)

        const lightEntry = arr.find(e => e.mode === 'light')
        const darkEntry = arr.find(e => e.mode === 'dark')
        const lightVars = (lightEntry?.cssVars ?? {}) as Record<string, string>
        const darkVars = (darkEntry?.cssVars ?? {}) as Record<string, string>

        expect(Object.keys(lightVars).length, 'editorial light: au moins 5 tokens attendus').toBeGreaterThanOrEqual(5)
        expect(Object.keys(darkVars).length, 'editorial dark: au moins 5 tokens attendus').toBeGreaterThanOrEqual(5)

        const hasZeroRadiusLight = Object.entries(lightVars).some(([k, v]) => k.includes('border-radius') && v === '0px')
        expect(hasZeroRadiusLight, 'editorial light doit avoir border-radius: 0px').toBe(true)
    })

    test('ecom seede des tokens light (couleurs chaudes) + dark', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')
        await page.evaluate(k => window.localStorage.removeItem(k), STORAGE_KEY)
        await page.goto('/theming', { waitUntil: 'networkidle', timeout: 60000 })

        await page.locator('[data-cy="theming-preset"]').click()
        await page.waitForTimeout(400)

        const ecomOption = page.locator('[role="option"]').filter({ hasText: 'E-commerce' }).first()
        await ecomOption.waitFor({ state: 'visible', timeout: 3000 })
        await ecomOption.click()
        await page.waitForTimeout(400)

        const codeBlock = page.locator('[data-cy="theming-generated-code"]')
        const code = await codeBlock.innerText()
        const arr = parseExportedArray(code)

        const lightEntry = arr.find(e => e.mode === 'light')
        const darkEntry = arr.find(e => e.mode === 'dark')
        const lightVars = (lightEntry?.cssVars ?? {}) as Record<string, string>
        const darkVars = (darkEntry?.cssVars ?? {}) as Record<string, string>

        expect(Object.keys(lightVars).length).toBeGreaterThan(0)
        expect(Object.keys(darkVars).length).toBeGreaterThan(0)

        const hasWarmColor = Object.values(lightVars).some(v => v.includes('#fed7aa') || v.includes('#fb923c'))
        expect(hasWarmColor, 'ecom-light doit avoir des couleurs chaudes orange').toBe(true)
    })
})
