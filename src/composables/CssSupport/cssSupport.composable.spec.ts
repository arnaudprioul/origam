// Tests for `useCssSupport` — covers SSR fallback, feature detection
// against a mocked `CSS.supports`, caching, and the helper APIs.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { _resetCssSupportCache, useCssSupport } from './cssSupport.composable'

describe('useCssSupport', () => {
    let supportsSpy: ReturnType<typeof vi.fn>

    beforeEach(() => {
        _resetCssSupportCache()
        supportsSpy = vi.fn((query: string) => {
            // Mock: support modern features, refuse experimental ones.
            const supported = [
                'display: grid',
                'gap: 1px',
                '(container-type: inline-size)',
                'selector(:has(*))',
                'aspect-ratio: 1',
                'color: color-mix(in srgb, red, blue)',
                'accent-color: red',
                'width: min(10px, 20px)',
                'width: calc(min(10px, 20px) + max(5px, 8px))',
                'translate: 1px 1px',
                'margin-inline: 1px',
                'backdrop-filter: blur(1px)',
                'text-wrap: balance',
                'content-visibility: auto'
            ]
            return supported.includes(query)
        })
        // jsdom does not implement CSS.supports — provide a mock.
        // @ts-expect-error - extending global
        globalThis.CSS = { supports: supportsSpy }
    })

    afterEach(() => {
        _resetCssSupportCache()
        // @ts-expect-error - cleanup global
        delete globalThis.CSS
    })

    it('reports support for known features via the css map', () => {
        const { css } = useCssSupport()
        expect(css.value.grid).toBe(true)
        expect(css.value.has).toBe(true)
        expect(css.value.aspectRatio).toBe(true)
    })

    it('reports lack of support for experimental features', () => {
        const { css } = useCssSupport()
        expect(css.value.subgrid).toBe(false)
        expect(css.value.anchorPositioning).toBe(false)
        expect(css.value.viewTransitions).toBe(false)
    })

    it('caches CSS.supports() calls', () => {
        const { supports } = useCssSupport()
        supports('display: grid')
        supports('display: grid')
        supports('display: grid')
        // 1 call from initialisation + 1 (the rest are cached) = 2
        // Note: ensureInitialized runs detectAll once which queries every
        // feature, so the call counter is offset by the size of FEATURE_QUERIES.
        const gridCalls = supportsSpy.mock.calls.filter(([q]) => q === 'display: grid').length
        expect(gridCalls).toBe(1)
    })

    it('supports() handles arbitrary queries', () => {
        const { supports } = useCssSupport()
        expect(supports('display: grid')).toBe(true)
        expect(supports('display: -ms-grid')).toBe(false)
    })

    it('supportsAny() returns true if at least one query matches', () => {
        const { supportsAny } = useCssSupport()
        expect(supportsAny('display: -ms-grid', 'display: grid')).toBe(true)
        expect(supportsAny('display: -ms-grid', 'foo: bar')).toBe(false)
    })

    it('supportsAll() returns true only if every query matches', () => {
        const { supportsAll } = useCssSupport()
        expect(supportsAll('display: grid', 'gap: 1px')).toBe(true)
        expect(supportsAll('display: grid', 'foo: bar')).toBe(false)
    })

    it('has() returns a reactive computed flag', () => {
        const { has } = useCssSupport()
        const hasGrid = has('grid')
        expect(hasGrid.value).toBe(true)
        const hasSubgrid = has('subgrid')
        expect(hasSubgrid.value).toBe(false)
    })

    it('returns all-false in SSR / non-browser env (no CSS global)', () => {
        _resetCssSupportCache()
        // @ts-expect-error - simulate SSR
        delete globalThis.CSS
        const { css, supports } = useCssSupport()
        expect(css.value.grid).toBe(false)
        expect(css.value.has).toBe(false)
        expect(supports('display: grid')).toBe(false)
    })

    it('handles CSS.supports throwing gracefully', () => {
        _resetCssSupportCache()
        // @ts-expect-error - mock that throws
        globalThis.CSS = { supports: () => { throw new Error('boom') } }
        const { supports } = useCssSupport()
        expect(supports('foo: bar')).toBe(false)
    })
})
