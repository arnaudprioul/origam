// TU — slide-group.util.ts
// Exports: calculateUpdatedTarget, calculateCenteredTarget,
//          getScrollSize, getClientSize, getScrollPosition,
//          getOffsetSize, getOffsetPosition
//
// All functions accept plain HTMLElement-shaped objects with numeric properties.
// jsdom does not lay out elements, so offsetWidth/scrollLeft/etc. are all 0.
// We mock by assigning properties directly on plain objects cast to HTMLElement.

import { describe, expect, it } from 'vitest'
import {
    calculateUpdatedTarget,
    calculateCenteredTarget,
    getScrollSize,
    getClientSize,
    getScrollPosition,
    getOffsetSize,
    getOffsetPosition,
} from '@origam/utils/Slide/slide-group.util'

// Helper to build a mock element with given scroll/offset dimensions
function mockEl (overrides: Record<string, number>): HTMLElement {
    return overrides as unknown as HTMLElement
}

// ─── getScrollSize ────────────────────────────────────────────────────────────

describe('getScrollSize', () => {
    it('returns scrollWidth when isHorizontal=true', () => {
        const el = mockEl({ scrollWidth: 400, scrollHeight: 200 })
        expect(getScrollSize(true, el)).toBe(400)
    })

    it('returns scrollHeight when isHorizontal=false', () => {
        const el = mockEl({ scrollWidth: 400, scrollHeight: 200 })
        expect(getScrollSize(false, el)).toBe(200)
    })

    it('returns 0 when element is undefined', () => {
        expect(getScrollSize(true, undefined)).toBe(0)
        expect(getScrollSize(false, undefined)).toBe(0)
    })
})

// ─── getClientSize ────────────────────────────────────────────────────────────

describe('getClientSize', () => {
    it('returns clientWidth when isHorizontal=true', () => {
        const el = mockEl({ clientWidth: 300, clientHeight: 150 })
        expect(getClientSize(true, el)).toBe(300)
    })

    it('returns clientHeight when isHorizontal=false', () => {
        const el = mockEl({ clientWidth: 300, clientHeight: 150 })
        expect(getClientSize(false, el)).toBe(150)
    })

    it('returns 0 when element is undefined', () => {
        expect(getClientSize(true, undefined)).toBe(0)
    })
})

// ─── getOffsetSize ────────────────────────────────────────────────────────────

describe('getOffsetSize', () => {
    it('returns offsetWidth when isHorizontal=true', () => {
        const el = mockEl({ offsetWidth: 200, offsetHeight: 100 })
        expect(getOffsetSize(true, el)).toBe(200)
    })

    it('returns offsetHeight when isHorizontal=false', () => {
        const el = mockEl({ offsetWidth: 200, offsetHeight: 100 })
        expect(getOffsetSize(false, el)).toBe(100)
    })

    it('returns 0 when element is undefined', () => {
        expect(getOffsetSize(true, undefined)).toBe(0)
    })
})

// ─── getOffsetPosition ────────────────────────────────────────────────────────

describe('getOffsetPosition', () => {
    it('returns offsetLeft when isHorizontal=true', () => {
        const el = mockEl({ offsetLeft: 50, offsetTop: 25 })
        expect(getOffsetPosition(true, el)).toBe(50)
    })

    it('returns offsetTop when isHorizontal=false', () => {
        const el = mockEl({ offsetLeft: 50, offsetTop: 25 })
        expect(getOffsetPosition(false, el)).toBe(25)
    })

    it('returns 0 when element is undefined', () => {
        expect(getOffsetPosition(false, undefined)).toBe(0)
    })
})

// ─── getScrollPosition ───────────────────────────────────────────────────────

describe('getScrollPosition', () => {
    it('returns 0 when element is undefined', () => {
        expect(getScrollPosition(true, false, undefined)).toBe(0)
        expect(getScrollPosition(false, false, undefined)).toBe(0)
    })

    it('returns scrollLeft for LTR horizontal', () => {
        const el = mockEl({ scrollLeft: 80, offsetWidth: 200, scrollWidth: 400, scrollTop: 30 })
        expect(getScrollPosition(true, false, el)).toBe(80)
    })

    it('returns RTL-corrected scroll for RTL horizontal', () => {
        // RTL: scrollWidth - offsetWidth + scrollLeft
        const el = mockEl({ scrollLeft: -80, offsetWidth: 200, scrollWidth: 400, scrollTop: 0 })
        expect(getScrollPosition(true, true, el)).toBe(400 - 200 + (-80))
    })

    it('returns scrollTop for vertical (isHorizontal=false)', () => {
        const el = mockEl({ scrollLeft: 0, offsetWidth: 200, scrollWidth: 400, scrollTop: 60 })
        expect(getScrollPosition(false, false, el)).toBe(60)
    })

    it('RTL flag has no effect on vertical scroll', () => {
        const el = mockEl({ scrollLeft: 0, offsetWidth: 200, scrollWidth: 400, scrollTop: 60 })
        expect(getScrollPosition(false, true, el)).toBe(60)
    })
})

// ─── calculateCenteredTarget ──────────────────────────────────────────────────

describe('calculateCenteredTarget', () => {
    it('returns the position that centers the child within container', () => {
        // container = 200px wide; child = 60px wide, at offsetLeft=100
        // expected: 100 - (200/2) + (60/2) = 100 - 100 + 30 = 30
        const container = mockEl({ offsetWidth: 200, offsetHeight: 200 })
        const child = mockEl({ offsetWidth: 60, offsetHeight: 60, offsetLeft: 100, offsetTop: 100 })

        const resultH = calculateCenteredTarget({ selectedElement: child, containerElement: container, isHorizontal: true })
        expect(resultH).toBe(100 - 100 + 30)  // 30

        const resultV = calculateCenteredTarget({ selectedElement: child, containerElement: container, isHorizontal: false })
        expect(resultV).toBe(100 - 100 + 30)  // 30
    })

    it('returns negative value when child is near the start', () => {
        const container = mockEl({ offsetWidth: 400, offsetHeight: 100 })
        const child = mockEl({ offsetWidth: 60, offsetHeight: 60, offsetLeft: 10, offsetTop: 0 })

        const result = calculateCenteredTarget({ selectedElement: child, containerElement: container, isHorizontal: true })
        // 10 - 200 + 30 = -160
        expect(result).toBe(-160)
    })
})

// ─── calculateUpdatedTarget ───────────────────────────────────────────────────

describe('calculateUpdatedTarget', () => {
    it('returns scrollPosition unchanged when child is already visible', () => {
        // container: 200px, scrollPosition=50; child at offsetLeft=80, offsetWidth=40
        // visible range: [50, 250]; child: [80, 120] — fully visible → returns scrollPosition
        const container = mockEl({ offsetWidth: 200, offsetHeight: 200, scrollLeft: 50, scrollWidth: 500 })
        const child = mockEl({ offsetWidth: 40, offsetHeight: 40, offsetLeft: 80, offsetTop: 80 })

        const result = calculateUpdatedTarget({
            selectedElement: child,
            containerElement: container,
            isRtl: false,
            isHorizontal: true
        })
        expect(result).toBe(50)  // already visible — no scroll change
    })

    it('scrolls left when child is before the visible range', () => {
        // scrollPosition=100; child at offsetLeft=20, offsetWidth=40 — child starts before viewport
        const container = mockEl({ offsetWidth: 200, offsetHeight: 200, scrollLeft: 100, scrollWidth: 500 })
        const child = mockEl({ offsetWidth: 40, offsetHeight: 40, offsetLeft: 20, offsetTop: 20 })

        const result = calculateUpdatedTarget({
            selectedElement: child,
            containerElement: container,
            isRtl: false,
            isHorizontal: true
        })
        // scrollPosition > childStart(20) → target = 20 - 40*0.4 = 20 - 16 = 4
        expect(result).toBe(4)
    })

    it('scrolls right when child is beyond the visible range', () => {
        // scrollPosition=0, container=200, child at offsetLeft=250, offsetWidth=50
        // visible range: [0, 200]; child: [250, 300] — beyond viewport
        const container = mockEl({ offsetWidth: 200, offsetHeight: 200, scrollLeft: 0, scrollWidth: 500 })
        const child = mockEl({ offsetWidth: 50, offsetHeight: 50, offsetLeft: 250, offsetTop: 250 })

        const result = calculateUpdatedTarget({
            selectedElement: child,
            containerElement: container,
            isRtl: false,
            isHorizontal: true
        })
        // target = childStart(250) - container(200) + childSize(50) + additionalOffset(50*0.4=20) = 120
        expect(result).toBe(120)
    })
})
