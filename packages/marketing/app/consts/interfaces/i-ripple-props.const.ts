import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_RIPPLE_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-ripple-props',
    name: 'IRippleProps',
    category: 'Behaviour',
    descriptionKey: 'interfaces.catalog.i_ripple_props.description',
    descriptionFallback: 'Component prop surface for the ripple effect. Extended by interactive components (Btn, Chip, Card, ListItem…) to opt in to the v-ripple ink-wave animation on pointer interaction.',
    definition: `export interface IRippleProps {
    ripple?: boolean | { class: string }
}`,
    extends: [],
    props: [
        { name: 'ripple', type: 'boolean | { class: string }', optional: true, descriptionFallback: 'Enable the ripple ink-wave. Pass true/false to toggle, or an object with a class key to attach a custom CSS class to the wave element.' },
    ],
    usedBy: [
        { slug: 'btn', name: 'Btn', kind: 'component' },
        { slug: 'chip', name: 'Chip', kind: 'component' },
        { slug: 'card', name: 'Card', kind: 'component' },
        { slug: 'list-item', name: 'ListItem', kind: 'component' },
        { slug: 'expansion-panel-header', name: 'ExpansionPanelHeader', kind: 'component' },
        { slug: 'use-ripple', name: 'useRipple', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/ripple.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_ripple_props.example',
            titleFallback: 'Extending IRippleProps on a custom component',
            code: `import type { IRippleProps } from 'origam'

interface IMyButtonProps extends IRippleProps {
    label: string
}`,
            lang: 'typescript',
        },
    ],
}
