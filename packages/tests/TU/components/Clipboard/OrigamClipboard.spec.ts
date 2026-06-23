// Unit tests for OrigamClipboard — minimal API surface.
//
// What's covered:
//  - Default trigger renders + flips its label "Copy" → "Copied!" on success.
//  - `@copy(value)` emits with the right payload.
//  - The `copied` flag auto-resets after `feedbackDuration` ms.
//  - The default `#default` scoped slot receives `{ copy, copied, error }`.
//  - `disabled` short-circuits the copy pipeline.
//  - On clipboard failure, `@error(Error)` is emitted instead of `@copy`.

import { mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { nextTick } from 'vue'

import OrigamClipboard from '@origam/components/Clipboard/OrigamClipboard.vue'
import { createOrigam } from '@origam/origam'

import type { IClipboardProps } from '@origam/interfaces'

type MountOptions = Partial<IClipboardProps> & { slots?: Record<string, any> }

const mountClipboard = (opts: MountOptions = {}): VueWrapper => {
    const { slots, ...props } = opts
    return mount(OrigamClipboard, {
        props: { value: 'hello', ...props },
        slots,
        global: {
            plugins: [createOrigam()]
        }
    })
}

const stubClipboardSuccess = () => {
    Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
            writeText: vi.fn().mockResolvedValue(undefined)
        }
    })
}

const stubClipboardFailure = () => {
    Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
            writeText: vi.fn().mockRejectedValue(new Error('Permission denied'))
        }
    })
    // execCommand fallback path: also fail to keep the pipeline negative.
    document.execCommand = (() => false) as unknown as typeof document.execCommand
}

describe('OrigamClipboard', () => {
    beforeEach(() => {
        vi.useFakeTimers()
        stubClipboardSuccess()
    })

    afterEach(() => {
        vi.useRealTimers()
        vi.restoreAllMocks()
    })

    it('renders the default trigger button when no slot is provided', () => {
        const wrapper = mountClipboard()
        expect(wrapper.get('[data-cy="origam-clipboard-default-trigger"]').exists()).toBe(true)
    })

    it('flips the trigger label to feedbackText on successful copy', async () => {
        const wrapper = mountClipboard({ feedbackText: 'Done!' })
        // Before copy: no label span
        expect(wrapper.find('.origam-clipboard__default-label').exists()).toBe(false)

        await wrapper.get('[data-cy="origam-clipboard-default-trigger"]').trigger('click')
        await vi.waitFor(() => expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello'))
        await nextTick()

        const label = wrapper.find('.origam-clipboard__default-label')
        expect(label.exists()).toBe(true)
        expect(label.text()).toBe('Done!')
    })

    it('emits @copy(value) once on success', async () => {
        const wrapper = mountClipboard({ value: 'payload' })
        await wrapper.get('[data-cy="origam-clipboard-default-trigger"]').trigger('click')
        await vi.waitFor(() => expect(navigator.clipboard.writeText).toHaveBeenCalled())
        await nextTick()

        expect(wrapper.emitted('copy')).toBeTruthy()
        expect(wrapper.emitted('copy')![0]).toEqual(['payload'])
    })

    it('resets copied to false after feedbackDuration ms', async () => {
        const wrapper = mountClipboard({ feedbackDuration: 1000, feedbackText: 'OK' })
        await wrapper.get('[data-cy="origam-clipboard-default-trigger"]').trigger('click')
        await vi.waitFor(() => expect(navigator.clipboard.writeText).toHaveBeenCalled())
        await nextTick()
        expect(wrapper.find('.origam-clipboard__default-label').exists()).toBe(true)

        vi.advanceTimersByTime(1100)
        await nextTick()
        expect(wrapper.find('.origam-clipboard__default-label').exists()).toBe(false)
    })

    it('passes { copy, copied, error } to the default scoped slot', async () => {
        let slotProps: any = null
        const _wrapper = mountClipboard({
            slots: {
                default: (props: any) => {
                    slotProps = props
                    return null
                }
            }
        })
        await nextTick()
        expect(slotProps).toMatchObject({
            copy: expect.any(Function),
            copied: false,
            error: null
        })
    })

    it('short-circuits when disabled — neither writes nor emits @copy', async () => {
        const wrapper = mountClipboard({ disabled: true })
        await wrapper.get('[data-cy="origam-clipboard-default-trigger"]').trigger('click')
        await nextTick()
        expect(navigator.clipboard.writeText).not.toHaveBeenCalled()
        expect(wrapper.emitted('copy')).toBeFalsy()
    })

    it('emits @error(Error) when the clipboard pipeline fails', async () => {
        stubClipboardFailure()
        const wrapper = mountClipboard({ value: 'fails' })
        await wrapper.get('[data-cy="origam-clipboard-default-trigger"]').trigger('click')
        await vi.waitFor(() => expect(wrapper.emitted('error')).toBeTruthy())

        expect(wrapper.emitted('copy')).toBeFalsy()
        const errEvent = wrapper.emitted('error')![0]
        expect(errEvent[0]).toBeInstanceOf(Error)
    })
})
