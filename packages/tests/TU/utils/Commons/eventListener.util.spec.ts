// TU — eventListener.util.ts
// Exports: resolveUnref, unrefElement
//
// Pure helpers — no DOM mounting needed; uses Vue's ref() for the Ref type.

import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { resolveUnref, unrefElement } from '@origam/utils/Commons/eventListener.util'

describe('resolveUnref', () => {
    it('returns the value of a Vue Ref', () => {
        const r = ref(42)
        expect(resolveUnref(r)).toBe(42)
    })

    it('returns the result of calling a function', () => {
        const fn = () => 'hello'
        expect(resolveUnref(fn as any)).toBe('hello')
    })

    it('returns undefined for a Ref holding undefined', () => {
        const r = ref<undefined>(undefined)
        expect(resolveUnref(r)).toBeUndefined()
    })

    it('returns null for a Ref holding null', () => {
        const r = ref<null>(null)
        expect(resolveUnref(r)).toBeNull()
    })

    it('returns a reactive object value', () => {
        const obj = { x: 1 }
        const r = ref(obj)
        expect(resolveUnref(r)).toEqual(obj)
    })
})

describe('unrefElement', () => {
    it('returns the $el when the resolved value is a Vue component proxy', () => {
        const el = document.createElement('div')
        // Simulate a ComponentPublicInstance with $el
        const comp = { $el: el }
        const r = ref(comp)
        expect(unrefElement(r as any)).toBe(el)
    })

    it('returns the raw value when it is a plain element (no $el property)', () => {
        const el = document.createElement('span')
        const r = ref(el)
        expect(unrefElement(r as any)).toBe(el)
    })

    it('returns null when the ref holds null', () => {
        const r = ref<null>(null)
        expect(unrefElement(r as any)).toBeNull()
    })

    it('returns undefined when the ref holds undefined', () => {
        const r = ref<undefined>(undefined)
        // null?..$el → undefined, then plain → undefined
        expect(unrefElement(r as any)).toBeUndefined()
    })

    it('works with a getter function returning a component proxy', () => {
        const el = document.createElement('button')
        const getter = () => ({ $el: el })
        expect(unrefElement(getter as any)).toBe(el)
    })
})
