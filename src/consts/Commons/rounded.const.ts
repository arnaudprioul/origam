import { ROUNDED } from '../../enums'

import type { TRounded } from '../../types'

/**
 * Regex used to detect a free-form CSS border-radius string the consumer
 * can pass via `rounded="4px"` / `"4px 0 4px 0"` / etc. Each value can
 * carry a unit (px/em/%/…) OR be a unit-less `0` (CSS allows zero without
 * a unit). Anything that doesn't match falls through to the named-variant
 * or boolean branches.
 *
 * Example matches: `4px`, `0`, `4px 0 4px 0`, `4px 4px 0 0`, `1.5rem`.
 */
export const BORDER_RADIUS_REGEX = /^(?<radius>(?: ?(?:0|(?:[0-9]+(?:\.[0-9]+)?)(?:px|pt|PC|in|cm|mm|em|rem|%|ex|ch|fr))){0,4})$/

/**
 * Whitelist of named radius variants. Mirrors `useDensity` /
 * `PREDIFINED_DENSITY` so the composable can decide between
 * `--rounded-{name}` (class output) and an inline `border-radius`
 * declaration.
 */
export const PREDIFINED_ROUNDED: Array<TRounded> = [
    ROUNDED.X_SMALL,
    ROUNDED.SMALL,
    ROUNDED.DEFAULT,
    ROUNDED.MEDIUM,
    ROUNDED.LARGE,
    ROUNDED.X_LARGE,
    ROUNDED.SHAPED,
    ROUNDED.SHAPED_INVERT
]
