// Tests for the classes-first refactor of `useBorder`.

import { defineComponent, h, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import type { IBorderProps } from '../../../interfaces'

import { useBorder } from '../border.composable.ts'

function mountWith (initial: IBorderProps['border']) {
    const props = reactive<IBorderProps>({ border: initial })
    let api!: ReturnType<typeof useBorder>

    const Host = defineComponent({
        name: 'OrigamBorderHost',
        setup () {
            api = useBorder(props)
            return () => h('div')
        }
    })

    mount(Host)
    return { props, api: () => api }
}

describe('useBorder — classes-first', () => {
    it.each(['none', 'thin', 'thick'])(
        'utility width keyword "%s" → emits .origam--border-{value} class',
        (value) => {
            const { api } = mountWith(value)
            expect(api().borderClasses.value).toContain(`origam--border-${value}`)
        }
    )

    it('boolean true → legacy --border class AND .origam--border-thin companion', () => {
        const { api } = mountWith(true)
        const cls = api().borderClasses.value
        expect(cls.some(c => /--border$/.test(c))).toBe(true)
        expect(cls).toContain('origam--border-thin')
    })

    it('direction keyword "top" → no utility class, component-local direction class', () => {
        const { api } = mountWith('top')
        const cls = api().borderClasses.value
        // Component-local marker class.
        expect(cls.some(c => /--border$/.test(c))).toBe(true)
        // Direction-specific class.
        expect(cls.some(c => /--border-top$/.test(c))).toBe(true)
        // No global utility (top not in Phase 1 manifest).
        expect(cls.some(c => /^origam--border-/.test(c))).toBe(false)
    })

    it('numeric value 2 → no class beyond default --border, inline style', () => {
        const { api } = mountWith(2)
        const cls = api().borderClasses.value
        expect(cls.some(c => /^origam--border-/.test(c))).toBe(false)
        expect(api().borderStyles.value.some(d => /border-width:\s*2px/.test(d))).toBe(true)
    })

    it('undefined → empty', () => {
        const { api } = mountWith(undefined)
        expect(api().borderClasses.value).toEqual([])
        expect(api().borderStyles.value).toEqual([])
    })
})
