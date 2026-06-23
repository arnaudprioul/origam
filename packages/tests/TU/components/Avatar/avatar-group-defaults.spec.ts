import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { OrigamAvatarGroup } from '@origam/components'
import { createOrigam } from '@origam/origam'

const ITEMS = [{ text: 'A' }, { text: 'B' }, { text: 'C' }]

const childClass = (props: Record<string, unknown>): string => {
    const wrapper = mount(OrigamAvatarGroup, {
        props: { items: ITEMS, max: 3, ...props } as never,
        global: { plugins: [createOrigam()] }
    })
    return wrapper.find('.origam-avatar').attributes('class') ?? ''
}

describe('OrigamAvatarGroup — rounded/border/elevation propagation', () => {
    it('propagates rounded to child avatars', () => {
        const base = childClass({})
        const withProp = childClass({ rounded: 'lg' })
        expect(withProp, `base="${base}" with="${withProp}"`).not.toBe(base)
        expect(withProp).toMatch(/rounded/i)
    })

    it('propagates border to child avatars', () => {
        const base = childClass({})
        const withProp = childClass({ border: true })
        expect(withProp, `base="${base}" with="${withProp}"`).not.toBe(base)
        expect(withProp).toMatch(/border/i)
    })

    it('propagates elevation to child avatars', () => {
        const base = childClass({})
        const withProp = childClass({ elevation: 'xl' })
        expect(withProp, `base="${base}" with="${withProp}"`).not.toBe(base)
        expect(withProp).toMatch(/shadow|elevat/i)
    })
})
