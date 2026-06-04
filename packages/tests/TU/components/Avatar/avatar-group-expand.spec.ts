import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { OrigamAvatarGroup } from '@origam/components'
import { createOrigam } from '@origam/origam'

const ITEMS = [
    { text: 'A' }, { text: 'B' }, { text: 'C' },
    { text: 'D' }, { text: 'E' }, { text: 'F' }, { text: 'G' }
]

const render = (props: Record<string, unknown>) => {
    const wrapper = mount(OrigamAvatarGroup, {
        props: { items: ITEMS, max: 4, ...props } as never,
        global: { plugins: [createOrigam()] }
    })
    return {
        rootClass: wrapper.find('.origam-avatar-group').attributes('class') ?? '',
        avatarCount: wrapper.findAll('.origam-avatar').length
    }
}

describe('OrigamAvatarGroup — expand (fan-out) on forced hover / active', () => {
    it('collapses by default (max applies, rest chip shown)', () => {
        const { rootClass, avatarCount } = render({ expandOnHover: true })
        expect(rootClass).not.toMatch(/--hovered/)
        // 3 visible items + 1 rest chip = 4
        expect(avatarCount).toBe(4)
    })

    it('forced `hover` prop expands when expandOnHover is set', () => {
        const { rootClass, avatarCount } = render({ expandOnHover: true, hover: true })
        expect(rootClass).toMatch(/origam-avatar-group--hovered/)
        // every item revealed, no rest chip
        expect(avatarCount).toBe(ITEMS.length)
    })

    it('forced `active` prop expands when expandOnClick is set', () => {
        const { rootClass, avatarCount } = render({ expandOnClick: true, active: true })
        expect(rootClass).toMatch(/origam-avatar-group--active/)
        expect(avatarCount).toBe(ITEMS.length)
    })

    it('forced `hover` WITHOUT expandOnHover does not expand (opt-in gated)', () => {
        const { avatarCount } = render({ hover: true })
        expect(avatarCount).toBe(4)
    })
})
