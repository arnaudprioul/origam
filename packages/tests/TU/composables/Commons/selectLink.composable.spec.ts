// Tests for `useSelectLink` composable.
// The composable watches link.isActive (a Ref<boolean | undefined>) and calls
// select(true) via nextTick when the link becomes active.
// We do not need a real vue-router: we pass a plain IUseLink stub.

import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import type { IUseLink } from '@origam/interfaces'

import { useSelectLink } from '@origam/composables/Commons/selectLink.composable'

// ─── helpers ────────────────────────────────────────────────────────────────

function buildLink (isLink: boolean, isActive?: boolean): IUseLink {
    return {
        isLink: ref(isLink),
        isClickable: ref(isLink),
        href: ref(undefined),
        isActive: ref(isActive)
    }
}

function mountSelectLink (link: IUseLink, select?: (value: boolean, e?: Event) => void) {
    const Host = defineComponent({
        name: 'OrigamSelectLinkHost',
        setup () {
            useSelectLink(link, select)
            return () => h('div')
        }
    })
    mount(Host)
}

// ─── isLink=true, isActive changes to true → select called ──────────────────

describe('useSelectLink — calls select(true) when isActive becomes true for a link', () => {
    it('calls select(true) on nextTick when link becomes active', async () => {
        const select = vi.fn()
        const link = buildLink(true, false)
        mountSelectLink(link, select)

        link.isActive!.value = true
        await nextTick()
        await nextTick() // two ticks: watch flush + inner nextTick in composable

        expect(select).toHaveBeenCalledOnce()
        expect(select).toHaveBeenCalledWith(true)
    })

    it('does not call select when isActive becomes false', async () => {
        const select = vi.fn()
        const link = buildLink(true, true) // starts active
        mountSelectLink(link, select)

        link.isActive!.value = false
        await nextTick()
        await nextTick()

        // Initial watch (immediate) fires with isActive=true → select(true)
        // Then flips to false → should not call again
        expect(select).toHaveBeenCalledTimes(1)
    })

    it('calls select(true) immediately (immediate watch) when link is active on mount', async () => {
        const select = vi.fn()
        const link = buildLink(true, true)
        mountSelectLink(link, select)
        await nextTick()
        await nextTick()

        expect(select).toHaveBeenCalledOnce()
        expect(select).toHaveBeenCalledWith(true)
    })
})

// ─── isLink=false → select never called ─────────────────────────────────────

describe('useSelectLink — does NOT call select when isLink=false', () => {
    it('isActive changes to true but isLink=false → select not called', async () => {
        const select = vi.fn()
        const link = buildLink(false, false)
        mountSelectLink(link, select)

        link.isActive!.value = true
        await nextTick()
        await nextTick()

        expect(select).not.toHaveBeenCalled()
    })
})

// ─── no select function ───────────────────────────────────────────────────────

describe('useSelectLink — no select callback', () => {
    it('does not throw when select is undefined and isActive becomes true', async () => {
        const link = buildLink(true, false)
        mountSelectLink(link, undefined)
        link.isActive!.value = true
        await nextTick()
        await nextTick()
        // No error — nothing to assert beyond "does not throw"
    })
})

// ─── isActive=undefined → select not called ───────────────────────────────────

describe('useSelectLink — isActive=undefined', () => {
    it('select not called when isActive ref is undefined (non-link)', async () => {
        const select = vi.fn()
        const link: IUseLink = {
            isLink: ref(true),
            isClickable: ref(true),
            href: ref(undefined),
            // no isActive
        }
        mountSelectLink(link, select)
        await nextTick()
        await nextTick()

        expect(select).not.toHaveBeenCalled()
    })
})
