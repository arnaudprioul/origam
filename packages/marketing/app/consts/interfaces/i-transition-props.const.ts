import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TRANSITION_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-transition-props',
    name: 'ITransitionProps',
    category: 'Animation & Transition',
    descriptionKey: 'interfaces.catalog.i_transition_props.description',
    descriptionFallback: 'Core transition configuration shared by all origam transition wrappers. Controls the Vue transition name, mode, group mode, leave behavior, and origin for transform-based animations.',
    definition: `export interface ITransitionProps {
    mode?: TTransitionMode
    disabled?: boolean
    name?: string
    group?: boolean
    hideOnLeave?: boolean
    leaveAbsolute?: boolean
    origin?: string
}`,
    extends: [],
    props: [
        { name: 'mode', type: 'TTransitionMode', optional: true, descriptionFallback: 'Vue transition mode: in-out, out-in, or default (simultaneous).' },
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Skip the transition entirely — content appears/disappears instantly.' },
        { name: 'name', type: 'string', optional: true, descriptionFallback: 'CSS class prefix for the transition (e.g. origam-fade applies .origam-fade-enter-active etc.).' },
        { name: 'group', type: 'boolean', optional: true, descriptionFallback: 'Render a <transition-group> instead of <transition> for list animations.' },
        { name: 'hideOnLeave', type: 'boolean', optional: true, descriptionFallback: 'Set visibility: hidden during the leave phase to avoid flash artifacts on overflow: hidden parents.' },
        { name: 'leaveAbsolute', type: 'boolean', optional: true, descriptionFallback: 'Position the leaving element absolutely so entering content can take its place immediately.' },
        { name: 'origin', type: 'string', optional: true, descriptionFallback: 'CSS transform-origin override for scale-based transitions (e.g. top center).' },
    ],
    usedBy: [
        { slug: 'use-transition', name: 'useTransition', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Transition/transition.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_transition_props.example',
            titleFallback: 'Scale transition with top-center origin',
            code: `import type { ITransitionProps } from 'origam'

const transition: ITransitionProps = {
    name: 'origam-scale',
    origin: 'top center',
    mode: 'out-in',
}`,
            lang: 'typescript',
        },
    ],
}
