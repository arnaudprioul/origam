import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_BRACKET_MATCH_ADVANTAGE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-bracket-match-advantage',
    name: 'IBracketMatchAdvantage',
    category: 'Data & Models',
    descriptionKey: 'interfaces.catalog.i_bracket_match_advantage.description',
    descriptionFallback: 'Head-start carried into a match by one competitor — the classic double-elimination Grand Final advantage, where the Winner Bracket champion starts already up by one round/set.',
    definition: `export interface IBracketMatchAdvantage {
    competitorId: string | number
    rounds?: number
}`,
    extends: [],
    props: [
        { name: 'competitorId', type: 'string | number', optional: false, descriptionFallback: 'Id of the competitor that starts ahead.' },
        { name: 'rounds', type: 'number', optional: true, default: '1', descriptionFallback: 'Size of the head start, in rounds/sets.' },
    ],
    usedBy: [
        { slug: 'bracket-match', name: 'BracketMatch', kind: 'component' },
        { slug: 'bracket', name: 'Bracket', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Bracket/bracket-match.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_bracket_match_advantage.example',
            titleFallback: 'Grand Final advantage for the winners bracket champion',
            code: `import type { IBracketMatchAdvantage } from 'origam'

const advantage: IBracketMatchAdvantage = {
    competitorId: 'winners-bracket-champ',
    rounds: 1,
}`,
            lang: 'typescript',
        },
    ],
}
