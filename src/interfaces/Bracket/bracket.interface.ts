import type {
    ICommonsComponentProps,
    IDensityProps,
    IRoundedProps,
    ITagProps
} from '../../interfaces'

import type { TBracketVariant, TIntent } from '../../types'

import type { IBracketRound } from './bracket-round.interface'

/**
 * Props for `<OrigamBracket>` — a tournament tree renderer supporting
 * single-elimination, double-elimination and round-robin layouts.
 *
 * The component is purely presentational: it accepts an immutable
 * `rounds` payload and emits user-interaction events (`match-click`,
 * `winner-click`, `competitor-click`) so the consumer can update the
 * data and re-render. No internal state is held about scores or
 * winners — the data passed in is the source of truth.
 */
export interface IBracketProps extends ICommonsComponentProps, ITagProps, IDensityProps, IRoundedProps {
    /**
     * Required. Pre-ordered list of rounds. For single-elimination,
     * the rounds are laid out from earliest (e.g. round-of-16) to
     * final. For double-elimination, segregate by `IBracketRound.side`
     * (`'winner'`, `'loser'`, `'grand-final'`).
     */
    rounds: IBracketRound[]
    /**
     * Tournament shape. Single-elimination is the default.
     * Round-robin renders a NxN matrix instead of a tree.
     *
     * @default 'single-elimination'
     */
    variant?: TBracketVariant
    /**
     * Layout axis. Horizontal stacks rounds as columns (the classic
     * tournament tree look). Vertical stacks rounds as rows — useful
     * for narrow viewports. Ignored when `variant === 'round-robin'`
     * (the matrix layout has its own grid axis).
     *
     * @default 'horizontal'
     */
    direction?: 'horizontal' | 'vertical'
    /**
     * Toggle round headers (`<h3>Quarter-finals</h3>`).
     *
     * @default true
     */
    showRoundTitles?: boolean
    /**
     * Toggle the score column on each competitor row.
     *
     * @default true
     */
    showScores?: boolean
    /**
     * Toggle the seed prefix on competitor names (e.g. `1. Team Liquid`).
     *
     * @default false
     */
    showSeed?: boolean
    /**
     * Semantic intent driving the winner highlight color, the connector
     * "winner" stroke, and any focus rings.
     *
     * @default 'primary'
     */
    color?: TIntent
    /**
     * Whether match cards should be interactive (cursor, hover state,
     * keyboard focus). When `false`, click handlers still fire but the
     * cards do not advertise affordance.
     *
     * @default true
     */
    interactive?: boolean
}
