/**
 * Smoke specs for the 9 per-type chart wrappers
 * (`OrigamChartBar`, `OrigamChartLine`, `OrigamChartArea`,
 * `OrigamChartPie`, `OrigamChartDonut`, `OrigamChartScatter`,
 * `OrigamChartRadar`, `OrigamChartColumn`, `OrigamChartTrend`).
 *
 * Each wrapper is a thin `<origam-chart v-bind="forwardedProps">` —
 * the contracts we care about :
 *
 *   1. The inner `<OrigamChart>` receives the hard-coded `type` value.
 *   2. Every declared prop on the wrapper reaches the inner component
 *      (`series`, `categories`, `height`, plus type-specific extras).
 *   3. Emits from the inner propagate verbatim to the parent listener
 *      (`point-click`, `legend-click`, `series-toggle`).
 *   4. Slots forwarded via `v-for` over `$slots` render where expected
 *      (asserted on the most common slot — `title`).
 *
 * We deliberately stub the inner `<OrigamChart>` rather than mounting
 * the real composable + SVG renderer: the wrappers don't own that
 * pipeline; the `<OrigamChart>` spec already covers it.
 */

import {
    afterEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { defineComponent, h } from 'vue'

import { mount } from '@vue/test-utils'

import { OrigamChartArea } from '.'
import { OrigamChartBar } from '.'
import { OrigamChartColumn } from '.'
import { OrigamChartDonut } from '.'
import { OrigamChartLine } from '.'
import { OrigamChartPie } from '.'
import { OrigamChartRadar } from '.'
import { OrigamChartScatter } from '.'
import { OrigamChartTrend } from '.'

/**
 * Stub for the inner `<OrigamChart>`. Declares every prop the
 * wrappers might forward so they end up in `wrapper.props()` rather
 * than the inert `$attrs` bag — we need `props()` to assert
 * forwarding deterministically.
 */
const OrigamChartStub = defineComponent({
    name: 'OrigamChart',
    props: {
        type: { type: String, default: 'line' },
        series: { type: Array, default: () => [] },
        categories: { type: Array, default: () => [] },
        height: { type: [Number, String], default: 280 },
        title: { type: String, default: undefined },
        subtitle: { type: String, default: undefined },
        showLegend: { type: Boolean, default: true },
        legendPosition: { type: String, default: 'bottom' },
        showTooltip: { type: Boolean, default: true },
        animated: { type: Boolean, default: true },
        animationDuration: { type: Number, default: 600 },
        colorScheme: { type: Array, default: () => [] },
        aspectRatio: { type: String, default: undefined },
        // Type-specific extras
        stacked: { type: Boolean, default: false },
        smoothing: { type: String, default: 'none' },
        yMin: { type: Number, default: undefined },
        yMax: { type: Number, default: undefined },
        showGrid: { type: Boolean, default: true },
        showAxis: { type: Boolean, default: true },
        xAxisFormat: { type: Function, default: undefined },
        yAxisFormat: { type: Function, default: undefined },
        donutHoleSize: { type: Number, default: 0.6 }
    },
    emits: ['point-click', 'legend-click', 'series-toggle'],
    setup (_, { slots }) {
        return () => h('div', { 'data-test': 'inner-chart-stub' }, [
            slots.title?.(),
            slots.tooltip?.({ point: null, series: null, category: null }),
            slots['legend-item']?.({ series: null, index: 0, visible: true }),
            slots.empty?.()
        ])
    }
})

const GLOBAL_STUBS = {
    OrigamChart: OrigamChartStub
}

interface IWrapperCase {
    Component: unknown
    type: string
    extras: Record<string, unknown>
}

const WRAPPERS: Array<IWrapperCase> = [
    { Component: OrigamChartBar,     type: 'bar',     extras: { stacked: true } },
    { Component: OrigamChartColumn,  type: 'column',  extras: { stacked: true } },
    { Component: OrigamChartLine,    type: 'line',    extras: { smoothing: 'curve', showGrid: false } },
    { Component: OrigamChartArea,    type: 'area',    extras: { smoothing: 'curve', showAxis: false } },
    { Component: OrigamChartPie,     type: 'pie',     extras: {} },
    { Component: OrigamChartDonut,   type: 'donut',   extras: { donutHoleSize: 0.4 } },
    { Component: OrigamChartScatter, type: 'scatter', extras: { yMin: 0, yMax: 100 } },
    { Component: OrigamChartRadar,   type: 'radar',   extras: {} },
    { Component: OrigamChartTrend,   type: 'trend',   extras: { smoothing: 'curve' } }
]

const BASE_SERIES = [
    { name: 'A', data: [1, 2, 3, 4, 5] },
    { name: 'B', data: [3, 2, 4, 1, 5] }
]

afterEach(() => {
    vi.restoreAllMocks()
})

describe('Per-type chart wrappers', () => {
    WRAPPERS.forEach(({ Component, type, extras }) => {
        const componentName = `OrigamChart${type[0].toUpperCase()}${type.slice(1)}`

        describe(`<${componentName}>`, () => {
            it(`mounts and renders an inner <OrigamChart>`, () => {
                const wrapper = mount(Component as never, {
                    props: { series: BASE_SERIES, ...extras },
                    global: { stubs: GLOBAL_STUBS }
                })

                const inner = wrapper.findComponent(OrigamChartStub)
                expect(inner.exists()).toBe(true)
            })

            it(`forwards type="${type}" to the inner component`, () => {
                const wrapper = mount(Component as never, {
                    props: { series: BASE_SERIES, ...extras },
                    global: { stubs: GLOBAL_STUBS }
                })

                const inner = wrapper.findComponent(OrigamChartStub)
                expect(inner.props('type')).toBe(type)
            })

            it('forwards base props (series + height + categories + title)', () => {
                const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May']
                const wrapper = mount(Component as never, {
                    props: {
                        series: BASE_SERIES,
                        categories,
                        height: 240,
                        title: `${type} chart`,
                        ...extras
                    },
                    global: { stubs: GLOBAL_STUBS }
                })

                const inner = wrapper.findComponent(OrigamChartStub)
                expect(inner.props('series')).toEqual(BASE_SERIES)
                expect(inner.props('height')).toBe(240)
                expect(inner.props('categories')).toEqual(categories)
                expect(inner.props('title')).toBe(`${type} chart`)
            })

            it('forwards type-specific extras', () => {
                const wrapper = mount(Component as never, {
                    props: { series: BASE_SERIES, ...extras },
                    global: { stubs: GLOBAL_STUBS }
                })

                const inner = wrapper.findComponent(OrigamChartStub)
                Object.entries(extras).forEach(([key, value]) => {
                    expect(inner.props(key as never)).toEqual(value)
                })
            })

            it('forwards the `legendPosition` prop', () => {
                const wrapper = mount(Component as never, {
                    props: { series: BASE_SERIES, legendPosition: 'right', ...extras },
                    global: { stubs: GLOBAL_STUBS }
                })

                const inner = wrapper.findComponent(OrigamChartStub)
                expect(inner.props('legendPosition')).toBe('right')
            })

            it('forwards emits — point-click', () => {
                const wrapper = mount(Component as never, {
                    props: { series: BASE_SERIES, ...extras },
                    global: { stubs: GLOBAL_STUBS }
                })

                const inner = wrapper.findComponent(OrigamChartStub)
                inner.vm.$emit('point-click', { value: 42 }, new MouseEvent('click'))

                expect(wrapper.emitted('point-click')).toBeTruthy()
                expect(wrapper.emitted('point-click')![0][0]).toEqual({ value: 42 })
            })

            it('forwards emits — legend-click + series-toggle', () => {
                const wrapper = mount(Component as never, {
                    props: { series: BASE_SERIES, ...extras },
                    global: { stubs: GLOBAL_STUBS }
                })

                const inner = wrapper.findComponent(OrigamChartStub)
                inner.vm.$emit('legend-click', BASE_SERIES[0], 0)
                inner.vm.$emit('series-toggle', BASE_SERIES[0], false)

                expect(wrapper.emitted('legend-click')).toBeTruthy()
                expect(wrapper.emitted('legend-click')![0]).toEqual([BASE_SERIES[0], 0])

                expect(wrapper.emitted('series-toggle')).toBeTruthy()
                expect(wrapper.emitted('series-toggle')![0]).toEqual([BASE_SERIES[0], false])
            })

            it('forwards the #title slot to the inner component', () => {
                const wrapper = mount(Component as never, {
                    props: { series: BASE_SERIES, ...extras },
                    slots: {
                        title: '<div data-test="custom-title">Custom Title</div>'
                    },
                    global: { stubs: GLOBAL_STUBS }
                })

                expect(wrapper.html()).toContain('Custom Title')
                expect(wrapper.find('[data-test="custom-title"]').exists()).toBe(true)
            })

            it('does NOT include `type` in its own declared prop surface', () => {
                // The wrapper should expose IChart{Type}Props which extends
                // IChartBaseProps — and IChartBaseProps deliberately omits
                // `type` (it's hard-coded by the wrapper). Verify by
                // checking the component's options.
                const Comp = Component as { props?: Record<string, unknown> }
                if (Comp.props) {
                    expect(Comp.props).not.toHaveProperty('type')
                }
            })
        })
    })
})
