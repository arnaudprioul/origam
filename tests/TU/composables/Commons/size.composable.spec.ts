// Tests for the classes-first refactor of `useSize`.
//
// NOTE — `useSize` historically drives `width`/`height`, while the
// Phase 1 utility classes drive `font-size`. The companion utility is
// emitted as a typographic bridge (consumers opt in via :class) but
// inline width/height styles remain authoritative for box sizing.

import { defineComponent, h, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import type { ISizeProps } from '@origam/interfaces'

import { useSize } from '@origam/composables/Commons/size.composable'

function mountWith (initial: ISizeProps['size']) {
    const props = reactive<ISizeProps>({ size: initial })
    let api!: ReturnType<typeof useSize>

    const Host = defineComponent({
        name: 'OrigamSizeHost',
        setup () {
            api = useSize(props)
            return () => h('div')
        }
    })

    mount(Host)
    return { props, api: () => api }
}

describe('useSize — classes-first', () => {
    it.each([
        ['x-small', 'xs'],
        ['small', 'sm'],
        ['default', 'md'],
        ['large', 'lg'],
        ['x-large', 'xl']
    ])('legacy enum "%s" → emits component-local class AND .origam--text-%s utility', (legacy, rung) => {
        const { api } = mountWith(legacy)
        const cls = api().sizeClasses.value
        expect(cls.some(c => new RegExp(`--size-${legacy}$`).test(c))).toBe(true)
        expect(cls).toContain(`origam--text-${rung}`)
        // No inline style for enum values — width/height aren't mutated.
        expect(api().sizeStyles.value).toEqual([])
    })

    it('numeric 40 → no utility class, inline width/height styles', () => {
        const { api } = mountWith(40)
        expect(api().sizeClasses.value.some(c => /^origam--text-/.test(c))).toBe(false)
        expect(api().sizeStyles.value).toContain('width: 40px')
        expect(api().sizeStyles.value).toContain('height: 40px')
    })

    it('undefined → empty', () => {
        const { api } = mountWith(undefined)
        expect(api().sizeClasses.value).toEqual([])
        expect(api().sizeStyles.value).toEqual([])
    })
})
