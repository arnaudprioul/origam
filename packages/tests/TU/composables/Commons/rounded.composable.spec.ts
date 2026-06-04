// Tests for the classes-first refactor of `useRounded`.

import { defineComponent, h, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import type { IRoundedProps } from '@origam/interfaces'

import { useRounded } from '@origam/composables/Commons/rounded.composable'

function mountWith (initial: IRoundedProps['rounded']) {
    const props = reactive<IRoundedProps>({ rounded: initial })
    let api!: ReturnType<typeof useRounded>

    const Host = defineComponent({
        name: 'OrigamRoundedHost',
        setup () {
            api = useRounded(props)
            return () => h('div')
        }
    })

    mount(Host)
    return { props, api: () => api }
}

describe('useRounded — classes-first', () => {
    // Utility variants emit BOTH the `.origam--rounded-*` class AND an
    // inline `border-radius: var(--origam-radius---*)` declaration.
    // The class is the semantic carrier; the inline style is a
    // specificity escape hatch so `useStyle` can win against scoped
    // component-local rules (spec 1,0,0 via `#id` selector vs 0,2,0
    // for the scoped `border-radius` rules). See composable comments.
    it.each(['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'])(
        'modern utility variant "%s" → emits both .origam--rounded-{value} class and inline border-radius style',
        (value) => {
            const { api } = mountWith(value)
            expect(api().roundedClasses.value).toContain(`origam--rounded-${value}`)
            // The `var()` carries a fallback (e.g. `none` → `, 0`) so a missing
            // token never drops the declaration; match the var ref loosely.
            expect(api().roundedStyles.value.some(d => d.includes(`var(--origam-radius---${value}`))).toBe(true)
        }
    )

    it('utility "none" → emits a fallback of 0 so it overrides a component default radius', () => {
        const { api } = mountWith('none')

        expect(api().roundedStyles.value.some(d => /border-radius:\s*var\(--origam-radius---none,\s*0\)/.test(d))).toBe(true)
    })

    // Legacy enum (`'small'|'large'|…`) still emits its component-local
    // class AND the matching primitive radius token as inline style.
    it('legacy enum "small" → component-local class + primitive radius inline style', () => {
        const { api } = mountWith('small')
        const cls = api().roundedClasses.value
        // Component-local class (kept for backward compat).
        expect(cls.some(c => /--rounded-small$/.test(c))).toBe(true)
        // No utility class — the legacy enum is not part of Phase 1 manifest.
        expect(cls.some(c => /^origam--rounded-/.test(c))).toBe(false)
        // Inline-style companion: `var(--origam-radius---sm, 4px)`.
        expect(api().roundedStyles.value.some(d => d.includes('var(--origam-radius---sm'))).toBe(true)
    })

    it('boolean true → legacy --rounded class AND companion utility "md"', () => {
        const { api } = mountWith(true)
        const cls = api().roundedClasses.value
        expect(cls.some(c => /--rounded$/.test(c))).toBe(true)
        expect(cls).toContain('origam--rounded-md')
    })

    it('numeric value 4 → no class, inline style', () => {
        const { api } = mountWith(4)
        expect(api().roundedClasses.value).toEqual([])
        expect(api().roundedStyles.value.some(d => /border-radius:\s*4px/.test(d))).toBe(true)
    })

    it('null/undefined → empty', () => {
        const { api } = mountWith(null)
        expect(api().roundedClasses.value).toEqual([])
        expect(api().roundedStyles.value).toEqual([])
    })
})
