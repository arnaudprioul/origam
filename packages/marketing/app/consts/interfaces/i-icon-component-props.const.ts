import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_ICON_COMPONENT_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-icon-component-props',
    name: 'IIconComponentProps',
    category: 'Icons',
    descriptionKey: 'interfaces.catalog.i_icon_component_props.description',
    descriptionFallback: 'Full props surface for OrigamIcon — extends the base IIconProps with color, background color, size, padding, margin, border, dimension, rounded, and a disabled flag.',
    definition: `export interface IIconComponentProps extends IIconProps, IColorProps, IBgColorProps, ICommonsComponentProps, ITagProps, ISizeProps, IPaddingProps, IMarginProps, IBorderProps, IDimensionProps, IRoundedProps {
    disabled?: boolean
}`,
    extends: [
        'IIconProps',
        'IColorProps',
        'IBgColorProps',
        'ICommonsComponentProps',
        'ITagProps',
        'ISizeProps',
        'IPaddingProps',
        'IMarginProps',
        'IBorderProps',
        'IDimensionProps',
        'IRoundedProps',
    ],
    props: [
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Renders the icon in a visually disabled state.' },
    ],
    usedBy: [
        { slug: 'icon', name: 'Icon', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Icon/icon.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_icon_component_props.example',
            titleFallback: 'Icon with size, color and padding',
            code: `<OrigamIcon
    icon="mdi-star"
    color="primary"
    size="lg"
    :padding="2"
/>`,
            lang: 'vue',
        },
    ],
}
