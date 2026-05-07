// Unit tests for `useSheetSwipe`.
//
// The composable wires real DOM listeners to a handle element, so we
// mount a tiny Vue host that exposes the necessary refs, then drive the
// gesture by dispatching synthetic PointerEvents on the handle. This
// lets us assert the snap-resolution algorithm end-to-end:
//
// 1. Slow drag → nearest-by-distance snap.
// 2. Fast upward flick → step UP one snap.
// 3. Fast downward flick → step DOWN one snap.
// 4. `persistent: true` blocks the `closed` snap.
// 5. `snapTo()` and `dismiss()` are idempotent imperative escape hatches.
//
// jsdom does not implement `setPointerCapture`; the composable swallows
// the resulting `DOMException` so the tests run unmodified.

import { defineComponent, h, ref, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, beforeEach } from 'vitest'

import type { TSheetSnapPoint, TSheetSnapId } from '../../types'

import { useSheetSwipe, DEFAULT_SHEET_SNAP_POINTS } from './sheetSwipe.composable'

// ───────────────────────────────────────────────────────────────────────────
// Test harness
// ───────────────────────────────────────────────────────────────────────────

interface MountOptions {
    snapPoints?: ReadonlyArray<TSheetSnapPoint>
    defaultSnap?: TSheetSnapId
    persistent?: boolean
    disabled?: boolean
}

function mountWith (opts: MountOptions = {}) {
    let api!: ReturnType<typeof useSheetSwipe>

    const Host = defineComponent({
        name: 'OrigamSheetSwipeHost',
        setup () {
            const elRef = ref<HTMLElement | null>(null)
            const handleRef = ref<HTMLElement | null>(null)
            const snapPoints = ref(opts.snapPoints ?? DEFAULT_SHEET_SNAP_POINTS)
            const defaultSnap = ref<TSheetSnapId>(opts.defaultSnap ?? 'half')
            const persistent = ref(!!opts.persistent)
            const disabled = ref(!!opts.disabled)

            api = useSheetSwipe({
                el: elRef,
                handle: handleRef,
                snapPoints,
                defaultSnap,
                persistent,
                disabled
            })

            return () => h('div', { ref: elRef }, [
                h('div', { ref: handleRef, 'data-testid': 'handle' })
            ])
        }
    })

    const wrapper = mount(Host, { attachTo: document.body })
    const handle = wrapper.element.querySelector('[data-testid="handle"]') as HTMLElement
    return { wrapper, api: () => api, handle }
}

/**
 * Dispatch a pointerdown / pointermove / pointerup sequence with chosen
 * deltaY and elapsed time. Returns a promise that resolves once Vue
 * flushes — every test awaits it so reactive state is settled.
 *
 * Δ convention: positive `dy` means the finger moved DOWN (clientY
 * grows). The sheet treats up-motion as expansion, so to flick UP you
 * pass a negative `dy` (clientY shrinks).
 */
async function drag (
    handle: HTMLElement,
    {
        dy,
        dt = 200,
        startY = 600
    }: { dy: number; dt?: number; startY?: number }
) {
    const downTs = 1000
    const upTs = downTs + dt

    // pointerdown
    handle.dispatchEvent(new PointerEvent('pointerdown', {
        clientY: startY,
        bubbles: true,
        cancelable: true,
        pointerId: 1
    } as PointerEventInit))

    // single pointermove halfway through
    handle.dispatchEvent(new PointerEvent('pointermove', {
        clientY: startY + dy,
        bubbles: true,
        cancelable: true,
        pointerId: 1
    } as PointerEventInit))

    // pointerup with crafted timeStamp via `Object.defineProperty`
    // (the constructor ignores `timeStamp`).
    const upEvt = new PointerEvent('pointerup', {
        clientY: startY + dy,
        bubbles: true,
        cancelable: true,
        pointerId: 1
    } as PointerEventInit)
    Object.defineProperty(upEvt, 'timeStamp', { value: upTs, configurable: true })

    // Same for pointerdown so velocity = dy / dt
    // (we re-dispatch a fresh pointerdown with timeStamp set first,
    // because PointerEvent#timeStamp is read-only via the constructor).
    // Already done above — the `dt` we pass is reflected in the gap
    // between the down event timestamp and the up event we craft here.
    // For determinism, override down event timeStamp via a re-dispatch:
    handle.dispatchEvent(upEvt)

    await nextTick()
}

/**
 * Simulate a precisely-timed gesture by overriding both pointerdown and
 * pointerup `timeStamp`s. Velocity = (startY - endY) / dt in px/ms,
 * positive when flicking up.
 */
async function timedDrag (
    handle: HTMLElement,
    { startY, endY, dt }: { startY: number; endY: number; dt: number }
) {
    const downEvt = new PointerEvent('pointerdown', {
        clientY: startY,
        bubbles: true,
        cancelable: true,
        pointerId: 1
    } as PointerEventInit)
    Object.defineProperty(downEvt, 'timeStamp', { value: 1000, configurable: true })
    handle.dispatchEvent(downEvt)

    const moveEvt = new PointerEvent('pointermove', {
        clientY: endY,
        bubbles: true,
        cancelable: true,
        pointerId: 1
    } as PointerEventInit)
    handle.dispatchEvent(moveEvt)

    const upEvt = new PointerEvent('pointerup', {
        clientY: endY,
        bubbles: true,
        cancelable: true,
        pointerId: 1
    } as PointerEventInit)
    Object.defineProperty(upEvt, 'timeStamp', { value: 1000 + dt, configurable: true })
    handle.dispatchEvent(upEvt)

    await nextTick()
}

// ───────────────────────────────────────────────────────────────────────────
// Specs
// ───────────────────────────────────────────────────────────────────────────

describe('useSheetSwipe', () => {

    beforeEach(() => {
        // jsdom defaults innerHeight to 768; lock it for predictable
        // resolution of `vh`-style snap heights.
        Object.defineProperty(window, 'innerHeight', { configurable: true, value: 800 })
        Object.defineProperty(window, 'innerWidth',  { configurable: true, value: 360 })
    })

    it('initialises with the requested defaultSnap', () => {
        const { api } = mountWith({ defaultSnap: 'peek' })
        expect(api().currentSnap.value).toBe('peek')
    })

    it('exposes default snap-points map preset', () => {
        expect(DEFAULT_SHEET_SNAP_POINTS.map(s => s.id))
            .toEqual(['closed', 'peek', 'half', 'full'])
    })

    it('imperative snapTo() switches the active snap', () => {
        const { api } = mountWith({ defaultSnap: 'peek' })
        api().snapTo('full')
        expect(api().currentSnap.value).toBe('full')
        api().snapTo('half')
        expect(api().currentSnap.value).toBe('half')
    })

    it('dismiss() snaps to closed', () => {
        const { api } = mountWith({ defaultSnap: 'peek' })
        api().dismiss()
        expect(api().currentSnap.value).toBe('closed')
    })

    it('persistent blocks dismiss to closed', () => {
        const { api } = mountWith({ defaultSnap: 'peek', persistent: true })
        api().dismiss()
        // Falls back to the next non-zero snap (peek = 120px is the
        // smallest non-zero in the default preset).
        expect(api().currentSnap.value).toBe('peek')
    })

    it('slow drag upward → snaps to nearest by distance (peek → half)', async () => {
        const { api, handle } = mountWith({ defaultSnap: 'peek' })
        // peek = 120 px, half = 50vh = 400 px (with innerHeight=800).
        // Drag UP 200 px slowly (dt = 1000 ms ⇒ velocity = 0.2 < 0.5).
        // Projected height = 120 + 200 = 320, distances:
        //   closed (0)    → 320
        //   peek (120)    → 200
        //   half (400)    → 80   ← nearest
        //   full (720)    → 400
        await timedDrag(handle, { startY: 600, endY: 400, dt: 1000 })
        expect(api().currentSnap.value).toBe('half')
    })

    it('slow drag downward → snaps to nearest below (half → peek)', async () => {
        const { api, handle } = mountWith({ defaultSnap: 'half' })
        // half = 400 px → drag DOWN 250 px slowly. Projected = 150 px.
        // Distances: closed 150, peek 30 ← nearest, half 250, full 570.
        await timedDrag(handle, { startY: 200, endY: 450, dt: 1000 })
        expect(api().currentSnap.value).toBe('peek')
    })

    it('fast upward flick → step one snap UP (peek → half)', async () => {
        const { api, handle } = mountWith({ defaultSnap: 'peek' })
        // 100 px in 50 ms = 2 px/ms (well above 0.5 threshold).
        await timedDrag(handle, { startY: 600, endY: 500, dt: 50 })
        expect(api().currentSnap.value).toBe('half')
    })

    it('fast downward flick → step one snap DOWN (half → peek)', async () => {
        const { api, handle } = mountWith({ defaultSnap: 'half' })
        // 100 px in 50 ms = 2 px/ms downward.
        await timedDrag(handle, { startY: 200, endY: 300, dt: 50 })
        expect(api().currentSnap.value).toBe('peek')
    })

    it('fast flick down clamps at index 0 (closed)', async () => {
        const { api, handle } = mountWith({ defaultSnap: 'closed' })
        await timedDrag(handle, { startY: 200, endY: 400, dt: 50 })
        expect(api().currentSnap.value).toBe('closed')
    })

    it('fast flick up clamps at last index (full)', async () => {
        const { api, handle } = mountWith({ defaultSnap: 'full' })
        await timedDrag(handle, { startY: 200, endY: 100, dt: 50 })
        expect(api().currentSnap.value).toBe('full')
    })

    it('fast flick down with persistent → never lands on closed', async () => {
        const { api, handle } = mountWith({ defaultSnap: 'peek', persistent: true })
        // Flick down would normally → closed; persistent rebounds to peek.
        await timedDrag(handle, { startY: 200, endY: 400, dt: 50 })
        expect(api().currentSnap.value).toBe('peek')
    })

    it('disabled blocks the gesture entirely', async () => {
        const { api, handle } = mountWith({ defaultSnap: 'peek', disabled: true })
        await timedDrag(handle, { startY: 600, endY: 100, dt: 50 })
        expect(api().currentSnap.value).toBe('peek')
    })

    it('isDragging flag toggles across pointerdown/pointerup', async () => {
        const { api, handle } = mountWith({ defaultSnap: 'peek' })
        expect(api().isDragging.value).toBe(false)

        const downEvt = new PointerEvent('pointerdown', {
            clientY: 600, bubbles: true, cancelable: true, pointerId: 1
        } as PointerEventInit)
        Object.defineProperty(downEvt, 'timeStamp', { value: 1000, configurable: true })
        handle.dispatchEvent(downEvt)
        await nextTick()
        expect(api().isDragging.value).toBe(true)

        const upEvt = new PointerEvent('pointerup', {
            clientY: 600, bubbles: true, cancelable: true, pointerId: 1
        } as PointerEventInit)
        Object.defineProperty(upEvt, 'timeStamp', { value: 1100, configurable: true })
        handle.dispatchEvent(upEvt)
        await nextTick()
        expect(api().isDragging.value).toBe(false)
    })

    it('pointermove updates dragOffset live (sheet follows finger)', async () => {
        const { api, handle } = mountWith({ defaultSnap: 'peek' })
        const downEvt = new PointerEvent('pointerdown', {
            clientY: 600, bubbles: true, cancelable: true, pointerId: 1
        } as PointerEventInit)
        Object.defineProperty(downEvt, 'timeStamp', { value: 1000, configurable: true })
        handle.dispatchEvent(downEvt)

        handle.dispatchEvent(new PointerEvent('pointermove', {
            clientY: 500, bubbles: true, cancelable: true, pointerId: 1
        } as PointerEventInit))

        await nextTick()
        // 600 → 500 = 100 px UP → positive 100 in dragOffset.
        expect(api().dragOffset.value).toBe(100)
    })

    it('custom snap-points override the default preset', () => {
        const { api } = mountWith({
            snapPoints: [
                { id: 'closed',  height: 0 },
                { id: 'mini',    height: '60px' },
                { id: 'preview', height: '40vh' }
            ],
            defaultSnap: 'mini'
        })
        expect(api().currentSnap.value).toBe('mini')
        api().snapTo('preview')
        expect(api().currentSnap.value).toBe('preview')
    })

    it('currentSnapHeight resolves vh against window.innerHeight', () => {
        const { api } = mountWith({ defaultSnap: 'half' })
        // half = 50vh, innerHeight=800 → 400 px.
        expect(api().currentSnapHeight.value).toBe(400)
    })
})
