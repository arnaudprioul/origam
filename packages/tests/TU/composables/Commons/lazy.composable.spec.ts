// Tests for `useLazy` composable.
// Covers:
//   - hasContent: true when eager=true or active=true, false otherwise
//   - isBooted flips to true on first active activation (and stays true)
//   - onAfterLeave: resets isBooted when !eager; no-op when eager=true

import { defineComponent, h, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { useLazy } from '@origam/composables/Commons/lazy.composable'

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function mountWith (eager: boolean, initialActive = false) {
    const active = ref(initialActive)
    let api!: ReturnType<typeof useLazy>

    const Host = defineComponent({
        name: 'OrigamLazyHost',
        setup () {
            api = useLazy({ eager }, active)
            return () => h('div')
        }
    })

    mount(Host)
    return { active, api: () => api }
}

// ---------------------------------------------------------------------------
// hasContent
// ---------------------------------------------------------------------------

describe('useLazy — hasContent', () => {
    it('false when eager=false and active=false (not yet booted)', () => {
        const { api } = mountWith(false, false)
        expect(api().hasContent.value).toBe(false)
    })

    it('true immediately when eager=true regardless of active', () => {
        const { api } = mountWith(true, false)
        expect(api().hasContent.value).toBe(true)
    })

    it('true when active=true even without eager', () => {
        const { api } = mountWith(false, true)
        expect(api().hasContent.value).toBe(true)
    })

    it('remains true after first activation (isBooted=true) even when active goes back to false', async () => {
        const { active, api } = mountWith(false, false)
        expect(api().hasContent.value).toBe(false)

        active.value = true
        await Promise.resolve()
        expect(api().isBooted.value).toBe(true)
        expect(api().hasContent.value).toBe(true)

        active.value = false
        await Promise.resolve()
        // isBooted stays true so hasContent stays true.
        expect(api().hasContent.value).toBe(true)
    })
})

// ---------------------------------------------------------------------------
// isBooted
// ---------------------------------------------------------------------------

describe('useLazy — isBooted', () => {
    it('false initially when eager=false and active=false', () => {
        const { api } = mountWith(false, false)
        expect(api().isBooted.value).toBe(false)
    })

    it('flips to true on the first active=true', async () => {
        const { active, api } = mountWith(false, false)
        active.value = true
        await Promise.resolve()
        expect(api().isBooted.value).toBe(true)
    })

    it('stays true after active goes back to false (lazy keeps content mounted)', async () => {
        const { active, api } = mountWith(false, false)
        active.value = true
        await Promise.resolve()
        active.value = false
        await Promise.resolve()
        expect(api().isBooted.value).toBe(true)
    })
})

// ---------------------------------------------------------------------------
// onAfterLeave
// ---------------------------------------------------------------------------

describe('useLazy — onAfterLeave', () => {
    it('resets isBooted when eager=false', async () => {
        const { active, api } = mountWith(false, false)
        active.value = true
        await Promise.resolve()
        expect(api().isBooted.value).toBe(true)

        api().onAfterLeave()
        expect(api().isBooted.value).toBe(false)
    })

    it('does NOT reset isBooted when eager=true', async () => {
        const { active, api } = mountWith(true, false)
        active.value = true
        await Promise.resolve()
        // isBooted is true after the first activation.
        expect(api().isBooted.value).toBe(true)

        api().onAfterLeave()
        // eager=true → onAfterLeave is a no-op: isBooted stays true.
        expect(api().isBooted.value).toBe(true)
        expect(api().hasContent.value).toBe(true)
    })
})
