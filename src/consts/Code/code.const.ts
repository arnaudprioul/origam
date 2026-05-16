import { CODE_LANG } from '../../enums'

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
