import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CONTROL_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-control-props',
    name: 'IControlProps',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_control_props.description',
    descriptionFallback: 'Minimal prop shape for standalone icon-button controls (clear, visibility-toggle, counter actions). Requires an icon, a class string, and an accessible aria-label.',
    definition: `export interface IControlProps {
    icon: TIcon
    class: string
    'aria-label': string
}`,
    extends: [],
    props: [
        { name: 'icon', type: 'TIcon', optional: false, descriptionFallback: 'Icon identifier — MDI name, URL, or component — shown inside the control button.' },
        { name: 'class', type: 'string', optional: false, descriptionFallback: 'CSS class applied to the control root element.' },
        { name: 'aria-label', type: 'string', optional: false, descriptionFallback: 'Accessible label announced by screen readers for icon-only controls.' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Commons/control.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_control_props.example',
            titleFallback: 'Passing IControlProps to a field clear button',
            code: `import type { IControlProps } from 'origam'

const clearControl: IControlProps = {
    icon: 'mdi-close-circle',
    class: 'field__clear',
    'aria-label': 'Clear input',
}`,
            lang: 'typescript',
        },
    ],
}
