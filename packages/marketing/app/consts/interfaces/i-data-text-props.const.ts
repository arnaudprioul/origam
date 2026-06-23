import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TEXT_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-text-props',
    name: 'IDataTextProps',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_data_text_props.description',
    descriptionFallback: 'Props for a data-list text cell — combines layout (adjacent, density, margin, padding) with color surfaces to render a labelled text value inside a data list.',
    definition: `export interface IDataTextProps extends ICommonsComponentProps, IAdjacentProps, IDensityProps, IMarginProps, IPaddingProps, IColorProps, IBgColorProps {
    text: string | number
}`,
    extends: ['ICommonsComponentProps', 'IAdjacentProps', 'IDensityProps', 'IMarginProps', 'IPaddingProps', 'IColorProps', 'IBgColorProps'],
    props: [
        { name: 'text', type: 'string | number', optional: false, descriptionFallback: 'The text value to display inside the data cell.' },
    ],
    usedBy: [
        { slug: 'data-text', name: 'OrigamDataText', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataList/data-text.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_text_props.example',
            titleFallback: 'Typing props for a custom data-text wrapper',
            code: `import type { IDataTextProps } from 'origam'

interface IMyDataCellProps extends IDataTextProps {
    highlighted?: boolean
}`,
            lang: 'typescript',
        },
    ],
}
