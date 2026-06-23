// Tests for `useProps` composable.
// Covers: filterProps nominal, default excludes (class/style/id), custom
// excludes, undefined-value stripping, empty props schema, partial pick.

import { describe, expect, it } from 'vitest'

import { useProps } from '@origam/composables/Commons/props.composable'

describe('useProps — returns filterProps + props', () => {
    it('returns an object with filterProps and props keys', () => {
        const schema = { color: 'primary', variant: 'flat' }
        const { filterProps, props } = useProps(schema)
        expect(typeof filterProps).toBe('function')
        expect(props).toBe(schema)
    })
})

describe('useProps — filterProps nominal', () => {
    it('picks declared keys from properties object', () => {
        const schema = { color: undefined, variant: undefined }
        const { filterProps } = useProps(schema)
        const result = filterProps({ color: 'primary', variant: 'flat', extraProp: 'ignored' })
        expect(result).toHaveProperty('color', 'primary')
        expect(result).toHaveProperty('variant', 'flat')
        expect(result).not.toHaveProperty('extraProp')
    })

    it('all schema keys present in properties → picks all', () => {
        const schema = { a: undefined, b: undefined, c: undefined }
        const { filterProps } = useProps(schema)
        const result = filterProps({ a: 1, b: 2, c: 3 })
        expect(result).toEqual({ a: 1, b: 2, c: 3 })
    })
})

describe('useProps — default excludes (class, style, id)', () => {
    it('"class" key in schema is excluded by default', () => {
        const schema = { class: undefined, color: undefined }
        const { filterProps } = useProps(schema)
        const result = filterProps({ class: 'my-class', color: 'primary' })
        expect(result).not.toHaveProperty('class')
        expect(result).toHaveProperty('color', 'primary')
    })

    it('"style" key in schema is excluded by default', () => {
        const schema = { style: undefined, variant: undefined }
        const { filterProps } = useProps(schema)
        const result = filterProps({ style: 'color: red', variant: 'tonal' })
        expect(result).not.toHaveProperty('style')
    })

    it('"id" key in schema is excluded by default', () => {
        const schema = { id: undefined, size: undefined }
        const { filterProps } = useProps(schema)
        const result = filterProps({ id: 'my-id', size: 'large' })
        expect(result).not.toHaveProperty('id')
        expect(result).toHaveProperty('size', 'large')
    })
})

describe('useProps — custom excludes override defaults', () => {
    it('custom excludes list prevents those keys from being picked', () => {
        const schema = { color: undefined, variant: undefined, size: undefined }
        const { filterProps } = useProps(schema)
        const result = filterProps({ color: 'primary', variant: 'flat', size: 'small' }, ['variant'])
        expect(result).not.toHaveProperty('variant')
        expect(result).toHaveProperty('color', 'primary')
        expect(result).toHaveProperty('size', 'small')
    })

    it('empty custom excludes → all schema keys picked (class/style/id no longer excluded)', () => {
        const schema = { class: undefined, color: undefined }
        const { filterProps } = useProps(schema)
        // Passing an explicit empty array overrides defaultExcludes
        const result = filterProps({ class: 'my-class', color: 'primary' }, [])
        expect(result).toHaveProperty('class', 'my-class')
        expect(result).toHaveProperty('color', 'primary')
    })
})

describe('useProps — undefined-value stripping', () => {
    it('undefined values are stripped from the result', () => {
        const schema = { color: undefined, variant: undefined }
        const { filterProps } = useProps(schema)
        const result = filterProps({ color: 'primary', variant: undefined })
        expect(result).toHaveProperty('color', 'primary')
        expect(result).not.toHaveProperty('variant')
    })

    it('all properties undefined → empty result', () => {
        const schema = { color: undefined, variant: undefined }
        const { filterProps } = useProps(schema)
        const result = filterProps({ color: undefined, variant: undefined })
        expect(Object.keys(result)).toHaveLength(0)
    })
})

describe('useProps — edge cases', () => {
    it('empty schema → filterProps always returns empty', () => {
        const { filterProps } = useProps({})
        const result = filterProps({ color: 'primary' })
        expect(Object.keys(result)).toHaveLength(0)
    })

    it('properties object is a superset of schema — extra keys are not returned', () => {
        const schema = { color: undefined }
        const { filterProps } = useProps(schema)
        const result = filterProps({ color: 'primary', foo: 'bar', baz: 42 })
        expect(Object.keys(result)).toEqual(['color'])
    })

    it('schema key present in properties with falsy value false → included', () => {
        const schema = { disabled: undefined }
        const { filterProps } = useProps(schema)
        const result = filterProps({ disabled: false })
        // false is NOT undefined → should be kept
        expect(result).toHaveProperty('disabled', false)
    })

    it('schema key present in properties with value 0 → included', () => {
        const schema = { elevation: undefined }
        const { filterProps } = useProps(schema)
        const result = filterProps({ elevation: 0 })
        expect(result).toHaveProperty('elevation', 0)
    })
})
