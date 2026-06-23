// TU — activator.util.ts
// Exports: getTargetActivator, activator (watch-based, Vue-bound)
//
// `activator()` wraps Vue watchers and lifecycle hooks — fully exercising it
// would require mounting a component. We test the pure selector logic
// (`getTargetActivator`) which covers the majority of the callable surface.
//
// The `activator()` function itself is not covered here: it requires a live
// ComponentInternalInstance, activatorEl ref, and activatorEvents computed —
// no meaningful unit test can be written without becoming an integration test.

import { describe, expect, it } from 'vitest'
import { getTargetActivator } from '@origam/utils/Commons/activator.util'
import { defineComponent, getCurrentInstance, h } from 'vue'
import { mount } from '@vue/test-utils'

// Helper: minimal fake ComponentInternalInstance
function makeVm (proxyEl?: HTMLElement | null): any {
    return {
        proxy: {
            $el: {
                parentNode: proxyEl ?? null
            }
        }
    }
}

describe('getTargetActivator', () => {
    it('returns undefined for an undefined selector', () => {
        const vm = makeVm()
        expect(getTargetActivator(undefined, vm)).toBeUndefined()
    })

    it('returns undefined for an empty string', () => {
        const vm = makeVm()
        // empty string is falsy → undefined
        expect(getTargetActivator('' as any, vm)).toBeUndefined()
    })

    it('returns the element matching a CSS selector string', () => {
        const el = document.createElement('button')
        el.id = 'test-activator-btn'
        document.body.appendChild(el)

        const result = getTargetActivator('#test-activator-btn', makeVm())
        expect(result).toBe(el)

        document.body.removeChild(el)
    })

    it('returns null (via querySelector) for a selector that matches nothing', () => {
        const result = getTargetActivator('#non-existent-element-xyz', makeVm())
        expect(result).toBeNull()
    })

    it('returns the body element for the "cursor" selector', () => {
        const result = getTargetActivator('cursor', makeVm())
        expect(result).toBe(document.querySelector('body'))
    })

    it('returns the parent node for the "parent" selector', () => {
        const parent = document.createElement('section')
        const child = document.createElement('div')
        parent.appendChild(child)
        document.body.appendChild(parent)

        const vm = {
            proxy: {
                $el: { parentNode: parent }
            }
        } as any

        const result = getTargetActivator('parent', vm)
        expect(result).toBe(parent)

        document.body.removeChild(parent)
    })

    it('skips elements with data-no-activator for the "parent" selector', () => {
        const grandparent = document.createElement('article')
        const parent = document.createElement('section')
        parent.setAttribute('data-no-activator', '')
        grandparent.appendChild(parent)
        document.body.appendChild(grandparent)

        const vm = {
            proxy: {
                $el: { parentNode: parent }
            }
        } as any

        const result = getTargetActivator('parent', vm)
        // Should skip `parent` (has data-no-activator) and return `grandparent`
        expect(result).toBe(grandparent)

        document.body.removeChild(grandparent)
    })

    it('returns the $el from a ComponentPublicInstance (component ref)', () => {
        const innerEl = document.createElement('div')
        document.body.appendChild(innerEl)

        const compProxy = { $el: innerEl } as any
        const result = getTargetActivator(compProxy, makeVm())
        expect(result).toBe(innerEl)

        document.body.removeChild(innerEl)
    })

    it('returns a coordinate tuple as-is', () => {
        const tuple: [number, number] = [42, 84]
        const result = getTargetActivator(tuple, makeVm())
        expect(result).toEqual([42, 84])
    })

    it('returns an HTMLElement directly when passed as selector', () => {
        const el = document.createElement('div')
        document.body.appendChild(el)

        const result = getTargetActivator(el, makeVm())
        expect(result).toBe(el)

        document.body.removeChild(el)
    })
})
