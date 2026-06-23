// Tests for `useDimension` composable.
// Covers: all 6 dimension props (height, width, maxHeight, maxWidth,
// minHeight, minWidth), numeric → `${n}px` conversion, CSS length strings
// passthrough, undefined → omit, reactivity.

import { defineComponent, h, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import type { IDimensionProps } from '@origam/interfaces'

import { useDimension } from '@origam/composables/Commons/dimension.composable'

function mountWith (initial: IDimensionProps) {
    const props = reactive<IDimensionProps>({ ...initial })
    let api!: ReturnType<typeof useDimension>

    const Host = defineComponent({
        name: 'OrigamDimensionHost',
        setup () {
            api = useDimension(props)
            return () => h('div')
        }
    })

    mount(Host)
    return { props, api: () => api }
}

describe('useDimension — numeric values → px', () => {
    it('height=100 → emits "height: 100px"', () => {
        const { api } = mountWith({ height: 100 })
        expect(api().dimensionStyles.value).toContain('height: 100px')
    })

    it('width=200 → emits "width: 200px"', () => {
        const { api } = mountWith({ width: 200 })
        expect(api().dimensionStyles.value).toContain('width: 200px')
    })

    it('maxHeight=50 → emits "max-height: 50px"', () => {
        const { api } = mountWith({ maxHeight: 50 })
        expect(api().dimensionStyles.value).toContain('max-height: 50px')
    })

    it('maxWidth=300 → emits "max-width: 300px"', () => {
        const { api } = mountWith({ maxWidth: 300 })
        expect(api().dimensionStyles.value).toContain('max-width: 300px')
    })

    it('minHeight=10 → emits "min-height: 10px"', () => {
        const { api } = mountWith({ minHeight: 10 })
        expect(api().dimensionStyles.value).toContain('min-height: 10px')
    })

    it('minWidth=20 → emits "min-width: 20px"', () => {
        const { api } = mountWith({ minWidth: 20 })
        expect(api().dimensionStyles.value).toContain('min-width: 20px')
    })
})

describe('useDimension — string CSS values passthrough', () => {
    it('height="50vh" → emits "height: 50vh"', () => {
        const { api } = mountWith({ height: '50vh' })
        expect(api().dimensionStyles.value).toContain('height: 50vh')
    })

    it('width="100%" → emits "width: 100%"', () => {
        const { api } = mountWith({ width: '100%' })
        expect(api().dimensionStyles.value).toContain('width: 100%')
    })

    it('maxHeight="calc(100vh - 64px)" → emits as-is', () => {
        const { api } = mountWith({ maxHeight: 'calc(100vh - 64px)' })
        expect(api().dimensionStyles.value).toContain('max-height: calc(100vh - 64px)')
    })
})

describe('useDimension — undefined props → omitted', () => {
    it('all props undefined → empty array', () => {
        const { api } = mountWith({})
        expect(api().dimensionStyles.value).toEqual([])
    })

    it('only height set → only one entry (width absent)', () => {
        const { api } = mountWith({ height: 40 })
        const styles = api().dimensionStyles.value
        expect(styles).toHaveLength(1)
        expect(styles[0]).toContain('height')
    })
})

describe('useDimension — multiple props together', () => {
    it('height + width → two entries', () => {
        const { api } = mountWith({ height: 100, width: 200 })
        const styles = api().dimensionStyles.value
        expect(styles.some(s => s.includes('height: 100px'))).toBe(true)
        expect(styles.some(s => s.includes('width: 200px'))).toBe(true)
        expect(styles).toHaveLength(2)
    })

    it('all 6 props → 6 entries', () => {
        const { api } = mountWith({ height: 1, width: 2, maxHeight: 3, maxWidth: 4, minHeight: 5, minWidth: 6 })
        expect(api().dimensionStyles.value).toHaveLength(6)
    })
})

describe('useDimension — reactivity', () => {
    it('changing height prop updates dimensionStyles', () => {
        const { props, api } = mountWith({ height: 100 })
        expect(api().dimensionStyles.value).toContain('height: 100px')
        props.height = 200
        expect(api().dimensionStyles.value).toContain('height: 200px')
        expect(api().dimensionStyles.value).not.toContain('height: 100px')
    })

    it('setting prop to undefined removes the entry', () => {
        const { props, api } = mountWith({ height: 100 })
        expect(api().dimensionStyles.value).toHaveLength(1)
        props.height = undefined
        expect(api().dimensionStyles.value).toHaveLength(0)
    })
})
