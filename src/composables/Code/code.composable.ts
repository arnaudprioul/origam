import type { IUseCodeReturn } from '../../interfaces'
import type { TCodeLang } from '../../types'

import { CODE_CACHE_MAX_ENTRIES, CODE_SHIKI_THEMES, SUPPORTED_LANGS } from '../../consts'
import { CODE_LANG } from '../../enums'

/**
 * `useCode()` — singleton shiki highlighter.
 *
 * shiki is heavy (~3 MB of grammar + theme JSON when the full default set
 * is bundled). We therefore:
 *   1. Lazy-import the module on the first `highlight()` call so the cost
 *      is paid only when a `<OrigamCode>` actually mounts.
 *   2. Restrict the loaded langs / themes to the curated origam subset
 *      (see `SUPPORTED_LANGS` + `CODE_SHIKI_THEMES`).
 *   3. Cache the per-call HTML result in a tiny LRU keyed by
 *      `(code, lang, theme)` so re-renders / re-hovers never re-tokenise.
 *
 * The singleton is module-scoped — every `useCode()` consumer in the app
 * shares the same highlighter promise. `resetCacheForTesting()` is the
 * only test-only escape hatch.
 */

type ShikiHighlighter = {
    codeToHtml: (code: string, opts: { lang: string, theme: string }) => string
}

let _highlighterPromise: Promise<ShikiHighlighter> | null = null
let _highlighterReady = false
const _cache = new Map<string, string>()
let _unsupportedLangWarned = new Set<string>()

function makeCacheKey (code: string, lang: string, theme: string): string {
    return `${theme}::${lang}::${code}`
}

function lruGet (key: string): string | undefined {
    const hit = _cache.get(key)
    if (hit === undefined) return undefined
    // Re-insert to move the entry to the tail (most-recent slot). Map
    // preserves insertion order, which is exactly the LRU we want.
    _cache.delete(key)
    _cache.set(key, hit)
    return hit
}

function lruSet (key: string, value: string): void {
    if (_cache.size >= CODE_CACHE_MAX_ENTRIES) {
        // Evict the oldest entry — Map iteration order is insertion order,
        // so `keys().next().value` is the LRU victim.
        const oldest = _cache.keys().next().value
        if (oldest !== undefined) _cache.delete(oldest)
    }
    _cache.set(key, value)
}

async function loadHighlighter (): Promise<ShikiHighlighter> {
    if (_highlighterPromise) return _highlighterPromise

    _highlighterPromise = (async () => {
        // Dynamic import keeps shiki out of the initial bundle. The
        // `createHighlighter` factory takes the curated langs + themes
        // list so we only pay for what we ship.
        const shiki = await import('shiki')
        const highlighter = await shiki.createHighlighter({
            themes: [CODE_SHIKI_THEMES.light, CODE_SHIKI_THEMES.dark],
            langs: [...SUPPORTED_LANGS]
        })
        _highlighterReady = true
        return highlighter as unknown as ShikiHighlighter
    })()

    return _highlighterPromise
}

function resolveLang (lang: TCodeLang): string {
    if ((SUPPORTED_LANGS as ReadonlyArray<string>).includes(lang)) return lang
    if (!_unsupportedLangWarned.has(lang)) {
        _unsupportedLangWarned.add(lang)
         
        console.warn(
            `[origam] OrigamCode: lang="${lang}" is not in the bundled grammar set. ` +
            `Falling back to "${CODE_LANG.PLAINTEXT}". ` +
            `Supported: ${SUPPORTED_LANGS.join(', ')}.`
        )
    }
    return CODE_LANG.PLAINTEXT
}

/**
 * Public hook — see `IUseCodeReturn` for the surface contract.
 */
export function useCode (): IUseCodeReturn {
    async function highlight (
        code: string,
        lang: TCodeLang,
        themeName: 'light' | 'dark'
    ): Promise<string> {
        const resolvedLang = resolveLang(lang)
        const shikiTheme = themeName === 'dark' ? CODE_SHIKI_THEMES.dark : CODE_SHIKI_THEMES.light
        const key = makeCacheKey(code, resolvedLang, shikiTheme)
        const cached = lruGet(key)
        if (cached !== undefined) return cached

        const highlighter = await loadHighlighter()
        let html: string
        try {
            html = highlighter.codeToHtml(code, { lang: resolvedLang, theme: shikiTheme })
        } catch (err) {
            // shiki throws on truly malformed input. Degrade gracefully to
            // an escaped plaintext `<pre>` so the consumer never breaks.
             
            console.warn('[origam] OrigamCode: shiki failed to tokenise, falling back to plaintext.', err)
            html = highlighter.codeToHtml(code, { lang: CODE_LANG.PLAINTEXT, theme: shikiTheme })
        }
        lruSet(key, html)
        return html
    }

    async function prime (): Promise<void> {
        await loadHighlighter()
    }

    function isReady (): boolean {
        return _highlighterReady
    }

    function resetCacheForTesting (): void {
        _cache.clear()
        _unsupportedLangWarned = new Set<string>()
    }

    return { highlight, prime, isReady, resetCacheForTesting }
}

/**
 * Test-only: drop the singleton so a fresh dynamic import runs next call.
 * Production code should never need this.
 */
export function resetCodeHighlighterForTesting (): void {
    _highlighterPromise = null
    _highlighterReady = false
    _cache.clear()
    _unsupportedLangWarned = new Set<string>()
}
