import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { OrigamBottomNav } from '@origam/components'
import { createOrigam } from '@origam/origam'

const ITEMS = [{ text: 'Home' }, { text: 'Search' }]

const firstBtnClass = (props: Record<string, unknown>): string => {
    const wrapper = mount(OrigamBottomNav, {
        props: { modelValue: true, items: ITEMS, ...props } as never,
        global: { plugins: [createOrigam()] }
    })
    return wrapper.find('.origam-bottom-nav__btn').attributes('class') ?? ''
}

describe('OrigamBottomNav — active state diffused to the buttons', () => {
    it('forwards a forced `active` to each button (btn gets the active class)', () => {
        expect(firstBtnClass({ active: { enabled: true } })).toMatch(/origam-btn--active/)
    })

    it('no active by default', () => {
        expect(firstBtnClass({})).not.toMatch(/origam-btn--active/)
    })
})
