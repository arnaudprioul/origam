import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const RESOLVE_BRACKET_BORDER_WIDTH_UTIL_DOC: IUtilDoc = {
    slug: 'resolve-bracket-border-width',
    name: 'resolveBracketBorderWidth',
    category: 'Bracket',
    icon: 'mdi-border-all',
    descriptionKey: 'utils.catalog.resolve_bracket_border_width.description',
    descriptionFallback: 'Resolve a bracket border value (keyword, boolean, or number) into a CSS border-width string. Returns null for falsy inputs.',
    signature: `function resolveBracketBorderWidth(value: TBracketBorder): string | null`,
    params: [
        {
            name: 'value',
            type: 'TBracketBorder',
            required: true,
            descriptionKey: 'utils.detail.resolve_bracket_border_width.param_value',
            descriptionFallback: 'A TBracketBorder value: "none" / "thin" / "thick" keyword (maps to a token var), true / empty string (thin), a numeric pixel value, or a falsy value (returns null).',
        },
    ],
    returns: {
        type: 'string | null',
        descriptionKey: 'utils.detail.resolve_bracket_border_width.returns',
        descriptionFallback: 'A CSS border-width value (token var or pixel string) or null for falsy/unresolvable inputs.',
    },
    sourceFile: 'packages/ds/src/utils/Bracket/bracket-surface.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.resolve_bracket_border_width.example_basic',
            titleFallback: 'Resolve border keyword and boolean',
            code: `import { resolveBracketBorderWidth } from 'origam'

resolveBracketBorderWidth('thin')
// → 'var(--origam-border__width---thin)'

resolveBracketBorderWidth(true)
// → 'var(--origam-border__width---thin)'

resolveBracketBorderWidth(2)
// → '2px'

resolveBracketBorderWidth(false)
// → null`,
            lang: 'typescript',
        },
    ],
    related: ['resolve-bracket-border-color', 'resolve-bracket-surface', 'resolve-bracket-shadow'],
}
