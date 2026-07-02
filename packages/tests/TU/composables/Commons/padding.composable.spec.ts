// Tests for the classes-first refactor of `usePadding`.

import { defineComponent, h, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import type { IPaddingProps } from '@origam/interfaces'

import { usePadding } from '@origam/composables/Commons/padding.composable'

function mountWith (initial: IPaddingProps['padding']) {
    const props = reactive<IPaddingProps>({ padding: initial })
    let api!: ReturnType<typeof usePadding>

    const Host = defineComponent({
        name: 'OrigamPaddingHost',
        setup () {
            api = usePadding(props)
            return () => h('div')
        }
    })

    mount(Host)
    return { props, api: () => api }
}

describe('usePadding — classes-first', () => {
    it.each(['0', '1', '2', '3', '4', '5', '6', '8', '10', '12'])(
        'scale step "%s" (string opt-in) → emits .origam--p-{n} class, no inline style',
        (step) => {
            const { api } = mountWith(step)
            expect(api().paddingClasses.value).toContain(`origam--p-${step}`)
            expect(api().paddingStyles.value).toEqual([])
        }
    )

    it('numeric 16 (legacy px contract) → no utility class, inline style preserved', () => {
        const { api } = mountWith(16)
        expect(api().paddingClasses.value.some(c => /^origam--p-/.test(c))).toBe(false)
        expect(api().paddingStyles.value).toContain('padding: 16px')
    })

    it('boolean true → legacy --padded class only', () => {
        const { api } = mountWith(true)
        const cls = api().paddingClasses.value
        expect(cls.some(c => /--padded$/.test(c))).toBe(true)
        expect(cls.some(c => /^origam--p-/.test(c))).toBe(false)
    })

    it('custom value "8px 12px" → inline style only', () => {
        const { api } = mountWith('8px 12px')
        expect(api().paddingClasses.value.some(c => /^origam--p-/.test(c))).toBe(false)
        const styles = api().paddingStyles.value
        expect(styles.some(s => /padding-block:\s*8px/.test(s))).toBe(true)
    })

    it('undefined → empty', () => {
        const { api } = mountWith(undefined)
        expect(api().paddingClasses.value).toEqual([])
        expect(api().paddingStyles.value).toEqual([])
    })
})
