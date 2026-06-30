// Unit tests for <OrigamChartGauge> — CHARTS-HEADER typography (reference for
// the chart typography rollout).
//
// Charts expose the shared ITypographyProps surface via IChartBaseProps. The
// `useChartHeaderTypography(props)` helper sets the GLOBAL header vars
// (`--origam-chart__title---*` + `--origam-chart__subtitle---*`) and the result
// is bound on the chart ROOT, cascading to the title/subtitle <text> (whose
// per-type classes `chart-gauge__title` etc. read those shared vars).
//
// Effective props on SVG <text>: fontSize + fontWeight (title reads both,
// subtitle reads font-size). fontFamily / lineHeight / letterSpacing are inert
// on charts. jsdom can't resolve the var cascade, so we assert the vars are
// posed on the root.

import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import OrigamChartGauge from '@origam/components/Chart/OrigamChartGauge.vue'
import OrigamChartCartesian from '@origam/components/Chart/OrigamChartCartesian.vue'
import OrigamChartTreemap from '@origam/components/Chart/OrigamChartTreemap.vue'
import { createOrigam } from '@origam/origam'

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
        matches: false, media: query, onchange: null,
        addListener: vi.fn(), removeListener: vi.fn(),
        addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn()
    }))
})

class ObserverMock {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
    takeRecords = vi.fn(() => [])
}
vi.stubGlobal('ResizeObserver', ObserverMock)
vi.stubGlobal('IntersectionObserver', ObserverMock)

function mountGauge (props: Record<string, unknown> = {}) {
    return mount(OrigamChartGauge, {
        props: {
            series: [{ name: 'Score', data: [72] }],
            title: 'Performance',
            subtitle: 'Q2 2026',
            ...props
        } as never,
        global: { plugins: [createOrigam()] }
    })
}

function rootStyle (props: Record<string, unknown> = {}): string {
    return mountGauge(props).find('.origam-chart-gauge').attributes('style') || ''
}

describe('OrigamChartGauge — CHARTS-HEADER typography', () => {
    it('renders the chart root', () => {
        expect(mountGauge().find('.origam-chart-gauge').exists()).toBe(true)
    })

    it('emits no header typography override when no typo prop is set', () => {
        const style = rootStyle()
        expect(style).not.toContain('--origam-chart__title---')
        expect(style).not.toContain('--origam-chart__subtitle---')
    })

    it('fontSize="xl" posts the font-size var on BOTH chart__title and chart__subtitle', () => {
        const style = rootStyle({ fontSize: 'xl' })
        expect(style).toContain('--origam-chart__title---font-size: var(--origam-font__size---xl)')
        expect(style).toContain('--origam-chart__subtitle---font-size: var(--origam-font__size---xl)')
    })

    it('fontWeight="bold" posts the font-weight var on chart__title', () => {
        const style = rootStyle({ fontWeight: 'bold' })
        expect(style).toContain('--origam-chart__title---font-weight: var(--origam-font__weight---bold)')
    })

    it('fontSize="2xl" resolves to the 2xl token', () => {
        expect(rootStyle({ fontSize: '2xl' })).toContain('--origam-chart__title---font-size: var(--origam-font__size---2xl)')
    })
})

// Rollout breadth: the same useChartHeaderTypography helper + root binding is
// applied uniformly across all charts that render a title/subtitle. Two
// representative families (Cartesian, Treemap) confirm the var lands on their
// root, proving the batch wiring (not just the Gauge reference).
describe('CHARTS-HEADER rollout — representative charts', () => {
    it('Cartesian posts chart__title + chart__subtitle font vars on its root', () => {
        const wrapper = mount(OrigamChartCartesian, {
            props: { series: [{ name: 'A', data: [1, 2, 3] }], categories: ['x', 'y', 'z'], title: 'T', subtitle: 'S', fontSize: 'xl', fontWeight: 'bold' } as never,
            global: { plugins: [createOrigam()] }
        })
        const style = wrapper.find('.origam-chart-cartesian').attributes('style') || ''
        expect(style).toContain('--origam-chart__title---font-size: var(--origam-font__size---xl)')
        expect(style).toContain('--origam-chart__title---font-weight: var(--origam-font__weight---bold)')
        expect(style).toContain('--origam-chart__subtitle---font-size: var(--origam-font__size---xl)')
    })

    it('Treemap posts chart__title font var on its root', () => {
        const wrapper = mount(OrigamChartTreemap, {
            props: { series: [{ name: 'A', data: [{ text: 'a', value: 5 }] }], title: 'T', subtitle: 'S', fontSize: '2xl' } as never,
            global: { plugins: [createOrigam()] }
        })
        const style = wrapper.find('.origam-chart-treemap').attributes('style') || ''
        expect(style).toContain('--origam-chart__title---font-size: var(--origam-font__size---2xl)')
        expect(style).toContain('--origam-chart__subtitle---font-size: var(--origam-font__size---2xl)')
    })
})
