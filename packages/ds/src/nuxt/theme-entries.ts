import type { IOrigamTheme } from '../interfaces'

/**
 * One entry of the module's `themes` option. A consumer may mix:
 *   - a **preset name** (`'sobre'`) — resolved to built-in objects in the
 *     plugins (see `resolvePresetThemes`),
 *   - a single **theme object** (`IOrigamTheme`),
 *   - an **array** of theme objects (e.g. the per-brand `sobreTheme` export).
 *
 * This module is intentionally dependency-light (no `../themes` import) so the
 * Nuxt module can use it at setup time without pulling the heavy presets
 * bundle into the build process.
 */
export type TOrigamThemeOption = string | IOrigamTheme | IOrigamTheme[]

function isThemeObject (value: unknown): value is IOrigamTheme {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Split the `themes` option entries into the two payload classes the Nuxt
 * module serialises separately:
 *   - `presetNames` — string entries (re-resolved to objects in the plugins,
 *     so the heavy preset `vars` never travel in the runtime-config payload),
 *   - `customThemes` — inline object / array entries (these DO travel).
 *
 * Pure; safe to call at module-setup time.
 */
export function partitionThemeEntries (entries: ReadonlyArray<TOrigamThemeOption>): { presetNames: string[], customThemes: IOrigamTheme[] } {
    const presetNames: string[] = []
    const customThemes: IOrigamTheme[] = []

    for (const entry of entries) {
        if (typeof entry === 'string') {
            presetNames.push(entry)
        } else if (Array.isArray(entry)) {
            customThemes.push(...entry)
        } else if (isThemeObject(entry)) {
            customThemes.push(entry)
        }
    }

    return { presetNames, customThemes }
}

/**
 * Distinct brand names that an entry list will install, in order. Derived
 * WITHOUT resolving presets to full objects (a preset name installs a brand of
 * that same name), so the module stays free of the heavy `../themes` import.
 */
export function installedThemeNamesFromEntries (entries: ReadonlyArray<TOrigamThemeOption>): string[] {
    const seen = new Set<string>()
    const names: string[] = []

    const add = (name: string | undefined) => {
        if (name && !seen.has(name)) {
            seen.add(name)
            names.push(name)
        }
    }

    for (const entry of entries) {
        if (typeof entry === 'string') {
            add(entry)
        } else if (Array.isArray(entry)) {
            for (const theme of entry) add(theme.name)
        } else if (isThemeObject(entry)) {
            add(entry.name)
        }
    }

    return names
}
