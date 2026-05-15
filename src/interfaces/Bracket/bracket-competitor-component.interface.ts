import type { ICommonsComponentProps, ITagProps } from '../../interfaces'

import type { TIntent } from '../../types'

import type { IBracketCompetitor } from './bracket-competitor.interface'

/**
 * Props for `<OrigamBracketCompetitor>` — a single competitor row.
 * Exported so consumers can render a competitor row standalone (e.g.
 * inside a custom match slot).
 */
export interface IBracketCompetitorProps extends ICommonsComponentProps, ITagProps {
    /**
     * The competitor payload. `null` renders a "TBD" placeholder — used
     * when the match's participant is not yet determined (winner of an
     * earlier round, byes, …).
     */
    competitor: IBracketCompetitor | null
    /** Optional score — accepts string for non-numeric markers. */
    score?: number | string
    /**
     * Whether to apply the `--winner` modifier class (bolder text,
     * intent-tinted background).
     *
     * @default false
     */
    isWinner?: boolean
    /**
     * Mirror the player-is-loser state. Used to lighten the row when
     * the match is completed and the consumer wants to de-emphasize
     * the losing side.
     *
     * @default false
     */
    isLoser?: boolean
    /**
     * Toggle the score column.
     *
     * @default true
     */
    showScore?: boolean
    /**
     * Toggle the seed prefix.
     *
     * @default false
     */
    showSeed?: boolean
    /**
     * Whether the row advertises interactivity (hover state, cursor).
     *
     * @default true
     */
    interactive?: boolean
    /** Intent color driving the winner highlight. */
    color?: TIntent
}
