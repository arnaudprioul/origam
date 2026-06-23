import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const DEFAULT_ACTION_HEADER_CONST_DOC: IConstDoc = {
    slug: 'default-action-header',
    name: 'DEFAULT_ACTION_HEADER',
    category: 'Components',
    descriptionKey: 'consts.catalog.default_action_header.description',
    descriptionFallback: 'Default column descriptor for action columns in OrigamDataTable. Extends DEFAULT_HEADER with a fixed width of 48px — sized to fit a single icon button without occupying data space.',
    definition: `export const DEFAULT_ACTION_HEADER = { ...DEFAULT_HEADER, width: 48 }
// where DEFAULT_HEADER = { title: '', sortable: false }`,
    values: [
        { value: "title: ''", descriptionKey: 'consts.detail.default_action_header.title', descriptionFallback: 'Empty column header label — action columns are self-describing via their icons.' },
        { value: 'sortable: false', descriptionKey: 'consts.detail.default_action_header.sortable', descriptionFallback: 'Action columns are never sortable.' },
        { value: 'width: 48', descriptionKey: 'consts.detail.default_action_header.width', descriptionFallback: 'Fixed 48px width — matches a single Material icon button touch target.' },
    ],
    usedBy: [
        { name: 'OrigamDataTable', slug: 'data-table' },
    ],
    sourceFile: 'packages/ds/src/consts/DataTable/headers.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.default_action_header.example',
            titleFallback: 'Adding an action column to a data table',
            code: `import { DEFAULT_ACTION_HEADER } from 'origam'

const headers = [
  { title: 'Name', key: 'name' },
  { ...DEFAULT_ACTION_HEADER, key: 'actions' }
]`,
            lang: 'typescript',
        },
    ],
}
