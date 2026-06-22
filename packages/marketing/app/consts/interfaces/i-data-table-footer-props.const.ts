import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_TABLE_FOOTER_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-table-footer-props',
    name: 'IDataTableFooterProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_data_table_footer_props.description',
    descriptionFallback: 'Full props contract for <OrigamDataTableFooter> — pagination icons, per-page options, accessible page labels, and the full color/padding/alignment design surface.',
    definition: `export interface IDataTableFooterProps extends ICommonsComponentProps, IColorProps, IPaddingProps, IAlignProps {
    prevIcon?: TIcon
    nextIcon?: TIcon
    firstIcon?: TIcon
    lastIcon?: TIcon
    itemsPerPageText?: string
    pageText?: string
    firstPageLabel?: string
    prevPageLabel?: string
    nextPageLabel?: string
    lastPageLabel?: string
    itemsPerPageOptions?: Array<number | { title: string, value: number }>
    showCurrentPage?: boolean
}`,
    extends: ['ICommonsComponentProps', 'IColorProps', 'IPaddingProps', 'IAlignProps'],
    props: [
        { name: 'prevIcon', type: 'TIcon', optional: true, descriptionFallback: 'Icon for the previous-page button.' },
        { name: 'nextIcon', type: 'TIcon', optional: true, descriptionFallback: 'Icon for the next-page button.' },
        { name: 'firstIcon', type: 'TIcon', optional: true, descriptionFallback: 'Icon for the first-page button.' },
        { name: 'lastIcon', type: 'TIcon', optional: true, descriptionFallback: 'Icon for the last-page button.' },
        { name: 'itemsPerPageText', type: 'string', optional: true, descriptionFallback: 'Label rendered before the items-per-page selector.' },
        { name: 'pageText', type: 'string', optional: true, descriptionFallback: 'Label template for the current page range (e.g. "1-10 of 42").' },
        { name: 'firstPageLabel', type: 'string', optional: true, descriptionFallback: 'Accessible label for the first-page button.' },
        { name: 'prevPageLabel', type: 'string', optional: true, descriptionFallback: 'Accessible label for the previous-page button.' },
        { name: 'nextPageLabel', type: 'string', optional: true, descriptionFallback: 'Accessible label for the next-page button.' },
        { name: 'lastPageLabel', type: 'string', optional: true, descriptionFallback: 'Accessible label for the last-page button.' },
        { name: 'itemsPerPageOptions', type: 'Array<number | { title: string, value: number }>', optional: true, descriptionFallback: 'Options for the items-per-page selector. Can be plain numbers or objects with a display title.' },
        { name: 'showCurrentPage', type: 'boolean', optional: true, descriptionFallback: 'Display the current page number in the footer.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataTable/footer.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_table_footer_props.example',
            titleFallback: 'Custom items-per-page options with labels',
            code: `<OrigamDataTableFooter
    :itemsPerPageOptions="[10, 25, { title: 'All', value: -1 }]"
    itemsPerPageText="Rows per page:"
    show-current-page
/>`,
            lang: 'vue',
        },
    ],
}
