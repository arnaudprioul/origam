import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_ACTIVE_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-active-props',
    name: 'IActiveProps',
    category: 'State & Interaction',
    descriptionKey: 'interfaces.catalog.i_active_props.description',
    descriptionFallback: 'Controls the active/selected state of a component — accepts a boolean to force the state on, or an IActiveState object to override visual props (color, bgColor, border…) only while the state is engaged.',
    definition: `export interface IActiveProps {
    active?: boolean | IActiveState
    activeClass?: string
}`,
    extends: [],
    props: [
        { name: 'active', type: 'boolean | IActiveState', optional: true, descriptionFallback: 'When true forces the component into its active state. When an IActiveState object, applies prop overrides (color, bgColor, border, rounded, elevation, padding, margin, gap) only while active.' },
        { name: 'activeClass', type: 'string', optional: true, descriptionFallback: 'Additional CSS class applied to the root element while the component is active.' },
    ],
    usedBy: [
        { slug: 'use-active', name: 'useActive', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/active.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_active_props.example',
            titleFallback: 'Using active with an object override',
            code: `<OrigamBtn :active="{ bgColor: 'primary', color: 'white' }">
    Active Button
</OrigamBtn>`,
            lang: 'vue',
        },
    ],
}
