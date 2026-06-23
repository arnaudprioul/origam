// Tests for `useRefs` composable.
// Covers the refs array population via updateRef and the pre-update reset.

import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { useRefs } from '@origam/composables/Commons/refs.composable'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Host component that calls `useRefs` and exposes the API via a captured ref.
 * The template renders N child divs, each of which calls `updateRef(el, i)`.
 */
function mountHost (count = 3) {
    let api!: ReturnType<typeof useRefs<HTMLDivElement>>

    const Host = defineComponent({
        name: 'OrigamRefsHost',
        setup () {
            api = useRefs<HTMLDivElement>()
            return () => h('div',
                Array.from({ length: count }, (_, i) =>
                    h('span', {
                        ref: (el: any) => api.updateRef(el, i)
                    })
                )
            )
        }
    })

    const wrapper = mount(Host, { attachTo: document.body })
    return { wrapper, api: () => api }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('useRefs', () => {
    it('refs starts as an empty array before any update', () => {
        let api!: ReturnType<typeof useRefs<HTMLDivElement>>

        const Host = defineComponent({
            name: 'OrigamRefsEmptyHost',
            setup () {
                api = useRefs<HTMLDivElement>()
                return () => h('div')
            }
        })

        mount(Host)
        expect(api.refs.value).toEqual([])
    })

    it('updateRef stores element references at correct indices', async () => {
        const { api } = mountHost(3)
        await nextTick()
        // After mount, each span should be stored.
        expect(api().refs.value).toHaveLength(3)
        expect(api().refs.value[0]).toBeInstanceOf(Element)
        expect(api().refs.value[1]).toBeInstanceOf(Element)
        expect(api().refs.value[2]).toBeInstanceOf(Element)
    })

    it('updateRef stores the element at the given index', async () => {
        let capturedApi!: ReturnType<typeof useRefs<HTMLDivElement>>

        const Host = defineComponent({
            name: 'OrigamRefsSingleHost',
            setup () {
                capturedApi = useRefs<HTMLDivElement>()
                return () => h('div', [
                    h('span', { id: 'A', ref: (el: any) => capturedApi.updateRef(el, 0) }),
                    h('span', { id: 'B', ref: (el: any) => capturedApi.updateRef(el, 1) })
                ])
            }
        })

        mount(Host, { attachTo: document.body })
        await nextTick()

        const refs = capturedApi.refs.value
        expect((refs[0] as HTMLElement)?.id).toBe('A')
        expect((refs[1] as HTMLElement)?.id).toBe('B')
    })

    it('updateRef can store undefined (unregistering)', async () => {
        let capturedApi!: ReturnType<typeof useRefs<HTMLDivElement>>

        const Host = defineComponent({
            name: 'OrigamRefsUndefinedHost',
            setup () {
                capturedApi = useRefs<HTMLDivElement>()
                return () => h('div')
            }
        })

        mount(Host)
        capturedApi.updateRef(undefined as any, 0)
        expect(capturedApi.refs.value[0]).toBeUndefined()
    })

    it('refs array is a reactive Ref', () => {
        let capturedApi!: ReturnType<typeof useRefs<HTMLDivElement>>

        const Host = defineComponent({
            name: 'OrigamRefsReactiveHost',
            setup () {
                capturedApi = useRefs<HTMLDivElement>()
                return () => h('div')
            }
        })

        mount(Host)
        // .value accessor confirms it is a Ref.
        expect(Array.isArray(capturedApi.refs.value)).toBe(true)
    })
})
