// Tests for `useScopeId` composable.
// The composable reads `vm.vnode.scopeId` and returns either
// `{ [scopeId]: '' }` or `undefined`. In jsdom (no SFC compiler scoping),
// the scopeId is typically null/undefined → the composable returns
// `{ scopeId: undefined }`.

import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { useScopeId } from '@origam/composables/Commons/scopeId.composable'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function mountHost () {
    let api!: ReturnType<typeof useScopeId>

    const Host = defineComponent({
        name: 'OrigamScopeIdHost',
        setup () {
            api = useScopeId()
            return () => h('div')
        }
    })

    mount(Host)
    return { api: () => api }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('useScopeId', () => {
    it('returns an object with a `scopeId` key', () => {
        const { api } = mountHost()
        expect(api()).toHaveProperty('scopeId')
    })

    it('returns scopeId: undefined when the component has no vnode scopeId (jsdom)', () => {
        // In jsdom / Vitest without an SFC compiler the component's vnode.scopeId
        // is null/undefined. The composable maps this to `{ scopeId: undefined }`.
        const { api } = mountHost()
        expect(api().scopeId).toBeUndefined()
    })

    it('does not throw when mounted without a parent context', () => {
        expect(() => mountHost()).not.toThrow()
    })
})
