import type { IOrigamTheme, ITokenTree, TTokenLeaf, TThemeVars } from '../../interfaces'

import { tokenPathToCssVar } from './token-name.util'

/**
 * `<style>` element id used for runtime theme injection. A single element is
 * reused per `data-style-id` so re-applying a theme replaces the block rather
 * than stacking duplicates.
 */
const STYLE_ELEMENT_PREFIX = 'origam-theme'

/** Normalise a CSS-var key to its `--origam-…` form (idempotent). */
function normaliseVarName (key: string): string {
    return key.startsWith('--') ? key : `--${key}`
}

/** A leaf value is the DTCG `$value` when present, else the raw scalar. */
function leafValue (leaf: TTokenLeaf): string | number {
    if (leaf !== null && typeof leaf === 'object' && '$value' in leaf) {
        return leaf.$value
    }
    return leaf
}

function isLeaf (node: TTokenLeaf | ITokenTree): node is TTokenLeaf {
    if (node === null) return true
    const t = typeof node
    if (t === 'string' || t === 'number') return true
    return t === 'object' && '$value' in (node as object)
}

/**
 * Walk a DTCG-shaped token tree depth-first, accumulating
 * `{ '--origam-…': value }` entries. Each leaf path is converted to a CSS
 * variable name through the shared `tokenPathToCssVar` util so the emitted
 * names match the published token sheets.
 */
export function tokenTreeToVars (tree: ITokenTree, component = false): TThemeVars {
    const out: TThemeVars = {}

    const walk = (node: ITokenTree, path: string[]): void => {
        for (const key of Object.keys(node)) {
            const child = node[key]
            const nextPath = [...path, key]
            if (isLeaf(child)) {
                out[tokenPathToCssVar(nextPath, component)] = leafValue(child)
            } else {
                walk(child, nextPath)
            }
        }
    }

    walk(tree, [])
    return out
}

/**
 * Resolve an `IOrigamTheme` to its flat CSS-var map. Merges the DTCG `tokens`
 * tree (if any) with the explicit `vars` map (which wins on collision).
 */
export function resolveThemeVars (theme: IOrigamTheme): TThemeVars {
    const fromTokens = theme.tokens ? tokenTreeToVars(theme.tokens, theme.component) : {}
    const fromVars: TThemeVars = {}
    if (theme.vars) {
        for (const key of Object.keys(theme.vars)) {
            fromVars[normaliseVarName(key)] = theme.vars[key]
        }
    }
    return { ...fromTokens, ...fromVars }
}

/**
 * Compute the CSS selector a theme block targets, from its `name` / `mode`:
 *   - neither            → `:root`
 *   - name only          → `[data-theme="<name>"]`
 *   - mode only          → `[data-mode="<mode>"]`
 *   - name + mode        → `[data-theme="<name>"][data-mode="<mode>"]`
 *
 * A `mode` of `'auto'` is treated as "no mode scoping".
 */
export function themeSelector (theme: IOrigamTheme): string {
    const hasName = typeof theme.name === 'string' && theme.name.length > 0
    const hasMode = theme.mode === 'light' || theme.mode === 'dark'

    if (!hasName && !hasMode) return ':root'

    let selector = ''
    if (hasName) selector += `[data-theme="${theme.name}"]`
    if (hasMode) selector += `[data-mode="${theme.mode}"]`
    return selector
}

/**
 * Serialise an `IOrigamTheme` to a CSS rule string:
 *   `<selector> {\n  --origam-…: value;\n  …\n}`
 *
 * Pure — no DOM access. Used both by `applyTheme` (runtime injection) and by
 * the Theme Builder's CSS export so a single code path produces both.
 */
export function themeToCss (theme: IOrigamTheme): string {
    const vars = resolveThemeVars(theme)
    const decls = Object.keys(vars)
        .map(name => `  ${name}: ${vars[name]};`)
        .join('\n')
    return `${themeSelector(theme)} {\n${decls}\n}\n`
}

/**
 * Inject (or replace) a theme's CSS variables into `<head>` at runtime.
 * SSR-safe: a no-op when `document` is unavailable. Returns the `<style>`
 * element id used, or `null` when skipped (SSR / empty theme).
 *
 * The element id derives from the theme name so multiple named themes can
 * coexist; re-applying the same theme replaces its block in place.
 */
export function applyTheme (theme: IOrigamTheme): string | null {
    if (typeof document === 'undefined') return null

    const vars = resolveThemeVars(theme)
    if (Object.keys(vars).length === 0) return null

    const suffix = theme.name ? `-${theme.name}` : ''
    const id = `${STYLE_ELEMENT_PREFIX}${suffix}`

    let style = document.getElementById(id) as HTMLStyleElement | null
    if (!style) {
        style = document.createElement('style')
        style.id = id
        style.setAttribute('data-origam-theme', theme.name ?? 'root')
        document.head.appendChild(style)
    }
    style.textContent = themeToCss(theme)
    return id
}
