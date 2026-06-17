import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const BRACKET_MATCH_STATUSES_CONST_DOC: IConstDoc = {
    slug: 'bracket-match-statuses',
    name: 'BRACKET_MATCH_STATUSES',
    category: 'Components',
    descriptionKey: 'consts.catalog.bracket_match_statuses.description',
    descriptionFallback: 'Closed list of valid status values for IBracketMatch.status. Used to validate and iterate match states in OrigamBracket.',
    definition: `export const BRACKET_MATCH_STATUSES: ReadonlyArray<TBracketMatchStatus> = [
    'pending',
    'live',
    'completed',
    'forfeited'
]`,
    values: [
        { value: "'pending'", descriptionKey: 'consts.detail.bracket_match_statuses.pending', descriptionFallback: 'Match has not started yet.' },
        { value: "'live'", descriptionKey: 'consts.detail.bracket_match_statuses.live', descriptionFallback: 'Match is currently in progress.' },
        { value: "'completed'", descriptionKey: 'consts.detail.bracket_match_statuses.completed', descriptionFallback: 'Match finished with a winner.' },
        { value: "'forfeited'", descriptionKey: 'consts.detail.bracket_match_statuses.forfeited', descriptionFallback: 'Match was forfeited by one of the participants.' },
    ],
    usedBy: [
        { name: 'OrigamBracket', slug: 'bracket' },
    ],
    sourceFile: 'packages/ds/src/consts/Bracket/bracket.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.bracket_match_statuses.example',
            titleFallback: 'Checking a match status is valid',
            code: `import { BRACKET_MATCH_STATUSES } from 'origam'

const isValidStatus = (s: string) => BRACKET_MATCH_STATUSES.includes(s as never)`,
            lang: 'typescript',
        },
    ],
}
