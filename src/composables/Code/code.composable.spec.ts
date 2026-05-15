/**
 * Unit tests for `useCode` — the shiki singleton.
 *
 * We mock the `shiki` module so the suite doesn't have to load ~3 MB of
 * grammar JSON on every run. The mock records every `codeToHtml` call so
 * we can assert on the LRU cache: identical (code, lang, theme) → one
 * call to shiki, different triples → one call each.
 *
 * `resetCodeHighlighterForTesting()` flushes the module-scoped singleton
 * + cache between cases so the test order doesn't leak.
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'

import { CODE_LANG } from '../../enums'

const codeToHtml = vi.fn((code: string, opts: { lang: string, theme: string }) => {
    return `<pre data-lang="${opts.lang}" data-theme="${opts.theme}">${code}</pre>`
})

vi.mock('shiki', () => ({
    createHighlighter: vi.fn(async () => ({ codeToHtml }))
}))

// Import AFTER `vi.mock` so the composable picks up the mocked module.
import {
    resetCodeHighlighterForTesting,
    useCode
} from './code.composable'

describe('useCode', () => {
    beforeEach(() => {
        resetCodeHighlighterForTesting()
        codeToHtml.mockClear()
    })

    it('lazy-instantiates the highlighter on the first highlight() call', async () => {
        const { highlight, isReady } = useCode()
        expect(isReady()).toBe(false)

        const html = await highlight('const x = 1', CODE_LANG.TS, 'light')
        expect(html).toContain('const x = 1')
        expect(isReady()).toBe(true)
        expect(codeToHtml).toHaveBeenCalledTimes(1)
    })

    it('caches by (code, lang, theme) — same triple → one shiki call', async () => {
        const { highlight } = useCode()
        await highlight('a', CODE_LANG.TS, 'light')
        await highlight('a', CODE_LANG.TS, 'light')
        await highlight('a', CODE_LANG.TS, 'light')

        expect(codeToHtml).toHaveBeenCalledTimes(1)
    })

    it('different theme → distinct cache slot, distinct shiki call', async () => {
        const { highlight } = useCode()
        await highlight('a', CODE_LANG.TS, 'light')
        await highlight('a', CODE_LANG.TS, 'dark')

        expect(codeToHtml).toHaveBeenCalledTimes(2)
    })

    it('different lang → distinct cache slot, distinct shiki call', async () => {
        const { highlight } = useCode()
        await highlight('a', CODE_LANG.TS, 'light')
        await highlight('a', CODE_LANG.JS, 'light')

        expect(codeToHtml).toHaveBeenCalledTimes(2)
    })

    it('unsupported lang falls back to plaintext and warns once', async () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
        const { highlight } = useCode()

        // @ts-expect-error — intentionally passing an unsupported value.
        await highlight('x', 'rust', 'light')
        // @ts-expect-error — same, second call should not re-warn.
        await highlight('y', 'rust', 'light')

        expect(warn).toHaveBeenCalledTimes(1)
        // shiki gets called twice, but both with `plaintext` as lang.
        expect(codeToHtml).toHaveBeenCalledTimes(2)
        expect(codeToHtml).toHaveBeenNthCalledWith(1, 'x', { lang: CODE_LANG.PLAINTEXT, theme: 'github-light' })
        warn.mockRestore()
    })

    it('prime() warms the highlighter without calling codeToHtml', async () => {
        const { prime, isReady } = useCode()
        expect(isReady()).toBe(false)
        await prime()
        expect(isReady()).toBe(true)
        expect(codeToHtml).not.toHaveBeenCalled()
    })

    it('resetCacheForTesting() forces a re-tokenisation on the next call', async () => {
        const { highlight, resetCacheForTesting } = useCode()
        await highlight('a', CODE_LANG.TS, 'light')
        resetCacheForTesting()
        await highlight('a', CODE_LANG.TS, 'light')
        expect(codeToHtml).toHaveBeenCalledTimes(2)
    })
})
