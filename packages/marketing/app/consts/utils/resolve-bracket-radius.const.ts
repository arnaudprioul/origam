import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const RESOLVE_BRACKET_RADIUS_UTIL_DOC: IUtilDoc = {
    slug: 'resolve-bracket-radius',
    name: 'resolveBracketRadius',
    category: 'Bracket',
    icon: 'mdi-rounded-corner',
    descriptionKey: 'utils.catalog.resolve_bracket_radius.description',
    descriptionFallback: 'Resolve a bracket rounded value (named variant, rung keyword, boolean, number, or raw CSS string) to a border-radius CSS expression. Returns null for falsy inputs.',
    signature: `function resolveBracketRadius(value: TBracketRounded): string | null`,
    params: [
        {
            name: 'value',
            type: 'TBracketRounded',
            required: true,
            descriptionKey: 'utils.detail.resolve_bracket_radius.param_value',
            descriptionFallback: 'A TBracketRounded value: a named rung string (e.g. "md", "lg"), true (medium radius default), a number (converted to px), a raw CSS string, false/null (returns null).',
        },
    ],
    returns: {
        type: 'string | null',
        descriptionKey: 'utils.detail.resolve_bracket_radius.returns',
        descriptionFallback: 'A CSS border-radius value (token var, px string, or raw CSS) or null when the input is falsy.',
    },
    sourceFile: 'packages/ds/src/utils/Bracket/bracket-surface.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.resolve_bracket_radius.example_basic',
            titleFallback: 'Resolve various rounded values',
            code: `import { resolveBracketRadius } from 'origam'

resolveBracketRadius('md')
// → 'var(--origam-radius---md)'

resolveBracketRadius(true)
// → 'var(--origam-radius---md)'

resolveBracketRadius(8)
// → '8px'

resolveBracketRadius(false)
// → null`,
            lang: 'typescript',
        },
    ],
    related: ['resolve-bracket-shadow', 'resolve-bracket-surface', 'resolve-bracket-border-width'],
}
