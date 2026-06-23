// Tests for `useSticky` composable.
// The composable uses window.scroll events and element getBoundingClientRect
// to decide whether an element is stuck "top", "bottom" or freely positioned.
// Runtime scroll logic that drives isStuck is tested via mocked window APIs.

import { defineComponent, h, nextTick, reactive, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'

import type { ISticky } from '@origam/interfaces'

import { useSticky } from '@origam/composables/Commons/sticky.composable'

// ─── helpers ────────────────────────────────────────────────────────────────

function buildStickyArgs (overrides: Partial<ISticky> = {}): ISticky {
    const el = document.createElement('div')
    return {
        rootEl: ref(el) as ISticky['rootEl'],
        isSticky: ref(false),
        layoutItemStyles: ref({ top: '0px' }) as ISticky['layoutItemStyles'],
        ...overrides
    }
}

function mountSticky (args: ISticky) {
    let api!: ReturnType<typeof useSticky>
    const Host = defineComponent({
        name: 'OrigamStickyHost',
        setup () {
            api = useSticky(args)
            return () => h('div')
        }
    })
    mount(Host)
    return { api: () => api }
}

// ─── initial state ──────────────────────────────────────────────────────────

describe('useSticky — initial state', () => {
    it('isStuck starts as false', () => {
        const args = buildStickyArgs()
        const { api } = mountSticky(args)
        expect(api().isStuck.value).toBe(false)
    })

    it('stickyStyles is an array', () => {
        const args = buildStickyArgs()
        const { api } = mountSticky(args)
        expect(Array.isArray(api().stickyStyles.value)).toBe(true)
    })
})

// ─── stickyStyles when isSticky=false ───────────────────────────────────────

describe('useSticky — stickyStyles when NOT sticky', () => {
    it('when isSticky=false: first style entry is undefined', () => {
        const args = buildStickyArgs({ isSticky: ref(false) })
        const { api } = mountSticky(args)
        expect(api().stickyStyles.value[0]).toBeUndefined()
    })

    it('when isSticky=false, isStuck=false: second entry uses layoutItemStyles.top', () => {
        const args = buildStickyArgs({
            isSticky: ref(false),
            layoutItemStyles: ref({ top: '64px' }) as ISticky['layoutItemStyles']
        })
        const { api } = mountSticky(args)
        const second = api().stickyStyles.value[1]
        expect(second).toMatchObject({ top: '64px' })
    })
})

// ─── stickyStyles when isSticky=true ────────────────────────────────────────

describe('useSticky — stickyStyles when sticky', () => {
    it('when isSticky=true: first style entry neutralises top/bottom', () => {
        const args = buildStickyArgs({ isSticky: ref(true) })
        const { api } = mountSticky(args)
        const first = api().stickyStyles.value[0]
        expect(first).toMatchObject({ top: 'auto', bottom: 'auto' })
    })

    it('when isSticky=true, isStuck=false: second entry still uses layoutItemStyles.top', () => {
        const args = buildStickyArgs({
            isSticky: ref(true),
            layoutItemStyles: ref({ top: '48px' }) as ISticky['layoutItemStyles']
        })
        const { api } = mountSticky(args)
        const second = api().stickyStyles.value[1]
        expect(second).toMatchObject({ top: '48px' })
    })
})

// ─── stickyStyles when isStuck ───────────────────────────────────────────────

describe('useSticky — stickyStyles when stuck', () => {
    it('when isStuck="top": second style uses top property', async () => {
        const args = buildStickyArgs({ isSticky: ref(true) })
        const { api } = mountSticky(args)
        api().isStuck.value = 'top'
        await nextTick()
        const second = api().stickyStyles.value[1]
        expect(second).toHaveProperty('top')
    })

    it('when isStuck="bottom": second style uses bottom property', async () => {
        const args = buildStickyArgs({ isSticky: ref(true) })
        const { api } = mountSticky(args)
        api().isStuck.value = 'bottom'
        await nextTick()
        const second = api().stickyStyles.value[1]
        expect(second).toHaveProperty('bottom')
    })

    it('when isStuck=true (boolean): side falls back to "top"', async () => {
        const args = buildStickyArgs({ isSticky: ref(true) })
        const { api } = mountSticky(args)
        api().isStuck.value = true
        await nextTick()
        const second = api().stickyStyles.value[1]
        // isStuck===true → side = 'top'
        expect(second).toHaveProperty('top')
    })

    it('stuckPosition value appears in the second style entry', async () => {
        const args = buildStickyArgs({ isSticky: ref(true) })
        const { api } = mountSticky(args)
        api().isStuck.value = 'top'
        void api().isStuck.value
        await nextTick()
        const second = api().stickyStyles.value[1] as Record<string, unknown>
        // stuckPosition starts at 0 → convertToUnit(0) = '0px'
        expect(second.top).toBe('0px')
    })
})

// ─── scroll event listener (DOM-bound) ──────────────────────────────────────

describe('useSticky — window scroll listener lifecycle', () => {
    beforeEach(() => {
        vi.spyOn(window, 'addEventListener')
        vi.spyOn(window, 'removeEventListener')
    })
    afterEach(() => vi.restoreAllMocks())

    it('registers a scroll listener when isSticky becomes true', async () => {
        const isSticky = ref(false)
        const args = buildStickyArgs({ isSticky })
        mountSticky(args)
        isSticky.value = true
        await nextTick()
        expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true })
    })

    it('removes the scroll listener when isSticky becomes false', async () => {
        const isSticky = ref(true)
        const args = buildStickyArgs({ isSticky })
        mountSticky(args)
        // Wait for the watcher triggered on mount (immediate)
        await nextTick()
        isSticky.value = false
        await nextTick()
        expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
    })
})

// ─── onScroll logic (unit-level, mocked DOM) ─────────────────────────────────

describe('useSticky — onScroll state transitions (mocked DOM)', () => {
    beforeEach(() => {
        vi.stubGlobal('scrollY', 0)
        vi.stubGlobal('innerHeight', 800)
    })
    afterEach(() => vi.unstubAllGlobals())

    it('sets isStuck to "top" when element height < (innerHeight - layoutTop)', async () => {
        const el = document.createElement('div')
        // Element shorter than viewport → fits above fold → should stick "top"
        vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
            top: 0, bottom: 100, height: 100, left: 0, right: 0, width: 100,
            x: 0, y: 0, toJSON: () => {}
        } as DOMRect)
        vi.spyOn(window, 'getComputedStyle').mockReturnValue({
            getPropertyValue: () => '0'
        } as any)

        const isSticky = ref(true)
        const args = buildStickyArgs({
            rootEl: ref(el) as ISticky['rootEl'],
            isSticky,
            layoutItemStyles: ref({ top: '0px' }) as ISticky['layoutItemStyles']
        })
        const { api } = mountSticky(args)

        // Dispatch scroll event to trigger onScroll
        window.dispatchEvent(new Event('scroll'))
        await nextTick()

        expect(api().isStuck.value).toBe('top')
    })
})
