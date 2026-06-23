// Tests for `useStyle` (and `useStyleTag`) composables.
//
// `useStyleTag` injects a <style> element in document.head. jsdom supports
// document.head so most paths are testable headlessly.
//
// `useStyle` wraps a ComputedRef of styles (array or object) into a scoped
// CSS rule `#id { … }` and delegates to useStyleTag.
//
// DOM-dependent tests (load/unload checking DOM mutations) are exercised via
// mount() so tryOnMounted/onMounted hooks fire correctly.

import { computed, defineComponent, h, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { useStyle, useStyleTag } from '@origam/composables/Commons/style.composable'

// ---------------------------------------------------------------------------
// useStyleTag — manual mode (no DOM side-effects in setup)
// ---------------------------------------------------------------------------

describe('useStyleTag — manual mode', () => {
    it('returns id, css, load, unload, isLoaded', () => {
        const Host = defineComponent({
            name: 'OrigamStyleTagHost',
            setup () {
                const tag = useStyleTag('body { color: red }', { manual: true })
                return { tag }
            },
            template: '<div />'
        })

        const wrapper = mount(Host)
        const tag = (wrapper.vm as any).tag
        expect(tag).toHaveProperty('id')
        expect(tag).toHaveProperty('css')
        expect(typeof tag.load).toBe('function')
        expect(typeof tag.unload).toBe('function')
        expect(tag).toHaveProperty('isLoaded')
    })

    it('isLoaded starts as false in manual mode', () => {
        let isLoaded!: ReturnType<typeof useStyleTag>['isLoaded']

        const Host = defineComponent({
            name: 'OrigamStyleTagIsLoadedHost',
            setup () {
                const tag = useStyleTag('color: red', { manual: true })
                isLoaded = tag.isLoaded
                return () => h('div')
            }
        })

        mount(Host)
        expect(isLoaded.value).toBe(false)
    })

    it('load() → isLoaded becomes true', () => {
        const Host = defineComponent({
            name: 'OrigamStyleTagLoadHost',
            setup () {
                const tag = useStyleTag('body {}', { manual: true })
                return { tag }
            },
            template: '<div />'
        })

        const wrapper = mount(Host)
        const { tag } = wrapper.vm as any
        tag.load()
        expect(tag.isLoaded.value).toBe(true)
    })

    it('custom id is used', () => {
        const Host = defineComponent({
            name: 'OrigamStyleTagIdHost',
            setup () {
                const tag = useStyleTag('h1 {}', { manual: true, id: 'my-custom-id' })
                return { id: tag.id }
            },
            template: '<div />'
        })

        const wrapper = mount(Host)
        expect((wrapper.vm as any).id).toBe('my-custom-id')
    })

    it('auto-generated id is unique across calls', () => {
        const ids: string[] = []

        const Host = defineComponent({
            name: 'OrigamStyleTagUniqueHost',
            setup () {
                const t1 = useStyleTag('a {}', { manual: true })
                const t2 = useStyleTag('b {}', { manual: true })
                ids.push(t1.id, t2.id)
                return {}
            },
            template: '<div />'
        })

        mount(Host)
        expect(ids[0]).not.toBe(ids[1])
    })

    it('unload() after load() → isLoaded becomes false', () => {
        const Host = defineComponent({
            name: 'OrigamStyleTagUnloadHost',
            setup () {
                const tag = useStyleTag('span {}', { manual: true })
                return { tag }
            },
            template: '<div />'
        })

        const wrapper = mount(Host)
        const { tag } = wrapper.vm as any
        tag.load()
        expect(tag.isLoaded.value).toBe(true)
        tag.unload()
        expect(tag.isLoaded.value).toBe(false)
    })
})

// ---------------------------------------------------------------------------
// useStyle — CSS generation logic (does NOT depend on DOM mutations)
// ---------------------------------------------------------------------------

describe('useStyle — customCss generation', () => {
    it('array of strings → joined into CSS rule', () => {
        let cssValue = ''

        const Host = defineComponent({
            name: 'OrigamStyleHost',
            setup () {
                const styles = computed(() => ['color: red', 'font-size: 16px'])
                const api = useStyle(styles, 'test-style-id')
                cssValue = api.css.value
                return {}
            },
            template: '<div />'
        })

        mount(Host)
        expect(cssValue).toContain('color: red')
        expect(cssValue).toContain('font-size: 16px')
        expect(cssValue).toMatch(/^#test-style-id \{/)
    })

    it('object styles → entries mapped to key: value strings', () => {
        let cssValue = ''

        const Host = defineComponent({
            name: 'OrigamStyleObjHost',
            setup () {
                const styles = computed(() => ({ 'background-color': 'blue', opacity: '0.5' }))
                const api = useStyle(styles, 'test-obj-id')
                cssValue = api.css.value
                return {}
            },
            template: '<div />'
        })

        mount(Host)
        expect(cssValue).toContain('background-color: blue')
        expect(cssValue).toContain('opacity: 0.5')
    })

    it('undefined values in object → filtered out', () => {
        let cssValue = ''

        const Host = defineComponent({
            name: 'OrigamStyleUndefinedHost',
            setup () {
                const styles = computed(() => ({ color: undefined as unknown as string, 'font-size': '14px' }))
                const api = useStyle(styles, 'test-undef-id')
                cssValue = api.css.value
                return {}
            },
            template: '<div />'
        })

        mount(Host)
        expect(cssValue).not.toContain('color:')
        expect(cssValue).toContain('font-size: 14px')
    })

    it('empty array → CSS rule with empty body', () => {
        let cssValue = ''

        const Host = defineComponent({
            name: 'OrigamStyleEmptyHost',
            setup () {
                const styles = computed(() => [])
                const api = useStyle(styles, 'test-empty-id')
                cssValue = api.css.value
                return {}
            },
            template: '<div />'
        })

        mount(Host)
        expect(cssValue).toBe('#test-empty-id {}')
    })

    it('css ref updates when computed styles change', async () => {
        const color = ref('red')
        let api: ReturnType<typeof useStyle>

        const Host = defineComponent({
            name: 'OrigamStyleReactiveHost',
            setup () {
                const styles = computed(() => [`color: ${color.value}`])
                api = useStyle(styles, 'test-reactive-id')
                return {}
            },
            template: '<div />'
        })

        mount(Host)
        expect(api!.css.value).toContain('color: red')
        color.value = 'blue'
        // computed is synchronously reactive
        expect(api!.css.value).toContain('color: blue')
    })

    it('uniq id provided → used as CSS selector id', () => {
        let cssValue = ''

        const Host = defineComponent({
            name: 'OrigamStyleUniqHost',
            setup () {
                const styles = computed(() => ['padding: 8px'])
                const api = useStyle(styles, 'my-uniq-id')
                cssValue = api.css.value
                return {}
            },
            template: '<div />'
        })

        mount(Host)
        expect(cssValue).toMatch(/^#my-uniq-id/)
    })
})
