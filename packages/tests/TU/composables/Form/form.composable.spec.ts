// Unit tests for `useForm`.
//
// `useForm` is a provide-based form controller. It:
//   - aggregates registered field items,
//   - tracks overall validity (true / false / null),
//   - exposes `validate()` (async, triggers each field's validator),
//   - exposes `reset()` / `resetValidation()` (delegates to each field),
//   - supports `fastFail` to abort on first failing field.
//
// We drive the composable directly using an effectScope + provide/inject so we
// can inject field stubs without mounting a full component tree.

import { defineComponent, h, nextTick, provide } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import type { IFormProps } from '@origam/interfaces'
import { ORIGAM_FORM_KEY } from '@origam/consts'
import { useForm } from '@origam/composables/Form/form.composable'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type FormApi = ReturnType<typeof useForm>

/** Mounts a host that runs useForm and exposes the returned API. */
function mountForm (propsOverrides: Partial<IFormProps> = {}) {
    const props: IFormProps = {
        disabled: false,
        readonly: false,
        fastFail: false,
        modelValue: null,
        ...propsOverrides
    }
    let api!: FormApi

    const Host = defineComponent({
        name: 'FormHost',
        emits: ['update:modelValue'],
        setup (_, { emit }) {
            // useForm reads props.modelValue and emits via useVModel.
            // We pass a reactive props-like object + a stub emit.
            api = useForm({
                ...props,
                'onUpdate:modelValue': (v: any) => emit('update:modelValue', v)
            } as any)
            return () => h('div')
        }
    })

    const wrapper = mount(Host)
    return { api: () => api, wrapper, props }
}

/** Creates a stub field suitable for registering in the form. */
function makeField (id: string, opts: {
    errorMessages?: string[]
    isValid?: boolean | null
    failValidation?: boolean
} = {}) {
    const validateFn = vi.fn().mockResolvedValue(opts.failValidation ? (opts.errorMessages ?? ['Error']) : [])
    const resetFn = vi.fn().mockResolvedValue(undefined)
    const resetValidationFn = vi.fn().mockResolvedValue(undefined)
    return {
        id,
        validate: validateFn,
        reset: resetFn,
        resetValidation: resetValidationFn,
        vm: {} as any,
        isValid: opts.isValid ?? null,
        errorMessages: opts.errorMessages ?? []
    }
}

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------

describe('useForm — initial state', () => {
    it('items list starts empty', () => {
        const { api } = mountForm()
        expect(api().items.value).toHaveLength(0)
    })

    it('errors list starts empty', () => {
        const { api } = mountForm()
        expect(api().errors.value).toHaveLength(0)
    })

    it('isValidating starts false', () => {
        const { api } = mountForm()
        expect(api().isValidating.value).toBe(false)
    })

    it('isDisabled reflects props.disabled', () => {
        const { api } = mountForm({ disabled: true })
        expect(api().isDisabled.value).toBe(true)
    })

    it('isReadonly reflects props.readonly', () => {
        const { api } = mountForm({ readonly: true })
        expect(api().isReadonly.value).toBe(true)
    })
})

// ---------------------------------------------------------------------------
// register / unregister via the provided context
// ---------------------------------------------------------------------------

describe('useForm — register / unregister', () => {
    it('provided register() adds a field to items', async () => {
        let formCtx: any

        const Child = defineComponent({
            setup () {
                formCtx = require('vue').inject(ORIGAM_FORM_KEY)
                return () => h('div')
            }
        })

        let formApi!: FormApi
        const Parent = defineComponent({
            setup () {
                formApi = useForm({ disabled: false, readonly: false } as any)
                return () => h(Child)
            }
        })

        mount(Parent)
        await nextTick()

        const field = makeField('field1')
        formCtx.register(field)
        await nextTick()

        expect(formApi.items.value).toHaveLength(1)
        expect(formApi.items.value[0].id).toBe('field1')
    })

    it('provided unregister() removes a field from items', async () => {
        let formCtx: any

        const Child = defineComponent({
            setup () {
                formCtx = require('vue').inject(ORIGAM_FORM_KEY)
                return () => h('div')
            }
        })

        let formApi!: FormApi
        const Parent = defineComponent({
            setup () {
                formApi = useForm({ disabled: false, readonly: false } as any)
                return () => h(Child)
            }
        })

        mount(Parent)
        await nextTick()

        const field = makeField('toRemove')
        formCtx.register(field)
        await nextTick()
        expect(formApi.items.value).toHaveLength(1)

        formCtx.unregister('toRemove')
        await nextTick()
        expect(formApi.items.value).toHaveLength(0)
    })
})

// ---------------------------------------------------------------------------
// validate()
// ---------------------------------------------------------------------------

describe('useForm — validate()', () => {
    it('returns valid=true when no fields are registered', async () => {
        const { api } = mountForm()
        const result = await api().validate()
        expect(result.valid).toBe(true)
        expect(result.errors).toHaveLength(0)
    })

    it('validate() sets isValidating=true during async processing', async () => {
        let formCtx: any
        const Child = defineComponent({ setup () { formCtx = require('vue').inject(ORIGAM_FORM_KEY); return () => h('div') } })
        let formApi!: FormApi
        const Parent = defineComponent({ setup () { formApi = useForm({ disabled: false, readonly: false } as any); return () => h(Child) } })

        mount(Parent)
        await nextTick()

        // Slow field
        let resolve!: (v: string[]) => void
        const slowField = makeField('slow')
        slowField.validate = vi.fn(() => new Promise<string[]>(r => { resolve = r }))
        formCtx.register(slowField)
        await nextTick()

        const p = formApi.validate()
        expect(formApi.isValidating.value).toBe(true)
        resolve([])
        await p
        expect(formApi.isValidating.value).toBe(false)
    })

    it('returns errors for each failing field', async () => {
        let formCtx: any
        const Child = defineComponent({ setup () { formCtx = require('vue').inject(ORIGAM_FORM_KEY); return () => h('div') } })
        let formApi!: FormApi
        const Parent = defineComponent({ setup () { formApi = useForm({ disabled: false, readonly: false } as any); return () => h(Child) } })

        mount(Parent)
        await nextTick()

        formCtx.register(makeField('bad', { failValidation: true, errorMessages: ['Required'] }))
        await nextTick()

        const result = await formApi.validate()
        expect(result.valid).toBe(false)
        expect(result.errors).toHaveLength(1)
        expect(result.errors[0].id).toBe('bad')
        expect(result.errors[0].errorMessages).toContain('Required')
    })

    it('fastFail stops after first failing field', async () => {
        let formCtx: any
        const Child = defineComponent({ setup () { formCtx = require('vue').inject(ORIGAM_FORM_KEY); return () => h('div') } })
        let formApi!: FormApi
        const Parent = defineComponent({
            setup () {
                formApi = useForm({ disabled: false, readonly: false, fastFail: true } as any)
                return () => h(Child)
            }
        })

        mount(Parent)
        await nextTick()

        formCtx.register(makeField('f1', { failValidation: true, errorMessages: ['E1'] }))
        formCtx.register(makeField('f2', { failValidation: true, errorMessages: ['E2'] }))
        await nextTick()

        const result = await formApi.validate()
        expect(result.valid).toBe(false)
        // Only the first field's error is collected due to fastFail.
        expect(result.errors).toHaveLength(1)
        expect(result.errors[0].id).toBe('f1')
    })
})

// ---------------------------------------------------------------------------
// reset / resetValidation
// ---------------------------------------------------------------------------

describe('useForm — reset()', () => {
    it('calls reset() on each registered field', async () => {
        let formCtx: any
        const Child = defineComponent({ setup () { formCtx = require('vue').inject(ORIGAM_FORM_KEY); return () => h('div') } })
        let formApi!: FormApi
        const Parent = defineComponent({ setup () { formApi = useForm({ disabled: false, readonly: false } as any); return () => h(Child) } })
        mount(Parent)
        await nextTick()

        const f1 = makeField('f1')
        const f2 = makeField('f2')
        formCtx.register(f1)
        formCtx.register(f2)
        await nextTick()

        formApi.reset()
        expect(f1.reset).toHaveBeenCalledTimes(1)
        expect(f2.reset).toHaveBeenCalledTimes(1)
    })
})

describe('useForm — resetValidation()', () => {
    it('calls resetValidation() on each registered field', async () => {
        let formCtx: any
        const Child = defineComponent({ setup () { formCtx = require('vue').inject(ORIGAM_FORM_KEY); return () => h('div') } })
        let formApi!: FormApi
        const Parent = defineComponent({ setup () { formApi = useForm({ disabled: false, readonly: false } as any); return () => h(Child) } })
        mount(Parent)
        await nextTick()

        const f1 = makeField('f1')
        formCtx.register(f1)
        await nextTick()

        formApi.resetValidation()
        expect(f1.resetValidation).toHaveBeenCalledTimes(1)
    })
})
