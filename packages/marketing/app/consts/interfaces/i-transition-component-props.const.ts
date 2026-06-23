import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TRANSITION_COMPONENT_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-transition-component-props',
    name: 'ITransitionComponentProps',
    category: 'Animation & Transition',
    descriptionKey: 'interfaces.catalog.i_transition_component_props.description',
    descriptionFallback: 'Minimal transition surface mixed into overlay and floating components. Accepts a transition name string, a full TTransitionProps object, or false/true to disable/use the component default.',
    definition: `export interface ITransitionComponentProps {
    transition?: boolean | string | TTransitionProps
    disabled?: boolean
}`,
    extends: [],
    props: [
        { name: 'transition', type: 'boolean | string | TTransitionProps', optional: true, descriptionFallback: 'Transition configuration: a named transition string, a full props object, true to use the component default, or false to disable.' },
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Disable the transition entirely (equivalent to transition=false).' },
    ],
    usedBy: [
        { slug: 'tooltip', name: 'Tooltip', kind: 'component' },
        { slug: 'overlay', name: 'Overlay', kind: 'component' },
        { slug: 'menu', name: 'Menu', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Transition/transition.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_transition_component_props.example',
            titleFallback: 'Disabling transition on a tooltip',
            code: `<OrigamTooltip :transition="false" text="No animation" />`,
            lang: 'vue',
        },
    ],
}
