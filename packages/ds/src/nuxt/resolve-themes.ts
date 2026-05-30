import type { IOrigamTheme } from '../interfaces'

import { allThemes, origamTheme } from '../themes'

import type { TOrigamThemeOption } from './theme-entries'

export type { TOrigamThemeOption } from './theme-entries'
export { installedThemeNamesFromEntries, partitionThemeEntries } from './theme-entries'

/**
 * The preset registry the module resolves names against: the neutral `origam`
 * base brand (the module default — exported separately, NOT part of
 * `allThemes`) followed by the 8 demo brands. `origam` goes first so it wins
 * declaration order for a bare install.
 */
const PRESET_REGISTRY: IOrigamTheme[] = [...origamTheme, ...allThemes]

/**
 * Resolve a list of `themes` option entries into a flat `IOrigamTheme[]`.
 *
 * Preset names are matched against `PRESET_REGISTRY` by their `name` (so
 * `'sobre'` pulls every mode that brand ships, `'origam'` the base brand).
 * Object / array entries pass through untouched. Unknown preset names are
 * dropped with a `console.warn` rather than throwing — a typo in one brand
 * should not break the whole install.
 *
 * Pure (no DOM / Nuxt access) so it runs identically in the server and client
 * plugins. Imports the heavy `../themes` presets bundle, so it is consumed by
 * the runtime plugins (bundled / chunked) — NOT by the Nuxt module at setup
 * time (which uses the lean `./theme-entries` helpers instead).
 */
export function resolvePresetThemes (entries: ReadonlyArray<TOrigamThemeOption>): IOrigamTheme[] {
    const out: IOrigamTheme[] = []

    for (const entry of entries) {
        if (typeof entry === 'string') {
            const matches = PRESET_REGISTRY.filter(theme => theme.name === entry)
            if (matches.length === 0) {
                console.warn(`[origam] unknown theme preset "${entry}" — not found in origam/themes. Skipping.`)
                continue
            }
            out.push(...matches)
        } else if (Array.isArray(entry)) {
            out.push(...entry)
        } else if (entry && typeof entry === 'object') {
            out.push(entry)
        }
    }

    return out
}

/**
 * The distinct preset brand names the module can resolve — the `origam` base
 * brand plus the demo brands (`'sobre'`, `'glass'`, …), in declaration order.
 */
export function presetThemeNames (): string[] {
    const seen = new Set<string>()
    const names: string[] = []
    for (const theme of PRESET_REGISTRY) {
        if (theme.name && !seen.has(theme.name)) {
            seen.add(theme.name)
            names.push(theme.name)
        }
    }
    return names
}
