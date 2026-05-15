import type { TSnackbarStackDirection, TSnackbarStackLocation } from '../../types'

/**
 * Closed list of valid `location` values for `OrigamSnackbarStack`.
 * Exposed so stories / consumers can iterate the matrix (e.g. for a
 * `HstSelect`) without duplicating string literals.
 */
export const SNACKBAR_STACK_LOCATIONS: ReadonlyArray<TSnackbarStackLocation> = [
    'top-left',
    'top-right',
    'top-center',
    'bottom-left',
    'bottom-right',
    'bottom-center',
    'top',
    'bottom'
]

/**
 * Closed list of valid `direction` values for `OrigamSnackbarStack`.
 */
export const SNACKBAR_STACK_DIRECTIONS: ReadonlyArray<TSnackbarStackDirection> = [
    'top-down',
    'bottom-up'
]

/**
 * Default stack `id` used by `useSnackbarStack` when the consumer
 * does not pass an explicit identifier. Multiple stacks can coexist
 * on the same page — each one is keyed by its own `id` in the
 * composable's internal `Map`.
 */
export const SNACKBAR_STACK_DEFAULT_ID = 'default'

/**
 * Default auto-dismiss timeout (ms) applied when neither the stack
 * nor the per-item options specify one. `0` (sticky) is allowed at
 * the item level.
 */
export const SNACKBAR_STACK_DEFAULT_DURATION = 5000

/**
 * Default maximum number of items rendered concurrently. Excess
 * items are evicted FIFO (oldest first).
 */
export const SNACKBAR_STACK_DEFAULT_MAX = 5

/**
 * Default gap between stacked items (CSS dimension).
 */
export const SNACKBAR_STACK_DEFAULT_SPACING = '12px'
