// Tests for the refactored `useColorEffect` (Lot 1)
//
// Covers: intent detection, token-reference emission, hover/active state
// resolution, legacy raw-color path with deprecation warning, transparent
// passthrough, no-args neutral defaults.

import { ref } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useColorEffect } from './color.composable'
import type { IColorProps } from '../../interfaces'

describe('useColorEffect', () => {
    let warnSpy: ReturnType<typeof vi.spyOn>

    beforeEach(() => {
        warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    })

    afterEach(() => {
        warnSpy.mockRestore()
    })

    it('emits CSS var refs for an intent value', () => {
        const props: IColorProps = { color: 'primary' }
        const { colorStyles } = useColorEffect(props)
        expect(colorStyles.value).toContain('background-color: var(--origam-color-action-primary-bg)')
        expect(colorStyles.value).toContain('color: var(--origam-color-action-primary-fg)')
        expect(warnSpy).not.toHaveBeenCalled()
    })

    it('switches to bgHover on hover state when no explicit hoverColor', () => {
        const props: IColorProps = { color: 'primary' }
        const isHover = ref(true)
        const { colorStyles } = useColorEffect(props, isHover)
        expect(colorStyles.value).toContain('background-color: var(--origam-color-action-primary-bgHover)')
    })

    it('respects an explicit hoverColor intent override', () => {
        const props: IColorProps = { color: 'primary', hoverColor: 'success' }
        const isHover = ref(true)
        const { colorStyles } = useColorEffect(props, isHover)
        expect(colorStyles.value).toContain('background-color: var(--origam-color-feedback-success-bg)')
    })

    it('routes feedback intents through the feedback token namespace', () => {
        const { colorStyles } = useColorEffect({ color: 'danger' })
        expect(colorStyles.value).toContain('background-color: var(--origam-color-feedback-danger-bg)')
        expect(colorStyles.value).toContain('color: var(--origam-color-feedback-danger-fg)')
    })

    it('routes the "neutral" intent to the secondary action slot', () => {
        const { colorStyles } = useColorEffect({ color: 'neutral' })
        expect(colorStyles.value).toContain('background-color: var(--origam-color-action-secondary-bg)')
        expect(colorStyles.value).toContain('color: var(--origam-color-action-secondary-fg)')
    })

    it('warns and falls back to legacy behaviour for raw hex colors', () => {
        const { colorStyles } = useColorEffect({ color: '#ff0080', bgColor: '#0080ff' })
        // Legacy path emits the literal CSS strings.
        expect(colorStyles.value.some(s => s.includes('#ff0080') || s.includes('#0080ff'))).toBe(true)
        expect(warnSpy).toHaveBeenCalled()
    })

    it('passes through "transparent" without warning', () => {
        const { colorStyles } = useColorEffect({ bgColor: 'transparent' })
        expect(colorStyles.value).toContain('background-color: transparent')
        expect(warnSpy).not.toHaveBeenCalled()
    })

    it('returns empty styles when no color is set', () => {
        const { colorStyles } = useColorEffect({})
        expect(colorStyles.value).toEqual([])
        expect(warnSpy).not.toHaveBeenCalled()
    })

    it('exposes color/bgColor refs for downstream composables', () => {
        const { color, bgColor } = useColorEffect({ color: 'primary', bgColor: 'success' })
        expect(color.value).toBe('primary')
        expect(bgColor.value).toBe('success')
    })
})
