import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const RESOLVE_BRACKET_SHADOW_UTIL_DOC: IUtilDoc = {
    slug: 'resolve-bracket-shadow',
    name: 'resolveBracketShadow',
    category: 'Bracket',
    icon: 'mdi-box-shadow',
    descriptionKey: 'utils.catalog.resolve_bracket_shadow.description',
    descriptionFallback: 'Resolve a bracket elevation value (number, named rung, boolean, or raw string) to a box-shadow CSS expression using the design token shadow ladder. Returns null for falsy inputs.',
    signature: `function resolveBracketShadow(value: TBracketElevation): string | null`,
    params: [
        {
            name: 'value',
            type: 'TBracketElevation',
            required: true,
            descriptionKey: 'utils.detail.resolve_bracket_shadow.param_value',
            descriptionFallback: 'A TBracketElevation value: a number (bucketed to xs/sm/md/lg/xl shadow rung), a named rung string, true (medium shadow default), a raw CSS string, or false/null (returns null).',
        },
    ],
    returns: {
        type: 'string | null',
        descriptionKey: 'utils.detail.resolve_bracket_shadow.returns',
        descriptionFallback: 'A CSS box-shadow value (token var or raw string) or null for falsy inputs.',
    },
    sourceFile: 'packages/ds/src/utils/Bracket/bracket-surface.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.resolve_bracket_shadow.example_basic',
            titleFallback: 'Resolve numeric and named elevation',
            code: `import { resolveBracketShadow } from 'origam'

resolveBracketShadow(4)
// → 'var(--origam-shadow---sm)'

resolveBracketShadow('lg')
// → 'var(--origam-shadow---lg)'

resolveBracketShadow(true)
// → 'var(--origam-shadow---md)'

resolveBracketShadow(false)
// → null`,
            lang: 'typescript',
        },
    ],
    related: ['resolve-bracket-radius', 'resolve-bracket-surface', 'resolve-bracket-border-width'],
}
