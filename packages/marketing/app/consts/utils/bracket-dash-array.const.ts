import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const BRACKET_DASH_ARRAY_UTIL_DOC: IUtilDoc = {
    slug: 'bracket-dash-array',
    name: 'bracketDashArray',
    category: 'Bracket',
    icon: 'mdi-tournament',
    descriptionKey: 'utils.catalog.bracket_dash_array.description',
    descriptionFallback: 'Resolve SVG stroke-dasharray and stroke-linecap attributes from a CSS border-style value. Used by OrigamBracket to render dashed or dotted connector lines.',
    signature: `function bracketDashArray(
  borderStyle: string | null | undefined
): { dasharray?: string; linecap?: string }`,
    params: [
        {
            name: 'borderStyle',
            type: 'string | null | undefined',
            required: true,
            descriptionKey: 'utils.detail.bracket_dash_array.param_border_style',
            descriptionFallback: 'CSS border-style value: "dashed" → dasharray "8 5", "dotted" → dasharray "1 5" + linecap "round", anything else → empty object.',
        },
    ],
    returns: {
        type: '{ dasharray?: string; linecap?: string }',
        descriptionKey: 'utils.detail.bracket_dash_array.returns',
        descriptionFallback: 'Object with optional dasharray and linecap values ready to spread onto an SVG <line> or <path> element.',
    },
    sourceFile: 'packages/ds/src/utils/Bracket/bracket-surface.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.bracket_dash_array.example_basic',
            titleFallback: 'Map border-style to SVG stroke attributes',
            code: `import { bracketDashArray } from 'origam'

bracketDashArray('dashed')   // → { dasharray: '8 5' }
bracketDashArray('dotted')   // → { dasharray: '1 5', linecap: 'round' }
bracketDashArray('solid')    // → {}
bracketDashArray(null)       // → {}`,
            lang: 'typescript',
        },
    ],
    related: ['bracket-surface-vars'],
}
