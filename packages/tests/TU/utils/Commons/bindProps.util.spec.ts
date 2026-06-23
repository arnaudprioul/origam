// TU — bindProps.util.ts
// Exports: bindProps, unbindProps
//
// bindProps: for on-keys → addEventListener + tracks in HANDLERS WeakMap
//            for attr-keys → setAttribute
//            null values → removeEventListener / removeAttribute
// unbindProps: for on-keys → removeEventListener
//              for attr-keys → removeAttribute
//
// jsdom provides a real DOM — addEventListener/removeEventListener work.

import { describe, expect, it, vi } from 'vitest'
import { bindProps, unbindProps } from '@origam/utils/Commons/bindProps.util'

describe('bindProps — attribute keys', () => {
    it('sets an attribute when value is non-null', () => {
        const el = document.createElement('div')
        bindProps(el, { 'data-id': '42' })
        expect(el.getAttribute('data-id')).toBe('42')
    })

    it('removes the attribute when value is null', () => {
        const el = document.createElement('div')
        el.setAttribute('data-id', '42')
        bindProps(el, { 'data-id': null })
        expect(el.hasAttribute('data-id')).toBe(false)
    })

    it('removes the attribute when value is undefined', () => {
        const el = document.createElement('div')
        el.setAttribute('title', 'hello')
        bindProps(el, { title: undefined })
        expect(el.hasAttribute('title')).toBe(false)
    })

    it('sets multiple attributes at once', () => {
        const el = document.createElement('div')
        bindProps(el, { 'aria-label': 'test', 'tabindex': '0' })
        expect(el.getAttribute('aria-label')).toBe('test')
        expect(el.getAttribute('tabindex')).toBe('0')
    })
})

describe('bindProps — event keys (on-prefix)', () => {
    it('adds an event listener for on-key', () => {
        const el = document.createElement('div')
        const handler = vi.fn()
        bindProps(el, { onClick: handler })

        el.dispatchEvent(new MouseEvent('click'))
        expect(handler).toHaveBeenCalledOnce()
    })

    it('does not add the same handler twice', () => {
        const el = document.createElement('div')
        const handler = vi.fn()
        bindProps(el, { onClick: handler })
        bindProps(el, { onClick: handler })  // second call same handler

        el.dispatchEvent(new MouseEvent('click'))
        expect(handler).toHaveBeenCalledTimes(1)
    })

    it('removes event listener when value is null', () => {
        const el = document.createElement('div')
        const handler = vi.fn()
        bindProps(el, { onClick: handler })
        // Now remove
        bindProps(el, { onClick: null })

        el.dispatchEvent(new MouseEvent('click'))
        expect(handler).not.toHaveBeenCalled()
    })

    it('can add multiple different handlers', () => {
        const el = document.createElement('div')
        const h1 = vi.fn()
        const h2 = vi.fn()
        bindProps(el, { onClick: h1, onMouseover: h2 })

        el.dispatchEvent(new MouseEvent('click'))
        expect(h1).toHaveBeenCalledOnce()

        el.dispatchEvent(new MouseEvent('mouseover'))
        expect(h2).toHaveBeenCalledOnce()
    })
})

describe('unbindProps — attribute keys', () => {
    it('removes attribute', () => {
        const el = document.createElement('div')
        el.setAttribute('data-test', 'value')
        unbindProps(el, { 'data-test': 'value' })
        expect(el.hasAttribute('data-test')).toBe(false)
    })

    it('is a no-op for non-existing attribute', () => {
        const el = document.createElement('div')
        expect(() => unbindProps(el, { 'aria-hidden': 'true' })).not.toThrow()
    })
})

describe('unbindProps — event keys (on-prefix)', () => {
    it('removes event listener', () => {
        const el = document.createElement('div')
        const handler = vi.fn()
        bindProps(el, { onClick: handler })
        unbindProps(el, { onClick: handler })

        el.dispatchEvent(new MouseEvent('click'))
        expect(handler).not.toHaveBeenCalled()
    })

    it('does not throw when removing handler that was never added', () => {
        const el = document.createElement('div')
        expect(() => unbindProps(el, { onClick: vi.fn() })).not.toThrow()
    })
})
