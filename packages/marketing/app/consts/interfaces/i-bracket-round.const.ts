import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_BRACKET_ROUND_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-bracket-round',
    name: 'IBracketRound',
    category: 'Data & Models',
    descriptionKey: 'interfaces.catalog.i_bracket_round.description',
    descriptionFallback: 'A round (column in horizontal mode, row in vertical mode) of the tournament tree. Title is required — OrigamBracket renders it above/beside the matches list. The side property is only meaningful for double-elimination.',
    definition: `export interface IBracketRound {
    id: string | number
    title: string
    matches: IBracketMatch[]
    side?: TBracketRoundSide
}`,
    extends: [],
    props: [
        { name: 'id', type: 'string | number', optional: false, descriptionFallback: 'Stable identifier — used as key and in slot scopes.' },
        { name: 'title', type: 'string', optional: false, descriptionFallback: 'Pre-translated label ("Quarter-finals", "Semi-finals", "Final"). The component does not call useT.' },
        { name: 'matches', type: 'IBracketMatch[]', optional: false, descriptionFallback: 'Ordered list of matches that belong to this round.' },
        { name: 'side', type: 'TBracketRoundSide', optional: true, descriptionFallback: 'Optional bracket-side marker for double-elimination layouts. Drives grouping into Winner/Loser Bracket/Grand Final sections.' },
    ],
    usedBy: [
        { slug: 'bracket', name: 'Bracket', kind: 'component' },
        { slug: 'bracket-round', name: 'BracketRound', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Bracket/bracket-round.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_bracket_round.example',
            titleFallback: 'Defining a semi-final round',
            code: `import type { IBracketRound } from 'origam'

const round: IBracketRound = {
    id: 'sf',
    title: 'Semi-finals',
    matches: [matchA, matchB],
}`,
            lang: 'typescript',
        },
    ],
}
