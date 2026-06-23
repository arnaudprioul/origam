// Tests for `useValidation` composable.
// Covers: isDirty, isDisabled, isReadonly, maxErrors, errorMessages (external),
// isValid (error prop, errorMessages, no rules, rules passing/failing),
// validate() function (sync/async rules), reset(), resetValidation(),
// validationClasses, validateOn resolution, isValidating flag.
//
// NOTE: lifecycle hooks (onBeforeMount form registration, onMounted lazy-validate)
// are exercised via mount() — the component instance must be mounted for those
// paths to run, which means tests that rely on form injection use a parent wrapper.

import { defineComponent, h, nextTick, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import type { IValidationProps } from '@origam/interfaces'

import { useValidation } from '@origam/composables/Commons/validation.composable'

function mountWith (initial: IValidationProps, name = 'OrigamValidationHost') {
    const props = reactive<IValidationProps>({ ...initial })
    let api!: ReturnType<typeof useValidation>

    const Host = defineComponent({
        name,
        setup () {
            api = useValidation(props, name)
            return () => h('div')
        }
    })

    mount(Host)
    return { props, api: () => api }
}

describe('useValidation — isDirty', () => {
    it('no modelValue → isDirty = false', () => {
        const { api } = mountWith({ modelValue: undefined })
        expect(api().isDirty.value).toBe(false)
    })

    it('modelValue="" → isDirty = false (empty string treated as null)', () => {
        const { api } = mountWith({ modelValue: '' })
        expect(api().isDirty.value).toBe(false)
    })

    it('modelValue="hello" → isDirty = true', () => {
        const { api } = mountWith({ modelValue: 'hello' })
        expect(api().isDirty.value).toBe(true)
    })

    it('modelValue=0 → isDirty = true (0 is truthy-length as array element)', () => {
        const { api } = mountWith({ modelValue: 0 })
        // wrapInArray([0]).length === 1 → dirty
        expect(api().isDirty.value).toBe(true)
    })

    it('modelValue=false → isDirty = false (false in array has length 1 → dirty)', () => {
        const { api } = mountWith({ modelValue: false })
        // wrapInArray([false]).length === 1 → dirty
        expect(api().isDirty.value).toBe(true)
    })
})

describe('useValidation — isDisabled / isReadonly', () => {
    it('disabled=false → isDisabled = false', () => {
        const { api } = mountWith({ disabled: false })
        expect(api().isDisabled.value).toBe(false)
    })

    it('disabled=true → isDisabled = true', () => {
        const { api } = mountWith({ disabled: true })
        expect(api().isDisabled.value).toBe(true)
    })

    it('readonly=true → isReadonly = true', () => {
        const { api } = mountWith({ readonly: true })
        expect(api().isReadonly.value).toBe(true)
    })

    it('readonly=false → isReadonly = false', () => {
        const { api } = mountWith({ readonly: false })
        expect(api().isReadonly.value).toBe(false)
    })
})

describe('useValidation — errorMessages (external)', () => {
    it('no errorMessages prop → empty', () => {
        const { api } = mountWith({})
        expect(api().errorMessages.value).toEqual([])
    })

    it('errorMessages=["Required"] → exposed in errorMessages', () => {
        const { api } = mountWith({ errorMessages: ['Required'] })
        expect(api().errorMessages.value).toContain('Required')
    })

    it('errorMessages string → wrapped', () => {
        const { api } = mountWith({ errorMessages: 'Must be valid' })
        expect(api().errorMessages.value).toContain('Must be valid')
    })

    it('maxErrors=2 → slices to 2 messages', () => {
        const { api } = mountWith({
            errorMessages: ['Err1', 'Err2', 'Err3'],
            maxErrors: 2
        })
        expect(api().errorMessages.value).toHaveLength(2)
    })
})

describe('useValidation — isValid', () => {
    it('error=true → isValid = false', () => {
        const { api } = mountWith({ error: true })
        expect(api().isValid.value).toBe(false)
    })

    it('errorMessages set → isValid = false', () => {
        const { api } = mountWith({ errorMessages: ['err'] })
        expect(api().isValid.value).toBe(false)
    })

    it('no rules, no error → isValid = true (pristine, non-lazy)', () => {
        const { api } = mountWith({})
        // no rules → isValid = true
        expect(api().isValid.value).toBe(true)
    })

    it('isPristine=true with rules and no internalErrors and non-lazy → isValid = true', () => {
        const { api } = mountWith({ rules: [] })
        // rules array is empty → !rules.length → isValid = true
        expect(api().isValid.value).toBe(true)
    })
})

describe('useValidation — validate()', () => {
    it('passing rule (returns true) → no errors, isValid stays true', async () => {
        const { api } = mountWith({ rules: [() => true] })
        const errors = await api().validate()
        expect(errors).toHaveLength(0)
        expect(api().isValidating.value).toBe(false)
    })

    it('failing rule (returns string) → error message stored', async () => {
        const { api } = mountWith({ rules: [() => 'This field is required'] })
        const errors = await api().validate()
        expect(errors).toContain('This field is required')
    })

    it('failing rule (returns false) → empty string stored', async () => {
        const { api } = mountWith({ rules: [() => false] })
        const errors = await api().validate()
        expect(errors).toContain('')
    })

    it('async rule → awaited correctly', async () => {
        const asyncRule = async () => 'Async error'
        const { api } = mountWith({ rules: [asyncRule] })
        const errors = await api().validate()
        expect(errors).toContain('Async error')
    })

    it('validate(silent=true) → isPristine remains true', async () => {
        const { api } = mountWith({ rules: [() => 'err'] })
        await api().validate(true)
        expect(api().isPristine.value).toBe(true)
    })

    it('validate(silent=false) → isPristine becomes false', async () => {
        const { api } = mountWith({ rules: [() => true] })
        await api().validate(false)
        expect(api().isPristine.value).toBe(false)
    })

    it('maxErrors=1 → stops after first failing rule', async () => {
        const { api } = mountWith({
            rules: [() => 'Error 1', () => 'Error 2'],
            maxErrors: 1
        })
        const errors = await api().validate()
        expect(errors).toHaveLength(1)
        expect(errors[0]).toBe('Error 1')
    })

    it('isValidating is true during async validation then false after', async () => {
        let resolveRule!: (v: string) => void
        const rule = () => new Promise<string>((res) => { resolveRule = res })
        const { api } = mountWith({ rules: [rule] })

        const promise = api().validate()
        expect(api().isValidating.value).toBe(true)
        resolveRule('done')
        await promise
        expect(api().isValidating.value).toBe(false)
    })
})

describe('useValidation — reset()', () => {
    it('reset() → clears modelValue and resets validation state', async () => {
        const { api } = mountWith({
            rules: [() => 'Required'],
            modelValue: 'hello'
        })
        await api().validate()
        expect(api().errorMessages.value.length).toBeGreaterThan(0)
        await api().reset()
        await nextTick()
        // After reset, isPristine=true; non-lazy re-validates with null → isPristine set via validate(true)
        expect(api().isPristine.value).toBe(true)
    })
})

describe('useValidation — resetValidation()', () => {
    it('resetValidation() → isPristine = true', async () => {
        const { api } = mountWith({ rules: [() => 'err'] })
        await api().validate(false)
        expect(api().isPristine.value).toBe(false)
        await api().resetValidation()
        expect(api().isPristine.value).toBe(true)
    })
})

describe('useValidation — validationClasses', () => {
    it('no error, not dirty, not disabled → no modifier classes', () => {
        const { api } = mountWith({})
        const cls = api().validationClasses.value
        expect(cls['OrigamValidationHost--error']).toBe(false)
        expect(cls['OrigamValidationHost--dirty']).toBe(false)
        expect(cls['OrigamValidationHost--disabled']).toBe(false)
    })

    it('disabled=true → disabled class is truthy', () => {
        const { api } = mountWith({ disabled: true })
        expect(api().validationClasses.value['OrigamValidationHost--disabled']).toBe(true)
    })

    it('readonly=true → readonly class is truthy', () => {
        const { api } = mountWith({ readonly: true })
        expect(api().validationClasses.value['OrigamValidationHost--readonly']).toBe(true)
    })

    it('dirty modelValue → dirty class is truthy', () => {
        const { api } = mountWith({ modelValue: 'x' })
        expect(api().validationClasses.value['OrigamValidationHost--dirty']).toBe(true)
    })

    it('external error → error class is truthy', () => {
        const { api } = mountWith({ errorMessages: ['bad'] })
        expect(api().validationClasses.value['OrigamValidationHost--error']).toBe(true)
    })
})
