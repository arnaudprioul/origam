import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_GO_TO_OPTIONS_PATTERNS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-go-to-options-patterns',
    name: 'IGoToOptionsPatterns',
    category: 'Navigation & Scroll',
    descriptionKey: 'interfaces.catalog.i_go_to_options_patterns.description',
    descriptionFallback: 'Named easing function registry for the useGoTo() service — an open record where each key is an easing name and the value is a timing function mapping progress t ∈ [0,1] to an output value.',
    definition: `export interface IGoToOptionsPatterns {
    [key: string]: (t: number) => number
}`,
    extends: [],
    props: [
        {
            name: '[key: string]',
            type: '(t: number) => number',
            optional: false,
            descriptionFallback: 'A named easing function. `t` is the normalised progress (0 = start, 1 = end); the return value is the interpolated position coefficient.',
        },
    ],
    usedBy: [
        { slug: 'use-go-to', name: 'useGoTo', kind: 'composable' },
        { slug: 'i-go-to-options', name: 'IGoToOptions', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/goTo.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_go_to_options_patterns.example',
            titleFallback: 'Registering a custom easing pattern',
            code: `import type { IGoToOptionsPatterns } from 'origam'

const patterns: IGoToOptionsPatterns = {
    easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    linear: (t) => t,
}`,
            lang: 'typescript',
        },
    ],
}
