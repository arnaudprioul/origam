// Tests for the classes-first refactor of `useColor` / `useColorEffect`
// (Phase 2 of the design-tokens chantier).
//
// Coverage matrix:
//   - intent values (`primary`, `success`, …) → utility class +
//     companion inline style (transition strategy "(a)").
//   - `ghost` intent (no utility class) → inline style only.
//   - hex / rgb (legacy) → inline style only, no class.
//   - `useColorEffect` hover/active/disabled bypass utility classes.

import { computed, ref } from 'vue'
import { describe, expect, it } from 'vitest'

import type { IColorProps } from '../../../interfaces'

import { useBackgroundColor, useColor, useColorEffect, useTextColor } from '../color.composable.ts'

describe('useColor — classes-first', () => {
    it('utility intent on background → emits .origam--bg-{intent} class AND token style', () => {
        const colors = computed(() => ({ background: 'primary' }))
        const { colorClasses, colorStyles } = useColor(colors)

        expect(colorClasses.value).toContain('origam--bg-primary')
        // Strategy (a) — inline style stays populated for zero-regression
        // during the Phase 2 → Phase 3 transition.
        expect(colorStyles.value.some(d => /background-color:\s*var\(--origam-color-action-primary-bg\)/.test(d))).toBe(true)
    })

    it('utility intent on text → emits .origam--color-{intent} class', () => {
        const colors = computed(() => ({ text: 'success' }))
        const { colorClasses } = useColor(colors)
        expect(colorClasses.value).toContain('origam--color-success')
    })

    it('"ghost" intent → no utility class (not in Phase 1 manifest), inline style only', () => {
        const colors = computed(() => ({ background: 'ghost' }))
        const { colorClasses, colorStyles } = useColor(colors)
        expect(colorClasses.value).toEqual([])
        expect(colorStyles.value.length).toBeGreaterThan(0)
    })

    it('hex color → no utility class, inline style only', () => {
        const colors = computed(() => ({ background: '#ff00aa' }))
        const { colorClasses, colorStyles } = useColor(colors)
        expect(colorClasses.value).toEqual([])
        expect(colorStyles.value.some(d => /#ff00aa/.test(d))).toBe(true)
    })

    it('null/undefined values → empty classes and styles', () => {
        const colors = computed(() => ({}))
        const { colorClasses, colorStyles } = useColor(colors)
        expect(colorClasses.value).toEqual([])
        expect(colorStyles.value).toEqual([])
    })

    it('useTextColor exposes textColorClasses + textColorStyles', () => {
        const props = ref<'primary'>('primary')
        const { textColorClasses, textColorStyles } = useTextColor(props)
        expect(textColorClasses.value).toContain('origam--color-primary')
        expect(textColorStyles.value.length).toBeGreaterThan(0)
    })

    it('useBackgroundColor exposes backgroundColorClasses + backgroundColorStyles', () => {
        const props = ref<'danger'>('danger')
        const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props)
        expect(backgroundColorClasses.value).toContain('origam--bg-danger')
        expect(backgroundColorStyles.value.length).toBeGreaterThan(0)
    })
})

describe('useColorEffect — classes-first', () => {
    function makeProps (overrides: Partial<IColorProps> = {}): IColorProps {
        return { color: undefined, bgColor: undefined, ...overrides }
    }

    it('resting state with utility intent on bgColor → emits utility class', () => {
        const props = makeProps({ bgColor: 'primary' })
        const { colorClasses } = useColorEffect(props, ref(false), ref(false), ref(false))
        expect(colorClasses.value).toContain('origam--bg-primary')
    })

    it('resting state with utility intent on color → emits utility class', () => {
        const props = makeProps({ color: 'warning' })
        const { colorClasses } = useColorEffect(props, ref(false), ref(false), ref(false))
        expect(colorClasses.value).toContain('origam--color-warning')
    })

    it('hover state → no utility class (slot bumps to bgHover, not represented in utilities)', () => {
        const props = makeProps({ bgColor: 'primary' })
        const isHover = ref(true)
        const { colorClasses, colorStyles } = useColorEffect(props, isHover, ref(false), ref(false))
        expect(colorClasses.value).toEqual([])
        // Inline style still drives the visual.
        expect(colorStyles.value.length).toBeGreaterThan(0)
    })

    it('active state → no utility class', () => {
        const props = makeProps({ bgColor: 'success' })
        const { colorClasses } = useColorEffect(props, ref(false), ref(true), ref(false))
        expect(colorClasses.value).toEqual([])
    })

    it('disabled state → no utility class (token swap not exposed in utilities)', () => {
        const props = makeProps({ bgColor: 'primary' })
        const { colorClasses } = useColorEffect(props, ref(false), ref(false), ref(true))
        expect(colorClasses.value).toEqual([])
    })

    it('hex bgColor → no utility class even at rest', () => {
        const props = makeProps({ bgColor: '#abcdef' })
        const { colorClasses, colorStyles } = useColorEffect(props, ref(false), ref(false), ref(false))
        expect(colorClasses.value).toEqual([])
        expect(colorStyles.value.length).toBeGreaterThan(0)
    })

    it('"ghost" bgColor → no utility class (Phase 1 omits ghost)', () => {
        const props = makeProps({ bgColor: 'ghost' })
        const { colorClasses, colorStyles } = useColorEffect(props, ref(false), ref(false), ref(false))
        expect(colorClasses.value).toEqual([])
        // ghost still drives token-based inline styles.
        expect(colorStyles.value.length).toBeGreaterThan(0)
    })
})

describe('useColorEffect — color-clash auto-contrast', () => {
    // When the consumer passes the SAME intent on both `color` and `bgColor`
    // (e.g. <OrigamBtn color="primary" bgColor="primary">), the previous
    // behaviour resolved the fg to `tokenForegroundForIntent(color)` which
    // returns the intent's OWN hue (`primary.fgSubtle` = primary 700). That
    // produced "violet text on violet surface" — unreadable. We now detect
    // the clash and swap the fg to the bg's paired contrast token (white
    // for primary).
    it('color === bgColor (both primary) → fg swaps to the bg contrast token', () => {
        const props = ref({ color: 'primary' as const, bgColor: 'primary' as const })
        const { colorStyles } = useColorEffect(props.value as any, ref(false), ref(false), ref(false))
        const fg = colorStyles.value.find((s) => s.startsWith('color:'))
        // Should resolve to the bg's paired fg, NOT to fgSubtle (same hue).
        expect(fg).toContain('var(--origam-color-action-primary-fg)')
        expect(fg).not.toContain('fgSubtle')
    })

    it('color === bgColor (both danger) → fg swaps to the feedback contrast token', () => {
        const props = ref({ color: 'danger' as const, bgColor: 'danger' as const })
        const { colorStyles } = useColorEffect(props.value as any, ref(false), ref(false), ref(false))
        const fg = colorStyles.value.find((s) => s.startsWith('color:'))
        expect(fg).toContain('var(--origam-color-feedback-danger-fg)')
        expect(fg).not.toContain('fgSubtle')
    })

    it('color !== bgColor → keeps the intent\'s own fgSubtle (no swap)', () => {
        const props = ref({ color: 'primary' as const, bgColor: 'neutral' as const })
        const { colorStyles } = useColorEffect(props.value as any, ref(false), ref(false), ref(false))
        const fg = colorStyles.value.find((s) => s.startsWith('color:'))
        // Different intents — leave the consumer's choice alone.
        expect(fg).toContain('var(--origam-color-action-primary-fgSubtle)')
    })

    it('color only (no bgColor) → keeps the intent\'s own fgSubtle (no swap)', () => {
        const props = ref({ color: 'primary' as const })
        const { colorStyles } = useColorEffect(props.value as any, ref(false), ref(false), ref(false))
        const fg = colorStyles.value.find((s) => s.startsWith('color:'))
        expect(fg).toContain('var(--origam-color-action-primary-fgSubtle)')
    })
})
