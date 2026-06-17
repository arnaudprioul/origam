import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const BRACKET_DEFAULT_LOSERS_LABEL_CONST_DOC: IConstDoc = {
    slug: 'bracket-default-losers-label',
    name: 'BRACKET_DEFAULT_LOSERS_LABEL',
    category: 'Data Display',
    descriptionKey: 'consts.catalog.bracket_default_losers_label.description',
    descriptionFallback: "Default heading rendered above the loser-bracket tree in a double-elimination layout. Override via the losersLabel prop (e.g. to localise). Kept as a literal in withDefaults, mirrored here for consumer reference.",
    definition: `export const BRACKET_DEFAULT_LOSERS_LABEL = 'Losers bracket'`,
    value: "'Losers bracket'",
    usedBy: [
        { name: 'OrigamBracket' },
    ],
    sourceFile: 'packages/ds/src/consts/Bracket/bracket.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.bracket_default_losers_label.example',
            titleFallback: 'Overriding the losers label',
            code: `import { BRACKET_DEFAULT_LOSERS_LABEL } from 'origam'

// Use as fallback when the consumer does not provide a label
const label = props.losersLabel ?? BRACKET_DEFAULT_LOSERS_LABEL`,
            lang: 'typescript',
        },
    ],
}
