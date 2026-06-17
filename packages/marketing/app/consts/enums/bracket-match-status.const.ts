import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const BRACKET_MATCH_STATUS_ENUM_DOC: IEnumDoc = {
    slug: 'bracket-match-status',
    name: 'BRACKET_MATCH_STATUS',
    category: 'Data Display',
    descriptionKey: 'enums.catalog.bracket_match_status.description',
    descriptionFallback: 'TypeScript enum for the status of a match in a tournament bracket (pending, live, completed, forfeited).',
    definition: `export enum BRACKET_MATCH_STATUS {
    PENDING   = 'pending',
    LIVE      = 'live',
    COMPLETED = 'completed',
    FORFEITED = 'forfeited',
}`,
    values: [
        { value: 'BRACKET_MATCH_STATUS.PENDING', descriptionKey: 'enums.detail.bracket_match_status.pending', descriptionFallback: 'Match has not started yet.' },
        { value: 'BRACKET_MATCH_STATUS.LIVE', descriptionKey: 'enums.detail.bracket_match_status.live', descriptionFallback: 'Match is currently in progress.' },
        { value: 'BRACKET_MATCH_STATUS.COMPLETED', descriptionKey: 'enums.detail.bracket_match_status.completed', descriptionFallback: 'Match has finished with a determined result.' },
        { value: 'BRACKET_MATCH_STATUS.FORFEITED', descriptionKey: 'enums.detail.bracket_match_status.forfeited', descriptionFallback: 'Match was forfeited — one or both participants did not compete.' },
    ],
    usedBy: [
        { slug: 'bracket', name: 'Bracket', propName: 'matchStatus' },
        { slug: 'bracket-round', name: 'BracketRound', propName: 'matchStatus' },
        { slug: 'bracket-match', name: 'BracketMatch', propName: 'status' },
    ],
    sourceFile: 'packages/ds/src/enums/Bracket/bracket-match-status.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.bracket_match_status.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { BRACKET_MATCH_STATUS } from 'origam'

const status: BRACKET_MATCH_STATUS = BRACKET_MATCH_STATUS.LIVE`,
            lang: 'typescript',
        },
    ],
}
