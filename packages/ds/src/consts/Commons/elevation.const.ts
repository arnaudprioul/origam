/**
 * Origam-native shadow rungs accepted as a string `elevation` prop
 * on every component that consumes the `useElevation` composable.
 * Matches the token rungs under `--origam-shadow-{rung}` in
 * `src/assets/css/tokens/origam-utilities.css`.
 *
 * Lookup is identity (rung name == token suffix). Numeric inputs
 * still flow through `elevationToToken` separately.
 */
export const ORIGAM_SHADOW_RUNGS: ReadonlySet<string> = new Set([
    'none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'
])

/**
 * Subset of shadow rungs for which a global utility class exists in
 * `src/assets/css/tokens/origam-utilities.css` (Phase 1 manifest).
 * `2xl` and `3xl` are not yet emitted as utilities — they fall back
 * to the inline-style path.
 */
export const UTILITY_SHADOW_RUNGS: ReadonlySet<string> = new Set([
    'none', 'xs', 'sm', 'md', 'lg', 'xl'
])
