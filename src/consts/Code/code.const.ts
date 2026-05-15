import { CODE_LANG, CODE_THEME } from '../../enums'

/**
 * Languages bundled with the default shiki highlighter. Keep this list and
 * the `langs` argument of `createHighlighter()` in lockstep — see
 * `code.composable.ts`.
 */
export const SUPPORTED_LANGS: ReadonlyArray<CODE_LANG> = Object.freeze([
    CODE_LANG.PLAINTEXT,
    CODE_LANG.VUE,
    CODE_LANG.TS,
    CODE_LANG.JS,
    CODE_LANG.TSX,
    CODE_LANG.JSX,
    CODE_LANG.SCSS,
    CODE_LANG.CSS,
    CODE_LANG.JSON,
    CODE_LANG.BASH,
    CODE_LANG.HTML,
    CODE_LANG.XML,
    CODE_LANG.YAML,
    CODE_LANG.MD
])

/**
 * shiki theme names loaded by the singleton highlighter. We ship the
 * `github-light` / `github-dark` pair which match the origam token palette
 * out of the box (neutral grays, blue keywords, red strings). The
 * component's `theme` prop maps `CODE_THEME.LIGHT`/`DARK`/`AUTO` to these.
 */
export const CODE_SHIKI_THEMES = Object.freeze({
    light: 'github-light',
    dark: 'github-dark'
} as const)

/**
 * Maximum entries kept by the per-singleton LRU cache. 64 is large enough
 * for a page that renders dozens of small snippets, small enough that the
 * memory footprint stays under ~1 MB of pre-rendered HTML.
 */
export const CODE_CACHE_MAX_ENTRIES = 64

/**
 * Default values used by `OrigamCode`. Centralised so the story / docs /
 * tests pull the same constants and any future drift stays visible.
 */
export const CODE_DEFAULTS = Object.freeze({
    lang: CODE_LANG.PLAINTEXT,
    theme: CODE_THEME.AUTO,
    lineNumbers: false,
    copyable: true,
    wrap: false,
    format: false,
    /**
     * Feedback duration for the "Copied!" pill, in ms. Matches the
     * snackbar default so the visual rhythm stays consistent.
     */
    copyFeedbackDurationMs: 2000
} as const)
