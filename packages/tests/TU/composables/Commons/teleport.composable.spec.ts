// Tests for `useTeleport` composable.
// useTeleport resolves the teleport target: it creates/reuses
// `.origam-overlay-container` inside the target DOM element.
// IN_BROWSER=true in jsdom so DOM paths execute.

import { describe, expect, it } from 'vitest'
import { ref } from 'vue'

import { useTeleport } from '@origam/composables/Commons/teleport.composable'

// ─── target === true (SSR-style disable) ─────────────────────────────────────

describe('useTeleport — target=true', () => {
    it('returns undefined (disabled mode)', () => {
        const { teleportTarget } = useTeleport(ref(true))
        expect(teleportTarget.value).toBeUndefined()
    })
})

// ─── target === false → body ──────────────────────────────────────────────────

describe('useTeleport — target=false', () => {
    it('creates .origam-overlay-container inside document.body', () => {
        // Clean up any pre-existing container
        document.body.querySelector('.origam-overlay-container')?.remove()

        const { teleportTarget } = useTeleport(ref(false))
        expect(teleportTarget.value).toBeInstanceOf(HTMLElement)
        expect((teleportTarget.value as HTMLElement).className).toBe('origam-overlay-container')
        expect(document.body.contains(teleportTarget.value as HTMLElement)).toBe(true)
    })

    it('reuses existing .origam-overlay-container on body instead of creating a second one', () => {
        // The previous test already appended one
        const container1 = document.body.querySelector('.origam-overlay-container')
        const { teleportTarget } = useTeleport(ref(false))
        expect(teleportTarget.value).toBe(container1)
        // Still exactly one container
        expect(document.body.querySelectorAll(':scope > .origam-overlay-container').length).toBe(1)
    })
})

// ─── target = CSS selector string ────────────────────────────────────────────

describe('useTeleport — target=string selector', () => {
    it('creates container inside the matched element', () => {
        const host = document.createElement('div')
        host.id = 'teleport-host'
        document.body.appendChild(host)

        const { teleportTarget } = useTeleport(ref('#teleport-host'))
        expect(teleportTarget.value).toBeInstanceOf(HTMLElement)
        expect(host.contains(teleportTarget.value as HTMLElement)).toBe(true)

        host.remove()
    })

    it('returns undefined and warns for an unknown selector', () => {
        const { teleportTarget } = useTeleport(ref('#does-not-exist'))
        expect(teleportTarget.value).toBeUndefined()
    })

    it('reuses existing container inside selector target', () => {
        const host = document.createElement('div')
        host.id = 'teleport-host-reuse'
        document.body.appendChild(host)

        const r1 = useTeleport(ref('#teleport-host-reuse'))
        const container = r1.teleportTarget.value

        const r2 = useTeleport(ref('#teleport-host-reuse'))
        expect(r2.teleportTarget.value).toBe(container)
        expect(host.querySelectorAll(':scope > .origam-overlay-container').length).toBe(1)

        host.remove()
    })
})

// ─── target = Element reference ───────────────────────────────────────────────

describe('useTeleport — target=Element', () => {
    it('creates container inside a provided Element', () => {
        const host = document.createElement('section')
        document.body.appendChild(host)

        const { teleportTarget } = useTeleport(ref(host as unknown as boolean | string | Element))
        expect(host.contains(teleportTarget.value as HTMLElement)).toBe(true)

        host.remove()
    })

    it('reuses existing container inside a provided Element', () => {
        const host = document.createElement('section')
        document.body.appendChild(host)

        const existing = document.createElement('div')
        existing.className = 'origam-overlay-container'
        host.appendChild(existing)

        const { teleportTarget } = useTeleport(ref(host as unknown as boolean | string | Element))
        expect(teleportTarget.value).toBe(existing)
        expect(host.querySelectorAll(':scope > .origam-overlay-container').length).toBe(1)

        host.remove()
    })
})

// ─── container class name ─────────────────────────────────────────────────────

describe('useTeleport — container class name', () => {
    it('created container always has class "origam-overlay-container"', () => {
        const host = document.createElement('div')
        document.body.appendChild(host)

        const { teleportTarget } = useTeleport(ref(host as unknown as boolean | string | Element))
        expect((teleportTarget.value as HTMLElement).className).toBe('origam-overlay-container')

        host.remove()
    })
})
