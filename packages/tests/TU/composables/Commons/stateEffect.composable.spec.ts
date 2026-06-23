// Tests for `useStateEffect` composable.
//
// useStateEffect is the single composable for state-aware visual styles,
// covering 8 axes: color/bgColor, border, rounded, elevation, padding,
// margin, gap.
//
// The key testable behaviors:
//   1. colorClasses emits utility classes when resting + tokenised intent.
//   2. colorClasses is EMPTY during hover/active/disabled (state → inline styles only).
//   3. colorStyles emits inline style strings for intents.
//   4. pickEffective resolution order: hover > active > rest.
//   5. Status intent forces bgColor and clears color.
//   6. borderClasses / roundedClasses / elevationClasses / paddingClasses / marginClasses
//      are populated from the matching sub-composables.
//   7. gapStyles emits gap style string for numeric / string values.
//   8. Reactive prop changes are reflected in the computed outputs.
//
// useStateEffect must be called inside a Vue component scope (it uses
// sub-composables that may call getCurrentInstance).

import { computed, defineComponent, h, reactive, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { useStateEffect } from '@origam/composables/Commons/stateEffect.composable'

// ---------------------------------------------------------------------------
// Mount helper
// ---------------------------------------------------------------------------

type StateEffectProps = Parameters<typeof useStateEffect>[0]

function mountStateEffect (
    props: StateEffectProps,
    options: {
        isHover?: boolean
        isActive?: boolean
        isDisabled?: boolean
        flat?: boolean
        hoverState?: Record<string, unknown>
        activeState?: Record<string, unknown>
    } = {}
) {
    const isHover = ref(options.isHover ?? false)
    const isActive = ref(options.isActive ?? false)
    const isDisabled = ref(options.isDisabled ?? false)
    const flat = ref(options.flat ?? false)
    const hoverState = computed(() => options.hoverState as any)
    const activeState = computed(() => options.activeState as any)

    let api!: ReturnType<typeof useStateEffect>

    const Host = defineComponent({
        name: 'OrigamStateEffectHost',
        setup () {
            api = useStateEffect(props, isHover, isActive, hoverState, activeState, isDisabled, flat)
            return () => h('div')
        }
    })

    mount(Host)
    return { api: () => api, isHover, isActive, isDisabled, flat }
}

// ---------------------------------------------------------------------------
// Return shape
// ---------------------------------------------------------------------------

describe('useStateEffect — return shape', () => {
    it('exposes all 8 axis classes + styles refs', () => {
        const { api } = mountStateEffect({})
        const keys = Object.keys(api())
        expect(keys).toContain('colorClasses')
        expect(keys).toContain('colorStyles')
        expect(keys).toContain('borderClasses')
        expect(keys).toContain('borderStyles')
        expect(keys).toContain('roundedClasses')
        expect(keys).toContain('roundedStyles')
        expect(keys).toContain('elevationClasses')
        expect(keys).toContain('elevationStyles')
        expect(keys).toContain('paddingClasses')
        expect(keys).toContain('paddingStyles')
        expect(keys).toContain('marginClasses')
        expect(keys).toContain('marginStyles')
        expect(keys).toContain('gapClasses')
        expect(keys).toContain('gapStyles')
    })

    it('exposes resolved scalar refs for all 8 axes', () => {
        const { api } = mountStateEffect({})
        const keys = Object.keys(api())
        expect(keys).toContain('color')
        expect(keys).toContain('bgColor')
        expect(keys).toContain('border')
        expect(keys).toContain('rounded')
        expect(keys).toContain('elevation')
        expect(keys).toContain('padding')
        expect(keys).toContain('margin')
        expect(keys).toContain('gap')
    })
})

// ---------------------------------------------------------------------------
// colorClasses — resting state
// ---------------------------------------------------------------------------

describe('useStateEffect — colorClasses resting', () => {
    it('no color/bgColor → colorClasses is empty', () => {
        const { api } = mountStateEffect({})
        expect(api().colorClasses.value).toEqual([])
    })

    it('bgColor="primary" → emits origam--bg-primary class', () => {
        const { api } = mountStateEffect({ bgColor: 'primary' })
        expect(api().colorClasses.value).toContain('origam--bg-primary')
    })

    it('color="success" → emits origam--color-success class', () => {
        const { api } = mountStateEffect({ color: 'success' })
        expect(api().colorClasses.value).toContain('origam--color-success')
    })

    it('both bgColor + color → emits both utility classes', () => {
        const { api } = mountStateEffect({ bgColor: 'primary', color: 'danger' })
        expect(api().colorClasses.value).toContain('origam--bg-primary')
        expect(api().colorClasses.value).toContain('origam--color-danger')
    })
})

// ---------------------------------------------------------------------------
// colorClasses — bypassed during hover / active / disabled
// ---------------------------------------------------------------------------

describe('useStateEffect — colorClasses empty on state', () => {
    it('isHover=true → colorClasses is empty', () => {
        const { api } = mountStateEffect({ bgColor: 'primary' }, { isHover: true })
        expect(api().colorClasses.value).toEqual([])
    })

    it('isActive=true → colorClasses is empty', () => {
        const { api } = mountStateEffect({ bgColor: 'primary' }, { isActive: true })
        expect(api().colorClasses.value).toEqual([])
    })

    it('isDisabled=true → colorClasses is empty', () => {
        const { api } = mountStateEffect({ bgColor: 'primary' }, { isDisabled: true })
        expect(api().colorClasses.value).toEqual([])
    })
})

// ---------------------------------------------------------------------------
// colorStyles — intent produces inline style string
// ---------------------------------------------------------------------------

describe('useStateEffect — colorStyles with intents', () => {
    it('bgColor="primary" → colorStyles contains background-color declaration', () => {
        const { api } = mountStateEffect({ bgColor: 'primary' })
        const styles = api().colorStyles.value
        expect(styles.some(s => s.startsWith('background-color:'))).toBe(true)
    })

    it('color="danger" → colorStyles contains color declaration', () => {
        const { api } = mountStateEffect({ color: 'danger' })
        const styles = api().colorStyles.value
        expect(styles.some(s => s.startsWith('color:'))).toBe(true)
    })
})

// ---------------------------------------------------------------------------
// status overrides color/bgColor
// ---------------------------------------------------------------------------

describe('useStateEffect — status intent override', () => {
    it('status="success" forces bgColor to success intent', () => {
        const props = reactive({ bgColor: 'primary', status: 'success' } as StateEffectProps & { status: string })
        const { api } = mountStateEffect(props)
        // bgColor should resolve to success, not primary
        expect(api().bgColor.value).toBe('success')
    })

    it('status="error" maps to danger intent', () => {
        const props = reactive({ status: 'error' } as StateEffectProps & { status: string })
        const { api } = mountStateEffect(props)
        expect(api().bgColor.value).toBe('danger')
    })

    it('status forces color to undefined (auto-contrast)', () => {
        const props = reactive({ color: 'primary', status: 'success' } as StateEffectProps & { status: string })
        const { api } = mountStateEffect(props)
        expect(api().color.value).toBeUndefined()
    })
})

// ---------------------------------------------------------------------------
// pickEffective — hover > active > rest
// ---------------------------------------------------------------------------

describe('useStateEffect — hover/active override resolution', () => {
    it('hoverState.bgColor overrides props.bgColor when isHover', () => {
        const isHover = ref(true)
        let api!: ReturnType<typeof useStateEffect>
        const Host = defineComponent({
            setup () {
                api = useStateEffect(
                    { bgColor: 'primary' },
                    isHover,
                    ref(false),
                    computed(() => ({ bgColor: 'success' } as any)),
                    computed(() => undefined)
                )
                return () => h('div')
            }
        })
        mount(Host)
        expect(api.bgColor.value).toBe('success')
    })

    it('activeState.bgColor overrides props.bgColor when isActive (not isHover)', () => {
        let api!: ReturnType<typeof useStateEffect>
        const Host = defineComponent({
            setup () {
                api = useStateEffect(
                    { bgColor: 'primary' },
                    ref(false),
                    ref(true),
                    computed(() => undefined),
                    computed(() => ({ bgColor: 'warning' } as any))
                )
                return () => h('div')
            }
        })
        mount(Host)
        expect(api.bgColor.value).toBe('warning')
    })

    it('hover wins over active when both are true', () => {
        let api!: ReturnType<typeof useStateEffect>
        const Host = defineComponent({
            setup () {
                api = useStateEffect(
                    { bgColor: 'primary' },
                    ref(true),   // isHover
                    ref(true),   // isActive
                    computed(() => ({ bgColor: 'success' } as any)),  // hover
                    computed(() => ({ bgColor: 'danger' } as any))    // active
                )
                return () => h('div')
            }
        })
        mount(Host)
        expect(api.bgColor.value).toBe('success')
    })

    it('falls back to props when neither hover nor active', () => {
        const { api } = mountStateEffect({ bgColor: 'secondary' })
        expect(api().bgColor.value).toBe('secondary')
    })
})

// ---------------------------------------------------------------------------
// gap axis
// ---------------------------------------------------------------------------

describe('useStateEffect — gap styles', () => {
    it('gap=undefined → gapStyles is empty', () => {
        const { api } = mountStateEffect({})
        expect(api().gapStyles.value).toEqual([])
    })

    it('gap=false → gapStyles is empty', () => {
        const props = reactive({ gap: false } as StateEffectProps)
        const { api } = mountStateEffect(props)
        expect(api().gapStyles.value).toEqual([])
    })

    it('gap=8 → gapStyles contains "gap: 8px"', () => {
        const props = reactive({ gap: 8 } as StateEffectProps)
        const { api } = mountStateEffect(props)
        expect(api().gapStyles.value).toContain('gap: 8px')
    })

    it('gap="1rem" → gapStyles contains "gap: 1rem"', () => {
        const props = reactive({ gap: '1rem' } as StateEffectProps)
        const { api } = mountStateEffect(props)
        expect(api().gapStyles.value).toContain('gap: 1rem')
    })

    it('gapClasses is always empty (no utility class for gap)', () => {
        const props = reactive({ gap: 8 } as StateEffectProps)
        const { api } = mountStateEffect(props)
        expect(api().gapClasses.value).toEqual([])
    })
})

// ---------------------------------------------------------------------------
// Reactivity — prop changes propagate
// ---------------------------------------------------------------------------

describe('useStateEffect — reactive prop changes', () => {
    it('changing bgColor prop updates colorClasses', () => {
        const props = reactive<StateEffectProps>({ bgColor: 'primary' })
        const isHover = ref(false)
        let api!: ReturnType<typeof useStateEffect>

        const Host = defineComponent({
            setup () {
                api = useStateEffect(props, isHover)
                return () => h('div')
            }
        })
        mount(Host)

        expect(api.colorClasses.value).toContain('origam--bg-primary')
        props.bgColor = 'danger'
        expect(api.colorClasses.value).toContain('origam--bg-danger')
        expect(api.colorClasses.value).not.toContain('origam--bg-primary')
    })
})
