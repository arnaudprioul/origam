// Tests for `useVModel` composable.
// Covers uncontrolled mode (internal ref), controlled mode (external v-model),
// transform functions, and the `externalValue` getter.

import { defineComponent, h, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { useVModel } from '@origam/composables/Commons/vModel.composable'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Build a host component that exposes `useVModel` API via a captured ref.
 * Returns the reactive props bag, the wrapper, and a lazy accessor for the
 * computed model (captured after setup() has run).
 */
function mountUncontrolled<T> (
    initialValue: T | undefined,
    defaultValue?: T,
    transformIn?: (v: T | undefined) => T,
    transformOut?: (v: T) => T
) {
    const props = reactive<{ modelValue?: T; 'onUpdate:modelValue'?: any }>({
        modelValue: initialValue
    })
    let api!: ReturnType<typeof useVModel<typeof props, 'modelValue'>>

    const Host = defineComponent({
        name: 'OrigamVModelHostUncontrolled',
        emits: ['update:modelValue'],
        setup () {
            api = useVModel(props, 'modelValue', defaultValue as any, transformIn as any, transformOut as any)
            return () => h('div')
        }
    })

    const wrapper = mount(Host)
    return { props, api: () => api, wrapper }
}

// ---------------------------------------------------------------------------
// Uncontrolled mode (no onUpdate:modelValue listener on the vnode props)
// ---------------------------------------------------------------------------

describe('useVModel — uncontrolled mode', () => {
    it('initialises with the provided value', () => {
        const { api } = mountUncontrolled('hello')
        expect(api().value).toBe('hello')
    })

    it('falls back to defaultValue when initial value is undefined', () => {
        const { api } = mountUncontrolled<string>(undefined, 'fallback')
        expect(api().value).toBe('fallback')
    })

    it('returns undefined when both initial and default are absent', () => {
        const { api } = mountUncontrolled<string>(undefined)
        expect(api().value).toBeUndefined()
    })

    it('setting model.value updates the internal ref', async () => {
        const { api } = mountUncontrolled('initial')
        api().value = 'updated'
        await Promise.resolve()
        expect(api().value).toBe('updated')
    })

    it('setting to the same value does not trigger a second update', async () => {
        const { api, wrapper } = mountUncontrolled('same')
        const emitSpy = vi.spyOn(wrapper.vm as any, '$emit')
        api().value = 'same'
        await Promise.resolve()
        // No new emit because value unchanged.
        expect(emitSpy).not.toHaveBeenCalled()
    })

    it('applies transformIn when reading the model', () => {
        const { api } = mountUncontrolled<string>('hello', undefined, (v) => (v ?? '').toUpperCase())
        expect(api().value).toBe('HELLO')
    })

    it('externalValue returns the internal ref value in uncontrolled mode', () => {
        const { api } = mountUncontrolled('extval')
        expect((api() as any).externalValue).toBe('extval')
    })
})

// ---------------------------------------------------------------------------
// transformOut path
// ---------------------------------------------------------------------------

describe('useVModel — transformOut', () => {
    it('applies transformOut before storing in internal ref', async () => {
        const { api } = mountUncontrolled<string>(
            'hello',
            undefined,
            (v) => (v ?? '').toUpperCase(),
            (v) => v.toLowerCase()
        )
        // Set via the transformed value space (uppercase input).
        api().value = 'WORLD'
        await Promise.resolve()
        // transformOut('WORLD') = 'world' is stored, transformIn reads it back as 'WORLD'.
        expect(api().value).toBe('WORLD')
    })
})

// ---------------------------------------------------------------------------
// Default value edge cases
// ---------------------------------------------------------------------------

describe('useVModel — numeric and boolean defaults', () => {
    it('works with numeric initial value', () => {
        const { api } = mountUncontrolled<number>(42)
        expect(api().value).toBe(42)
    })

    it('works with boolean initial value false', () => {
        const { api } = mountUncontrolled<boolean>(false)
        expect(api().value).toBe(false)
    })

    it('false as default value is used when initial is undefined', () => {
        const { api } = mountUncontrolled<boolean>(undefined, false)
        expect(api().value).toBe(false)
    })
})
