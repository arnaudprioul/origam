// Tests for `useLocation` composable (pure computed — no DOM).
// `useLocationStrategies` depends on IN_BROWSER + real overlay/resize cycles
// and is covered by e2e specs.

import { defineComponent, h, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import type { ILocationProps } from '@origam/interfaces'
import type { TAnchor } from '@origam/types'

import { useLocation } from '@origam/composables/Commons/location.composable'

// ─── helpers ────────────────────────────────────────────────────────────────

function mountLocation (initial: ILocationProps, opposite = false, offset?: (side: string) => number) {
    const props = reactive<ILocationProps>({ ...initial })
    let api!: ReturnType<typeof useLocation>

    const Host = defineComponent({
        name: 'OrigamLocationHost',
        setup () {
            api = useLocation(props, opposite, offset)
            return () => h('div')
        }
    })

    mount(Host)
    return { props, api: () => api }
}

// ─── no location ────────────────────────────────────────────────────────────

describe('useLocation — no location prop', () => {
    it('returns empty object when location is undefined', () => {
        const { api } = mountLocation({})
        expect(api().locationStyles.value).toEqual({})
    })
})

// ─── single-token anchors (side only) ───────────────────────────────────────

describe('useLocation — single token side', () => {
    it('"top" → top: 0 and left: "50%" with translateX(-50%)', () => {
        const { api } = mountLocation({ location: 'top' })
        const styles = api().locationStyles.value as Record<string, unknown>
        expect(styles.top).toBe(0)
        expect(styles.left).toBe('50%')
        expect(String(styles.transform)).toContain('translateX(-50%)')
    })

    it('"bottom" → bottom: 0 and left: "50%"', () => {
        const { api } = mountLocation({ location: 'bottom' })
        const styles = api().locationStyles.value as Record<string, unknown>
        expect(styles.bottom).toBe(0)
        expect(styles.left).toBe('50%')
    })

    it('"left" → left: 0 and top: "50%"', () => {
        const { api } = mountLocation({ location: 'left' })
        const styles = api().locationStyles.value as Record<string, unknown>
        expect(styles.left).toBe(0)
        expect(styles.top).toBe('50%')
    })

    it('"right" → right: 0 and top: "50%"', () => {
        const { api } = mountLocation({ location: 'right' })
        const styles = api().locationStyles.value as Record<string, unknown>
        expect(styles.right).toBe(0)
        expect(styles.top).toBe('50%')
    })
})

// ─── center center ───────────────────────────────────────────────────────────

describe('useLocation — center', () => {
    it('"center center" → top=left="50%" and translate(-50%,-50%)', () => {
        const { api } = mountLocation({ location: 'center center' })
        const styles = api().locationStyles.value as Record<string, unknown>
        expect(styles.top).toBe('50%')
        expect(styles.left).toBe('50%')
        expect(String(styles.transform)).toContain('translate(-50%, -50%)')
    })
})

// ─── two-token anchors ───────────────────────────────────────────────────────

describe('useLocation — two-token anchors', () => {
    it('"top left" → top: 0 and left: 0', () => {
        const { api } = mountLocation({ location: 'top left' as TAnchor })
        const styles = api().locationStyles.value as Record<string, unknown>
        expect(styles.top).toBe(0)
        expect(styles.left).toBe(0)
    })

    it('"bottom right" → bottom: 0 and right: 0', () => {
        const { api } = mountLocation({ location: 'bottom right' as TAnchor })
        const styles = api().locationStyles.value as Record<string, unknown>
        expect(styles.bottom).toBe(0)
        expect(styles.right).toBe(0)
    })

    it('"top center" → top: 0 and left: "50%"', () => {
        const { api } = mountLocation({ location: 'top center' as TAnchor })
        const styles = api().locationStyles.value as Record<string, unknown>
        expect(styles.top).toBe(0)
        expect(styles.left).toBe('50%')
    })
})

// ─── opposite mode ────────────────────────────────────────────────────────────

describe('useLocation — opposite=true', () => {
    it('"top" with opposite → uses OPPOSITE_MAP["top"]="bottom" key', () => {
        const { api } = mountLocation({ location: 'top' }, true)
        const styles = api().locationStyles.value as Record<string, unknown>
        // opposite: side "top" → key = "bottom"
        expect('bottom' in styles).toBe(true)
    })

    it('"bottom" with opposite → uses "top" key', () => {
        const { api } = mountLocation({ location: 'bottom' }, true)
        const styles = api().locationStyles.value as Record<string, unknown>
        expect('top' in styles).toBe(true)
    })
})

// ─── offset function ─────────────────────────────────────────────────────────

describe('useLocation — offset callback', () => {
    it('opposite + offset embeds offset into calc()', () => {
        const { api } = mountLocation({ location: 'top' }, true, () => 8)
        const styles = api().locationStyles.value as Record<string, unknown>
        // calc(100% - 8px) on the "bottom" key
        const val = styles.bottom as string
        expect(val).toContain('calc(100%')
        expect(val).toContain('8px')
    })

    it('no offset function → 0px offset in calc()', () => {
        const { api } = mountLocation({ location: 'top' }, true)
        const styles = api().locationStyles.value as Record<string, unknown>
        const val = styles.bottom as string
        expect(val).toContain('0px')
    })
})

// ─── reactivity ──────────────────────────────────────────────────────────────

describe('useLocation — reactivity', () => {
    it('updates styles when location prop changes', () => {
        const { props, api } = mountLocation({ location: 'top' })
        expect((api().locationStyles.value as any).top).toBe(0)
        props.location = 'bottom'
        const styles = api().locationStyles.value as Record<string, unknown>
        expect(styles.bottom).toBe(0)
    })

    it('returns {} when location is cleared to undefined', () => {
        const { props, api } = mountLocation({ location: 'top' })
        props.location = undefined
        expect(api().locationStyles.value).toEqual({})
    })
})
