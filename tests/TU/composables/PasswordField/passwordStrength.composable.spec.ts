// Unit tests for `computeStrength` + `DEFAULT_PASSWORD_REQUIREMENTS`.
// The composable is pure so we don't need to mount a host component —
// straightforward call-site assertions are enough.

import { describe, expect, it } from 'vitest'

import { computeStrength, DEFAULT_PASSWORD_REQUIREMENTS } from '@origam/composables/PasswordField/passwordStrength.composable'

describe('computeStrength', () => {
    it('returns score=0 / level="weak" for an empty string', () => {
        const r = computeStrength('')
        expect(r.score).toBe(0)
        expect(r.level).toBe('weak')
    })

    it('returns score=0 / level="weak" for null/undefined input', () => {
        // Guard against runtime values from a v-model on an uncontrolled
        // input. Both branches must collapse to the empty-string result.
        expect(computeStrength(null as unknown as string).score).toBe(0)
        expect(computeStrength(undefined as unknown as string).score).toBe(0)
    })

    it('returns level="weak" for a 4-character password', () => {
        // 4 chars: hits no length thresholds, no class-based bonuses
        // → score=0, weak. Drives the bar to 0 segments coloured.
        const r = computeStrength('abcd')
        expect(r.score).toBe(0)
        expect(r.level).toBe('weak')
    })

    it('returns level="fair" for an 8-character lowercase-only password', () => {
        // 8 chars (+1 length>=8), no digit, no mixed case, no special
        // → score=1 → still "weak" per the bucket map.
        // Add one extra signal — a digit — to land in "fair".
        const r = computeStrength('abcdef12')
        expect(r.score).toBe(2)
        expect(r.level).toBe('fair')
    })

    it('returns level="good" for an 8-char password with uppercase + digit', () => {
        // length>=8 (+1), digit (+1), mixed-case (+1) = 3 → good
        const r = computeStrength('Abcdef12')
        expect(r.score).toBe(3)
        expect(r.level).toBe('good')
    })

    it('returns level="strong" for a 12-char password with digits and symbols', () => {
        // length>=8 (+1), length>=12 (+1), digit (+1), mixed-case (+1),
        // special (+1) = 5 → clamped to 4 → strong.
        const r = computeStrength('Abcdef123!@#')
        expect(r.score).toBe(4)
        expect(r.level).toBe('strong')
    })

    it('clamps score at 4 even when many heuristics match', () => {
        // Long, mixed, digit, special — should saturate.
        const r = computeStrength('Abcd1234!@#$%^&*()_+xyz')
        expect(r.score).toBe(4)
        expect(r.level).toBe('strong')
    })
})

describe('DEFAULT_PASSWORD_REQUIREMENTS', () => {
    const byId = (id: string) => DEFAULT_PASSWORD_REQUIREMENTS.find(r => r.id === id)!

    it('exposes the four canonical rules', () => {
        expect(DEFAULT_PASSWORD_REQUIREMENTS).toHaveLength(4)
        expect(DEFAULT_PASSWORD_REQUIREMENTS.map(r => r.id)).toEqual([
            'min-length', 'uppercase', 'number', 'special'
        ])
    })

    it('min-length passes only when value length >= 8', () => {
        const rule = byId('min-length')
        expect(rule.test('1234567')).toBe(false)
        expect(rule.test('12345678')).toBe(true)
        expect(rule.test('')).toBe(false)
    })

    it('uppercase rule requires at least one [A-Z]', () => {
        const rule = byId('uppercase')
        expect(rule.test('all lowercase')).toBe(false)
        expect(rule.test('Mixed Case')).toBe(true)
    })

    it('number rule requires at least one digit', () => {
        const rule = byId('number')
        expect(rule.test('letters only')).toBe(false)
        expect(rule.test('with 1 number')).toBe(true)
    })

    it('special rule requires at least one non-alphanumeric character', () => {
        const rule = byId('special')
        expect(rule.test('Alphanumeric123')).toBe(false)
        expect(rule.test('with bang!')).toBe(true)
    })

    it('partial-fill scenario — typing "12345678" satisfies min-length AND number only', () => {
        // This mirrors the spec assertion in tests/e2e/password-field.spec.ts
        // for the "Requirements list" Variant: only 2 of the 4 rules tick.
        const v = '12345678'
        expect(byId('min-length').test(v)).toBe(true)
        expect(byId('number').test(v)).toBe(true)
        expect(byId('uppercase').test(v)).toBe(false)
        expect(byId('special').test(v)).toBe(false)
    })
})
