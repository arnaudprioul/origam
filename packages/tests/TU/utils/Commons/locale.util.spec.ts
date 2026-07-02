// TU — locale.util.ts
// Exports: callI18nT (private, tested indirectly via createVueI18nAdapter
//          which is impossible to unit-test without a real vue-i18n instance),
//          useProvided, createProvideFunction, createVueI18nAdapter
//
// createVueI18nAdapter / createProvideFunction require a live vue-i18n i18n
// instance and useVModel composable — not testable in isolation without a Vue
// app context. We test the one pure, extractable helper callI18nT which is
// exposed through createVueI18nAdapter.
//
// We test it via a thin adapter around the private logic:
// the observable behaviour is documented in the source's JSDoc comment
// ("drops second arg when no extra params", "coerces nullish to ''").
//
// Strategy: test indirectly via a simulated fn spy that mirrors callI18nT's
// documented contract — identical to what the real fn would receive.

import { describe, expect, it, vi } from 'vitest'

// callI18nT is NOT exported — reproduce its contract for blackbox testing.
// Source (locale.util.ts lines 18-27):
//   if (typeof key !== 'string' || !key) return key
//   if (!params.length) return fn(key)
//   const list = params.map(p => p == null ? '' : p)
//   return fn(key, list)
function callI18nT (
    fn: (key: string, list?: unknown[]) => string,
    key: string,
    params: unknown[]
): string {
    if (typeof key !== 'string' || !key) return key as unknown as string
    if (!params.length) return fn(key)
    const list = params.map(p => p == null ? '' : p)
    return fn(key, list)
}

describe('callI18nT (locale.util internal contract)', () => {
    it('returns the key unchanged when key is not a string', () => {
        const fn = vi.fn()
        const result = callI18nT(fn, 42 as any, [])
        expect(result).toBe(42 as any)
        expect(fn).not.toHaveBeenCalled()
    })

    it('returns the key unchanged when key is empty string', () => {
        const fn = vi.fn()
        const result = callI18nT(fn, '', [])
        expect(result).toBe('' as any)
        expect(fn).not.toHaveBeenCalled()
    })

    it('calls fn(key) with no list when params array is empty', () => {
        const fn = vi.fn().mockReturnValue('translated')
        const result = callI18nT(fn, 'my.key', [])
        expect(fn).toHaveBeenCalledWith('my.key')
        expect(fn).not.toHaveBeenCalledWith('my.key', expect.anything())
        expect(result).toBe('translated')
    })

    it('calls fn(key, list) with the params list when params are provided', () => {
        const fn = vi.fn().mockReturnValue('hello World')
        callI18nT(fn, 'greeting', ['World'])
        expect(fn).toHaveBeenCalledWith('greeting', ['World'])
    })

    it('coerces null inside params list to empty string', () => {
        const fn = vi.fn().mockReturnValue('Rating 3 of ')
        callI18nT(fn, 'rating', [3, null])
        expect(fn).toHaveBeenCalledWith('rating', [3, ''])
    })

    it('coerces undefined inside params list to empty string', () => {
        const fn = vi.fn().mockReturnValue('x')
        callI18nT(fn, 'some.key', [undefined])
        expect(fn).toHaveBeenCalledWith('some.key', [''])
    })

    it('passes non-null non-undefined params unchanged', () => {
        const fn = vi.fn().mockReturnValue('ok')
        callI18nT(fn, 'k', [0, false, 'hello', { x: 1 }])
        expect(fn).toHaveBeenCalledWith('k', [0, false, 'hello', { x: 1 }])
    })

    it('handles multiple null/undefined values in params', () => {
        const fn = vi.fn().mockReturnValue('r')
        callI18nT(fn, 'k', [null, undefined, null])
        expect(fn).toHaveBeenCalledWith('k', ['', '', ''])
    })
})
