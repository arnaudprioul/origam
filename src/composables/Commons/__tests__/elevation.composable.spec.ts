// Tests for the classes-first refactor of `useElevation`.

import { defineComponent, h, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import type { IElevationProps } from '../../../interfaces'

import { useElevation } from '../elevation.composable.ts'

function mountWith (initial: IElevationProps['elevation']) {
    const props = reactive<IElevationProps>({ elevation: initial })
    let api!: ReturnType<typeof useElevation>

    const Host = defineComponent({
        name: 'OrigamElevationHost',
        setup () {
            api = useElevation(props)
            return () => h('div')
        }
    })

    mount(Host)
    return { props, api: () => api }
}

describe('useElevation — classes-first', () => {
    it('utility rung "md" → emits origam--shadow-md class AND token style', () => {
        const { api } = mountWith('md')
        expect(api().elevationClasses.value).toContain('origam--shadow-md')
        expect(api().elevationStyles.value).toContain('box-shadow: var(--origam-shadow---md)')
    })

    it.each(['none', 'xs', 'sm', 'md', 'lg', 'xl'])('utility rung %s → utility class', (rung) => {
        const { api } = mountWith(rung)
        expect(api().elevationClasses.value).toContain(`origam--shadow-${rung}`)
    })

    it('non-utility rung "2xl" → no utility class, inline style still emitted', () => {
        const { api } = mountWith('2xl')
        const cls = api().elevationClasses.value
        expect(cls.some(c => /^origam--shadow-/.test(c))).toBe(false)
        expect(api().elevationStyles.value).toContain('box-shadow: var(--origam-shadow---2xl)')
    })

    it('Material number 8 → maps to "md" rung utility', () => {
        const { api } = mountWith(8)
        expect(api().elevationClasses.value).toContain('origam--shadow-md')
    })

    it('elevation undefined → no class, no style', () => {
        const { api } = mountWith(undefined)
        expect(api().elevationClasses.value).toEqual([])
        expect(api().elevationStyles.value).toEqual([])
    })

    it('elevated marker class still present alongside utility', () => {
        const { api } = mountWith('lg')
        const cls = api().elevationClasses.value
        expect(cls.some(c => /--elevated$/.test(c))).toBe(true)
        expect(cls).toContain('origam--shadow-lg')
    })
})
