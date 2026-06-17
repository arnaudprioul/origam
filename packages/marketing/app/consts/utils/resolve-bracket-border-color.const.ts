import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const RESOLVE_BRACKET_BORDER_COLOR_UTIL_DOC: IUtilDoc = {
    slug: 'resolve-bracket-border-color',
    name: 'resolveBracketBorderColor',
    category: 'Bracket',
    icon: 'mdi-border-color',
    descriptionKey: 'utils.catalog.resolve_bracket_border_color.description',
    descriptionFallback: 'Resolve a bracket borderColor value (intent token or raw CSS colour) into a concrete CSS colour string. Returns null for falsy inputs.',
    signature: `function resolveBracketBorderColor(value: TBracketColor): string | null`,
    params: [
        {
            name: 'value',
            type: 'TBracketColor',
            required: true,
            descriptionKey: 'utils.detail.resolve_bracket_border_color.param_value',
            descriptionFallback: 'A TBracketColor value: a TIntent string (resolved to its foreground token), a raw CSS colour string, or a falsy value (returns null).',
        },
    ],
    returns: {
        type: 'string | null',
        descriptionKey: 'utils.detail.resolve_bracket_border_color.returns',
        descriptionFallback: 'The resolved CSS colour string for use in border-color, or null when the input is falsy or unresolvable.',
    },
    sourceFile: 'packages/ds/src/utils/Bracket/bracket-surface.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.resolve_bracket_border_color.example_basic',
            titleFallback: 'Resolve intent and raw colour',
            code: `import { resolveBracketBorderColor } from 'origam'

resolveBracketBorderColor('primary')
// → 'var(--origam-color-primary-fg-subtle)'

resolveBracketBorderColor('#e11d48')
// → '#e11d48'

resolveBracketBorderColor(null)
// → null`,
            lang: 'typescript',
        },
    ],
    related: ['resolve-bracket-surface', 'resolve-bracket-foreground', 'resolve-bracket-shadow', 'resolve-bracket-radius', 'resolve-bracket-border-width'],
}
