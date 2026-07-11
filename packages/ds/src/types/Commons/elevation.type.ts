/**
 * `elevation` prop accepted by every component that consumes
 * `useElevation` (`src/composables/Commons/elevation.composable.ts`).
 *
 * Three shapes are supported:
 *   - An origam-native shadow rung name — `'none' | 'xs' | 'sm' | 'md' |
 *     'lg' | 'xl' | '2xl' | '3xl'` — resolves to `var(--origam-shadow---{rung})`.
 *   - A Material-style numeric elevation (`0..24`, as a `number` or a
 *     numeric `string`) — bucketised onto the origam shadow ladder.
 *   - A free-form custom `box-shadow` value (`var(...)`, `calc(...)`,
 *     a literal shadow list like `'0 4px 12px rgba(0,0,0,.24)'`, multiple
 *     comma-separated layers, `inset`, …) — emitted verbatim as
 *     `box-shadow: <value>`. Mirrors the `TRounded` custom-string escape
 *     hatch (`isCustomBorderRadius` in `rounded.util.ts`).
 *
 * The type stays a loose `number | string` union on purpose — the three
 * shapes above are disambiguated at runtime by `useElevation`, not by the
 * type system (same approach as `TRounded` for free-form radii).
 */
export type TElevation = number | string
