// Tests for the classes-first refactor of `useBorder`.

import { defineComponent, h, reactive, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import type { IBorderProps } from '@origam/interfaces'

import { useBorder } from '@origam/composables/Commons/border.composable'

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

function mountWithProps (initial: IBorderProps) {
    const props = reactive<IBorderProps>({ ...initial })
    let api!: ReturnType<typeof useBorder>

    const Host = defineComponent({
        name: 'OrigamBorderPropsHost',
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

describe('useBorder — standalone borderColor / borderStyle props', () => {
    it('borderColor → inline border-color declaration', () => {
        const { api } = mountWithProps({ borderColor: 'red' })
        expect(api().borderStyles.value).toContain('border-color: red')
    })

    it('borderStyle → inline border-style declaration', () => {
        const { api } = mountWithProps({ borderStyle: 'dashed' })
        expect(api().borderStyles.value).toContain('border-style: dashed')
    })

    it('borderColor + borderStyle alongside a border shorthand → all present', () => {
        const { api } = mountWithProps({ border: 2, borderColor: '#00f', borderStyle: 'dotted' })
        const styles = api().borderStyles.value
        expect(styles.some(d => /border-width:\s*2px/.test(d))).toBe(true)
        expect(styles).toContain('border-color: #00f')
        expect(styles).toContain('border-style: dotted')
    })

    it('empty / unset borderColor and borderStyle → only the numeric defaults (additive, non-breaking)', () => {
        const { api } = mountWithProps({ border: 2, borderColor: '', borderStyle: undefined })
        const styles = api().borderStyles.value
        // A numeric width carries its own solid / currentColor defaults so it
        // actually renders; the unset borderColor / borderStyle add nothing.
        expect(styles).toEqual(['border-width: 2px', 'border-style: solid', 'border-color: currentColor'])
    })

    it('Ref overload carries only the border value — borderColor / borderStyle are not read', () => {
        const borderRef = ref<IBorderProps['border']>(2)
        let api!: ReturnType<typeof useBorder>

        const Host = defineComponent({
            name: 'OrigamBorderRefHost',
            setup () {
                api = useBorder(borderRef)
                return () => h('div')
            }
        })

        mount(Host)
        const styles = api.borderStyles.value
        expect(styles).toEqual(['border-width: 2px', 'border-style: solid', 'border-color: currentColor'])
    })
})
