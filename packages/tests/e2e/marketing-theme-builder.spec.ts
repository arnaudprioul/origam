/**
 * Theme Builder (/theming) — A1 export DS-compatible, A2 persistance
 * localStorage, A3 import / seed preset.
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

/** Évalue le `{ … }` du module généré et renvoie l'objet IOrigamTheme. */
function parseExportedObject (code: string): Record<string, unknown> {
    // Le `{` de l'objet exporté suit `export const X: IOrigamTheme = {` —
    // surtout PAS le `{` de l'import type au-dessus.
    const eq = code.indexOf('= {')
    const start = eq === -1 ? code.indexOf('{') : code.indexOf('{', eq)
    const end = code.lastIndexOf('}')
    const literal = code.slice(start, end + 1)
    // eslint-disable-next-line no-new-func
    return new Function(`"use strict"; return (${literal});`)() as Record<string, unknown>
}

test.describe('Theme Builder · A1 export DS-compatible', () => {
    test('le code généré est un IOrigamTheme (cssVars racine, component, pas de wrapper theme)', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        // Renseigne name + label + mode.
        await page.locator('[data-cy="theming-name"] input').fill('aurora')
        await page.locator('[data-cy="theming-label"] input').fill('Aurora')

        // Édite un token couleur (premier token color du composant actif = btn).
        const firstColor = page.locator('.theming__token-color').first()
        await firstColor.evaluate((el) => {
            const input = el as HTMLInputElement
            input.value = '#112233'
            input.dispatchEvent(new Event('input', { bubbles: true }))
        })

        const code = await generatedCode(page)

        // Forme : import IOrigamTheme + export const typé.
        expect(code).toContain("import type { IOrigamTheme } from 'origam/interfaces'")
        expect(code).toMatch(/export const \w+: IOrigamTheme = \{/)

        // PAS d'ancien wrapper `theme:` ni `defaults:` à la racine.
        expect(code).not.toContain('theme: {')
        expect(code).not.toMatch(/^\s*defaults:/m)

        const obj = parseExportedObject(code)
        expect(obj.name).toBe('aurora')
        expect(obj.label).toBe('Aurora')
        expect(obj.mode).toBeDefined()
        // cssVars à la RACINE, non vide.
        expect(obj.cssVars, 'cssVars manquant à la racine').toBeTruthy()
        const cssVars = obj.cssVars as Record<string, string>
        const someKey = Object.keys(cssVars).find(k => k.startsWith('--origam-'))
        expect(someKey, 'aucune var --origam-* dans cssVars').toBeTruthy()
        expect(cssVars[someKey!]).toBe('#112233')
    })

    test('éditer une prop produit un bloc component keyé origam-{slug}', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        // Le composant actif par défaut est btn ; change le 1er select de props.
        const propSelect = page.locator('[data-cy="theming-props"] .origam-select').first()
        // Si pas de select (selon ordre des controls), on tolère l'absence et skip.
        if (await propSelect.count() === 0) test.skip()

        await propSelect.click()
        await page.waitForTimeout(300)
        // Le 1er control de btn est `color` (défaut = primary). On choisit une
        // valeur NON-défaut pour que le diff stocke réellement la prop.
        const opt = page.locator('[role="option"]', { hasText: /^\s*success\s*$/i }).first()
        await opt.waitFor({ state: 'visible', timeout: 3000 })
        await opt.click()
        await page.waitForTimeout(200)

        const code = await generatedCode(page)
        const obj = parseExportedObject(code)
        expect(obj.component, 'component manquant après édition de prop').toBeTruthy()
        const component = obj.component as Record<string, unknown>
        const keys = Object.keys(component)
        expect(keys.some(k => k.startsWith('origam-')), 'clé component non keyée origam-*').toBe(true)
    })
})

test.describe('Theme Builder · A2 persistance localStorage', () => {
    test('le state survit au reload', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        await page.locator('[data-cy="theming-name"] input').fill('persisted-theme')
        // Édite un token pour créer un diff persisté.
        const firstColor = page.locator('.theming__token-color').first()
        await firstColor.evaluate((el) => {
            const input = el as HTMLInputElement
            input.value = '#abcdef'
            input.dispatchEvent(new Event('input', { bubbles: true }))
        })
        await page.waitForTimeout(300)

        // localStorage écrit.
        const stored = await page.evaluate(k => window.localStorage.getItem(k), STORAGE_KEY)
        expect(stored, 'rien persisté dans localStorage').toBeTruthy()
        expect(stored!).toContain('persisted-theme')

        await page.reload({ waitUntil: 'networkidle' })

        const nameValue = await page.locator('[data-cy="theming-name"] input').inputValue()
        expect(nameValue).toBe('persisted-theme')
        const code = await generatedCode(page)
        const obj = parseExportedObject(code)
        const cssVars = (obj.cssVars ?? {}) as Record<string, string>
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
        // Après reset le storage est soit absent, soit ré-écrit avec les défauts.
        if (stored) expect(stored).not.toContain('to-be-reset')
        const nameValue = await page.locator('[data-cy="theming-name"] input').inputValue()
        expect(nameValue).not.toBe('to-be-reset')
    })
})

test.describe('Theme Builder · A3 import / seed', () => {
    test('importer un JSON IOrigamTheme réhydrate le state', async ({ page }) => {
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
        const obj = parseExportedObject(code)
        expect(obj.name).toBe('imported')
        expect(obj.mode).toBe('dark')
        const cssVars = (obj.cssVars ?? {}) as Record<string, string>
        expect(cssVars['--origam-btn---background-color']).toBe('#ff0080')
    })

    test('un import invalide affiche une erreur, sans crash', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        await page.locator('[data-cy="theming-import-text"] textarea').fill('this is not a theme {{{')
        await page.locator('[data-cy="theming-import-btn"]').click()
        await page.waitForTimeout(300)

        await expect(page.locator('[data-cy="theming-import-error"]')).toBeVisible()
        // La page est toujours vivante.
        await expect(page.locator('[data-cy="page-theming"]')).toBeVisible()
    })

    test('seed depuis un preset DS injecte des tokens réels', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')
        await page.evaluate(k => window.localStorage.removeItem(k), STORAGE_KEY)
        await page.reload({ waitUntil: 'networkidle' })

        const presetSelect = page.locator('[data-cy="theming-seed-preset"] .origam-select, [data-cy="theming-seed-preset"]').first()
        await presetSelect.click()
        await page.waitForTimeout(300)
        // Choisit "Origam dark" pour un diff visible (mode dark + tokens).
        const darkOption = page.locator('[role="option"]', { hasText: /dark/i }).first()
        await darkOption.waitFor({ state: 'visible', timeout: 3000 })
        await darkOption.click()
        await page.waitForTimeout(400)

        const code = await generatedCode(page)
        const obj = parseExportedObject(code)
        expect(obj.mode).toBe('dark')
        const cssVars = (obj.cssVars ?? {}) as Record<string, string>
        expect(Object.keys(cssVars).length, 'seed n\'a injecté aucun token').toBeGreaterThan(10)
    })
})
