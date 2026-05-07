// Tests for the classes-first refactor of `useRounded`.

import { defineComponent, h, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import type { IRoundedProps } from '../../../interfaces'

import { useRounded } from '../rounded.composable.ts'

function mountWith (initial: IRoundedProps['rounded']) {
    const props = reactive<IRoundedProps>({ rounded: initial })
    let api!: ReturnType<typeof useRounded>

    const Host = defineComponent({
        name: 'OrigamRoundedHost',
        setup () {
            api = useRounded(props)
            return () => h('div')
        }
    })

    mount(Host)
    return { props, api: () => api }
}

describe('useRounded — classes-first', () => {
    it.each(['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'])(
        'modern utility variant "%s" → emits .origam--rounded-{value} class only',
        (value) => {
            const { api } = mountWith(value)
            expect(api().roundedClasses.value).toContain(`origam--rounded-${value}`)
            expect(api().roundedStyles.value).toEqual([])
        }
    )

    it('legacy enum "small" → component-local class kept, no utility companion', () => {
        const { api } = mountWith('small')
        const cls = api().roundedClasses.value
        // Component-local class (kept for backward compat).
        expect(cls.some(c => /--rounded-small$/.test(c))).toBe(true)
        // No utility class — the legacy enum is not part of Phase 1 manifest.
        expect(cls.some(c => /^origam--rounded-/.test(c))).toBe(false)
        expect(api().roundedStyles.value).toEqual([])
    })

    it('boolean true → legacy --rounded class AND companion utility "md"', () => {
        const { api } = mountWith(true)
        const cls = api().roundedClasses.value
        expect(cls.some(c => /--rounded$/.test(c))).toBe(true)
        expect(cls).toContain('origam--rounded-md')
    })

    it('numeric value 4 → no class, inline style', () => {
        const { api } = mountWith(4)
        expect(api().roundedClasses.value).toEqual([])
        expect(api().roundedStyles.value.some(d => /border-radius:\s*4px/.test(d))).toBe(true)
    })

    it('null/undefined → empty', () => {
        const { api } = mountWith(null)
        expect(api().roundedClasses.value).toEqual([])
        expect(api().roundedStyles.value).toEqual([])
    })
})
