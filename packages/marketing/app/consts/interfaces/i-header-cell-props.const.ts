import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_HEADER_CELL_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-header-cell-props',
    name: 'IHeaderCellProps',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_header_cell_props.description',
    descriptionFallback: 'Shared props for DataTable header cells — controls sort behavior, sticky positioning, and sort direction icons.',
    definition: `export interface IHeaderCellProps extends ICommonsComponentProps, IColorProps {
    disableSort?: boolean
    headerProps?: any
    sticky?: boolean
    multiSort?: boolean
    sortAscIcon?: TIcon
    sortDescIcon?: TIcon
}`,
    extends: ['ICommonsComponentProps', 'IColorProps'],
    props: [
        { name: 'disableSort', type: 'boolean', optional: true, descriptionFallback: 'Disable sorting for this column.' },
        { name: 'headerProps', type: 'any', optional: true, descriptionFallback: 'Extra props forwarded to the header cell element.' },
        { name: 'sticky', type: 'boolean', optional: true, descriptionFallback: 'Make this column header sticky (position: sticky).' },
        { name: 'multiSort', type: 'boolean', optional: true, descriptionFallback: 'Enable multi-column sort on this header.' },
        { name: 'sortAscIcon', type: 'TIcon', optional: true, descriptionFallback: 'Icon rendered when the column is sorted ascending.' },
        { name: 'sortDescIcon', type: 'TIcon', optional: true, descriptionFallback: 'Icon rendered when the column is sorted descending.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/headers.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_header_cell_props.example',
            titleFallback: 'Custom sort icons on a DataTable header',
            code: `<OrigamDataTable
    sort-asc-icon="mdi-arrow-up"
    sort-desc-icon="mdi-arrow-down"
    :headers="headers"
    :items="rows"
/>`,
            lang: 'vue',
        },
    ],
}
