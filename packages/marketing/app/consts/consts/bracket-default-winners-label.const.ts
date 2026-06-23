import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const BRACKET_DEFAULT_WINNERS_LABEL_CONST_DOC: IConstDoc = {
    slug: 'bracket-default-winners-label',
    name: 'BRACKET_DEFAULT_WINNERS_LABEL',
    category: 'Components',
    descriptionKey: 'consts.catalog.bracket_default_winners_label.description',
    descriptionFallback: 'Default heading rendered above the winner-bracket tree in a double-elimination OrigamBracket layout. Override via the winnersLabel prop to localise.',
    definition: `export const BRACKET_DEFAULT_WINNERS_LABEL = 'Winners bracket'`,
    value: "'Winners bracket'",
    usedBy: [
        { name: 'OrigamBracket', slug: 'bracket' },
    ],
    sourceFile: 'packages/ds/src/consts/Bracket/bracket.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.bracket_default_winners_label.example',
            titleFallback: 'Overriding the winners label for localisation',
            code: `import { OrigamBracket } from 'origam'

// Override the default "Winners bracket" label
<OrigamBracket winnersLabel="Gagnants" :rounds="rounds" />`,
            lang: 'typescript',
        },
    ],
}
