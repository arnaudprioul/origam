import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_ACTIVATOR_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-activator-props',
    name: 'IActivatorProps',
    category: 'State & Interaction',
    descriptionKey: 'interfaces.catalog.i_activator_props.description',
    descriptionFallback: 'Contract for components that open/close a floating surface via an activator element — includes pointer, hover, focus and context-menu triggers plus open/close delays.',
    definition: `export interface IActivatorProps extends IDelayProps {
    target?: 'parent' | 'cursor' | (string & {}) | Element | ComponentPublicInstance | [x: number, y: number] | undefined
    activator?: 'parent' | 'cursor' | (string & {}) | Element | ComponentPublicInstance
    activatorProps?: any
    openOnClick?: boolean
    openOnContextMenu?: boolean
    openOnHover?: boolean
    openOnFocus?: boolean
    closeOnContentClick?: boolean
}`,
    extends: ['IDelayProps'],
    props: [
        { name: 'target', type: "'parent' | 'cursor' | (string & {}) | Element | ComponentPublicInstance | [x: number, y: number] | undefined", optional: true, descriptionFallback: 'Override the anchor target for positioning the floating surface.' },
        { name: 'activator', type: "'parent' | 'cursor' | (string & {}) | Element | ComponentPublicInstance", optional: true, descriptionFallback: 'Element (or CSS selector) that acts as the activator for the floating surface.' },
        { name: 'activatorProps', type: 'any', optional: true, descriptionFallback: 'Extra props spread onto the activator element (e.g. aria attributes).' },
        { name: 'openOnClick', type: 'boolean', optional: true, descriptionFallback: 'Open the surface when the activator is clicked.' },
        { name: 'openOnContextMenu', type: 'boolean', optional: true, descriptionFallback: 'Open the surface on right-click / context-menu.' },
        { name: 'openOnHover', type: 'boolean', optional: true, descriptionFallback: 'Open the surface when the pointer enters the activator.' },
        { name: 'openOnFocus', type: 'boolean', optional: true, descriptionFallback: 'Open the surface when the activator gains keyboard focus.' },
        { name: 'closeOnContentClick', type: 'boolean', optional: true, descriptionFallback: 'Automatically close the surface when the user clicks anywhere inside its content.' },
    ],
    usedBy: [
        { slug: 'use-activator', name: 'useActivator', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/activator.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_activator_props.example',
            titleFallback: 'Extending the interface on a floating component',
            code: `import type { IActivatorProps } from 'origam'

interface IMenuProps extends IActivatorProps {
    modelValue?: boolean
}`,
            lang: 'typescript',
        },
    ],
}
