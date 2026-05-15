import type {
    IBorderProps,
    ICommonsComponentProps,
    IElevationProps,
    IMarginProps,
    IPaddingProps,
    IRoundedProps,
    ITagProps
} from '../index'

import type { TCodeLang, TCodeTheme } from '../../types'

/**
 * Props for `<OrigamCode>` — a shiki-powered code block with line numbers,
 * line highlighting, copy button and theme awareness.
 *
 * Backward-compat note: the v2.x `<OrigamCode>` was a thin `<pre>` wrapper
 * with a `code` prop only. Every new prop below is optional with a
 * conservative default so existing call sites keep their behaviour
 * (plain-text, no line numbers, copy button visible).
 */
export interface ICodeProps extends ICommonsComponentProps, ITagProps, IBorderProps, IRoundedProps, IElevationProps, IPaddingProps, IMarginProps {
    /**
     * The code to highlight. When omitted, the default slot is used as the
     * source — useful for multi-line snippets that are nicer to read in
     * the template than as a JS string literal. When both are provided,
     * the prop wins.
     */
    code?: string
    /**
     * Language grammar to apply. One of the values in `SUPPORTED_LANGS`.
     * Unknown values fall back to `plaintext` (with a one-shot console
     * warning).
     */
    lang?: TCodeLang
    /**
     * Show a left gutter with line numbers. Pure CSS — uses a CSS counter
     * incremented per `.origam-code__row`, no JS layout work.
     */
    lineNumbers?: boolean
    /**
     * Lines to highlight. Accepts either a pre-computed array of 1-based
     * line numbers (`[2, 5, 6, 7]`) or a comma/range string (`'2,5-7'`)
     * that the component parses via `parseHighlightLines()`. `null` /
     * empty disables the feature.
     */
    highlightLines?: number[] | string | null
    /**
     * Show the copy-to-clipboard button in the top-right corner. Defaults
     * to `true` — most code blocks benefit from it.
     */
    copyable?: boolean
    /**
     * Cap the rendered block at this height and enable vertical scroll
     * past it. `null` (default) lets the block grow to fit its content.
     */
    maxHeight?: number | string | null
    /**
     * Theme override. `'auto'` (default) follows the document theme,
     * `'light'` / `'dark'` force a specific shiki theme.
     */
    theme?: TCodeTheme
    /**
     * Auto-format the code before highlighting. Reserved for v3 — prettier
     * is intentionally NOT bundled at runtime to keep the tarball small.
     * Currently a no-op; passing `true` warns once in dev and pre-formats
     * via a best-effort whitespace trim only.
     */
    format?: boolean
    /**
     * Wrap long lines instead of scrolling horizontally. Off by default so
     * the visual column matches the source file.
     */
    wrap?: boolean
    /**
     * Optional filename rendered in the header bar (e.g. `'App.vue'`).
     * When provided AND `copyable` is true, the header also hosts the copy
     * button; otherwise the copy button is absolutely positioned in the
     * top-right corner of the code surface.
     */
    filename?: string
}

/**
 * Public surface of the `useCode` composable. Lazily instantiates a shiki
 * highlighter on first call and reuses it across every `OrigamCode`
 * instance for the lifetime of the page.
 */
export interface IUseCodeReturn {
    /**
     * Render `code` to a pre-tokenised HTML string. Resolves once the
     * underlying shiki highlighter has loaded the requested language /
     * theme (lazy; ~200 ms cold, instant on subsequent calls).
     */
    highlight (code: string, lang: TCodeLang, themeName: 'light' | 'dark'): Promise<string>
    /**
     * Force the highlighter to load. Useful for stories / tests that want
     * to warm the cache before mounting consumers.
     */
    prime (): Promise<void>
    /**
     * Whether the singleton highlighter is ready. `false` on first paint,
     * flips to `true` once the dynamic import finishes.
     */
    isReady (): boolean
    /**
     * Wipe the LRU cache. Test-only — production code never needs this.
     */
    resetCacheForTesting (): void
}
