import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TRANSITION_WINDOW_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-transition-window-props',
    name: 'ITransitionWindowProps',
    category: 'Animation & Transition',
    descriptionKey: 'interfaces.catalog.i_transition_window_props.description',
    descriptionFallback: 'Transition props extended with an optional window context reference. Used by window/tab/step components so the transition direction can adapt based on the active index provided via IWindowProvide.',
    definition: `export interface ITransitionWindowProps extends ITransitionProps {
    window?: IWindowProvide
}`,
    extends: ['ITransitionProps'],
    props: [
        { name: 'window', type: 'IWindowProvide', optional: true, descriptionFallback: 'Injected window context that carries the current/previous index used to pick the slide direction.' },
    ],
    usedBy: [
        { slug: 'window', name: 'Window', kind: 'component' },
        { slug: 'window-item', name: 'WindowItem', kind: 'component' },
        { slug: 'stepper', name: 'Stepper', kind: 'component' },
        { slug: 'carousel', name: 'Carousel', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Transition/transition.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_transition_window_props.example',
            titleFallback: 'Extending ITransitionWindowProps in a step component',
            code: `import type { ITransitionWindowProps } from 'origam'

interface IMyStepProps extends ITransitionWindowProps {
    value: number
}`,
            lang: 'typescript',
        },
    ],
}
