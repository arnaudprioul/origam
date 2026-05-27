import { describe, expect, it } from 'vitest'

import { gradientFromObject, isGradient, resolveGradient } from '@origam/utils/Commons/gradient.util'

describe('isGradient', () => {
    it('detects raw CSS linear-gradient strings', () => {
        expect(isGradient('linear-gradient(135deg, #ff0080, #7928ca)')).toBe(true)
        expect(isGradient('  linear-gradient(to right, red, blue)  ')).toBe(true)
    })

    it('detects radial / conic / repeating variants', () => {
        expect(isGradient('radial-gradient(circle, #fff, #000)')).toBe(true)
        expect(isGradient('conic-gradient(from 0deg, red, blue, red)')).toBe(true)
        expect(isGradient('repeating-linear-gradient(45deg, red 0 10px, blue 10px 20px)')).toBe(true)
    })

    it('detects preset names with the `gradient-` prefix', () => {
        expect(isGradient('gradient-sunset')).toBe(true)
        expect(isGradient('gradient-ocean')).toBe(true)
    })

    it('detects IGradient objects (short-form)', () => {
        expect(isGradient({ from: 'primary', to: 'success' })).toBe(true)
        expect(isGradient({ from: '#ff0080', to: '#7928ca', direction: 90 })).toBe(true)
    })

    it('detects IGradient objects (stops form)', () => {
        expect(isGradient({
            stops: [
                { color: 'primary', position: 0 },
                { color: 'success', position: 100 }
            ]
        })).toBe(true)
    })

    it('rejects intents, hex, transparent, null, undefined', () => {
        expect(isGradient('primary')).toBe(false)
        expect(isGradient('#ff00aa')).toBe(false)
        expect(isGradient('rgb(0,0,0)')).toBe(false)
        expect(isGradient('transparent')).toBe(false)
        expect(isGradient(null)).toBe(false)
        expect(isGradient(undefined)).toBe(false)
        expect(isGradient(false)).toBe(false)
        expect(isGradient('')).toBe(false)
        // Bare `gradient` (no slug) is not a preset
        expect(isGradient('gradient-')).toBe(false)
    })

    it('rejects malformed objects (missing from/to AND missing stops)', () => {
        expect(isGradient({})).toBe(false)
        expect(isGradient({ direction: 90 })).toBe(false)
        expect(isGradient({ stops: [{ color: 'primary', position: 0 }] })).toBe(false)
    })
})

describe('gradientFromObject', () => {
    it('builds a 2-stop linear gradient from intents', () => {
        const css = gradientFromObject({ from: 'primary', to: 'success' })
        expect(css).toBe(
            'linear-gradient(135deg, var(--origam-color__action--primary---bg), var(--origam-color__feedback--success---bg))'
        )
    })

    it('honours an explicit numeric direction', () => {
        const css = gradientFromObject({ from: 'primary', to: 'danger', direction: 45 })
        expect(css).toMatch(/^linear-gradient\(45deg,/)
    })

    it('honours a CSS keyword direction', () => {
        const css = gradientFromObject({ from: '#fff', to: '#000', direction: 'to right' })
        expect(css).toBe('linear-gradient(to right, #fff, #000)')
    })

    it('inserts an optional `via` stop in the middle', () => {
        const css = gradientFromObject({ from: 'primary', via: 'warning', to: 'danger' })
        expect(css).toContain('var(--origam-color__action--primary---bg)')
        expect(css).toContain('var(--origam-color__feedback--warning---bg)')
        expect(css).toContain('var(--origam-color__feedback--danger---bg)')
    })

    it('switches to radial-gradient with a sensible default position', () => {
        const css = gradientFromObject({ type: 'radial', from: '#fff', to: '#000' })
        expect(css).toBe('radial-gradient(circle at center, #fff, #000)')
    })

    it('switches to conic-gradient with a sensible default angle', () => {
        const css = gradientFromObject({ type: 'conic', from: 'primary', to: 'success' })
        expect(css).toMatch(/^conic-gradient\(from 0deg at 50% 50%,/)
    })

    it('uses the explicit stops array when provided (with positions)', () => {
        const css = gradientFromObject({
            stops: [
                { color: 'primary', position: 0 },
                { color: '#fff', position: 50 },
                { color: 'success', position: 100 }
            ]
        })
        expect(css).toBe(
            'linear-gradient(135deg, var(--origam-color__action--primary---bg) 0%, #fff 50%, var(--origam-color__feedback--success---bg) 100%)'
        )
    })

    it('mixes intents and raw colors freely', () => {
        const css = gradientFromObject({ from: 'primary', to: '#ff00aa' })
        expect(css).toContain('var(--origam-color__action--primary---bg)')
        expect(css).toContain('#ff00aa')
    })
})

describe('resolveGradient', () => {
    it('passes a CSS string through as-is', () => {
        const raw = 'linear-gradient(135deg, #ff0080, #7928ca)'
        expect(resolveGradient(raw)).toBe(raw)
    })

    it('resolves preset names to a CSS variable reference', () => {
        expect(resolveGradient('gradient-sunset')).toBe('var(--origam-gradient---sunset)')
        expect(resolveGradient('gradient-ocean')).toBe('var(--origam-gradient---ocean)')
    })

    it('resolves IGradient objects via gradientFromObject', () => {
        const out = resolveGradient({ from: 'primary', to: 'success', direction: 90 })
        expect(out).toBe(
            'linear-gradient(90deg, var(--origam-color__action--primary---bg), var(--origam-color__feedback--success---bg))'
        )
    })

    it('returns "" for non-gradient inputs', () => {
        expect(resolveGradient('primary')).toBe('')
        expect(resolveGradient('#ff00aa')).toBe('')
        expect(resolveGradient(null)).toBe('')
        expect(resolveGradient(undefined)).toBe('')
        expect(resolveGradient(false)).toBe('')
    })
})
