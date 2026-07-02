import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { OrigamRadioGroup } from '@origam/components'
import { createOrigam } from '@origam/origam'

const ITEMS = [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
    { label: 'C', value: 'c' }
]

describe('OrigamRadioGroup — reactive loop', () => {
    afterEach(() => vi.restoreAllMocks())

    it('mounts without a "Maximum recursive updates" warning', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

        const wrapper = mount(OrigamRadioGroup, {
            props: { items: ITEMS, modelValue: 'a', color: 'primary' } as never,
            global: { plugins: [createOrigam()] }
        })

        const recursive = warn.mock.calls
            .map(c => String(c[0]))
            .filter(m => /Maximum recursive updates/i.test(m))

        expect(recursive, recursive[0] ?? 'no recursive warning').toHaveLength(0)
        expect(wrapper.find('.origam-input').exists()).toBe(true)
    })
})
