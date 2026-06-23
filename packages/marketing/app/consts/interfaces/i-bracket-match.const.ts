import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_BRACKET_MATCH_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-bracket-match',
    name: 'IBracketMatch',
    category: 'Data & Models',
    descriptionKey: 'interfaces.catalog.i_bracket_match.description',
    descriptionFallback: 'A single match between two competitors. competitorA/B are nullable so the bracket can render "TBD" placeholders. scoreA/B accept string for non-numeric markers. nextMatchId lets OrigamBracket draw connectors automatically.',
    definition: `export interface IBracketMatch {
    id: string | number
    competitorA: IBracketCompetitor | null
    competitorB: IBracketCompetitor | null
    scoreA?: number | string
    scoreB?: number | string
    winnerId?: string | number | null
    status?: TBracketMatchStatus
    nextMatchId?: string | number
    advantage?: IBracketMatchAdvantage
    scheduledAt?: string
    metadata?: Record<string, unknown>
}`,
    extends: [],
    props: [
        { name: 'id', type: 'string | number', optional: false, descriptionFallback: 'Stable identifier — required for connector linking.' },
        { name: 'competitorA', type: 'IBracketCompetitor | null', optional: false, descriptionFallback: 'Left-side / top-side competitor. null = TBD or bye.' },
        { name: 'competitorB', type: 'IBracketCompetitor | null', optional: false, descriptionFallback: 'Right-side / bottom-side competitor. null = TBD or bye.' },
        { name: 'scoreA', type: 'number | string', optional: true, descriptionFallback: 'Score of competitorA. Accepts string for non-numeric markers.' },
        { name: 'scoreB', type: 'number | string', optional: true, descriptionFallback: 'Score of competitorB. Accepts string for non-numeric markers.' },
        { name: 'winnerId', type: 'string | number | null', optional: true, descriptionFallback: 'Identifier of the declared winner. Used to apply the --winner modifier class.' },
        { name: 'status', type: 'TBracketMatchStatus', optional: true, descriptionFallback: 'Optional lifecycle marker. Drives the visual --status-{value} modifier on the match card.' },
        { name: 'nextMatchId', type: 'string | number', optional: true, descriptionFallback: 'Optional id of the downstream match this one feeds into — used by the connector layout.' },
        { name: 'advantage', type: 'IBracketMatchAdvantage', optional: true, descriptionFallback: 'Optional head-start for one competitor (double-elimination Grand Final advantage).' },
        { name: 'scheduledAt', type: 'string', optional: true, descriptionFallback: 'ISO date string — informative only, displayed when present.' },
        { name: 'metadata', type: 'Record<string, unknown>', optional: true, descriptionFallback: 'Free-form payload — never read by the component.' },
    ],
    usedBy: [
        { slug: 'bracket', name: 'Bracket', kind: 'component' },
        { slug: 'bracket-match', name: 'BracketMatch', kind: 'component' },
        { slug: 'bracket-round', name: 'BracketRound', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Bracket/bracket-match.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_bracket_match.example',
            titleFallback: 'Defining a completed match',
            code: `import type { IBracketMatch } from 'origam'

const match: IBracketMatch = {
    id: 'sf-1',
    competitorA: { id: 'tl', name: 'Team Liquid' },
    competitorB: { id: 'c9', name: 'Cloud9' },
    scoreA: 3,
    scoreB: 1,
    winnerId: 'tl',
    status: 'completed',
    nextMatchId: 'final',
}`,
            lang: 'typescript',
        },
    ],
}
