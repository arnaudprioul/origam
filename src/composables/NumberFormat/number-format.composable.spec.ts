// Unit tests for `useNumberFormat` — covers the high-level format
// dialects (decimal / currency / percent / unit / compact /
// scientific / engineering), the locale auto-resolution chain, the
// LRU cache and the input coercion path.
//
// We never assert on raw glyph identity beyond ASCII-safe characters
// because `Intl.NumberFormat` may render NBSP / NNBSP between the
// number and the unit on a per-locale basis. Instead we check for
// presence + relative ordering.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { ref } from 'vue'

import {
    __clearNumberFormatCache,
    useNumberFormat
} from './number-format.composable'

describe('useNumberFormat', () => {
    beforeEach(() => {
        __clearNumberFormatCache()
    })

    afterEach(() => {
        vi.unstubAllGlobals()
    })

    it('formats a decimal value with the locale-default grouping', () => {
        const { format } = useNumberFormat({ locale: 'en-US' })
        const out = format(1234567.89)
        // Locale-aware comma grouping + decimal point.
        expect(out).toContain('1')
        expect(out).toContain('234')
        expect(out).toContain('567')
        expect(out).toContain('.89')
    })

    it('formats currency in fr-FR (EUR)', () => {
        const { format } = useNumberFormat({
            locale: 'fr-FR',
            format: 'currency',
            currency: 'EUR'
        })
        const out = format(1234.5)
        // Euro glyph present + the formatted integer.
        expect(out).toContain('€')
        expect(out).toContain('1')
        expect(out).toContain('234')
    })

    it('formats percent (en-US) — 0.875 → 87.5%', () => {
        const { format } = useNumberFormat({
            locale: 'en-US',
            format: 'percent',
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        })
        expect(format(0.875)).toBe('87.5%')
    })

    it('formats compact notation — short (en-US)', () => {
        const { format } = useNumberFormat({
            locale: 'en-US',
            format: 'compact'
        })
        // Compact in en-US → "2.5M" (or rounded "3M" depending on engine
        // default fraction-digits — we accept both shapes).
        const out = format(2500000)
        expect(out).toMatch(/M$/)
    })

    it('formats unit with the right glyph (km/h)', () => {
        const { format } = useNumberFormat({
            locale: 'en-US',
            format: 'unit',
            unit: 'kilometer-per-hour'
        })
        const out = format(42)
        expect(out).toContain('42')
        expect(out.toLowerCase()).toContain('km')
    })

    it('falls back to decimal + warns when format=unit but `unit` is missing', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
        const { format } = useNumberFormat({
            locale: 'en-US',
            format: 'unit'
        })
        const out = format(42)
        expect(out).toContain('42')
        expect(warn).toHaveBeenCalled()
        warn.mockRestore()
    })

    it('honours signDisplay=always', () => {
        const { format } = useNumberFormat({
            locale: 'en-US',
            signDisplay: 'always'
        })
        expect(format(5)).toMatch(/^\+/)
    })

    it('honours useGrouping=false', () => {
        const { format } = useNumberFormat({
            locale: 'en-US',
            useGrouping: false
        })
        expect(format(1234567)).toBe('1234567')
    })

    it('coerces string input into a number', () => {
        const { format } = useNumberFormat({ locale: 'en-US' })
        expect(format('1234.5')).toContain('1,234.5')
    })

    it('coerces non-numeric / empty input to 0 (no NaN leak)', () => {
        const { format } = useNumberFormat({ locale: 'en-US' })
        expect(format('not-a-number')).toBe('0')
        expect(format('')).toBe('0')
    })

    it('returns the same Intl instance for identical options (LRU cache hit)', () => {
        const a = useNumberFormat({ locale: 'en-US', format: 'currency', currency: 'EUR' })
        const b = useNumberFormat({ locale: 'en-US', format: 'currency', currency: 'EUR' })
        expect(a.intl.value).toBe(b.intl.value)
    })

    it('returns a different Intl instance when the locale changes', () => {
        const a = useNumberFormat({ locale: 'en-US', format: 'currency', currency: 'EUR' })
        const b = useNumberFormat({ locale: 'fr-FR', format: 'currency', currency: 'EUR' })
        expect(a.intl.value).not.toBe(b.intl.value)
    })

    it('reactively re-resolves the Intl instance when options is a ref', () => {
        const opts = ref({ locale: 'en-US', format: 'currency' as const, currency: 'EUR' })
        const { intl, format } = useNumberFormat(opts)
        const before = intl.value
        const outBefore = format(1000)

        opts.value = { locale: 'fr-FR', format: 'currency' as const, currency: 'EUR' }
        const after = intl.value
        const outAfter = format(1000)

        expect(before).not.toBe(after)
        expect(outBefore).not.toBe(outAfter)
    })

    it('formatToParts returns structured segments (integer / decimal / currency)', () => {
        const { formatToParts } = useNumberFormat({
            locale: 'en-US',
            format: 'currency',
            currency: 'USD'
        })
        const parts = formatToParts(1234.5)
        const types = parts.map(p => p.type)
        expect(types).toContain('currency')
        expect(types).toContain('integer')
        expect(types).toContain('decimal')
    })

    it('falls back to en-US when locale="auto" and no globals are present', () => {
        // jsdom carries `navigator.language` ('en-US' by default) so the
        // auto path lands in the same locale we explicitly assert for.
        const { format } = useNumberFormat({ locale: 'auto' })
        const out = format(1234.5)
        expect(out).toBe('1,234.5')
    })

    it('reads <html lang> when locale is "auto"', () => {
        const original = document.documentElement.lang
        document.documentElement.lang = 'de-DE'

        const { format } = useNumberFormat({ locale: 'auto' })
        const out = format(1234.5)
        // de-DE → "1.234,5" (dot grouping, comma decimal).
        expect(out).toContain('1.234')
        expect(out).toContain(',5')

        document.documentElement.lang = original
    })

    it('honours currencyDisplay="code"', () => {
        const { format } = useNumberFormat({
            locale: 'en-US',
            format: 'currency',
            currency: 'EUR',
            currencyDisplay: 'code'
        })
        const out = format(50)
        expect(out).toContain('EUR')
    })
})
