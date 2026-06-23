import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const DEFAULT_HEADER_CONST_DOC: IConstDoc = {
    slug: 'default-header',
    name: 'DEFAULT_HEADER',
    category: 'Components',
    descriptionKey: 'consts.catalog.default_header.description',
    descriptionFallback: 'Minimal column descriptor used as the base for OrigamDataTable column headers. Sets title to an empty string and sortable to false. Extended by DEFAULT_ACTION_HEADER which adds a fixed width.',
    definition: `export const DEFAULT_HEADER = { title: '', sortable: false }`,
    values: [
        { value: "title: ''", descriptionKey: 'consts.detail.default_header.title', descriptionFallback: 'Empty column header label — override per column.' },
        { value: 'sortable: false', descriptionKey: 'consts.detail.default_header.sortable', descriptionFallback: 'Columns are not sortable by default.' },
    ],
    usedBy: [
        { name: 'OrigamDataTable', slug: 'data-table' },
        { name: 'DEFAULT_ACTION_HEADER' },
    ],
    sourceFile: 'packages/ds/src/consts/DataTable/headers.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.default_header.example',
            titleFallback: 'Creating a sortable header from the default',
            code: `import { DEFAULT_HEADER } from 'origam'

const nameHeader = { ...DEFAULT_HEADER, title: 'Name', key: 'name', sortable: true }`,
            lang: 'typescript',
        },
    ],
}
