import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const RESOLVE_BRACKET_FOREGROUND_UTIL_DOC: IUtilDoc = {
    slug: 'resolve-bracket-foreground',
    name: 'resolveBracketForeground',
    category: 'Bracket',
    icon: 'mdi-format-color-text',
    descriptionKey: 'utils.catalog.resolve_bracket_foreground.description',
    descriptionFallback: 'Resolve a bracket color value to its text/foreground CSS colour. Intent strings yield the subtle foreground token; raw CSS colours are returned as-is; null/falsy inputs return null.',
    signature: `function resolveBracketForeground(value: TBracketColor): string | null`,
    params: [
        {
            name: 'value',
            type: 'TBracketColor',
            required: true,
            descriptionKey: 'utils.detail.resolve_bracket_foreground.param_value',
            descriptionFallback: 'A TBracketColor value: a TIntent string (maps to its fg-subtle token), "transparent", a raw CSS colour string, or a falsy value (returns null).',
        },
    ],
    returns: {
        type: 'string | null',
        descriptionKey: 'utils.detail.resolve_bracket_foreground.returns',
        descriptionFallback: 'The resolved foreground CSS colour string, or null when the input is falsy or unresolvable.',
    },
    sourceFile: 'packages/ds/src/utils/Bracket/bracket-surface.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.resolve_bracket_foreground.example_basic',
            titleFallback: 'Resolve intent and transparent values',
            code: `import { resolveBracketForeground } from 'origam'

resolveBracketForeground('danger')
// → 'var(--origam-color-danger-fg-subtle)'

resolveBracketForeground('transparent')
// → 'transparent'

resolveBracketForeground(null)
// → null`,
            lang: 'typescript',
        },
    ],
    related: ['resolve-bracket-surface', 'resolve-bracket-border-color', 'resolve-bracket-shadow', 'resolve-bracket-radius'],
}
