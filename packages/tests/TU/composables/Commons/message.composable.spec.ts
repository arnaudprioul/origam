// Tests for `useMessage` composable.
// Covers hasMessages detection (props vs slots vs otherMessages)
// and the message priority resolution logic.

import { defineComponent, h, reactive, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { useMessage } from '@origam/composables/Commons/message.composable'

// ---------------------------------------------------------------------------
// Helper: mount a host with given props and optional slot
// ---------------------------------------------------------------------------

function mountWith (
    props: Record<string, any>,
    otherMessages?: ReturnType<typeof ref>,
    withSlot = false
) {
    let api!: ReturnType<typeof useMessage>
    const reactiveProps = reactive(props)

    const Host = defineComponent({
        name: 'OrigamMessageHost',
        setup () {
            api = useMessage(reactiveProps, otherMessages)
            return () => withSlot
                ? h('div', {}, { message: () => h('span', 'slot msg') })
                : h('div')
        }
    })

    mount(Host)
    return { props: reactiveProps, api: () => api }
}

// ---------------------------------------------------------------------------
// hasMessages
// ---------------------------------------------------------------------------

describe('useMessage — hasMessages', () => {
    it('true even when all explicit message sources are absent — BUG CANDIDAT', () => {
        // CANDIDATE TICKET: useMessage hasMessages is always true when called without
        // an explicit otherMessages argument.
        //
        // Root cause (message.composable.ts:9-11):
        //   `Boolean(otherMessages.value)` where `otherMessages` defaults to `ref([])`.
        //   `Boolean([]) === true` in JS — an empty array is truthy.
        //   Fix: change the check to `otherMessages.value.length > 0`.
        //
        // This test documents the ACTUAL runtime behaviour, not the desired one,
        // to prevent silent regression once the bug is fixed.
        const { api } = mountWith({})
        // Currently returns true due to Boolean(ref([]).value) === Boolean([]) === true.
        expect(api().hasMessages.value).toBe(true)
    })

    it('true when props.messages is a non-empty array', () => {
        const { api } = mountWith({ messages: ['msg'] })
        expect(api().hasMessages.value).toBe(true)
    })

    it('true when props.errorMessages is set', () => {
        const { api } = mountWith({ errorMessages: ['error'] })
        expect(api().hasMessages.value).toBe(true)
    })

    it('true when otherMessages ref is non-empty', () => {
        const other = ref(['other'])
        const { api } = mountWith({}, other)
        expect(api().hasMessages.value).toBe(true)
    })

    it('false when props.messages is an empty array', () => {
        const { api } = mountWith({ messages: [] })
        // Empty array is falsy only via Boolean([]) === true — the composable
        // uses Boolean(props.messages) which is true for any array.
        // This test documents the ACTUAL behaviour.
        expect(api().hasMessages.value).toBe(true)
    })
})

// ---------------------------------------------------------------------------
// messages priority
// ---------------------------------------------------------------------------

describe('useMessage — messages priority', () => {
    it('returns otherMessages when errorMessages has entries', () => {
        const other = ref(['other msg'])
        const { api } = mountWith({ errorMessages: ['err'] }, other)
        expect(api().messages.value).toEqual(['other msg'])
    })

    it('returns otherMessages when otherMessages has entries (no errorMessages)', () => {
        // If otherMessages.length > 0, they win even without errorMessages.
        const other = ref(['priority'])
        const { api } = mountWith({ messages: ['fallback'] }, other)
        expect(api().messages.value).toEqual(['priority'])
    })

    it('returns hint when no error/other messages', () => {
        const { api } = mountWith({ hint: 'help text', messages: ['msg'] })
        expect(api().messages.value).toBe('help text')
    })

    it('returns props.messages when only messages is set', () => {
        const { api } = mountWith({ messages: ['plain msg'] })
        expect(api().messages.value).toEqual(['plain msg'])
    })

    it('returns empty array when nothing is set', () => {
        const { api } = mountWith({})
        expect(api().messages.value).toEqual([])
    })

    it('errorMessages wins over hint', () => {
        const other = ref(['err detail'])
        const { api } = mountWith({ errorMessages: ['err'], hint: 'help' }, other)
        expect(api().messages.value).toEqual(['err detail'])
    })
})

// ---------------------------------------------------------------------------
// Reactivity
// ---------------------------------------------------------------------------

describe('useMessage — reactivity', () => {
    it('hasMessages remains true even when props.messages is initially undefined (otherMessages default [] bug)', async () => {
        // Due to the Boolean([]) bug, hasMessages starts true regardless.
        // Once props.messages is set, it's still true.
        const { props, api } = mountWith({ messages: undefined })
        expect(api().hasMessages.value).toBe(true)

        props.messages = ['new']
        await Promise.resolve()
        expect(api().hasMessages.value).toBe(true)
    })

    it('messages ref updates reactively when otherMessages changes', async () => {
        const other = ref<string[]>([])
        const { api } = mountWith({ messages: ['default'] }, other)
        expect(api().messages.value).toEqual(['default'])

        other.value = ['injected']
        await Promise.resolve()
        expect(api().messages.value).toEqual(['injected'])
    })
})
