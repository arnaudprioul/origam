/**
 * Theme Builder (/theming) — v2 (UI validée).
 *
 * Layout 3 colonnes sous le header marketing existant :
 *   - nav composants (gauche) groupés par catégorie, repliables + recherche
 *   - preview (centre) : barre avec toggle Light|Dark + Split + nom composant,
 *     code IOrigamTheme[] généré dessous
 *   - controls (droite) : onglets Props / CSS Tokens, props groupées par type
 *
 * Couvre : export IOrigamTheme[] dual-mode, persistance localStorage, import
 * (JSON unique + tableau), seed preset DS, toggle Light/Dark, Split (qui MASQUE
 * le toggle), édition token par mode, nav (catégories + recherche + sélection).
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

/** Évalue le tableau `[...]` du module généré → IOrigamTheme[]. */
function parseExportedArray (code: string): Record<string, unknown>[] {
    const start = code.indexOf('[')
    const end = code.lastIndexOf(']')
    if (start === -1 || end === -1 || end <= start) {
        throw new Error(`No array literal found in generated code: ${code.slice(0, 120)}`)
    }
    const literal = code.slice(start, end + 1)
    return new Function(`"use strict"; return (${literal});`)() as Record<string, unknown>[]
}

/** Édite le premier token couleur du panneau CSS Tokens (mode actif). */
async function editFirstTokenColor (page: Page, value: string): Promise<void> {
    await page.locator('[data-cy="theming-tab-tokens"]').click()
    const firstColor = page.locator('[data-cy^="theming-token-"] input[type="color"]').first()
    await firstColor.waitFor({ state: 'attached', timeout: 5000 })
    await firstColor.evaluate((el, v) => {
        const input = el as HTMLInputElement
        input.value = v
        input.dispatchEvent(new Event('input', { bubbles: true }))
    }, value)
    await page.waitForTimeout(200)
}

test.describe('Theme Builder · structure (UI validée)', () => {
    test('ouvre sur Btn avec preview live + 3 colonnes', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        await expect(page.locator('[data-cy="theming-topbar"]')).toBeVisible()
        await expect(page.locator('[data-cy="theming-nav"]')).toBeVisible()
        await expect(page.locator('[data-cy="theming-preview"]')).toBeVisible()
        await expect(page.locator('[data-cy="theming-controls-panel"]')).toBeVisible()

        await expect(page.locator('[data-cy="theming-nav-item-btn"]')).toHaveAttribute('aria-current', 'true')
        await expect(page.locator('[data-cy="theming-live-btn-light"]')).toBeVisible()
    })

    test('la nav liste les catégories canoniques avec compteurs', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        for (const cat of ['Layout & Structure', 'Navigation', 'Form & Input', 'Data Display']) {
            await expect(page.locator(`[data-cy="theming-nav-cat-toggle-${cat}"]`)).toBeVisible()
        }
    })

    test('la recherche filtre les composants', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        await page.locator('[data-cy="theming-nav-search"] input').fill('switch')
        await page.waitForTimeout(300)
        await expect(page.locator('[data-cy="theming-nav-item-switch"]')).toBeVisible()
        expect(await page.locator('[data-cy="theming-nav-item-btn"]').count()).toBe(0)
    })

    test('le panneau de contrôles a les onglets Props et CSS Tokens', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        await expect(page.locator('[data-cy="theming-tab-props"]')).toBeVisible()
        await expect(page.locator('[data-cy="theming-tab-tokens"]')).toBeVisible()
    })
})

test.describe('Theme Builder · export IOrigamTheme[] (dual-mode)', () => {
    test('le code généré est un IOrigamTheme[] light + dark', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        await page.locator('[data-cy="theming-name"] input').fill('aurora')
        await page.locator('[data-cy="theming-label"] input').fill('Aurora')
        await editFirstTokenColor(page, '#112233')

        const code = await generatedCode(page)
        expect(code).toContain("import type { IOrigamTheme } from 'origam/interfaces'")
        expect(code).toMatch(/export const \w+: IOrigamTheme\[\] = \[/)

        const arr = parseExportedArray(code)
        expect(arr.length, 'should have 2 entries (light + dark)').toBe(2)
        const lightEntry = arr.find(e => e.mode === 'light')
        const darkEntry = arr.find(e => e.mode === 'dark')
        expect(lightEntry).toBeTruthy()
        expect(darkEntry).toBeTruthy()

        const cssVars = (lightEntry!.cssVars ?? {}) as Record<string, string>
        const someKey = Object.keys(cssVars).find(k => k.startsWith('--origam-'))
        expect(someKey).toBeTruthy()
        expect(cssVars[someKey!]).toBe('#112233')
    })

    test('un token édité en light n\'apparaît pas dans l\'entrée dark', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        await editFirstTokenColor(page, '#aabbcc')

        const arr = parseExportedArray(await generatedCode(page))
        const darkVars = (arr.find(e => e.mode === 'dark')?.cssVars ?? {}) as Record<string, string>
        expect(Object.values(darkVars)).not.toContain('#aabbcc')
    })
})

test.describe('Theme Builder · persistance localStorage', () => {
    test('le state survit au reload', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        await page.locator('[data-cy="theming-name"] input').fill('persisted-theme')
        await editFirstTokenColor(page, '#abcdef')

        const stored = await page.evaluate(k => window.localStorage.getItem(k), STORAGE_KEY)
        expect(stored).toBeTruthy()
        expect(stored!).toContain('persisted-theme')

        await page.reload({ waitUntil: 'networkidle' })
        await expect(page.locator('[data-cy="theming-name"] input')).toHaveValue('persisted-theme')

        const arr = parseExportedArray(await generatedCode(page))
        const cssVars = (arr.find(e => e.mode === 'light')?.cssVars ?? {}) as Record<string, string>
        expect(Object.values(cssVars)).toContain('#abcdef')
    })

    test('reset global vide le storage', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        await page.locator('[data-cy="theming-name"] input').fill('to-be-reset')
        await page.waitForTimeout(200)
        await page.locator('[data-cy="theming-reset"]').click()
        await page.waitForTimeout(300)

        const stored = await page.evaluate(k => window.localStorage.getItem(k), STORAGE_KEY)
        if (stored) expect(stored).not.toContain('to-be-reset')
        await expect(page.locator('[data-cy="theming-name"] input')).not.toHaveValue('to-be-reset')
    })
})

test.describe('Theme Builder · import / seed', () => {
    test('importer un JSON IOrigamTheme unique (mode dark) réhydrate le state', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')
        await page.evaluate(k => window.localStorage.removeItem(k), STORAGE_KEY)
        await page.reload({ waitUntil: 'networkidle' })

        await page.locator('[data-cy="theming-import-toggle"]').click()
        const payload = JSON.stringify({
            name: 'imported',
            label: 'Imported theme',
            mode: 'dark',
            cssVars: { '--origam-btn---background-color': '#ff0080' }
        })
        await page.locator('[data-cy="theming-import-text"] textarea').fill(payload)
        await page.locator('[data-cy="theming-import-btn"]').click()
        await page.waitForTimeout(300)

        await expect(page.locator('[data-cy="theming-name"] input')).toHaveValue('imported')

        const arr = parseExportedArray(await generatedCode(page))
        const darkVars = (arr.find(e => e.mode === 'dark')?.cssVars ?? {}) as Record<string, string>
        expect(darkVars['--origam-btn---background-color']).toBe('#ff0080')
    })

    test('importer un tableau IOrigamTheme[] réhydrate les deux modes', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')
        await page.evaluate(k => window.localStorage.removeItem(k), STORAGE_KEY)
        await page.reload({ waitUntil: 'networkidle' })

        await page.locator('[data-cy="theming-import-toggle"]').click()
        const payload = JSON.stringify([
            { name: 'dual-light', label: 'Dual (light)', mode: 'light', cssVars: { '--origam-btn---background-color': '#001122' } },
            { name: 'dual-dark', label: 'Dual (dark)', mode: 'dark', cssVars: { '--origam-btn---background-color': '#334455' } }
        ])
        await page.locator('[data-cy="theming-import-text"] textarea').fill(payload)
        await page.locator('[data-cy="theming-import-btn"]').click()
        await page.waitForTimeout(300)

        const arr = parseExportedArray(await generatedCode(page))
        const lightVars = (arr.find(e => e.mode === 'light')?.cssVars ?? {}) as Record<string, string>
        const darkVars = (arr.find(e => e.mode === 'dark')?.cssVars ?? {}) as Record<string, string>
        expect(lightVars['--origam-btn---background-color']).toBe('#001122')
        expect(darkVars['--origam-btn---background-color']).toBe('#334455')
    })

    test('un import invalide affiche une erreur sans crash', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        await page.locator('[data-cy="theming-import-toggle"]').click()
        await page.locator('[data-cy="theming-import-text"] textarea').fill('this is not a theme {{{')
        await page.locator('[data-cy="theming-import-btn"]').click()
        await page.waitForTimeout(300)

        await expect(page.locator('[data-cy="theming-import-error"]')).toBeVisible()
        await expect(page.locator('[data-cy="page-theming"]')).toBeVisible()
    })

    test('seed depuis un preset DS injecte des tokens réels', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')
        await page.evaluate(k => window.localStorage.removeItem(k), STORAGE_KEY)
        await page.reload({ waitUntil: 'networkidle' })

        await page.locator('[data-cy="theming-preset"]').click()
        await page.waitForTimeout(300)
        const darkOption = page.locator('[role="option"]', { hasText: /dark/i }).first()
        await darkOption.waitFor({ state: 'visible', timeout: 3000 })
        await darkOption.click()
        await page.waitForTimeout(400)

        const arr = parseExportedArray(await generatedCode(page))
        const darkVars = (arr.find(e => e.mode === 'dark')?.cssVars ?? {}) as Record<string, string>
        expect(Object.keys(darkVars).length, 'seed n\'a injecté aucun token dans le mode dark').toBeGreaterThan(10)
    })
})

test.describe('Theme Builder · modes Light/Dark + Split', () => {
    test('le toggle Light|Dark est visible hors Split', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        await expect(page.locator('[data-cy="theming-mode-toggle"]')).toBeVisible()
    })

    test('Split MASQUE le toggle Light|Dark et affiche les deux panes', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        await page.locator('[data-cy="theming-split-btn"]').click()
        await page.waitForTimeout(300)

        expect(await page.locator('[data-cy="theming-mode-toggle"]').count()).toBe(0)
        await expect(page.locator('[data-cy="theming-preview-pane-light"]')).toBeVisible()
        await expect(page.locator('[data-cy="theming-preview-pane-dark"]')).toBeVisible()
    })

    test('désactiver Split réaffiche le toggle', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        const splitBtn = page.locator('[data-cy="theming-split-btn"]')
        await splitBtn.click()
        await page.waitForTimeout(200)
        await splitBtn.click()
        await page.waitForTimeout(200)

        await expect(page.locator('[data-cy="theming-mode-toggle"]')).toBeVisible()
    })

    test('chaque pane Split porte un OrigamThemeProvider scopé sur son mode', async ({ page }) => {
        await page.goto('/theming')
        await page.waitForLoadState('networkidle')

        await page.locator('[data-cy="theming-split-btn"]').click()
        await page.waitForTimeout(300)

        const lightProvider = page.locator('[data-cy="theming-preview-pane-light"] .tb-preview__provider')
        const darkProvider = page.locator('[data-cy="theming-preview-pane-dark"] .tb-preview__provider')
        await expect(lightProvider).toHaveAttribute('data-mode', 'light')
        await expect(darkProvider).toHaveAttribute('data-mode', 'dark')
    })
})
