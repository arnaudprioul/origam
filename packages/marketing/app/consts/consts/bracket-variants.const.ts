import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const BRACKET_VARIANTS_CONST_DOC: IConstDoc = {
    slug: 'bracket-variants',
    name: 'BRACKET_VARIANTS',
    category: 'Components',
    descriptionKey: 'consts.catalog.bracket_variants.description',
    descriptionFallback: 'Closed list of valid variant values for OrigamBracket. Exposed so stories and consumers can iterate the matrix without duplicating string literals.',
    definition: `export const BRACKET_VARIANTS: ReadonlyArray<TBracketVariant> = [
    'single-elimination',
    'double-elimination',
    'round-robin'
]`,
    values: [
        { value: "'single-elimination'", descriptionKey: 'consts.detail.bracket_variants.single_elimination', descriptionFallback: 'Single-elimination tournament — one loss ends the run.' },
        { value: "'double-elimination'", descriptionKey: 'consts.detail.bracket_variants.double_elimination', descriptionFallback: 'Double-elimination — participants drop to a losers bracket before being eliminated.' },
        { value: "'round-robin'", descriptionKey: 'consts.detail.bracket_variants.round_robin', descriptionFallback: 'Round-robin — every participant plays every other participant once.' },
    ],
    usedBy: [
        { name: 'OrigamBracket', slug: 'bracket' },
    ],
    sourceFile: 'packages/ds/src/consts/Bracket/bracket.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.bracket_variants.example',
            titleFallback: 'Building a variant picker from BRACKET_VARIANTS',
            code: `import { BRACKET_VARIANTS } from 'origam'

// Iterate to build a select options list
BRACKET_VARIANTS.forEach(v => console.log(v))
// 'single-elimination', 'double-elimination', 'round-robin'`,
            lang: 'typescript',
        },
    ],
}
