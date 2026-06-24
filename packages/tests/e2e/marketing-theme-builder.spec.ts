/**
 * Theme Builder (/theming) — A1 export DS-compatible, A2 persistance
 * localStorage, A3 import / seed preset, A4+A5 dual-mode edit + preview.
 *
 * Chaque test exerce le comportement runtime réel via le bloc de code généré
 * (OrigamCode) et le state restauré après reload — pas de simple type-check.
 *
 * Prérequis : serveur marketing :3000 (reuseExistingServer dans la config).
 * Run : cd packages/tests && node_modules/.bin/playwright test \
 *         --config=playwright.marketing.config.ts marketing-theme-builder
 */

import { expect, test, type Page } from '@playwright/test'

const STORAGE_KEY = 'origam_theme_builder_state'

/** Lit le texte du bloc de code généré (OrigamCode rend un <pre><code>). */
async function generatedCode (page: Page): Promise<string> {
    const block = page.locator('[data-cy="theming-generated-code"]')
    await expect(block).toBeVisible()
    return (await block.innerText()).trim()
}

/**
 * Évalue le tableau `[...]` du module généré et renvoie le tableau IOrigamTheme[].
 * Compatible avec `export const X: IOrigamTheme[] = [...]`.
 */
function parseExportedArray (code: string): Record<string, unknown>[] {
    const start = code.indexOf('[')
    const end = code.lastIndexOf(']')
    if (start === -1 || end === -1 || end <= start) {
        const errMsg = code.slice(0, 120)
        throw new Error(`No array literal found in generated code: ${errMsg}`)
    }
    const literal = code.slice(start, end + 1)

    return new Function(`"use strict"; return (${literal});`)() as Record<string, unknown>[]
}

test.describe('Theme Builder · A1 export DS-compatible (dual-mode)', () => {
    test('le code généré est un IOrigamTheme[] avec une entrée light et une entrée dark', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        await page.locator('[data-cy="theming-name"] input').fill('aurora')
        await page.locator('[data-cy="theming-label"] input').fill('Aurora')

        const firstColor = page.locator('.theming__token-color').first()
        await firstColor.evaluate((el) => {
            const input = el as HTMLInputElement
            input.value = '#112233'
            input.dispatchEvent(new Event('input', { bubbles: true }))
        })

        const code = await generatedCode(page)

        expect(code).toContain("import type { IOrigamTheme } from 'origam/interfaces'")
        expect(code).toMatch(/export const \w+: IOrigamTheme\[\] = \[/)

        expect(code).not.toContain('theme: {')
        expect(code).not.toMatch(/^\s*defaults:/m)

        const arr = parseExportedArray(code)
        expect(arr.length, 'should have 2 entries (light + dark)').toBe(2)

        const lightEntry = arr.find(e => e.mode === 'light')
        const darkEntry = arr.find(e => e.mode === 'dark')
        expect(lightEntry, 'light entry missing').toBeTruthy()
        expect(darkEntry, 'dark entry missing').toBeTruthy()

        expect(lightEntry!.cssVars, 'cssVars manquant dans l\'entrée light').toBeTruthy()
        const cssVars = lightEntry!.cssVars as Record<string, string>
        const someKey = Object.keys(cssVars).find(k => k.startsWith('--origam-'))
        expect(someKey, 'aucune var --origam-* dans cssVars light').toBeTruthy()
        expect(cssVars[someKey!]).toBe('#112233')
    })

    test('la pane dark ne contient pas les tokens édités en pane light', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        const firstColor = page.locator('.theming__token-color').first()
        await firstColor.evaluate((el) => {
            const input = el as HTMLInputElement
            input.value = '#aabbcc'
            input.dispatchEvent(new Event('input', { bubbles: true }))
        })
        await page.waitForTimeout(200)

        const code = await generatedCode(page)
        const arr = parseExportedArray(code)
        const darkEntry = arr.find(e => e.mode === 'dark')
        const darkVars = (darkEntry?.cssVars ?? {}) as Record<string, string>

        expect(Object.values(darkVars)).not.toContain('#aabbcc')
    })

    test('éditer une prop produit un bloc component keyé origam-{slug} dans les deux entrées', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        const propSelect = page.locator('[data-cy="theming-props"] .origam-select').first()
        if (await propSelect.count() === 0) test.skip()

        await propSelect.click()
        await page.waitForTimeout(300)
        const opt = page.locator('[role="option"]', { hasText: /^\s*success\s*$/i }).first()
        await opt.waitFor({ state: 'visible', timeout: 3000 })
        await opt.click()
        await page.waitForTimeout(200)

        const code = await generatedCode(page)
        const arr = parseExportedArray(code)

        for (const entry of arr) {
            expect(entry.component, `component manquant dans entrée ${entry.mode}`).toBeTruthy()
            const component = entry.component as Record<string, unknown>
            const keys = Object.keys(component)
            expect(keys.some(k => k.startsWith('origam-')), `clé component non keyée origam-* dans entrée ${entry.mode}`).toBe(true)
        }
    })
})

test.describe('Theme Builder · A2 persistance localStorage', () => {
    test('le state survit au reload (format dual-mode)', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        await page.locator('[data-cy="theming-name"] input').fill('persisted-theme')
        const firstColor = page.locator('.theming__token-color').first()
        await firstColor.evaluate((el) => {
            const input = el as HTMLInputElement
            input.value = '#abcdef'
            input.dispatchEvent(new Event('input', { bubbles: true }))
        })
        await page.waitForTimeout(300)

        const stored = await page.evaluate(k => window.localStorage.getItem(k), STORAGE_KEY)
        expect(stored, 'rien persisté dans localStorage').toBeTruthy()
        expect(stored!).toContain('persisted-theme')

        await page.reload({ waitUntil: 'networkidle' })

        const nameValue = await page.locator('[data-cy="theming-name"] input').inputValue()
        expect(nameValue).toBe('persisted-theme')

        const code = await generatedCode(page)
        const arr = parseExportedArray(code)
        const lightEntry = arr.find(e => e.mode === 'light')
        const cssVars = (lightEntry?.cssVars ?? {}) as Record<string, string>
        expect(Object.values(cssVars)).toContain('#abcdef')
    })

    test('reset vide le storage et restaure les valeurs par défaut', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        await page.locator('[data-cy="theming-name"] input').fill('to-be-reset')
        await page.waitForTimeout(300)
        await page.locator('[data-cy="theming-reset"]').click()
        await page.waitForTimeout(300)

        const stored = await page.evaluate(k => window.localStorage.getItem(k), STORAGE_KEY)
        if (stored) expect(stored).not.toContain('to-be-reset')
        const nameValue = await page.locator('[data-cy="theming-name"] input').inputValue()
        expect(nameValue).not.toBe('to-be-reset')
    })
})

test.describe('Theme Builder · A3 import / seed', () => {
    test('importer un JSON IOrigamTheme unique réhydrate le state en mode light', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')
        await page.evaluate(k => window.localStorage.removeItem(k), STORAGE_KEY)
        await page.reload({ waitUntil: 'networkidle' })

        const payload = JSON.stringify({
            name: 'imported',
            label: 'Imported theme',
            mode: 'dark',
            cssVars: { '--origam-btn---background-color': '#ff0080' }
        })

        await page.locator('[data-cy="theming-import-text"] textarea').fill(payload)
        await page.locator('[data-cy="theming-import-btn"]').click()
        await page.waitForTimeout(300)

        const nameValue = await page.locator('[data-cy="theming-name"] input').inputValue()
        expect(nameValue).toBe('imported')

        const code = await generatedCode(page)
        const arr = parseExportedArray(code)
        const darkEntry = arr.find(e => e.mode === 'dark')
        expect(darkEntry, 'dark entry should be present after import').toBeTruthy()
        const cssVars = (darkEntry?.cssVars ?? {}) as Record<string, string>
        expect(cssVars['--origam-btn---background-color']).toBe('#ff0080')
    })

    test('importer un tableau IOrigamTheme[] réhydrate les deux modes', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')
        await page.evaluate(k => window.localStorage.removeItem(k), STORAGE_KEY)
        await page.reload({ waitUntil: 'networkidle' })

        const payload = JSON.stringify([
            {
                name: 'dual-imported-light',
                label: 'Dual imported (light)',
                mode: 'light',
                cssVars: { '--origam-btn---background-color': '#001122' }
            },
            {
                name: 'dual-imported-dark',
                label: 'Dual imported (dark)',
                mode: 'dark',
                cssVars: { '--origam-btn---background-color': '#334455' }
            }
        ])

        await page.locator('[data-cy="theming-import-text"] textarea').fill(payload)
        await page.locator('[data-cy="theming-import-btn"]').click()
        await page.waitForTimeout(300)

        const code = await generatedCode(page)
        const arr = parseExportedArray(code)
        const lightEntry = arr.find(e => e.mode === 'light')
        const darkEntry = arr.find(e => e.mode === 'dark')
        const lightVars = (lightEntry?.cssVars ?? {}) as Record<string, string>
        const darkVars = (darkEntry?.cssVars ?? {}) as Record<string, string>
        expect(lightVars['--origam-btn---background-color']).toBe('#001122')
        expect(darkVars['--origam-btn---background-color']).toBe('#334455')
    })

    test('un import invalide affiche une erreur, sans crash', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        await page.locator('[data-cy="theming-import-text"] textarea').fill('this is not a theme {{{')
        await page.locator('[data-cy="theming-import-btn"]').click()
        await page.waitForTimeout(300)

        await expect(page.locator('[data-cy="theming-import-error"]')).toBeVisible()
        await expect(page.locator('[data-cy="page-theming"]')).toBeVisible()
    })

    test('seed depuis un preset DS injecte des tokens réels dans le bon mode', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')
        await page.evaluate(k => window.localStorage.removeItem(k), STORAGE_KEY)
        await page.reload({ waitUntil: 'networkidle' })

        const presetSelect = page.locator('[data-cy="theming-seed-preset"] .origam-select, [data-cy="theming-seed-preset"]').first()
        await presetSelect.click()
        await page.waitForTimeout(300)
        const darkOption = page.locator('[role="option"]', { hasText: /dark/i }).first()
        await darkOption.waitFor({ state: 'visible', timeout: 3000 })
        await darkOption.click()
        await page.waitForTimeout(400)

        const code = await generatedCode(page)
        const arr = parseExportedArray(code)
        const darkEntry = arr.find(e => e.mode === 'dark')
        const cssVars = (darkEntry?.cssVars ?? {}) as Record<string, string>
        expect(Object.keys(cssVars).length, 'seed n\'a injecté aucun token dans le mode dark').toBeGreaterThan(10)
    })
})

test.describe('Theme Builder · A4+A5 dual-mode edit + preview panes', () => {
    test('les deux panes preview light et dark sont présentes', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        await expect(page.locator('[data-cy="theming-preview-pane-light"]')).toBeVisible()
        await expect(page.locator('[data-cy="theming-preview-pane-dark"]')).toBeVisible()
    })

    test('les panes sont scoped par data-mode', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        const lightPane = page.locator('[data-cy="theming-preview-pane-light"]')
        const darkPane = page.locator('[data-cy="theming-preview-pane-dark"]')

        await expect(lightPane).toHaveAttribute('data-mode', 'light')
        await expect(darkPane).toHaveAttribute('data-mode', 'dark')
    })

    test('cliquer sur le chip de la pane dark passe en mode dark', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        await page.locator('[data-cy="theming-pane-chip-dark"]').click()
        await page.waitForTimeout(200)

        const darkPane = page.locator('[data-cy="theming-preview-pane-dark"]')
        await expect(darkPane).toHaveClass(/theming__preview-pane--active/)
    })

    test('un token édité en mode dark ne modifie pas la pane light', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        await page.locator('[data-cy="theming-pane-chip-dark"]').click()
        await page.waitForTimeout(200)

        const firstColor = page.locator('.theming__token-color').first()
        await firstColor.evaluate((el) => {
            const input = el as HTMLInputElement
            input.value = '#abcdef'
            input.dispatchEvent(new Event('input', { bubbles: true }))
        })
        await page.waitForTimeout(200)

        const code = await generatedCode(page)
        const arr = parseExportedArray(code)
        const lightEntry = arr.find(e => e.mode === 'light')
        const lightVars = (lightEntry?.cssVars ?? {}) as Record<string, string>
        expect(Object.values(lightVars)).not.toContain('#abcdef')

        const darkEntry = arr.find(e => e.mode === 'dark')
        const darkVars = (darkEntry?.cssVars ?? {}) as Record<string, string>
        expect(Object.values(darkVars)).toContain('#abcdef')
    })

    test('la pane active a le ring visuel (classe --active)', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        const lightPane = page.locator('[data-cy="theming-preview-pane-light"]')
        await expect(lightPane).toHaveClass(/theming__preview-pane--active/)

        const darkPane = page.locator('[data-cy="theming-preview-pane-dark"]')
        await expect(darkPane).not.toHaveClass(/theming__preview-pane--active/)
    })

    test('chaque pane contient un OrigamThemeProvider avec le bon data-mode', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        const lightThemeProvider = page.locator('[data-cy="theming-preview-pane-light"] .origam-theme-provider').first()
        const darkThemeProvider = page.locator('[data-cy="theming-preview-pane-dark"] .origam-theme-provider').first()

        await expect(lightThemeProvider).toHaveAttribute('data-mode', 'light')
        await expect(darkThemeProvider).toHaveAttribute('data-mode', 'dark')
    })
})
