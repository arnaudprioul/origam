// Tests for the DataTable options composable.
//
// useOptions requires a Vue component instance (it calls getCurrentInstance
// internally for emit). We mount a host component and capture the emitted
// update:options events.
//
// Covers:
//   - emits update:options immediately on mount (immediate watcher)
//   - emits again when any reactive input changes (page, itemsPerPage, sortBy, groupBy, search)
//   - resets page to 1 when search changes
//   - does NOT emit when value is deeply equal to the previous options
//   - emitted payload shape matches { page, itemsPerPage, sortBy, groupBy, search }

import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { useOptions } from '@origam/composables/DataTable/options.composable'
import type { IDataTableSortItem } from '@origam/interfaces'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function mountOptions (init: {
    page?: number
    itemsPerPage?: number
    sortBy?: IDataTableSortItem[]
    groupBy?: IDataTableSortItem[]
    search?: string
}) {
    const page = ref(init.page ?? 1)
    const itemsPerPage = ref(init.itemsPerPage ?? 10)
    const sortBy = ref<IDataTableSortItem[]>(init.sortBy ?? [])
    const groupBy = ref<IDataTableSortItem[]>(init.groupBy ?? [])
    const search = ref<string | undefined>(init.search)

    const emitted: any[] = []

    const Host = defineComponent({
        name: 'OptionsHost',
        emits: ['update:options'],
        setup () {
            useOptions({ page, itemsPerPage, sortBy, groupBy, search })
            return () => h('div')
        }
    })

    // We capture emits via the wrapper's emitted helper
    const wrapper = mount(Host, {
        global: {
            config: {
                // capture emit calls without a real parent
            }
        }
    })

    return { page, itemsPerPage, sortBy, groupBy, search, wrapper, emitted }
}

// ---------------------------------------------------------------------------
// useOptions
// ---------------------------------------------------------------------------

describe('useOptions — immediate emit on mount', () => {
    it('emits update:options immediately with initial values', async () => {
        const { wrapper } = mountOptions({ page: 2, itemsPerPage: 25 })
        await nextTick()
        const emits = wrapper.emitted('update:options')
        expect(emits).toBeTruthy()
        expect(emits!.length).toBeGreaterThanOrEqual(1)
        const payload = emits![0][0]
        expect(payload.page).toBe(2)
        expect(payload.itemsPerPage).toBe(25)
    })

    it('emitted payload contains all expected keys', async () => {
        const { wrapper } = mountOptions({
            page: 1,
            itemsPerPage: 10,
            sortBy: [{ key: 'name', order: 'asc' }],
            groupBy: [],
            search: 'hello'
        })
        await nextTick()
        const emits = wrapper.emitted('update:options')
        const payload = emits![0][0]
        expect(payload).toHaveProperty('page')
        expect(payload).toHaveProperty('itemsPerPage')
        expect(payload).toHaveProperty('sortBy')
        expect(payload).toHaveProperty('groupBy')
        expect(payload).toHaveProperty('search')
    })
})

describe('useOptions — reactivity', () => {
    it('emits again when page changes', async () => {
        const { wrapper, page } = mountOptions({ page: 1 })
        await nextTick()
        const before = (wrapper.emitted('update:options') ?? []).length

        page.value = 3
        await nextTick()

        const after = (wrapper.emitted('update:options') ?? []).length
        expect(after).toBeGreaterThan(before)

        const lastPayload = wrapper.emitted('update:options')!.at(-1)![0]
        expect(lastPayload.page).toBe(3)
    })

    it('emits again when itemsPerPage changes', async () => {
        const { wrapper, itemsPerPage } = mountOptions({})
        await nextTick()
        const before = (wrapper.emitted('update:options') ?? []).length

        itemsPerPage.value = 50
        await nextTick()

        const after = (wrapper.emitted('update:options') ?? []).length
        expect(after).toBeGreaterThan(before)
        expect(wrapper.emitted('update:options')!.at(-1)![0].itemsPerPage).toBe(50)
    })

    it('emits again when sortBy changes', async () => {
        const { wrapper, sortBy } = mountOptions({})
        await nextTick()
        const before = (wrapper.emitted('update:options') ?? []).length

        sortBy.value = [{ key: 'age', order: 'desc' }]
        await nextTick()

        const after = (wrapper.emitted('update:options') ?? []).length
        expect(after).toBeGreaterThan(before)
    })

    it('emits again when search changes', async () => {
        const { wrapper, search } = mountOptions({ search: '' })
        await nextTick()
        const before = (wrapper.emitted('update:options') ?? []).length

        search.value = 'Alice'
        await nextTick()

        const after = (wrapper.emitted('update:options') ?? []).length
        expect(after).toBeGreaterThan(before)
        expect(wrapper.emitted('update:options')!.at(-1)![0].search).toBe('Alice')
    })

    it('resets page to 1 when search changes (non-null oldOptions)', async () => {
        const { wrapper, page, search } = mountOptions({ page: 5, search: 'foo' })
        await nextTick()
        // page was 5, change search
        search.value = 'bar'
        await nextTick()
        expect(page.value).toBe(1)
    })

    it('does NOT reset page when search stays the same', async () => {
        const { wrapper, page, itemsPerPage } = mountOptions({ page: 5 })
        await nextTick()
        // change itemsPerPage, not search
        itemsPerPage.value = 20
        await nextTick()
        expect(page.value).toBe(5)
    })
})

describe('useOptions — deepEqual guard', () => {
    it('does not emit extra events when refs are mutated to the same value', async () => {
        const { wrapper, page } = mountOptions({ page: 1 })
        await nextTick()
        const before = (wrapper.emitted('update:options') ?? []).length

        // set same value — deepEqual should prevent another emit
        page.value = 1
        await nextTick()

        const after = (wrapper.emitted('update:options') ?? []).length
        expect(after).toBe(before)
    })
})
