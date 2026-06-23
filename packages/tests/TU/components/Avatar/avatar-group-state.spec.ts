import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { OrigamAvatar, OrigamAvatarGroup } from '@origam/components'
import { createOrigam } from '@origam/origam'

const ITEMS = [{ text: 'A' }, { text: 'B' }, { text: 'C' }]

const firstAvatar = (props: Record<string, unknown>) => {
    const wrapper = mount(OrigamAvatarGroup, {
        props: { items: ITEMS, max: 4, ...props } as never,
        global: { plugins: [createOrigam()] }
    })
    return wrapper.findAllComponents(OrigamAvatar)[0]
}

describe('OrigamAvatarGroup — forwards hover/active STATE to child avatars', () => {
    it('forwards a forced hover state object (enabled synced)', () => {
        const avatar = firstAvatar({ hover: { enabled: true, bgColor: 'success' } })
        expect(avatar.props('hover')).toMatchObject({ bgColor: 'success', enabled: true })
    })

    it('forwards a forced active state object', () => {
        const avatar = firstAvatar({ active: { enabled: true, bgColor: 'danger' } })
        expect(avatar.props('active')).toMatchObject({ bgColor: 'danger', enabled: true })
    })

    it('a non-forced hover state defaults to enabled:false until the group is hovered', () => {
        const avatar = firstAvatar({ hover: { bgColor: 'success' } })
        expect(avatar.props('hover')).toMatchObject({ bgColor: 'success', enabled: false })
    })

    it('forwards a bare boolean when no state object is configured', () => {
        const avatar = firstAvatar({})
        expect(typeof avatar.props('hover')).toBe('boolean')
        expect(typeof avatar.props('active')).toBe('boolean')
    })
})
