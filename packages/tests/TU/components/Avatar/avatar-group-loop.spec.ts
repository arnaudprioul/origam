import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { OrigamAvatarGroup } from '@origam/components'
import { createOrigam } from '@origam/origam'

const ITEMS = [
    { text: 'A' },
    { text: 'B' },
    { text: 'C' },
    { text: 'D' }
]

describe('OrigamAvatarGroup — reactive loop', () => {
    afterEach(() => vi.restoreAllMocks())

    it('mounts without a "Maximum recursive updates" warning', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

        const wrapper = mount(OrigamAvatarGroup, {
            props: { items: ITEMS, max: 3 } as never,
            global: { plugins: [createOrigam()] }
        })

        const recursive = warn.mock.calls
            .map(c => String(c[0]))
            .filter(m => /Maximum recursive updates/i.test(m))

        expect(recursive, recursive[0] ?? 'no recursive warning').toHaveLength(0)
        expect(wrapper.find('.origam-avatar-group').exists()).toBe(true)
    })
})
