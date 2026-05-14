/**
 * Runtime theme name applied to `<html data-theme="…">` (or to a sub-tree
 * via `<OrigamThemeProvider>`).
 *
 * - `'auto'`  : no `data-theme` attribute set; the browser picks light/dark
 *               from `prefers-color-scheme`.
 * - `'light'` : default light theme.
 * - `'dark'`  : dark theme.
 * - any other string is treated as a custom theme (e.g. `'brand-a'`) — the
 *   matching CSS file must be loaded by the consumer.
 */
export type TTheme = 'auto' | 'light' | 'dark' | (string & {})

/**
 * Concrete (resolved) theme — what `data-theme` actually equals after
 * resolving `'auto'`. Useful for components that need to know the
 * effective theme (e.g. switching an SVG asset).
 */
export type TThemeResolved = Exclude<TTheme, 'auto'>
