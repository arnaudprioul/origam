import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const RESOLVE_BRACKET_SURFACE_UTIL_DOC: IUtilDoc = {
    slug: 'resolve-bracket-surface',
    name: 'resolveBracketSurface',
    category: 'Bracket',
    icon: 'mdi-layers',
    descriptionKey: 'utils.catalog.resolve_bracket_surface.description',
    descriptionFallback: 'Resolve a bracket bgColor value (intent token, "transparent", or raw CSS colour) to a background-color CSS expression. Returns null for falsy inputs.',
    signature: `function resolveBracketSurface(value: TBracketColor): string | null`,
    params: [
        {
            name: 'value',
            type: 'TBracketColor',
            required: true,
            descriptionKey: 'utils.detail.resolve_bracket_surface.param_value',
            descriptionFallback: 'A TBracketColor value: a TIntent string (maps to its background token), "transparent", a raw CSS colour string, or a falsy value (returns null).',
        },
    ],
    returns: {
        type: 'string | null',
        descriptionKey: 'utils.detail.resolve_bracket_surface.returns',
        descriptionFallback: 'The resolved background-color CSS value, or null when the input is falsy or unresolvable.',
    },
    sourceFile: 'packages/ds/src/utils/Bracket/bracket-surface.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.resolve_bracket_surface.example_basic',
            titleFallback: 'Resolve intent, transparent, and raw colour',
            code: `import { resolveBracketSurface } from 'origam'

resolveBracketSurface('primary')
// → 'var(--origam-color-primary-bg)'

resolveBracketSurface('transparent')
// → 'transparent'

resolveBracketSurface('#f0fdf4')
// → '#f0fdf4'

resolveBracketSurface(null)
// → null`,
            lang: 'typescript',
        },
    ],
    related: ['resolve-bracket-foreground', 'resolve-bracket-border-color', 'resolve-bracket-shadow', 'resolve-bracket-radius'],
}
