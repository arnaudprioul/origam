import type { ICommonsComponentProps, ITagProps } from '../../interfaces'

import type { TBracketMatchStatus, TIntent } from '../../types'

import type { IBracketMatch } from './bracket-match.interface'

/**
 * Props for `<OrigamBracketMatch>` — a single match card rendered
 * inside `<OrigamBracket>`. Exported so consumers can render a match
 * card outside the full bracket (e.g. on a match-details page).
 */
export interface IBracketMatchProps extends ICommonsComponentProps, ITagProps {
    /** The match payload to render. */
    match: IBracketMatch
    /**
     * Override of the per-match status — useful when the caller wants
     * to force a status (e.g. preview a "live" badge from a story).
     */
    status?: TBracketMatchStatus
    /**
     * Hoists the match into the "final" visual treatment — bigger
     * card, shadow, and rounded corners.
     *
     * @default false
     */
    isFinal?: boolean
    /**
     * Hides the score column when `false`.
     *
     * @default true
     */
    showScores?: boolean
    /**
     * Shows the seed prefix on competitor names.
     *
     * @default false
     */
    showSeed?: boolean
    /**
     * Whether the card advertises interactivity (hover state, cursor,
     * keyboard focus, `role="button"`).
     *
     * @default true
     */
    interactive?: boolean
    /** Intent color for the winner highlight. */
    color?: TIntent
}
