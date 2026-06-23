// TU — event.util.ts
// Exports: getPrefixedEventHandlers
//
// The function filters attrs to keep only keys that:
//   1. match isOn() — i.e. start with "on" + uppercase (ON_REGEX = /^on[^a-z]/)
//   2. end with the supplied suffix
// It then returns a new object whose keys are the prefix (without the suffix)
// and whose values are wrappers that call the original handler with
// (event, getData(event)).

import { describe, expect, it, vi } from 'vitest'
import { getPrefixedEventHandlers } from '@origam/utils/Commons/event.util'

describe('getPrefixedEventHandlers', () => {
    it('returns empty object when no attrs match', () => {
        const result = getPrefixedEventHandlers({}, ':model', () => null)
        expect(result).toEqual({})
    })

    it('returns empty object when attrs do not start with "on"', () => {
        const attrs = { 'class': 'foo', 'id': 'bar', 'aria-label': 'baz' }
        const result = getPrefixedEventHandlers(attrs, ':model', () => null)
        expect(result).toEqual({})
    })

    it('returns empty object when on-keys do not end with the suffix', () => {
        const attrs = { 'onClick': vi.fn(), 'onFocus': vi.fn() }
        const result = getPrefixedEventHandlers(attrs, ':model', () => null)
        expect(result).toEqual({})
    })

    it('strips the suffix from matching keys', () => {
        const handler = vi.fn()
        const attrs = { 'onClick:model': handler }
        const result = getPrefixedEventHandlers(attrs, ':model', () => null)
        expect(result).toHaveProperty('onClick')
    })

    it('wraps the handler to call it with (event, data)', () => {
        const originalHandler = vi.fn()
        const getData = vi.fn().mockReturnValue({ foo: 'bar' })
        const attrs = { 'onInput:model': originalHandler }

        const result = getPrefixedEventHandlers(attrs, ':model', getData)
        const wrappedHandler = result['onInput']
        expect(wrappedHandler).toBeTypeOf('function')

        const fakeEvent = new Event('input')
        wrappedHandler(fakeEvent)

        expect(getData).toHaveBeenCalledWith(fakeEvent)
        expect(originalHandler).toHaveBeenCalledWith(fakeEvent, { foo: 'bar' })
    })

    it('handles multiple matching attrs', () => {
        const h1 = vi.fn()
        const h2 = vi.fn()
        const attrs = {
            'onClick:model': h1,
            'onFocus:model': h2,
            'onChange': vi.fn()   // no suffix — excluded
        }
        const result = getPrefixedEventHandlers(attrs, ':model', () => null)
        expect(Object.keys(result)).toHaveLength(2)
        expect(result).toHaveProperty('onClick')
        expect(result).toHaveProperty('onFocus')
        expect(result).not.toHaveProperty('onChange')
    })

    it('ignores keys starting with lowercase "on" (not matching ON_REGEX)', () => {
        // ON_REGEX = /^on[^a-z]/ — "onlowercase" does NOT match
        const attrs = { 'onclick:model': vi.fn(), 'onfocus:model': vi.fn() }
        const result = getPrefixedEventHandlers(attrs, ':model', () => null)
        expect(result).toEqual({})
    })

    it('getData receives the exact event object', () => {
        const capturedArgs: Event[] = []
        const getData = vi.fn((e: Event) => {
            capturedArgs.push(e)
            return 42
        })
        const handler = vi.fn()
        const attrs = { 'onUpdate:model': handler }
        const result = getPrefixedEventHandlers(attrs, ':model', getData)

        const fakeEvent = new MouseEvent('click')
        result['onUpdate'](fakeEvent)

        expect(capturedArgs[0]).toBe(fakeEvent)
        expect(handler).toHaveBeenCalledWith(fakeEvent, 42)
    })
})
