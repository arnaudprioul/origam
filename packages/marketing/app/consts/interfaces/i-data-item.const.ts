import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATA_ITEM_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-data-item',
    name: 'IDataItem',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_data_item.description',
    descriptionFallback: 'Shape of a single item when <OrigamDataList> runs in its default "avatar" mode — a title descriptor (IDataTitleProps) and an array or keyed map of text rows (IDataTextProps), both optional, plus all IAdjacentProps for prepend/append slots.',
    definition: `export interface IDataItem extends IAdjacentProps {
    title?: IDataTitleProps
    text?: Array<IDataTextProps> | { [key: string]: IDataTextProps }
}`,
    extends: ['IAdjacentProps'],
    props: [
        { name: 'title', type: 'IDataTitleProps', optional: true, descriptionFallback: 'Title descriptor rendered as a <dt> cell above the text rows.' },
        { name: 'text', type: 'Array<IDataTextProps> | { [key: string]: IDataTextProps }', optional: true, descriptionFallback: 'One or more text row descriptors rendered as <dd> cells below the title.' },
    ],
    usedBy: [
        { slug: 'data-list', name: 'DataList', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/DataList/data-list.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_data_item.example',
            titleFallback: 'Passing items in avatar mode',
            code: `<OrigamDataList :items="[
    { title: { text: 'User' }, text: [{ text: 'alice@example.com' }] }
]" />`,
            lang: 'vue',
        },
    ],
}
