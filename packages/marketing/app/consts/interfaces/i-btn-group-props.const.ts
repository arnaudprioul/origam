import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_BTN_GROUP_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-btn-group-props',
    name: 'IBtnGroupProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_btn_group_props.description',
    descriptionFallback: 'Props for <OrigamBtnGroup> — a container that groups related buttons with a shared visual surface (border, elevation, density, color, bgColor, rounded, margin, padding). Supports a divided mode that draws separators between children.',
    definition: `export interface IBtnGroupProps extends ITagProps, ICommonsComponentProps, IRoundedProps, IBorderProps, IDensityProps, IElevationProps, IColorProps, IBgColorProps, IMarginProps, IPaddingProps, IHoverProps, IActiveProps {
    divided?: boolean
    items?: Array<IBtnProps>
}`,
    extends: [
        'ITagProps',
        'ICommonsComponentProps',
        'IRoundedProps',
        'IBorderProps',
        'IDensityProps',
        'IElevationProps',
        'IColorProps',
        'IBgColorProps',
        'IMarginProps',
        'IPaddingProps',
        'IHoverProps',
        'IActiveProps',
    ],
    props: [
        { name: 'divided', type: 'boolean', optional: true, descriptionFallback: 'Draws visual separators between children buttons.' },
        { name: 'items', type: 'Array<IBtnProps>', optional: true, descriptionFallback: 'Declarative button list — renders buttons without explicit slot children.' },
    ],
    usedBy: [
        { slug: 'btn-group', name: 'BtnGroup', kind: 'component' },
        { slug: 'btn-toggle', name: 'BtnToggle', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Btn/btn-group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_btn_group_props.example',
            titleFallback: 'Divided button group',
            code: `<OrigamBtnGroup
  :items="[
    { text: 'Bold', icon: 'mdi-format-bold' },
    { text: 'Italic', icon: 'mdi-format-italic' },
  ]"
  divided
  color="primary"
  rounded="md"
/>`,
            lang: 'html',
        },
    ],
}
