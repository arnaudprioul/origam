import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TITLE_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-title-props',
    name: 'IDataTitleProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_data_title_props.description',
    descriptionFallback: 'Props contract for <OrigamDataTitle> — a labeled data-list heading with full color, density and spacing support. Extends the adjacent-content, density, margin, padding, color and bg-color surfaces.',
    definition: `export interface IDataTitleProps extends ICommonsComponentProps, IAdjacentProps, IDensityProps, IMarginProps, IPaddingProps, IColorProps, IBgColorProps {
    text: string | number
}`,
    extends: [
        'ICommonsComponentProps', 'IAdjacentProps', 'IDensityProps',
        'IMarginProps', 'IPaddingProps', 'IColorProps', 'IBgColorProps',
    ],
    props: [
        { name: 'text', type: 'string | number', optional: false, descriptionFallback: 'The title text or numeric value to display.' },
    ],
    usedBy: [
        { slug: 'data-title', name: 'DataTitle', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataList/data-title.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_title_props.example',
            titleFallback: 'Data title with custom color',
            code: `<OrigamDataTitle
    text="Order details"
    color="primary"
    density="compact"
/>`,
            lang: 'vue',
        },
    ],
}
