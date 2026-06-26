/**
 * Brand presets — Theme Builder (/theming).
 *
 * Vérifie que les 8 thèmes de marque (cartoon, apple, geek, glass, editorial,
 * material, ecom, sobre) × 2 modes sont listés dans le select de presets DS
 * et qu'un seed injecte réellement des tokens dans le state du builder.
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

/** Les 16 labels attendus (labelFallback). */
const EXPECTED_LABELS = [
    'Cartoon (light)', 'Cartoon (dark)',
    'Apple (light)',   'Apple (dark)',
    'Geek (light)',    'Geek (dark)',
    'Glass (light)',   'Glass (dark)',
    'Editorial (light)', 'Editorial (dark)',
    'Material (light)', 'Material (dark)',
    'E-commerce (light)', 'E-commerce (dark)',
    'Sobre (light)',   'Sobre (dark)',
]

test.describe('Brand presets — listing dans le select', () => {
    test('les 16 brand presets sont listés dans le select de seed', async ({ page }) => {
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
            const found = trimmedOptions.some(o => o.includes(label))
            expect(found, `Preset "${label}" manquant dans le select`).toBe(true)
        }

        // Fermer le select
        await page.keyboard.press('Escape')
    })
})

test.describe('Brand presets — seed de tokens', () => {
    test('cartoon-light seede des tokens dans le state', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')
        await page.evaluate(k => window.localStorage.removeItem(k), STORAGE_KEY)
        await page.reload({ waitUntil: 'networkidle' })

        await page.locator('[data-cy="theming-preset"]').click()
        await page.waitForTimeout(400)

        const cartoonOption = page.locator('[role="option"]').filter({ hasText: 'Cartoon (light)' })
        await cartoonOption.waitFor({ state: 'visible', timeout: 3000 })
        await cartoonOption.click()
        await page.waitForTimeout(400)

        const codeBlock = page.locator('[data-cy="theming-generated-code"]')
        await expect(codeBlock).toBeVisible()
        const code = await codeBlock.innerText()

        expect(code).toContain('--origam-')

        const arr = parseExportedArray(code)
        const lightEntry = arr.find(e => e.mode === 'light')
        expect(lightEntry, 'entrée light absente').toBeTruthy()
        const lightVars = (lightEntry!.cssVars ?? {}) as Record<string, string>
        expect(Object.keys(lightVars).length, 'aucun token seeded en light').toBeGreaterThan(0)

        // Cartoon caractéristique: 3px borders
        const hasBorderToken = Object.values(lightVars).some(v => v === '3px')
        expect(hasBorderToken, 'token border 3px attendu dans cartoon').toBe(true)
    })

    test('editorial-light seede des tokens (21 clés builder-exposées)', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')
        await page.evaluate(k => window.localStorage.removeItem(k), STORAGE_KEY)
        await page.reload({ waitUntil: 'networkidle' })

        await page.locator('[data-cy="theming-preset"]').click()
        await page.waitForTimeout(400)

        const editorialOption = page.locator('[role="option"]').filter({ hasText: 'Editorial (light)' })
        await editorialOption.waitFor({ state: 'visible', timeout: 3000 })
        await editorialOption.click()
        await page.waitForTimeout(400)

        const codeBlock = page.locator('[data-cy="theming-generated-code"]')
        const code = await codeBlock.innerText()
        const arr = parseExportedArray(code)
        const lightEntry = arr.find(e => e.mode === 'light')
        const lightVars = (lightEntry?.cssVars ?? {}) as Record<string, string>

        expect(Object.keys(lightVars).length, 'editorial-light: au moins 5 tokens attendus').toBeGreaterThanOrEqual(5)

        // Editorial caractéristique: border-radius 0px (flat style)
        const hasZeroRadius = Object.entries(lightVars).some(([k, v]) => k.includes('border-radius') && v === '0px')
        expect(hasZeroRadius, 'editorial doit avoir border-radius: 0px').toBe(true)
    })

    test('ecom-light seede des tokens avec des couleurs chaudes', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')
        await page.evaluate(k => window.localStorage.removeItem(k), STORAGE_KEY)
        await page.goto('/theming', { waitUntil: 'networkidle', timeout: 60000 })

        await page.locator('[data-cy="theming-preset"]').click()
        await page.waitForTimeout(400)

        const ecomOption = page.locator('[role="option"]').filter({ hasText: 'E-commerce (light)' })
        await ecomOption.waitFor({ state: 'visible', timeout: 3000 })
        await ecomOption.click()
        await page.waitForTimeout(400)

        const codeBlock = page.locator('[data-cy="theming-generated-code"]')
        const code = await codeBlock.innerText()
        const arr = parseExportedArray(code)
        const lightEntry = arr.find(e => e.mode === 'light')
        const lightVars = (lightEntry?.cssVars ?? {}) as Record<string, string>

        expect(Object.keys(lightVars).length).toBeGreaterThan(0)
        // Ecom: orange warmth → #fed7aa est une couleur de border
        const hasWarmColor = Object.values(lightVars).some(v => v.includes('#fed7aa') || v.includes('#fb923c'))
        expect(hasWarmColor, 'ecom-light doit avoir des couleurs chaudes orange').toBe(true)
    })
})
