import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const BRACKET_DEFAULT_ROUND_GAP_CONST_DOC: IConstDoc = {
    slug: 'bracket-default-round-gap',
    name: 'BRACKET_DEFAULT_ROUND_GAP',
    category: 'Components',
    descriptionKey: 'consts.catalog.bracket_default_round_gap.description',
    descriptionFallback: 'Default horizontal gap (in px) between rounds in the OrigamBracket layout. Mirrors the token bracket.gap-round.',
    definition: `export const BRACKET_DEFAULT_ROUND_GAP = 48`,
    value: '48',
    usedBy: [
        { name: 'OrigamBracket', slug: 'bracket' },
    ],
    sourceFile: 'packages/ds/src/consts/Bracket/bracket.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.bracket_default_round_gap.example',
            titleFallback: 'Overriding the default round gap',
            code: `import { OrigamBracket } from 'origam'

// BRACKET_DEFAULT_ROUND_GAP is 48px; increase for more spacing
<OrigamBracket :roundGap="80" :rounds="rounds" />`,
            lang: 'typescript',
        },
    ],
}
