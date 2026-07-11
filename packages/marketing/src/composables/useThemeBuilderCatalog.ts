import { computed } from 'vue'

import {
    THEME_BUILDER_PREVIEW_ADAPTERS,
    THEME_BUILDER_PREVIEWABLE_SLUGS
} from '~/consts/theme-builder.const'
import {
    THEME_BUILDER_CATEGORY_META,
    THEME_BUILDER_COLOR_TYPE_HINTS,
    THEME_BUILDER_PROP_GROUPS,
    THEME_BUILDER_SKIP_PROPS,
    THEME_BUILDER_SKIP_TYPE_HINTS,
    classifyPropGroup
} from '~/consts/theme-builder-groups.const'
import { THEME_BUILDER_TOKENS } from '~/consts/theme-builder-tokens.const'
import type {
    IComponentPlaygroundControl,
    IComponentPropRow
} from '~/interfaces/components-catalog.interface'
import type {
    IThemeBuilderComponentEntry,
    IThemeBuilderNavCategory,
    IThemeBuilderPropControl,
    IThemeBuilderPropGroup,
    IThemeBuilderPropGroupMeta,
    IThemeBuilderToken,
    IThemeBuilderTokenGroup,
    TThemeBuilderGroupId
} from '~/interfaces/theme-builder.interface'

/**
 * useThemeBuilderCatalog — derives the FULL, data-driven catalog that powers the
 * /theming builder, from data served by the API:
 *
 *  - GET /api/reference/component?includePropSurface=1
 *      → the nav (every DS component, by category)
 *      → each component's `props[]` (all prop rows, needed for theme controls)
 *      → each component's `playground` block (hand-curated select options)
 *  - THEME_BUILDER_TOKENS        → the editable CSS custom properties (grouped).
 *
 * The static COMPONENTS_CATALOG const files and the import.meta.glob pattern
 * have been removed; all component data now comes from the DB via the API.
 */

/** Minimal prop surface shape returned by ?includePropSurface=1. */
interface IComponentThemeSurface {
    slug: string
    name: string
    icon: string
    category: string
    parentSlug?: string | null
    playground?: {
        controls: IComponentPlaygroundControl[]
        defaultSlotContent?: string
    } | null
    props: Array<{
        name: string
        type: { label: string | null; slug: string | null; kind: string | null }
        required?: boolean | null
        defaultValue?: string | null
    }>
}

/** A prop type label that references data / callbacks / objects is non-themable. */
function isSkippableType (label: string): boolean {
    return THEME_BUILDER_SKIP_TYPE_HINTS.some(hint => label.includes(hint))
}

/** A prop name that binds data / model / identity is non-themable. */
function isSkippableProp (name: string): boolean {
    return (THEME_BUILDER_SKIP_PROPS as readonly string[]).includes(name)
}

/** Whether a prop type label denotes a colour value → swatch input. */
function isColorType (label: string): boolean {
    return THEME_BUILDER_COLOR_TYPE_HINTS.some(hint => label.includes(hint))
}

/**
 * Parse a union type label into select options when it is a literal union, e.g.
 * `'sm' | 'md' | 'lg'` → [sm, md, lg]. Returns null when the label is not a
 * pure string-literal union (then we fall back to text / number / switch).
 */
function parseUnionOptions (label: string): Array<{ label: string; value: string }> | null {
    if (!label.includes('|')) return null
    const parts = label.split('|').map(p => p.trim())
    const literals: Array<{ label: string; value: string }> = []
    for (const part of parts) {
        const m = part.match(/^'([^']*)'$/) ?? part.match(/^"([^"]*)"$/)
        if (!m || m[1] === undefined) return null
        const literal = m[1]
        literals.push({ label: literal === '' ? '(none)' : literal, value: literal })
    }
    return literals.length ? literals : null
}

/** Normalise a `_DOC` defaultValue string (e.g. "'elevated'", "false", "0") to a value. */
function parseDefault (raw: string): string | number | boolean {
    const v = raw.trim()
    if (v === 'true') return true
    if (v === 'false') return false
    if (v === 'undefined' || v === 'null' || v === '') return ''
    const quoted = v.match(/^'([^']*)'$/) ?? v.match(/^"([^"]*)"$/)
    if (quoted && quoted[1] !== undefined) return quoted[1]
    if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v)
    return v.replace(/^['"]|['"]$/g, '')
}

/** Humanise a camelCase prop name into a label, e.g. `bgColor` → `Bg color`. */
function humanise (name: string): string {
    const spaced = name.replace(/([A-Z])/g, ' $1').replace(/[-_]+/g, ' ').trim()
    return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

/**
 * Build one themable control from a prop row. The playground control (if
 * one exists for this prop) is the AUTHORITATIVE source for select options +
 * default, since it was hand-curated. Otherwise we derive from the prop type.
 * Returns null when the prop is non-themable.
 */
function buildControl (
    row: IComponentPropRow,
    playground?: IComponentPlaygroundControl
): IThemeBuilderPropControl | null {
    if (isSkippableProp(row.name)) return null

    const group = classifyPropGroup(row.name)
    const typeLabel = row.type.label

    if (playground) {
        return {
            prop: row.name,
            kind: playground.kind === 'select' ? 'select' : playground.kind,
            group,
            label: humanise(row.name),
            options: playground.options,
            defaultValue: playground.defaultValue
        }
    }

    if (typeLabel === 'boolean') {
        return {
            prop: row.name,
            kind: 'switch',
            group,
            label: humanise(row.name),
            defaultValue: parseDefault(row.defaultValue)
        }
    }

    if (isColorType(typeLabel)) {
        return {
            prop: row.name,
            kind: 'color',
            group,
            label: humanise(row.name),
            defaultValue: parseDefault(row.defaultValue)
        }
    }

    const unionOptions = parseUnionOptions(typeLabel)
    if (unionOptions) {
        return {
            prop: row.name,
            kind: 'select',
            group,
            label: humanise(row.name),
            options: unionOptions,
            defaultValue: parseDefault(row.defaultValue)
        }
    }

    if (typeLabel === 'number') {
        return {
            prop: row.name,
            kind: 'number',
            group,
            label: humanise(row.name),
            defaultValue: parseDefault(row.defaultValue)
        }
    }

    if (typeLabel === 'string' || typeLabel.includes('TSize') || typeLabel.includes('number | string') || typeLabel.includes('string | number')) {
        return {
            prop: row.name,
            kind: 'text',
            group,
            label: humanise(row.name),
            defaultValue: parseDefault(row.defaultValue)
        }
    }

    if (isSkippableType(typeLabel)) return null

    return {
        prop: row.name,
        kind: 'text',
        group,
        label: humanise(row.name),
        defaultValue: parseDefault(row.defaultValue)
    }
}

/** Bucket controls into their groups, in the canonical group order. */
function groupControls (controls: IThemeBuilderPropControl[]): IThemeBuilderPropGroup[] {
    const byGroup = new Map<TThemeBuilderGroupId, IThemeBuilderPropControl[]>()
    for (const ctrl of controls) {
        const bucket = byGroup.get(ctrl.group) ?? []
        bucket.push(ctrl)
        byGroup.set(ctrl.group, bucket)
    }
    const out: IThemeBuilderPropGroup[] = []
    for (const meta of THEME_BUILDER_PROP_GROUPS) {
        const bucket = byGroup.get(meta.id)
        if (bucket && bucket.length) out.push({ meta, controls: bucket })
    }
    return out
}

/** Infer a token's group from its CSS-var name (background-color → color, …). */
function classifyToken (cssVar: string): TThemeBuilderGroupId {
    const tail = cssVar.split('---').pop() ?? cssVar
    if (tail.includes('color') || tail.includes('background') || tail.includes('fill')) return 'color'
    if (tail.includes('radius') || tail.includes('rounded')) return 'shape'
    if (tail.includes('border')) return 'border'
    if (tail.includes('shadow') || tail.includes('elevat')) return 'elevation'
    if (tail.includes('padding') || tail.includes('margin') || tail.includes('density')) return 'spacing'
    if (tail.includes('width') || tail.includes('height')) return 'dimension'
    if (tail.includes('font') || tail.includes('letter') || tail.includes('line-height') || tail.includes('text')) return 'content'
    return 'other'
}

/** Bucket CSS tokens into their groups, in the canonical group order. */
function groupTokens (tokens: IThemeBuilderToken[]): IThemeBuilderTokenGroup[] {
    const byGroup = new Map<TThemeBuilderGroupId, IThemeBuilderToken[]>()
    for (const tok of tokens) {
        const id = classifyToken(tok.cssVar)
        const bucket = byGroup.get(id) ?? []
        bucket.push(tok)
        byGroup.set(id, bucket)
    }
    const out: IThemeBuilderTokenGroup[] = []
    const metaById = new Map<TThemeBuilderGroupId, IThemeBuilderPropGroupMeta>(
        THEME_BUILDER_PROP_GROUPS.map(m => [m.id, m])
    )
    for (const meta of THEME_BUILDER_PROP_GROUPS) {
        const bucket = byGroup.get(meta.id)
        if (bucket && bucket.length) out.push({ meta: metaById.get(meta.id) ?? meta, tokens: bucket })
    }
    return out
}

/** Build the full builder entry for one component from its API surface. */
function buildEntry (component: IComponentThemeSurface): IThemeBuilderComponentEntry {
    const playgroundControls = component.playground?.controls ?? []
    const playgroundByProp = new Map(playgroundControls.map(c => [c.prop, c]))

    const controls: IThemeBuilderPropControl[] = []
    for (const raw of component.props ?? []) {
        const row: IComponentPropRow = {
            name: raw.name,
            type: {
                label: raw.type.label ?? '',
                slug: raw.type.slug ?? '',
                kind: (raw.type.kind ?? 'primitive') as 'primitive' | 'type' | 'enum',
            },
            defaultValue: raw.defaultValue ?? '',
            descriptionKey: '',
            descriptionFallback: '',
            required: raw.required ?? false,
        }
        const ctrl = buildControl(row, playgroundByProp.get(raw.name))
        if (ctrl) controls.push(ctrl)
    }

    const tokens = THEME_BUILDER_TOKENS[component.slug] ?? []

    return {
        slug: component.slug,
        componentKey: `origam-${component.slug}`,
        componentTag: `origam-${component.slug}`,
        name: component.name,
        icon: component.icon,
        category: component.category,
        propGroups: groupControls(controls),
        tokenGroups: groupTokens(tokens),
        controls,
        tokens,
        previewAdapter: THEME_BUILDER_PREVIEW_ADAPTERS[component.slug] ?? {},
        previewable: (THEME_BUILDER_PREVIEWABLE_SLUGS as readonly string[]).includes(component.slug)
    }
}

export function useThemeBuilderCatalog () {
    const { data } = useFetch<IComponentThemeSurface[]>('/api/reference/component', {
        key: 'catalog:component:theme-surface',
        query: { includePropSurface: '1' },
        default: () => [] as IComponentThemeSurface[],
    })

    const entries = computed<IThemeBuilderComponentEntry[]>(() => {
        const topLevel = (data.value ?? []).filter(c => !c.parentSlug)
        return topLevel.map(c => buildEntry(c))
    })

    const nav = computed<IThemeBuilderNavCategory[]>(() => {
        const byCategory = new Map<string, IThemeBuilderComponentEntry[]>()
        for (const entry of entries.value) {
            const bucket = byCategory.get(entry.category) ?? []
            bucket.push(entry)
            byCategory.set(entry.category, bucket)
        }

        const result: IThemeBuilderNavCategory[] = []
        const seen = new Set<string>()
        for (const meta of THEME_BUILDER_CATEGORY_META) {
            const bucket = byCategory.get(meta.id)
            if (bucket && bucket.length) {
                result.push({ meta, components: [...bucket].sort((a, b) => a.name.localeCompare(b.name)) })
                seen.add(meta.id)
            }
        }
        for (const [category, bucket] of byCategory) {
            if (seen.has(category)) continue
            result.push({
                meta: { id: category, labelKey: '', labelFallback: category, icon: 'mdi-shape-outline' },
                components: [...bucket].sort((a, b) => a.name.localeCompare(b.name))
            })
        }
        return result
    })

    return { entries, nav }
}
