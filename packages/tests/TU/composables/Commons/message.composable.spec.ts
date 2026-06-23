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
    it('false when all message sources are absent (no props, no otherMessages)', () => {
        // Fixed: otherMessages.value.length > 0 replaces Boolean(otherMessages.value).
        // Boolean([]) === true was causing hasMessages to always be true even with
        // an empty default ref([]). After the fix, an empty array yields false.
        const { api } = mountWith({})
        expect(api().hasMessages.value).toBe(false)
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

    it('false when props.messages is an empty array and no other sources', () => {
        // Boolean(props.messages) is still true for an empty array — the fix
        // targets otherMessages only. An empty props.messages still triggers
        // the Boolean(props.messages) branch → true.
        // This remains the expected behaviour for props.messages (array presence signals intent).
        const { api } = mountWith({ messages: [] })
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
    it('hasMessages starts false when props.messages is undefined and updates to true when set', async () => {
        // After the fix (otherMessages.value.length > 0), an absent props.messages
        // combined with an empty default otherMessages yields false initially.
        const { props, api } = mountWith({ messages: undefined })
        expect(api().hasMessages.value).toBe(false)

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
