import { computed, reactive } from 'vue'

import {
    CORE_THEME_SLUGS,
    THEME_BUILDER_DEFAULT_NAME,
    THEME_BUILDER_PREVIEW_ADAPTERS
} from '~/consts/theme-builder.const'
import { THEME_BUILDER_TOKENS } from '~/consts/theme-builder-tokens.const'
import type {
    IThemeBuilderPreviewAdapter,
    IThemeBuilderState,
    IThemeBuilderToken
} from '~/interfaces/theme-builder.interface'
import type { IComponentPlaygroundControl } from '~/interfaces/components-catalog.interface'

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
    const head = parts[0].toLowerCase()
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

export function useThemeBuilder () {
    const entries = buildEntries()

    const state = reactive<IThemeBuilderState>({
        name: THEME_BUILDER_DEFAULT_NAME,
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

    /** Reset all edits. */
    const reset = (): void => {
        Object.keys(state.defaults).forEach(k => delete state.defaults[k])
        Object.keys(state.cssVars).forEach(k => delete state.cssVars[k])
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

    /** Serialise the diff-only state into a printable `[name].ts` module. */
    const generatedCode = computed(() => {
        const identifier = camelCaseName(state.name)
        const lines: string[] = []
        lines.push(`export const ${identifier} = {`)

        const defaultKeys = Object.keys(state.defaults)
        if (defaultKeys.length) {
            lines.push('    defaults: {')
            defaultKeys.forEach((compKey, ci) => {
                const props = state.defaults[compKey]
                lines.push(`        ${JSON.stringify(compKey)}: {`)
                const propKeys = Object.keys(props)
                propKeys.forEach((p, pi) => {
                    const comma = pi < propKeys.length - 1 ? ',' : ''
                    lines.push(`            ${p}: ${serialiseValue(props[p])}${comma}`)
                })
                lines.push(`        }${ci < defaultKeys.length - 1 ? ',' : ''}`)
            })
            lines.push('    },')
        } else {
            lines.push('    defaults: {},')
        }

        const cssKeys = Object.keys(state.cssVars)
        lines.push('    theme: {')
        if (cssKeys.length) {
            lines.push('        cssVars: {')
            cssKeys.forEach((k, i) => {
                const comma = i < cssKeys.length - 1 ? ',' : ''
                lines.push(`            ${JSON.stringify(k)}: ${JSON.stringify(state.cssVars[k])}${comma}`)
            })
            lines.push('        }')
        } else {
            lines.push('        cssVars: {}')
        }
        lines.push('    }')
        lines.push('}')
        lines.push('')
        return lines.join('\n')
    })

    const fileName = computed(() => `${kebabName(state.name)}.ts`)

    /** Trigger a client-side download of the generated module. */
    const download = (): void => {
        if (typeof window === 'undefined') return
        const blob = new Blob([generatedCode.value], { type: 'text/typescript' })
        const url = URL.createObjectURL(blob)
        const anchor = document.createElement('a')
        anchor.href = url
        anchor.download = fileName.value
        document.body.appendChild(anchor)
        anchor.click()
        document.body.removeChild(anchor)
        URL.revokeObjectURL(url)
    }

    return {
        entries,
        state,
        editCount,
        generatedCode,
        fileName,
        propValue,
        setProp,
        tokenValue,
        setToken,
        previewProps,
        previewStyle,
        slotText,
        reset,
        download
    }
}
