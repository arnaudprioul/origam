// Tests for the classes-first refactor of `useMargin`.

import { defineComponent, h, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import type { IMarginProps } from '@origam/interfaces'

import { useMargin } from '@origam/composables/Commons/margin.composable'

function mountWith (initial: IMarginProps['margin']) {
    const props = reactive<IMarginProps>({ margin: initial })
    let api!: ReturnType<typeof useMargin>

    const Host = defineComponent({
        name: 'OrigamMarginHost',
        setup () {
            api = useMargin(props)
            return () => h('div')
        }
    })

    mount(Host)
    return { props, api: () => api }
}

describe('useMargin — classes-first', () => {
    it.each(['0', '1', '2', '3', '4', '5', '6', '8', '10', '12'])(
        'scale step "%s" (string opt-in) → emits .origam--m-{n} class, no inline style',
        (step) => {
            const { api } = mountWith(step)
            expect(api().marginClasses.value).toContain(`origam--m-${step}`)
            expect(api().marginStyles.value).toEqual([])
        }
    )

    it('numeric 16 (legacy px contract) → no utility class, inline style preserved', () => {
        const { api } = mountWith(16)
        expect(api().marginClasses.value.some(c => /^origam--m-/.test(c))).toBe(false)
        expect(api().marginStyles.value).toContain('margin: 16px')
    })

    it('boolean true → legacy --marged class only', () => {
        const { api } = mountWith(true)
        const cls = api().marginClasses.value
        expect(cls.some(c => /--marged$/.test(c))).toBe(true)
        expect(cls.some(c => /^origam--m-/.test(c))).toBe(false)
    })

    it('custom value "12px" with explicit unit → inline style only', () => {
        const { api } = mountWith('12px')
        expect(api().marginClasses.value.some(c => /^origam--m-/.test(c))).toBe(false)
        expect(api().marginStyles.value).toContain('margin: 12px')
    })

    it('2-value string "8px 16px" (issue #216 parity) → margin-block + margin-inline inline styles', () => {
        const { api } = mountWith('8px 16px')
        expect(api().marginClasses.value.some(c => /^origam--m-/.test(c))).toBe(false)
        expect(api().marginStyles.value).toContain('margin-block: 8px')
        expect(api().marginStyles.value).toContain('margin-inline: 16px')
    })

    it('4-value string "8px 16px 24px 32px" → logical per-side styles, H/G/B/D order (not CSS clockwise)', () => {
        const { api } = mountWith('8px 16px 24px 32px')
        const styles = api().marginStyles.value
        expect(styles).toContain('margin-block-start: 8px')
        expect(styles).toContain('margin-inline-start: 16px')
        expect(styles).toContain('margin-block-end: 24px')
        expect(styles).toContain('margin-inline-end: 32px')
    })

    it('undefined → empty', () => {
        const { api } = mountWith(undefined)
        expect(api().marginClasses.value).toEqual([])
        expect(api().marginStyles.value).toEqual([])
    })

    it('out-of-scale step "7" → no utility class, no inline style (no unit match)', () => {
        const { api } = mountWith('7')
        expect(api().marginClasses.value.some(c => /^origam--m-/.test(c))).toBe(false)
    })
})
