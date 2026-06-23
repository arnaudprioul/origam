import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { OrigamBottomNav } from '@origam/components'
import { createOrigam } from '@origam/origam'

const rootClass = (props: Record<string, unknown>): string =>
    mount(OrigamBottomNav, {
        props: { modelValue: true, ...props } as never,
        global: { plugins: [createOrigam()] }
    }).find('.origam-bottom-nav').attributes('class') ?? ''

describe('OrigamBottomNav — position (start | center | end)', () => {
    it('defaults to position-start', () => {
        expect(rootClass({})).toMatch(/origam-bottom-nav--position-start/)
    })

    it('position="center" emits the center modifier', () => {
        const cls = rootClass({ position: 'center' })
        expect(cls).toMatch(/origam-bottom-nav--position-center/)
        expect(cls).not.toMatch(/origam-bottom-nav--position-start/)
    })

    it('position="end" emits the end modifier', () => {
        expect(rootClass({ position: 'end' })).toMatch(/origam-bottom-nav--position-end/)
    })
})
