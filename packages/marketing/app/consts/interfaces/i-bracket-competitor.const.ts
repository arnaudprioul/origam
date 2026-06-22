import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_BRACKET_COMPETITOR_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-bracket-competitor',
    name: 'IBracketCompetitor',
    category: 'Data & Models',
    descriptionKey: 'interfaces.catalog.i_bracket_competitor.description',
    descriptionFallback: 'A single competitor or team in a bracket match — intentionally generic (no sport/e-sport-specific distinction). Consumers can stash any extra payload under metadata.',
    definition: `export interface IBracketCompetitor {
    id: string | number
    name: string
    seed?: number
    avatar?: string
    metadata?: Record<string, unknown>
}`,
    extends: [],
    props: [
        { name: 'id', type: 'string | number', optional: false, descriptionFallback: 'Stable identifier — used to detect the winner via winnerId.' },
        { name: 'name', type: 'string', optional: false, descriptionFallback: 'Display name (team name, player tag, …).' },
        { name: 'seed', type: 'number', optional: true, descriptionFallback: 'Optional seed number (1 = top seed). Rendered before the name when showSeed is enabled.' },
        { name: 'avatar', type: 'string', optional: true, descriptionFallback: 'Optional avatar URL (team logo, country flag, player portrait). Rendered as a small <img> left of the name.' },
        { name: 'metadata', type: 'Record<string, unknown>', optional: true, descriptionFallback: 'Free-form payload — never read by the component.' },
    ],
    usedBy: [
        { slug: 'bracket', name: 'Bracket', kind: 'component' },
        { slug: 'bracket-competitor', name: 'BracketCompetitor', kind: 'component' },
        { slug: 'bracket-match', name: 'BracketMatch', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Bracket/bracket-competitor.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_bracket_competitor.example',
            titleFallback: 'Creating a competitor object',
            code: `import type { IBracketCompetitor } from 'origam'

const competitor: IBracketCompetitor = {
    id: 'team-liquid',
    name: 'Team Liquid',
    seed: 1,
    avatar: '/logos/team-liquid.png',
}`,
            lang: 'typescript',
        },
    ],
}
