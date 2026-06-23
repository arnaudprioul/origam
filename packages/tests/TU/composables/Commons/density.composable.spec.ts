// Tests for `useDensity` composable.
// Covers: known TDensity values → emit class, unknown/custom → no class,
// undefined → empty, Ref overload, reactivity.

import { defineComponent, h, reactive, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import type { IDensityProps } from '@origam/interfaces'

import { useDensity } from '@origam/composables/Commons/density.composable'

function mountWith (initial: IDensityProps['density'], componentName = 'OrigamDensityHost') {
    const props = reactive<IDensityProps>({ density: initial })
    let api!: ReturnType<typeof useDensity>

    const Host = defineComponent({
        name: componentName,
        setup () {
            api = useDensity(props)
            return () => h('div')
        }
    })

    mount(Host)
    return { props, api: () => api }
}

describe('useDensity', () => {
    it('returns densityClasses', () => {
        const { api } = mountWith('default')
        expect(api()).toHaveProperty('densityClasses')
    })

    it('undefined density → empty classes', () => {
        const { api } = mountWith(undefined)
        expect(api().densityClasses.value).toEqual([])
    })

    it.each(['default', 'compact', 'comfortable'] as const)(
        'DENSITY "%s" → emits component--density-%s class',
        (d) => {
            const { api } = mountWith(d, 'OrigamBtn')
            expect(api().densityClasses.value).toContain(`origam-btn--density-${d}`)
        }
    )

    it('unknown density string → no class emitted', () => {
        const { api } = mountWith('ultra-dense' as any)
        expect(api().densityClasses.value).toEqual([])
    })

    it('class uses kebab-cased component name (PascalCase → kebab-case)', () => {
        const { api } = mountWith('compact', 'OrigamListItem')
        const cls = api().densityClasses.value
        expect(cls.some(c => c.startsWith('origam-list-item--density-'))).toBe(true)
    })

    it('class does NOT contain raw PascalCase component name', () => {
        const { api } = mountWith('compact', 'OrigamChip')
        const cls = api().densityClasses.value
        expect(cls.some(c => c.includes('OrigamChip'))).toBe(false)
    })

    it('reactive props.density change → class updates', () => {
        const { props, api } = mountWith('default', 'OrigamTextField')
        expect(api().densityClasses.value).toContain('origam-text-field--density-default')
        props.density = 'compact'
        expect(api().densityClasses.value).toContain('origam-text-field--density-compact')
        expect(api().densityClasses.value).not.toContain('origam-text-field--density-default')
    })

    it('Ref<string> overload — emits class from ref value', () => {
        const densityRef = ref<IDensityProps['density']>('comfortable')
        let api!: ReturnType<typeof useDensity>

        const Host = defineComponent({
            name: 'OrigamRefDensityHost',
            setup () {
                api = useDensity(densityRef)
                return () => h('div')
            }
        })

        mount(Host)
        expect(api.densityClasses.value).toContain('origam-ref-density-host--density-comfortable')
    })

    it('Ref overload — reactively updates when ref value changes', () => {
        const densityRef = ref<IDensityProps['density']>('comfortable')
        let api!: ReturnType<typeof useDensity>

        const Host = defineComponent({
            name: 'OrigamReactiveDensityHost',
            setup () {
                api = useDensity(densityRef)
                return () => h('div')
            }
        })

        mount(Host)
        expect(api.densityClasses.value).toContain('origam-reactive-density-host--density-comfortable')
        densityRef.value = 'compact'
        expect(api.densityClasses.value).toContain('origam-reactive-density-host--density-compact')
        expect(api.densityClasses.value).not.toContain('origam-reactive-density-host--density-comfortable')
    })

    it('only one class emitted (no duplicates)', () => {
        const { api } = mountWith('compact', 'OrigamBtn')
        const cls = api().densityClasses.value
        const densityCls = cls.filter(c => c.includes('--density-'))
        expect(densityCls.length).toBe(1)
    })
})
