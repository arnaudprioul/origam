import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const BRACKET_DEFAULT_MATCH_WIDTH_CONST_DOC: IConstDoc = {
    slug: 'bracket-default-match-width',
    name: 'BRACKET_DEFAULT_MATCH_WIDTH',
    category: 'Components',
    descriptionKey: 'consts.catalog.bracket_default_match_width.description',
    descriptionFallback: 'Default match card width (in px) used by the OrigamBracket layout algorithm when computing connector paths in horizontal mode. Mirrors the token bracket.match.width.',
    definition: `export const BRACKET_DEFAULT_MATCH_WIDTH = 240`,
    value: '240',
    usedBy: [
        { name: 'OrigamBracket', slug: 'bracket' },
    ],
    sourceFile: 'packages/ds/src/consts/Bracket/bracket.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.bracket_default_match_width.example',
            titleFallback: 'Overriding the default match width',
            code: `import { OrigamBracket } from 'origam'

// Pass a custom width to override the BRACKET_DEFAULT_MATCH_WIDTH (240px)
<OrigamBracket :matchWidth="320" :rounds="rounds" />`,
            lang: 'typescript',
        },
    ],
}
