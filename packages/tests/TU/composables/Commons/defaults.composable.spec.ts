// Tests for `useDefaults` / `provideDefaults` / `createDefaults`.
//
// Key constraint: `useDefaults` determines whether a prop was "explicitly
// passed" by checking `vm.vnode.props`. When @vue/test-utils passes props via
// `mount(Host, { props: { color: 'warning' } })` they land in vnode.props and
// are always treated as "passed" — the provider is skipped. Scenarios that
// verify provider resolution therefore mount a subtree where the child
// component does NOT receive the prop from its parent template at all.
//
// Prop passed to parent template   → vnode.props has it → own value wins.
// Prop NOT passed by parent        → vnode.props lacks it → provider lookup.

import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { useDefaults, provideDefaults, createDefaults } from '@origam/composables/Commons/defaults.composable'

// ---------------------------------------------------------------------------
// createDefaults
// ---------------------------------------------------------------------------

describe('createDefaults', () => {
    it('returns a Ref wrapping the provided object', () => {
        const d = createDefaults({ global: { color: 'primary' } })
        expect(d.value).toEqual({ global: { color: 'primary' } })
    })

    it('returns a Ref wrapping an empty object when called with no args', () => {
        const d = createDefaults()
        expect(d.value).toEqual({})
    })
})

// ---------------------------------------------------------------------------
// useDefaults — empty props (early-return path)
// ---------------------------------------------------------------------------

describe('useDefaults — empty props', () => {
    it('returns the original props object when props has no keys', () => {
        // Must run inside a component setup.
        let result: any

        const Host = defineComponent({
            name: 'OrigamEmptyPropsHost',
            setup () {
                result = useDefaults({})
                return () => h('div')
            }
        })
        mount(Host)

        // The early-return path returns the original ref, not a Proxy.
        expect(result).toStrictEqual({})
    })
})

// ---------------------------------------------------------------------------
// useDefaults — Proxy transparency
// ---------------------------------------------------------------------------

describe('useDefaults — Proxy transparency', () => {
    it('Object.keys() includes all declared prop names', () => {
        let resolvedKeys: string[] = []

        // Child receives NO props from parent template — provider lookup active.
        const Child = defineComponent({
            name: 'OrigamBtn',
            props: ['color', 'variant', 'size'],
            setup (props) {
                const resolved = useDefaults(props, 'origam-btn')
                resolvedKeys = Object.keys(resolved)
                return () => h('div')
            }
        })

        const Parent = defineComponent({
            name: 'OrigamParentKeys',
            setup () {
                provideDefaults({ 'origam-btn': { color: 'primary' } })
                // Child rendered WITHOUT explicit props so vnode.props is empty
                return () => h(Child)
            }
        })

        mount(Parent)
        expect(resolvedKeys).toContain('color')
        expect(resolvedKeys).toContain('variant')
        expect(resolvedKeys).toContain('size')
    })

    it('"in" operator works on proxy for declared prop names', () => {
        let resolved: any = {}

        const Child = defineComponent({
            name: 'OrigamBtn',
            props: ['color', 'variant'],
            setup (props) {
                resolved = useDefaults(props, 'origam-btn')
                return () => h('div')
            }
        })

        const Parent = defineComponent({
            name: 'OrigamParentIn',
            setup () {
                provideDefaults({})
                return () => h(Child)
            }
        })

        mount(Parent)
        expect('color' in resolved).toBe(true)
        expect('variant' in resolved).toBe(true)
    })
})

// ---------------------------------------------------------------------------
// useDefaults — global default resolution
// (child rendered without the prop → provider lookup fires)
// ---------------------------------------------------------------------------

describe('useDefaults — global default resolution', () => {
    it('global default used when prop is not explicitly passed by the parent', () => {
        let resolvedColor: unknown

        const Child = defineComponent({
            name: 'OrigamBtn',
            props: ['color'],
            setup (props) {
                const resolved = useDefaults(props, 'origam-btn')
                // Read after setup so the computed has run.
                resolvedColor = resolved.color
                return () => h('div')
            }
        })

        const Parent = defineComponent({
            name: 'OrigamParentGlobal',
            setup () {
                provideDefaults({ global: { color: 'primary' } })
                // Pass color as undefined explicitly — in vue test-utils this
                // means vnode.props will contain "color: undefined".
                // The composable checks wasPropPassed via vnode.props iteration,
                // but the value is still undefined so it falls through.
                // → Actually we just don't pass it at all.
                return () => h(Child)
            }
        })

        mount(Parent)
        expect(resolvedColor).toBe('primary')
    })

    it('component-specific default takes priority over global default', () => {
        let resolvedColor: unknown

        const Child = defineComponent({
            name: 'OrigamBtn',
            props: ['color'],
            setup (props) {
                const resolved = useDefaults(props, 'origam-btn')
                resolvedColor = resolved.color
                return () => h('div')
            }
        })

        const Parent = defineComponent({
            name: 'OrigamParentComponentSpecific',
            setup () {
                provideDefaults({
                    global: { color: 'primary' },
                    'origam-btn': { color: 'danger' }
                })
                return () => h(Child)
            }
        })

        mount(Parent)
        expect(resolvedColor).toBe('danger')
    })
})

// ---------------------------------------------------------------------------
// provideDefaults — disabled option
// ---------------------------------------------------------------------------

describe('provideDefaults — disabled option', () => {
    it('disabled=true passes through parent defaults (child still sees root global)', () => {
        let resolvedColor: unknown

        const GrandChild = defineComponent({
            name: 'OrigamBtn',
            props: ['color'],
            setup (props) {
                const resolved = useDefaults(props, 'origam-btn')
                resolvedColor = resolved.color
                return () => h('div')
            }
        })

        const Middle = defineComponent({
            name: 'OrigamMiddle',
            setup () {
                // disabled=true → does NOT inject new defaults; parent's map passes through
                provideDefaults({ 'origam-btn': { color: 'danger' } }, { disabled: true })
                return () => h(GrandChild)
            }
        })

        const Root = defineComponent({
            name: 'OrigamRoot',
            setup () {
                provideDefaults({ global: { color: 'primary' } })
                return () => h(Middle)
            }
        })

        mount(Root)
        // Middle's disabled provider doesn't override; GrandChild gets root global 'primary'
        expect(resolvedColor).toBe('primary')
    })
})

// ---------------------------------------------------------------------------
// provideDefaults — scoped option
// ---------------------------------------------------------------------------

describe('provideDefaults — scoped option', () => {
    it('scoped=true resets the defaults to only own — parent global is not visible', () => {
        let resolvedVariant: unknown
        let resolvedColor: unknown

        const GrandChild = defineComponent({
            name: 'OrigamBtn',
            props: ['color', 'variant'],
            setup (props) {
                const resolved = useDefaults(props, 'origam-btn')
                resolvedColor = resolved.color
                resolvedVariant = resolved.variant
                return () => h('div')
            }
        })

        const Middle = defineComponent({
            name: 'OrigamMiddle',
            setup () {
                // scoped=true → only Middle's own defaults are visible below
                provideDefaults({ 'origam-btn': { color: 'danger' } }, { scoped: true })
                return () => h(GrandChild)
            }
        })

        const Root = defineComponent({
            name: 'OrigamRoot',
            setup () {
                provideDefaults({ global: { variant: 'outlined' } })
                return () => h(Middle)
            }
        })

        mount(Root)
        expect(resolvedColor).toBe('danger')
        // scoped=true → parent global variant is NOT visible under Middle
        expect(resolvedVariant).toBeUndefined()
    })
})

// ---------------------------------------------------------------------------
// provideDefaults — deep merge (default behaviour)
// ---------------------------------------------------------------------------

describe('provideDefaults — deep merge', () => {
    it('child provider merges with parent provider — both keys visible', () => {
        let resolvedColor: unknown
        let resolvedVariant: unknown

        const GrandChild = defineComponent({
            name: 'OrigamBtn',
            props: ['color', 'variant'],
            setup (props) {
                const resolved = useDefaults(props, 'origam-btn')
                resolvedColor = resolved.color
                resolvedVariant = resolved.variant
                return () => h('div')
            }
        })

        const Middle = defineComponent({
            name: 'OrigamMiddle',
            setup () {
                // Adds variant; deep-merges with parent's color
                provideDefaults({ 'origam-btn': { variant: 'tonal' } })
                return () => h(GrandChild)
            }
        })

        const Root = defineComponent({
            name: 'OrigamRoot',
            setup () {
                provideDefaults({ 'origam-btn': { color: 'primary' } })
                return () => h(Middle)
            }
        })

        mount(Root)
        expect(resolvedColor).toBe('primary')
        expect(resolvedVariant).toBe('tonal')
    })
})
