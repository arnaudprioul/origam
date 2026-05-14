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
        expect(colorStyles.value.some(d => /background-color:\s*var\(--origam-color__action--primary---bg\)/.test(d))).toBe(true)
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
        expect(fg).toContain('var(--origam-color__action--primary---fg)')
        expect(fg).not.toContain('fgSubtle')
    })

    it('color === bgColor (both danger) → fg swaps to the feedback contrast token', () => {
        const props = ref({ color: 'danger' as const, bgColor: 'danger' as const })
        const { colorStyles } = useColorEffect(props.value as any, ref(false), ref(false), ref(false))
        const fg = colorStyles.value.find((s) => s.startsWith('color:'))
        expect(fg).toContain('var(--origam-color__feedback--danger---fg)')
        expect(fg).not.toContain('fgSubtle')
    })

    it('color !== bgColor → keeps the intent\'s own fgSubtle (no swap)', () => {
        const props = ref({ color: 'primary' as const, bgColor: 'neutral' as const })
        const { colorStyles } = useColorEffect(props.value as any, ref(false), ref(false), ref(false))
        const fg = colorStyles.value.find((s) => s.startsWith('color:'))
        // Different intents — leave the consumer's choice alone.
        expect(fg).toContain('var(--origam-color__action--primary---fgSubtle)')
    })

    it('color only (no bgColor) → keeps the intent\'s own fgSubtle (no swap)', () => {
        const props = ref({ color: 'primary' as const })
        const { colorStyles } = useColorEffect(props.value as any, ref(false), ref(false), ref(false))
        const fg = colorStyles.value.find((s) => s.startsWith('color:'))
        expect(fg).toContain('var(--origam-color__action--primary---fgSubtle)')
    })
})

describe('useColorEffect — hover / active darken derivation', () => {
    // Cross-component rule (per user spec):
    //   normal → bgColor
    //   hover  → bgColor + 20 % darker (designer-tuned token, math fallback)
    //   active → bgColor + 30 % darker (no token rung yet, math fallback)
    //
    // Implementation: emit a cascading CSS var so the designer's
    // bgHover / bgActive token wins when present, and `color-mix(in srgb, …)`
    // takes over otherwise.

    it('intent bgColor at rest → flat token reference (no cascade needed)', () => {
        const props = { bgColor: 'primary' as const }
        const { colorStyles } = useColorEffect(props as any, ref(false), ref(false), ref(false))
        const bg = colorStyles.value.find((s) => s.startsWith('background-color:'))
        expect(bg).toContain('var(--origam-color__action--primary---bg)')
        expect(bg).not.toContain('color-mix')
    })

    it('intent bgColor + hover → bgHover token with 20 % math fallback', () => {
        const props = { bgColor: 'primary' as const }
        const { colorStyles } = useColorEffect(props as any, ref(true), ref(false), ref(false))
        const bg = colorStyles.value.find((s) => s.startsWith('background-color:'))
        // Cascading var: designer token wins, math fallback kicks in if missing.
        expect(bg).toContain('var(--origam-color__action--primary---bgHover')
        expect(bg).toContain('color-mix(in srgb, var(--origam-color__action--primary---bg), black 20%)')
    })

    it('intent bgColor + active → bgActive token with 30 % math fallback', () => {
        const props = { bgColor: 'primary' as const }
        const { colorStyles } = useColorEffect(props as any, ref(false), ref(true), ref(false))
        const bg = colorStyles.value.find((s) => s.startsWith('background-color:'))
        expect(bg).toContain('var(--origam-color__action--primary---bgActive')
        expect(bg).toContain('color-mix(in srgb, var(--origam-color__action--primary---bg), black 30%)')
    })

    it('hover and active land on DIFFERENT bg slots (regression: they used to collapse)', () => {
        const props = { bgColor: 'primary' as const }
        const hover = useColorEffect(props as any, ref(true), ref(false), ref(false))
        const active = useColorEffect(props as any, ref(false), ref(true), ref(false))
        const hoverBg = hover.colorStyles.value.find((s) => s.startsWith('background-color:'))
        const activeBg = active.colorStyles.value.find((s) => s.startsWith('background-color:'))
        expect(hoverBg).not.toBe(activeBg)
        expect(hoverBg).toContain('bgHover')
        expect(activeBg).toContain('bgActive')
    })

    it('explicit hoverBgColor short-circuits the derivation', () => {
        const props = { bgColor: 'primary' as const, hoverBgColor: 'danger' as const }
        const { colorStyles } = useColorEffect(props as any, ref(true), ref(false), ref(false))
        const bg = colorStyles.value.find((s) => s.startsWith('background-color:'))
        // hover uses danger (the explicit override) instead of derived primary.
        expect(bg).toContain('var(--origam-color__feedback--danger---bg)')
        expect(bg).not.toContain('color-mix')
    })

    it('raw bgColor + hover → math 20 % derive (no token cascade)', () => {
        const props = { bgColor: '#abcdef' }
        const { colorStyles } = useColorEffect(props as any, ref(true), ref(false), ref(false))
        const bg = colorStyles.value.find((s) => s.startsWith('background-color:'))
        expect(bg).toBe('background-color: color-mix(in srgb, #abcdef, black 20%)')
    })

    it('raw bgColor + active → math 30 % derive', () => {
        const props = { bgColor: '#abcdef' }
        const { colorStyles } = useColorEffect(props as any, ref(false), ref(true), ref(false))
        const bg = colorStyles.value.find((s) => s.startsWith('background-color:'))
        expect(bg).toBe('background-color: color-mix(in srgb, #abcdef, black 30%)')
    })

    it('transparent bgColor + hover → math derive on transparent (gray-on-transparent)', () => {
        const props = { bgColor: 'transparent' as const }
        const { colorStyles } = useColorEffect(props as any, ref(true), ref(false), ref(false))
        const bg = colorStyles.value.find((s) => s.startsWith('background-color:'))
        expect(bg).toBe('background-color: color-mix(in srgb, transparent, black 20%)')
    })
})
