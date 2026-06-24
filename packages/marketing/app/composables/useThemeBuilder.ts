import { computed, reactive, watch } from 'vue'

import {
    CORE_THEME_SLUGS,
    THEME_BUILDER_DEFAULT_LABEL,
    THEME_BUILDER_DEFAULT_MODE,
    THEME_BUILDER_DEFAULT_NAME,
    THEME_BUILDER_PREVIEW_ADAPTERS,
    THEME_BUILDER_STORAGE_KEY
} from '~/consts/theme-builder.const'
import { THEME_BUILDER_PRESETS } from '~/consts/theme-builder-presets.const'
import { THEME_BUILDER_TOKENS } from '~/consts/theme-builder-tokens.const'
import type {
    IThemeBuilderPreset,
    IThemeBuilderPreviewAdapter,
    IThemeBuilderState,
    IThemeBuilderToken
} from '~/interfaces/theme-builder.interface'
import type { IComponentPlaygroundControl } from '~/interfaces/components-catalog.interface'
import type { IOrigamTheme } from 'origam/interfaces'
import type { TMode } from 'origam/types'

/**
 * useThemeBuilder — engine for the /theming visual theme builder.
 *
 * DATA-DRIVEN: prop controls per component come from the existing
 * `playground.controls` block (consts/components/{slug}.const.ts); editable CSS
 * tokens come from `THEME_BUILDER_TOKENS` (extracted from the real origam
 * theme). The composable owns the diff-only state, the live preview props per
 * slug, the serialised TS string, and the client-side download. Components stay
 * thin — they only render what the engine exposes.
 */

const allDocs = import.meta.glob('~/consts/components/*.const.ts', { eager: true }) as Record<
    string,
    Record<string, unknown> | undefined
>

interface IThemeBuilderComponentEntry {
    slug: string
    /** Origam defaults key, e.g. `origam-btn`. */
    componentKey: string
    name: string
    icon: string
    controls: IComponentPlaygroundControl[]
    tokens: IThemeBuilderToken[]
    previewAdapter: IThemeBuilderPreviewAdapter
}

function findDoc (slug: string): Record<string, unknown> | undefined {
    const key = Object.keys(allDocs).find(k => k.includes(`/${slug}.const`))
    if (!key) return undefined
    const mod = allDocs[key]
    if (!mod) return undefined
    const exportKey = Object.keys(mod).find(k => k.endsWith('_DOC'))
    return exportKey ? (mod[exportKey] as Record<string, unknown>) : undefined
}

function buildEntries (): IThemeBuilderComponentEntry[] {
    return CORE_THEME_SLUGS.map((slug) => {
        const doc = findDoc(slug)
        const playground = (doc?.playground as { controls?: IComponentPlaygroundControl[] } | undefined)
        return {
            slug,
            componentKey: `origam-${slug}`,
            name: (doc?.name as string) ?? slug,
            icon: (doc?.icon as string) ?? 'mdi-puzzle-outline',
            controls: playground?.controls ?? [],
            tokens: THEME_BUILDER_TOKENS[slug] ?? [],
            previewAdapter: THEME_BUILDER_PREVIEW_ADAPTERS[slug] ?? {}
        }
    })
}

/** `my-theme` / `My Theme` → `myTheme` (export identifier). */
function camelCaseName (raw: string): string {
    const cleaned = raw.trim().replace(/[^a-zA-Z0-9]+/g, ' ').trim()
    if (!cleaned) return 'myTheme'
    const parts = cleaned.split(' ')
    const head = (parts[0] ?? '').toLowerCase()
    const tail = parts.slice(1).map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
    const id = [head, ...tail].join('')
    return /^[a-zA-Z]/.test(id) ? id : `theme${id.charAt(0).toUpperCase()}${id.slice(1)}`
}

/** `my-theme` / `My Theme` → `my-theme` (filename slug). */
function kebabName (raw: string): string {
    const slug = raw
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
    return slug || THEME_BUILDER_DEFAULT_NAME
}

function serialiseValue (value: unknown): string {
    if (typeof value === 'string') return JSON.stringify(value)
    if (typeof value === 'number' || typeof value === 'boolean') return String(value)
    return JSON.stringify(value)
}

/**
 * Parse a theme from either raw JSON or a TS module that exports an
 * `IOrigamTheme` object literal. For the TS case we extract the `{...}` block of
 * the first `export const … = { … }` and parse it with `Function` in a
 * sandbox-ish eval (no DS imports needed). Returns `null` when nothing parseable
 * is found. Throws are caught by the caller.
 */
function parseThemeSource (text: string): unknown {
    const trimmed = text.trim()
    if (trimmed.startsWith('{')) {
        return JSON.parse(trimmed)
    }
    const start = trimmed.indexOf('{')
    const end = trimmed.lastIndexOf('}')
    if (start === -1 || end === -1 || end <= start) return null
    const literal = trimmed.slice(start, end + 1)
    // eslint-disable-next-line no-new-func
    const factory = new Function(`"use strict"; return (${literal});`)
    return factory()
}

export function useThemeBuilder () {
    const entries = buildEntries()

    const state = reactive<IThemeBuilderState>({
        name: THEME_BUILDER_DEFAULT_NAME,
        label: THEME_BUILDER_DEFAULT_LABEL,
        mode: THEME_BUILDER_DEFAULT_MODE,
        defaults: {},
        cssVars: {}
    })

    /** Default prop value for a control (used to compute the diff). */
    const defaultProp = (slug: string, prop: string): unknown => {
        const entry = entries.find(e => e.slug === slug)
        const ctrl = entry?.controls.find(c => c.prop === prop)
        return ctrl?.defaultValue ?? ''
    }

    /** Default token value (used to compute the diff). */
    const defaultToken = (cssVar: string): string => {
        for (const entry of entries) {
            const tok = entry.tokens.find(t => t.cssVar === cssVar)
            if (tok) return tok.defaultValue
        }
        return ''
    }

    /** Current value of a prop (edited or default). */
    const propValue = (slug: string, prop: string): unknown => {
        const key = `origam-${slug}`
        const edited = state.defaults[key]?.[prop]
        return edited !== undefined ? edited : defaultProp(slug, prop)
    }

    /** Set a prop value, storing only when it differs from the DS default. */
    const setProp = (slug: string, prop: string, value: unknown): void => {
        const key = `origam-${slug}`
        const isDefault = value === defaultProp(slug, prop)
        if (isDefault) {
            if (state.defaults[key]) {
                delete state.defaults[key][prop]
                if (Object.keys(state.defaults[key]).length === 0) delete state.defaults[key]
            }
            return
        }
        if (!state.defaults[key]) state.defaults[key] = {}
        state.defaults[key][prop] = value
    }

    /** Current value of a token (edited or default). */
    const tokenValue = (cssVar: string): string => {
        const edited = state.cssVars[cssVar]
        return edited !== undefined ? edited : defaultToken(cssVar)
    }

    /** Set a token value, storing only when it differs from the theme default. */
    const setToken = (cssVar: string, value: string): void => {
        if (value === defaultToken(cssVar)) {
            delete state.cssVars[cssVar]
            return
        }
        state.cssVars[cssVar] = value
    }

    /** Reset all edits AND the persisted storage entry. */
    const reset = (): void => {
        Object.keys(state.defaults).forEach(k => delete state.defaults[k])
        Object.keys(state.cssVars).forEach(k => delete state.cssVars[k])
        state.name = THEME_BUILDER_DEFAULT_NAME
        state.label = THEME_BUILDER_DEFAULT_LABEL
        state.mode = THEME_BUILDER_DEFAULT_MODE
        clearStorage()
    }

    /** Props passed to the live `<component :is>` for a given slug. */
    const previewProps = (slug: string): Record<string, unknown> => {
        const entry = entries.find(e => e.slug === slug)
        if (!entry) return {}
        const out: Record<string, unknown> = { ...(entry.previewAdapter.previewProps ?? {}) }
        for (const ctrl of entry.controls) {
            const value = propValue(slug, ctrl.prop)
            if (value === '' || value === false || value === undefined) continue
            out[ctrl.prop] = value
        }
        return out
    }

    /** Scoped CSS-var overrides for a slug's preview wrapper. */
    const previewStyle = (slug: string): Record<string, string> => {
        const entry = entries.find(e => e.slug === slug)
        if (!entry) return {}
        const out: Record<string, string> = {}
        for (const tok of entry.tokens) {
            const edited = state.cssVars[tok.cssVar]
            if (edited !== undefined) out[tok.cssVar] = edited
        }
        return out
    }

    const slotText = (slug: string): string => {
        const entry = entries.find(e => e.slug === slug)
        return entry?.previewAdapter.slotText ?? ''
    }

    /** Number of overridden props + tokens (for the validate button badge). */
    const editCount = computed(() => {
        const propCount = Object.values(state.defaults).reduce((n, m) => n + Object.keys(m).length, 0)
        return propCount + Object.keys(state.cssVars).length
    })

    /**
     * The diff-only state assembled as a real `IOrigamTheme` object — directly
     * collable into `createOrigam({ themes: [<this>] })`. `cssVars` sits at the
     * ROOT, `defaults` becomes `component`, and the name/label/mode metadata is
     * carried alongside.
     */
    const themeObject = computed<IOrigamTheme>(() => {
        const theme: IOrigamTheme = {
            name: kebabName(state.name),
            mode: state.mode,
            label: state.label.trim() || state.name
        }
        const cssEntries = Object.entries(state.cssVars)
        if (cssEntries.length) {
            const cssVars: Record<string, string> = {}
            cssEntries.forEach(([k, v]) => { cssVars[k] = v })
            theme.cssVars = cssVars
        }
        const defaultEntries = Object.entries(state.defaults)
        if (defaultEntries.length) {
            const component: Record<string, Record<string, unknown>> = {}
            defaultEntries.forEach(([compKey, props]) => { component[compKey] = { ...props } })
            theme.component = component
        }
        return theme
    })

    /** Serialise the diff-only state into a printable `[name].ts` module. */
    const generatedCode = computed(() => {
        const identifier = camelCaseName(state.name)
        const lines: string[] = []
        lines.push('import type { IOrigamTheme } from \'origam/interfaces\'')
        lines.push('')
        lines.push(`export const ${identifier}: IOrigamTheme = {`)
        lines.push(`    name: ${JSON.stringify(themeObject.value.name)},`)
        lines.push(`    mode: ${JSON.stringify(themeObject.value.mode)},`)
        lines.push(`    label: ${JSON.stringify(themeObject.value.label)},`)

        const cssEntries = Object.entries(state.cssVars)
        const defaultEntries = Object.entries(state.defaults)
        if (cssEntries.length) {
            lines.push('    cssVars: {')
            cssEntries.forEach(([k, v], i) => {
                const comma = i < cssEntries.length - 1 ? ',' : ''
                lines.push(`        ${JSON.stringify(k)}: ${JSON.stringify(v)}${comma}`)
            })
            lines.push(defaultEntries.length ? '    },' : '    }')
        }

        if (defaultEntries.length) {
            lines.push('    component: {')
            defaultEntries.forEach(([compKey, props], ci) => {
                lines.push(`        ${JSON.stringify(compKey)}: {`)
                const propEntries = Object.entries(props)
                propEntries.forEach(([p, value], pi) => {
                    const comma = pi < propEntries.length - 1 ? ',' : ''
                    lines.push(`            ${p}: ${serialiseValue(value)}${comma}`)
                })
                lines.push(`        }${ci < defaultEntries.length - 1 ? ',' : ''}`)
            })
            lines.push('    }')
        }

        lines.push('}')
        lines.push('')
        return lines.join('\n')
    })

    /** The same `IOrigamTheme` object serialised as pretty JSON. */
    const generatedJson = computed(() => `${JSON.stringify(themeObject.value, null, 4)}\n`)

    const fileName = computed(() => `${kebabName(state.name)}.ts`)
    const jsonFileName = computed(() => `${kebabName(state.name)}.json`)

    /** Generic client-side download of a string payload. */
    const downloadBlob = (contents: string, name: string, mime: string): void => {
        if (typeof window === 'undefined') return
        const blob = new Blob([contents], { type: mime })
        const url = URL.createObjectURL(blob)
        const anchor = document.createElement('a')
        anchor.href = url
        anchor.download = name
        document.body.appendChild(anchor)
        anchor.click()
        document.body.removeChild(anchor)
        URL.revokeObjectURL(url)
    }

    /** Download the generated TS module. */
    const download = (): void => downloadBlob(generatedCode.value, fileName.value, 'text/typescript')

    /** Download the generated `IOrigamTheme` JSON. */
    const downloadJson = (): void => downloadBlob(generatedJson.value, jsonFileName.value, 'application/json')

    /**
     * Replace the live state from a parsed `IOrigamTheme`. Only the surfaces the
     * builder owns are read (name/label/mode/cssVars/component); unknown keys are
     * ignored. cssVars / component props are filtered to the values that differ
     * from the DS default so the diff stays clean.
     */
    const applyTheme = (theme: IOrigamTheme): void => {
        Object.keys(state.defaults).forEach(k => delete state.defaults[k])
        Object.keys(state.cssVars).forEach(k => delete state.cssVars[k])

        if (typeof theme.name === 'string' && theme.name) state.name = theme.name
        if (typeof theme.label === 'string' && theme.label) state.label = theme.label
        if (theme.mode === 'light' || theme.mode === 'dark' || theme.mode === 'auto') {
            state.mode = theme.mode as TMode
        }

        if (theme.cssVars && typeof theme.cssVars === 'object') {
            for (const [k, v] of Object.entries(theme.cssVars)) {
                if (typeof v === 'string' || typeof v === 'number') setToken(k, String(v))
            }
        }

        if (theme.component && typeof theme.component === 'object') {
            for (const [compKey, props] of Object.entries(theme.component as Record<string, unknown>)) {
                if (!props || typeof props !== 'object') continue
                const slug = compKey.replace(/^origam-/, '')
                for (const [prop, value] of Object.entries(props as Record<string, unknown>)) {
                    setProp(slug, prop, value)
                }
            }
        }
    }

    /**
     * Parse a raw string (JSON object, or a TS module that exports an
     * `IOrigamTheme`) and apply it. Returns `true` on success, `false` on a
     * parse error (never throws — callers surface the error to the user).
     */
    const importTheme = (raw: string): boolean => {
        const text = raw.trim()
        if (!text) return false
        try {
            const parsed = parseThemeSource(text)
            if (!parsed || typeof parsed !== 'object') return false
            applyTheme(parsed as IOrigamTheme)
            return true
        } catch {
            return false
        }
    }

    /** Seed the builder from a DS preset (origam light / dark). */
    const seedPreset = (key: string): void => {
        const preset = THEME_BUILDER_PRESETS.find(p => p.key === key)
        if (!preset) return
        Object.keys(state.defaults).forEach(k => delete state.defaults[k])
        Object.keys(state.cssVars).forEach(k => delete state.cssVars[k])
        state.mode = preset.mode
        for (const [k, v] of Object.entries(preset.cssVars)) setToken(k, v)
    }

    const presets: IThemeBuilderPreset[] = THEME_BUILDER_PRESETS

    /**
     * Load the persisted state from localStorage (client-only). Called from the
     * page in `onMounted` so SSR never touches `window`/`localStorage`.
     */
    const loadStorage = (): void => {
        if (typeof window === 'undefined') return
        try {
            const raw = window.localStorage.getItem(THEME_BUILDER_STORAGE_KEY)
            if (!raw) return
            const saved = JSON.parse(raw) as Partial<IThemeBuilderState>
            if (typeof saved.name === 'string') state.name = saved.name
            if (typeof saved.label === 'string') state.label = saved.label
            if (saved.mode === 'light' || saved.mode === 'dark' || saved.mode === 'auto') {
                state.mode = saved.mode
            }
            if (saved.defaults && typeof saved.defaults === 'object') {
                Object.keys(state.defaults).forEach(k => delete state.defaults[k])
                for (const [k, v] of Object.entries(saved.defaults)) {
                    if (v && typeof v === 'object') state.defaults[k] = { ...v as Record<string, unknown> }
                }
            }
            if (saved.cssVars && typeof saved.cssVars === 'object') {
                Object.keys(state.cssVars).forEach(k => delete state.cssVars[k])
                for (const [k, v] of Object.entries(saved.cssVars)) {
                    if (typeof v === 'string') state.cssVars[k] = v
                }
            }
        } catch {
            /* corrupt entry — ignore and start fresh */
        }
    }

    /** Auto-persist on every state change (client-only). */
    const startAutoPersist = (): void => {
        if (typeof window === 'undefined') return
        watch(
            () => JSON.stringify(state),
            (snapshot) => {
                try {
                    window.localStorage.setItem(THEME_BUILDER_STORAGE_KEY, snapshot)
                } catch {
                    /* quota / private mode — non-fatal */
                }
            }
        )
    }

    const clearStorage = (): void => {
        if (typeof window === 'undefined') return
        try {
            window.localStorage.removeItem(THEME_BUILDER_STORAGE_KEY)
        } catch {
            /* non-fatal */
        }
    }

    return {
        entries,
        state,
        editCount,
        generatedCode,
        generatedJson,
        themeObject,
        fileName,
        jsonFileName,
        presets,
        propValue,
        setProp,
        tokenValue,
        setToken,
        previewProps,
        previewStyle,
        slotText,
        reset,
        download,
        downloadJson,
        importTheme,
        seedPreset,
        loadStorage,
        startAutoPersist
    }
}
