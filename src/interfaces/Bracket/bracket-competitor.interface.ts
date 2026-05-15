/**
 * A single competitor / team in a bracket match.
 *
 * Kept intentionally generic — neither e-sport-specific (no `team` /
 * `player` distinction) nor sport-specific. Consumers can stash any
 * extra payload under `metadata`.
 */
export interface IBracketCompetitor {
    /** Stable identifier — used to detect the winner via `winnerId`. */
    id: string | number
    /** Display name (team name, player tag, …). */
    name: string
    /**
     * Optional seed number (`1` = top seed). When `showSeed` is enabled
     * on `OrigamBracket`, the seed is rendered before the name.
     */
    seed?: number
    /**
     * Optional avatar URL (team logo, country flag, player portrait).
     * Rendered as a small `<img>` left of the name.
     */
    avatar?: string
    /** Free-form payload — never read by the component. */
    metadata?: Record<string, unknown>
}
