import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_GO_TO_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-go-to-options',
    name: 'IGoToOptions',
    category: 'Navigation & Scroll',
    descriptionKey: 'interfaces.catalog.i_go_to_options.description',
    descriptionFallback: 'Configuration object for the useGoTo() smooth-scroll service — controls container, duration, offset, easing and named easing patterns.',
    definition: `export interface IGoToOptions {
    container: ComponentPublicInstance | HTMLElement | string
    duration: number
    layout: boolean
    offset: number
    easing: string | ((t: number) => number)
    patterns: IGoToOptionsPatterns
}`,
    extends: [],
    props: [
        {
            name: 'container',
            type: 'ComponentPublicInstance | HTMLElement | string',
            optional: false,
            descriptionFallback: 'Scrollable container — a Vue component instance, a DOM element, or a CSS selector string. Defaults to window.',
        },
        {
            name: 'duration',
            type: 'number',
            optional: false,
            descriptionFallback: 'Scroll animation duration in milliseconds.',
        },
        {
            name: 'layout',
            type: 'boolean',
            optional: false,
            descriptionFallback: 'When true, the scroll target offset accounts for layout-registered sticky elements (appbar, footer).',
        },
        {
            name: 'offset',
            type: 'number',
            optional: false,
            descriptionFallback: 'Additional pixel offset applied on top of the target element position.',
        },
        {
            name: 'easing',
            type: 'string | ((t: number) => number)',
            optional: false,
            descriptionFallback: 'Easing function — a named key from `patterns` or an inline timing function that maps progress t ∈ [0,1] to an output value.',
        },
        {
            name: 'patterns',
            type: 'IGoToOptionsPatterns',
            optional: false,
            descriptionFallback: 'Named easing function registry — a record of name → timing function used to resolve the `easing` string.',
        },
    ],
    usedBy: [
        { slug: 'use-go-to', name: 'useGoTo', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/goTo.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_go_to_options.example',
            titleFallback: 'Smooth-scrolling to a target with custom options',
            code: `import { useGoTo } from 'origam'

const goTo = useGoTo()

goTo('#section-features', {
    duration: 600,
    offset: 64,
    easing: 'easeInOutCubic',
})`,
            lang: 'typescript',
        },
    ],
}
