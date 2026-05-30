// ADR-004: the DS ships exactly ONE theme — `sobre` — which IS the `origam`
// base identity and the implicit default of `createOrigam`. This barrel is the
// single public source of that default so a consumer can reference it (e.g. to
// list it in a theme switcher alongside their own brands) WITHOUT duplicating
// it. The DS never ships opinionated demo brands; consumers author their own.
//
// Resolves to `origam/themes` via the package `"./*"` export. NOT generated —
// hand-authored sobre lives in `sobre.theme.ts` (the multi-brand preset
// generator was removed in ADR-004).
export { sobreDarkTheme, sobreLightTheme, sobreTheme } from './sobre.theme'
