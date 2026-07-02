// TU — clickOutside.util.ts
// Exports: checkEvent, checkIsActive, directive, handleShadow
//
// ShadowRoot is partially supported in jsdom — shadow-root branches are
// tested where jsdom supports them; unsupported paths are skipped with notes.

import { describe, expect, it, vi } from 'vitest'
import { checkEvent, checkIsActive, directive, handleShadow } from '@origam/utils/Commons/clickOutside.util'
import type { IClickOutsideDirectiveBinding } from '@origam/interfaces'

// ------------------------------------------------------------------ //
// Helpers

function makeBinding (
    value: IClickOutsideDirectiveBinding['value'],
    closeConditional?: (e: MouseEvent) => boolean
): IClickOutsideDirectiveBinding {
    if (typeof value === 'function') return { value } as IClickOutsideDirectiveBinding
    return { value: { handler: value as any, closeConditional, ...(value as any) } } as unknown as IClickOutsideDirectiveBinding
}

// Helper: create a MouseEvent with a dispatched target by appending elements
// to the DOM and using dispatchEvent. jsdom marks `target` read-only — we
// cannot override it with Object.assign. Instead we rely on natural dispatch.
function makeClickOn (target: Element): MouseEvent {
    const e = new MouseEvent('click', { bubbles: true })
    target.dispatchEvent(e)
    return e
}

// ------------------------------------------------------------------ //

describe('checkIsActive', () => {
    it('returns true when binding value is a function (defaultConditional)', () => {
        const binding: IClickOutsideDirectiveBinding = { value: vi.fn() } as any
        const e = new MouseEvent('click')
        expect(checkIsActive(e, binding)).toBe(true)
    })

    it('returns true when binding.value is an object without closeConditional', () => {
        const binding = { value: { handler: vi.fn() } } as any
        const e = new MouseEvent('click')
        expect(checkIsActive(e, binding)).toBe(true)
    })

    it('delegates to closeConditional when provided', () => {
        const e = new MouseEvent('click')
        const closeConditional = vi.fn(() => false)
        const binding = { value: { handler: vi.fn(), closeConditional } } as any
        const result = checkIsActive(e, binding)
        expect(closeConditional).toHaveBeenCalledWith(e)
        expect(result).toBe(false)
    })
})

describe('checkEvent', () => {
    it('returns false when no event is provided', () => {
        const el = document.createElement('div')
        document.body.appendChild(el)
        const binding = { value: vi.fn() } as any
        expect(checkEvent(null as unknown as MouseEvent, el, binding)).toBe(false)
        document.body.removeChild(el)
    })

    it('returns false when checkIsActive returns false', () => {
        const el = document.createElement('div')
        document.body.appendChild(el)
        const binding = {
            value: {
                handler: vi.fn(),
                closeConditional: () => false
            }
        } as any
        const e = new MouseEvent('click')
        expect(checkEvent(e, el, binding)).toBe(false)
        document.body.removeChild(el)
    })

    it('returns false when the click target is inside the element', () => {
        const el = document.createElement('div')
        const inner = document.createElement('span')
        el.appendChild(inner)
        document.body.appendChild(el)

        // Dispatch so jsdom sets `target` natively
        const e = makeClickOn(inner)
        const binding = { value: vi.fn() } as any
        expect(checkEvent(e, el, binding)).toBe(false)

        document.body.removeChild(el)
    })

    it('returns true when the click target is outside the element', () => {
        const el = document.createElement('div')
        const outside = document.createElement('span')
        document.body.appendChild(el)
        document.body.appendChild(outside)

        const e = makeClickOn(outside)
        const binding = { value: vi.fn() } as any
        expect(checkEvent(e, el, binding)).toBe(true)

        document.body.removeChild(el)
        document.body.removeChild(outside)
    })

    it('returns false when target is inside an included element', () => {
        const el = document.createElement('div')
        const extra = document.createElement('section')
        const inside = document.createElement('span')
        extra.appendChild(inside)
        document.body.appendChild(el)
        document.body.appendChild(extra)

        const e = makeClickOn(inside)
        const binding = { value: { handler: vi.fn(), include: () => [extra] } } as any
        expect(checkEvent(e, el, binding)).toBe(false)

        document.body.removeChild(el)
        document.body.removeChild(extra)
    })

    it.skip('returns false when shadow root host equals e.target (ShadowRoot not testable in jsdom)', () => {
        // jsdom does not fully implement ShadowRoot host assignment. This path
        // would require a real browser environment.
    })
})

describe('directive', () => {
    it('does not call handler when lastMousedownWasOutside is false', () => {
        const handler = vi.fn()
        const el = document.createElement('div') as HTMLElement & { _clickOutside?: any }
        el._clickOutside = { lastMousedownWasOutside: false }
        document.body.appendChild(el)

        const outside = document.createElement('span')
        document.body.appendChild(outside)
        const e = makeClickOn(outside)
        const binding = { value: handler } as any

        directive(e, el, binding)
        expect(handler).not.toHaveBeenCalled()

        document.body.removeChild(el)
        document.body.removeChild(outside)
    })

    it('calls handler via setTimeout when conditions are met', () => {
        vi.useFakeTimers()
        const handler = vi.fn()
        const el = document.createElement('div') as HTMLElement & { _clickOutside?: any }
        el._clickOutside = { lastMousedownWasOutside: true }
        document.body.appendChild(el)

        const outside = document.createElement('span')
        document.body.appendChild(outside)
        const e = makeClickOn(outside)
        const binding = { value: handler } as any

        directive(e, el, binding)
        expect(handler).not.toHaveBeenCalled()  // deferred

        vi.runAllTimers()
        expect(handler).toHaveBeenCalledOnce()

        vi.useRealTimers()
        document.body.removeChild(el)
        document.body.removeChild(outside)
    })
})

describe('handleShadow', () => {
    it('always calls the callback with document', () => {
        const el = document.createElement('div')
        document.body.appendChild(el)
        const cb = vi.fn()

        handleShadow(el, cb)

        expect(cb).toHaveBeenCalledWith(document)
        document.body.removeChild(el)
    })

    it('calls callback once (no ShadowRoot on a regular element)', () => {
        const el = document.createElement('div')
        document.body.appendChild(el)
        const cb = vi.fn()

        handleShadow(el, cb)

        // attachedRoot returns document — not a ShadowRoot → only 1 call
        expect(cb).toHaveBeenCalledTimes(1)
        document.body.removeChild(el)
    })
})
