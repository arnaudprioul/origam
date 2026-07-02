// The DS ships exactly ONE theme: `origam` — its neutral base identity and the
// implicit default `createOrigam` always injects (ROOT-scoped: `:root` light +
// `[data-mode="dark"]` dark, no `name`). This barrel is the single public source
// of that default so a consumer can reference it (e.g. as a baseline to extend).
// The DS never ships opinionated demo brands; consumers author their own.
export { origamDarkTheme, origamLightTheme, origamTheme } from './origam.theme'
