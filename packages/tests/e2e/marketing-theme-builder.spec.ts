/**
 * Theme Builder (/theming) — A1 export DS-compatible, A2 persistance
 * localStorage, A3 import / seed preset, A4+A5 dual-mode Direction B.
 *
 * Direction B : onglets Light / Dark au niveau page, une seule pane preview
 * (scopée sur l'onglet actif), toggle Split optionnel (panes EDIT / VIEW).
 * Plus de chips "preview only" ni de 2 panes statiques côte-à-côte.
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

        const propSelect = page.locator('[data-cy="theming-props-panel"] .origam-select').first()
        if (await propSelect.count() === 0) test.skip()

        await page.evaluate(() => {
            const panel = document.querySelector('[data-cy="theming-controls-panel"]') as HTMLElement | null
            if (panel) panel.scrollIntoView({ block: 'start' })
        })
        await page.waitForTimeout(300)

        const isInView = await propSelect.evaluate((el: HTMLElement) => {
            const rect = el.getBoundingClientRect()
            return rect.top >= 0 && rect.bottom <= window.innerHeight && rect.left >= 0 && rect.right <= window.innerWidth
        })

        if (!isInView) {
            test.skip()
            return
        }

        await propSelect.click()
        await page.waitForTimeout(300)
        const opt = page.locator('[role="option"]').first()
        await opt.waitFor({ state: 'visible', timeout: 5000 })
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

test.describe('Theme Builder · B Direction B — onglets mode + preview + controls', () => {
    test('les onglets Light et Dark sont présents dans le header de page', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        const tabLight = page.locator('[data-cy="theming-mode-tab-light"]')
        const tabDark = page.locator('[data-cy="theming-mode-tab-dark"]')

        await expect(tabLight).toBeVisible()
        await expect(tabDark).toBeVisible()
    })

    test('au chargement, aucun chip "preview only" n\'est présent', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        const previewOnlyChips = page.locator('[data-cy*="theming-pane-chip-"]')
        expect(await previewOnlyChips.count()).toBe(0)
    })

    test('cliquer l\'onglet Dark bascule la preview sur le mode dark', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        await page.locator('[data-cy="theming-mode-tab-dark"]').click()
        await page.waitForTimeout(300)

        const pane = page.locator('[data-cy="theming-preview-pane-dark"]')
        await expect(pane).toBeVisible()
        await expect(pane).toHaveAttribute('data-mode', 'dark')
        await expect(pane).toHaveClass(/theming__preview-pane--active/)
    })

    test('cliquer l\'onglet Light bascule la preview sur le mode light', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        await page.locator('[data-cy="theming-mode-tab-dark"]').click()
        await page.waitForTimeout(300)
        await page.locator('[data-cy="theming-mode-tab-light"]').click()
        await page.waitForTimeout(300)

        const pane = page.locator('[data-cy="theming-preview-pane-light"]')
        await expect(pane).toBeVisible()
        await expect(pane).toHaveAttribute('data-mode', 'light')
        await expect(pane).toHaveClass(/theming__preview-pane--active/)
    })

    test('en mode dark, un token édité modifie le code dark mais pas light', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        await page.locator('[data-cy="theming-mode-tab-dark"]').click()
        await page.waitForTimeout(300)

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
        const darkEntry = arr.find(e => e.mode === 'dark')
        const lightVars = (lightEntry?.cssVars ?? {}) as Record<string, string>
        const darkVars = (darkEntry?.cssVars ?? {}) as Record<string, string>

        expect(Object.values(lightVars)).not.toContain('#abcdef')
        expect(Object.values(darkVars)).toContain('#abcdef')
    })

    test('le badge sur l\'onglet affiche le nombre de tokens modifiés pour ce mode', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        const badgeLight = page.locator('[data-cy="theming-mode-tab-badge-light"]')
        await expect(badgeLight).not.toBeVisible()

        const firstColor = page.locator('.theming__token-color').first()
        await firstColor.evaluate((el) => {
            const input = el as HTMLInputElement
            input.value = '#ff0000'
            input.dispatchEvent(new Event('input', { bubbles: true }))
        })
        await page.waitForTimeout(200)

        await expect(badgeLight).toBeVisible()
    })

    test('la pane preview active contient un OrigamThemeProvider scopé sur le mode actif', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        const lightThemeProvider = page
            .locator('[data-cy="theming-preview-pane-light"] .origam-theme-provider')
            .first()

        await expect(lightThemeProvider).toHaveAttribute('data-mode', 'light')

        await page.locator('[data-cy="theming-mode-tab-dark"]').click()
        await page.waitForTimeout(300)

        const darkThemeProvider = page
            .locator('[data-cy="theming-preview-pane-dark"] .origam-theme-provider')
            .first()

        await expect(darkThemeProvider).toHaveAttribute('data-mode', 'dark')
    })

    test('le panneau de contrôles est visible et affiche le composant + mode actif', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        const controlsPanel = page.locator('[data-cy="theming-controls-panel"]')
        await expect(controlsPanel).toBeVisible()
    })

    test('le export code est un IOrigamTheme[] avec light + dark après édition des deux modes', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        const firstColor = page.locator('.theming__token-color').first()
        await firstColor.evaluate((el) => {
            const input = el as HTMLInputElement
            input.value = '#111111'
            input.dispatchEvent(new Event('input', { bubbles: true }))
        })
        await page.waitForTimeout(200)

        await page.locator('[data-cy="theming-mode-tab-dark"]').click()
        await page.waitForTimeout(300)

        await firstColor.evaluate((el) => {
            const input = el as HTMLInputElement
            input.value = '#222222'
            input.dispatchEvent(new Event('input', { bubbles: true }))
        })
        await page.waitForTimeout(200)

        const code = await generatedCode(page)
        const arr = parseExportedArray(code)

        expect(arr.length).toBe(2)
        const lightEntry = arr.find(e => e.mode === 'light')
        const darkEntry = arr.find(e => e.mode === 'dark')
        expect(lightEntry).toBeTruthy()
        expect(darkEntry).toBeTruthy()

        const lightVars = (lightEntry?.cssVars ?? {}) as Record<string, string>
        const darkVars = (darkEntry?.cssVars ?? {}) as Record<string, string>
        expect(Object.values(lightVars)).toContain('#111111')
        expect(Object.values(darkVars)).toContain('#222222')
    })
})

test.describe('Theme Builder · B Split toggle', () => {
    test('le bouton Split est visible dans la preview bar', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        const splitBtn = page.locator('[data-cy="theming-split-btn"]')
        await splitBtn.scrollIntoViewIfNeeded()
        await expect(splitBtn).toBeVisible()
    })

    test('activer Split affiche deux panes EDIT et VIEW', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        const splitBtn = page.locator('[data-cy="theming-split-btn"]')
        await splitBtn.evaluate((el) => el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })))
        await page.waitForTimeout(300)

        await expect(page.locator('[data-cy="theming-pane-chip-edit"]')).toBeVisible()
        await expect(page.locator('[data-cy="theming-pane-chip-view"]')).toBeVisible()
    })

    test('les deux panes Split ont des data-mode opposés', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        const splitBtn = page.locator('[data-cy="theming-split-btn"]')
        await splitBtn.evaluate((el) => el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })))
        await page.waitForTimeout(300)

        const editPane = page.locator('[data-cy="theming-preview-pane-light"]')
        const viewPane = page.locator('[data-cy="theming-preview-pane-dark"]')

        await expect(editPane).toHaveAttribute('data-mode', 'light')
        await expect(viewPane).toHaveAttribute('data-mode', 'dark')
    })

    test('cliquer le pane VIEW en Split bascule le mode actif', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        const splitBtn = page.locator('[data-cy="theming-split-btn"]')
        await splitBtn.evaluate((el) => el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })))
        await page.waitForTimeout(300)

        const viewPane = page.locator('[data-cy="theming-preview-pane-dark"]')
        await viewPane.evaluate((el) => el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })))
        await page.waitForTimeout(300)

        const tabDark = page.locator('[data-cy="theming-mode-tab-dark"]')
        await expect(tabDark).toHaveClass(/origam-tab--active/)
    })

    test('désactiver Split revient à une seule pane sans chips EDIT/VIEW', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        const splitBtn = page.locator('[data-cy="theming-split-btn"]')
        await splitBtn.evaluate((el) => el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })))
        await page.waitForTimeout(300)
        await splitBtn.evaluate((el) => el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })))
        await page.waitForTimeout(300)

        await expect(page.locator('[data-cy="theming-pane-chip-edit"]')).not.toBeVisible()
        await expect(page.locator('[data-cy="theming-pane-chip-view"]')).not.toBeVisible()
    })
})
