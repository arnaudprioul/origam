import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LIST_SUBHEADER_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-list-subheader',
    name: 'IListSubheader',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_list_subheader.description',
    descriptionFallback: 'Props for <OrigamListSubheader> — a non-interactive section header rendered inside a list. Supports inset alignment, sticky positioning, an optional title, and the full color, spacing, border, and rounded surface.',
    definition: `export interface IListSubheader extends ICommonsComponentProps, ITagProps, IColorProps, IBgColorProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps {
    inset?: boolean,
    sticky?: boolean,
    title?: string,
}`,
    extends: ['ICommonsComponentProps', 'ITagProps', 'IColorProps', 'IBgColorProps', 'IPaddingProps', 'IMarginProps', 'IBorderProps', 'IRoundedProps'],
    props: [
        {
            name: 'inset',
            type: 'boolean',
            optional: true,
            descriptionFallback: 'Indents the subheader to align with inset list items (items that have a prepend icon or avatar).',
        },
        {
            name: 'sticky',
            type: 'boolean',
            optional: true,
            descriptionFallback: 'Makes the subheader sticky so it stays visible while scrolling through its section.',
        },
        {
            name: 'title',
            type: 'string',
            optional: true,
            descriptionFallback: 'Text label rendered as the subheader. Overridden by the default slot.',
        },
    ],
    usedBy: [
        { slug: 'list-subheader', name: 'ListSubheader', kind: 'component' },
        { slug: 'list', name: 'List', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/List/list-subheader.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_list_subheader.example',
            titleFallback: 'Sticky inset subheader',
            code: `<OrigamList>
    <OrigamListSubheader title="Recent" sticky inset />
    <OrigamListItem title="File.txt" />
    <OrigamListSubheader title="Pinned" sticky inset />
    <OrigamListItem title="Report.pdf" />
</OrigamList>`,
            lang: 'vue',
        },
    ],
}
