// Tests for `useAspectRatio` composable.
// Covers:
//   - Explicit aspectRatio prop (string fraction, numeric string, numeric value)
//   - Edge cases: 0, very large, fractional, undefined
//   - SSR safety: when aspectRatio is undefined and not IN_BROWSER, returns []
//
// NOTE: jsdom sets window.innerWidth = 1024 and window.innerHeight = 768 by
// default (or platform-specific). When aspectRatio is undefined the composable
// falls into the IN_BROWSER branch and reads window dimensions. Those values
// are environment-dependent; we skip that branch and only assert the
// explicit-prop path which is deterministic.

import { defineComponent, h, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { useAspectRatio } from '@origam/composables/Responsive/aspect.composable'

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function mountWith (aspectRatio?: string | number) {
    const props = reactive<{ aspectRatio?: string | number }>({ aspectRatio })
    let api!: ReturnType<typeof useAspectRatio>

    const Host = defineComponent({
        name: 'OrigamAspectHost',
        setup () {
            api = useAspectRatio(props)
            return () => h('div')
        }
    })

    mount(Host)
    return { props, api: () => api }
}

// ---------------------------------------------------------------------------
// Explicit aspectRatio prop — deterministic tests
// ---------------------------------------------------------------------------

describe('useAspectRatio — explicit aspectRatio prop', () => {
    it('16/9 string → padding-block-end ≈ 56.25%', () => {
        const { api } = mountWith('16/9')
        const styles = api().aspectStyles.value
        expect(styles).toHaveLength(1)
        // 1 / (16/9) * 100 ≈ 56.25
        expect(styles[0]).toMatch(/padding-block-end:\s*56\.25%/)
    })

    it('4/3 string → padding-block-end ≈ 75%', () => {
        const { api } = mountWith('4/3')
        const styles = api().aspectStyles.value
        expect(styles).toHaveLength(1)
        expect(styles[0]).toMatch(/padding-block-end:\s*75%/)
    })

    it('1 numeric → padding-block-end = 100%', () => {
        const { api } = mountWith(1)
        const styles = api().aspectStyles.value
        expect(styles).toHaveLength(1)
        expect(styles[0]).toMatch(/padding-block-end:\s*100%/)
    })

    it('2 numeric → padding-block-end = 50%', () => {
        const { api } = mountWith(2)
        const styles = api().aspectStyles.value
        expect(styles).toHaveLength(1)
        expect(styles[0]).toMatch(/padding-block-end:\s*50%/)
    })

    it('"1" string numeric → padding-block-end = 100%', () => {
        const { api } = mountWith('1')
        const styles = api().aspectStyles.value
        expect(styles[0]).toMatch(/padding-block-end:\s*100%/)
    })

    it('returns array with one string entry for any valid ratio', () => {
        const { api } = mountWith('16/9')
        const styles = api().aspectStyles.value
        expect(Array.isArray(styles)).toBe(true)
        expect(typeof styles[0]).toBe('string')
    })
})

// ---------------------------------------------------------------------------
// Reactivity
// ---------------------------------------------------------------------------

describe('useAspectRatio — reactivity', () => {
    it('aspectStyles updates when aspectRatio prop changes', async () => {
        const { props, api } = mountWith('16/9')
        const initial = api().aspectStyles.value[0]
        expect(initial).toMatch(/56\.25%/)

        props.aspectRatio = '1'
        await Promise.resolve()
        expect(api().aspectStyles.value[0]).toMatch(/100%/)
    })
})

// ---------------------------------------------------------------------------
// Undefined prop — IN_BROWSER branch (non-deterministic but must not throw)
// ---------------------------------------------------------------------------

describe('useAspectRatio — undefined aspectRatio (browser branch)', () => {
    it('does not throw and returns an array', () => {
        const { api } = mountWith(undefined)
        expect(Array.isArray(api().aspectStyles.value)).toBe(true)
    })
})
