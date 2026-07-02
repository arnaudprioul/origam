// TU — intersect.util.ts
// Exports: unmountIntersect
//
// The module is thin: one exported function that calls IntersectionObserver.unobserve
// and cleans up the element's _observe map. All branches are exercisable in jsdom.

import { describe, expect, it, vi } from 'vitest'
import { unmountIntersect } from '@origam/utils/Commons/intersect.util'
import type { IIntersectDirectiveBinding, IIntersectHtmlElement } from '@origam/interfaces'

// Minimal fake binding that provides a stable uid
function makeBinding (uid: number): IIntersectDirectiveBinding {
    return {
        instance: { $: { uid } }
    } as unknown as IIntersectDirectiveBinding
}

describe('unmountIntersect', () => {
    it('does nothing when el._observe is undefined', () => {
        const el = document.createElement('div') as IIntersectHtmlElement
        const binding = makeBinding(1)
        // Should not throw
        expect(() => unmountIntersect(el, binding)).not.toThrow()
    })

    it('does nothing when el._observe does not contain the binding uid', () => {
        const el = document.createElement('div') as IIntersectHtmlElement
        el._observe = {}
        const binding = makeBinding(42)
        expect(() => unmountIntersect(el, binding)).not.toThrow()
        // Map still intact
        expect(el._observe).toEqual({})
    })

    it('calls unobserve on the stored observer and removes the uid entry', () => {
        const uid = 7
        const el = document.createElement('div') as IIntersectHtmlElement
        const unobserveSpy = vi.fn()

        el._observe = {
            [uid]: {
                observer: { unobserve: unobserveSpy }
            }
        }

        const binding = makeBinding(uid)
        unmountIntersect(el, binding)

        expect(unobserveSpy).toHaveBeenCalledOnce()
        expect(unobserveSpy).toHaveBeenCalledWith(el)
        expect(el._observe![uid]).toBeUndefined()
    })

    it('does not remove other uid entries from _observe', () => {
        const targetUid = 1
        const otherUid = 2
        const el = document.createElement('div') as IIntersectHtmlElement
        const unobserveSpy = vi.fn()

        el._observe = {
            [targetUid]: { observer: { unobserve: unobserveSpy } },
            [otherUid]:  { observer: { unobserve: vi.fn() } }
        }

        unmountIntersect(el, makeBinding(targetUid))

        expect(el._observe![otherUid]).toBeDefined()
        expect(el._observe![targetUid]).toBeUndefined()
    })
})
