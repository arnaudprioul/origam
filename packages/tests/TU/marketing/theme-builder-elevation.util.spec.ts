// Contrôle 4 (Elevation) — "Autre" Option A (depth 0-24) and Option B (full
// shadow composer) both write straight into the single `elevation` prop
// (verified live since PR #210 / `isCustomBoxShadow`, task #14).
import { describe, expect, it } from 'vitest'

import {
    createDefaultShadowLayer,
    serializeElevationDepth,
    serializeShadowLayer,
    serializeShadowLayers
} from '~/utils/theme-builder-elevation.util'

describe('theme-builder-elevation.util', () => {
    describe('serializeElevationDepth', () => {
        it('serialises an in-range depth as a bare numeric string', () => {
            expect(serializeElevationDepth(10)).toBe('10')
        })

        it('clamps below 0 to 0', () => {
            expect(serializeElevationDepth(-5)).toBe('0')
        })

        it('clamps above 24 to 24', () => {
            expect(serializeElevationDepth(99)).toBe('24')
        })

        it('rounds a fractional depth', () => {
            expect(serializeElevationDepth(10.6)).toBe('11')
        })
    })

    describe('serializeShadowLayer', () => {
        it('serialises offsets/blur/spread + hex colour converted to rgba using opacity', () => {
            const layer = { x: 0, y: 4, blur: 10, spread: 0, color: '#000000', opacity: 35, inset: false }
            expect(serializeShadowLayer(layer)).toBe('0px 4px 10px 0px rgba(0, 0, 0, 0.35)')
        })

        it('prefixes "inset " when inset is true', () => {
            const layer = { x: 1, y: 2, blur: 3, spread: 4, color: '#ffffff', opacity: 100, inset: true }
            expect(serializeShadowLayer(layer)).toBe('inset 1px 2px 3px 4px rgba(255, 255, 255, 1)')
        })

        it('passes a non-hex colour value through untouched (e.g. an already-resolved token)', () => {
            const layer = { x: 0, y: 0, blur: 0, spread: 0, color: 'rgba(10, 20, 30, 0.5)', opacity: 50, inset: false }
            expect(serializeShadowLayer(layer)).toBe('0px 0px 0px 0px rgba(10, 20, 30, 0.5)')
        })

        it('expands a 3-digit hex colour', () => {
            const layer = { x: 0, y: 0, blur: 0, spread: 0, color: '#0f0', opacity: 100, inset: false }
            expect(serializeShadowLayer(layer)).toBe('0px 0px 0px 0px rgba(0, 255, 0, 1)')
        })
    })

    describe('serializeShadowLayers', () => {
        it('comma-joins multiple layers, each serialised independently', () => {
            const first = createDefaultShadowLayer()
            const second = { ...createDefaultShadowLayer(), y: 8 }
            const result = serializeShadowLayers([first, second])
            expect(result).toBe(`${serializeShadowLayer(first)}, ${serializeShadowLayer(second)}`)
        })

        it('produces a single layer string unchanged for a 1-element array', () => {
            const layer = createDefaultShadowLayer()
            expect(serializeShadowLayers([layer])).toBe(serializeShadowLayer(layer))
        })
    })

    describe('createDefaultShadowLayer', () => {
        it('returns the wireframe État C bis default (0 4 10 0, 35% opacity)', () => {
            expect(createDefaultShadowLayer()).toEqual({ x: 0, y: 4, blur: 10, spread: 0, color: '#000000', opacity: 35, inset: false })
        })
    })
})
