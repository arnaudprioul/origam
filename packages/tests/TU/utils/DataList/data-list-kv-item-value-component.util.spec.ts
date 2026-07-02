import { describe, expect, it } from 'vitest'

import { isDataListKVItemValueComponent } from '@origam/utils/DataList/data-list-kv-item-value-component.util'

describe('isDataListKVItemValueComponent', () => {
    describe('truthy cases — objects with a "component" key', () => {
        it('returns true for an object with component as a string', () => {
            expect(isDataListKVItemValueComponent({ component: 'origam-chip' })).toBe(true)
        })

        it('returns true for an object with component as an object (Vue component)', () => {
            expect(isDataListKVItemValueComponent({ component: { name: 'MyComp' } })).toBe(true)
        })

        it('returns true when props and children are also present', () => {
            expect(isDataListKVItemValueComponent({
                component: 'origam-chip',
                props: { color: 'primary' },
                children: 'label'
            })).toBe(true)
        })

        it('returns true even when component value is null (key exists)', () => {
            // The type-guard only checks "component" in object — it does not
            // validate the value of the component field itself.
            expect(isDataListKVItemValueComponent({ component: null } as any)).toBe(true)
        })
    })

    describe('falsy cases', () => {
        it('returns false for a plain string', () => {
            expect(isDataListKVItemValueComponent('hello')).toBe(false)
        })

        it('returns false for a number', () => {
            expect(isDataListKVItemValueComponent(42)).toBe(false)
        })

        it('returns false for null', () => {
            expect(isDataListKVItemValueComponent(null)).toBe(false)
        })

        it('returns false for undefined', () => {
            expect(isDataListKVItemValueComponent(undefined as any)).toBe(false)
        })

        it('returns false for an object without the "component" key', () => {
            expect(isDataListKVItemValueComponent({ props: { color: 'primary' } } as any)).toBe(false)
        })

        it('returns false for an empty object', () => {
            expect(isDataListKVItemValueComponent({} as any)).toBe(false)
        })

        it('returns false for an array (does not have "component" as own key)', () => {
            // Arrays are objects but "component" is not in []
            expect(isDataListKVItemValueComponent([] as any)).toBe(false)
        })
    })
})
