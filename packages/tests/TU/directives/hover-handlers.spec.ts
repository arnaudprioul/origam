import { describe, expect, it, vi } from 'vitest'

import { updateHover } from '@origam/utils/Commons/hover.util'

/**
 * v-hover object config: `{ class?, mouseenter?, mouseleave? }`.
 * The directive must call the handlers on real pointer enter/leave,
 * in addition to toggling the class (or the default `{name}--hover`).
 */
describe('v-hover — object config handlers', () => {
    it('calls mouseenter / mouseleave handlers and toggles the custom class', () => {
        const el = document.createElement('div')
        const enter = vi.fn()
        const leave = vi.fn()

        updateHover(
            el as never,
            { value: { class: 'is-hover', mouseenter: enter, mouseleave: leave }, modifiers: {} } as never,
            false,
            'origam-test'
        )

        el.dispatchEvent(new MouseEvent('mouseenter'))
        expect(enter).toHaveBeenCalledTimes(1)
        expect(enter.mock.calls[0][0]).toBe(el)
        expect(el.classList.contains('is-hover')).toBe(true)

        el.dispatchEvent(new MouseEvent('mouseleave'))
        expect(leave).toHaveBeenCalledTimes(1)
        expect(el.classList.contains('is-hover')).toBe(false)
    })

    it('boolean value keeps working (default class, no handler, no crash)', () => {
        const el = document.createElement('div')

        updateHover(el as never, { value: true, modifiers: {} } as never, false, 'origam-test')

        expect(() => {
            el.dispatchEvent(new MouseEvent('mouseenter'))
            el.dispatchEvent(new MouseEvent('mouseleave'))
        }).not.toThrow()
        expect(el.classList.contains('origam-test--hover')).toBe(false)
    })
})
