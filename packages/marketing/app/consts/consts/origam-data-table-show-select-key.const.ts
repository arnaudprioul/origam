import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_DATA_TABLE_SHOW_SELECT_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-data-table-show-select-key',
    name: 'ORIGAM_DATA_TABLE_SHOW_SELECT_KEY',
    category: 'Injection Keys',
    descriptionKey: 'consts.catalog.origam_data_table_show_select_key.description',
    descriptionFallback: 'Vue provide/inject symbol that carries a reactive boolean ref indicating whether the selection checkbox column is currently visible in the data table.',
    definition: `export const ORIGAM_DATA_TABLE_SHOW_SELECT_KEY: InjectionKey<Ref<boolean>> = Symbol.for('origam:data-table-show-select')`,
    value: "Symbol.for('origam:data-table-show-select')",
    usedBy: [
        { name: 'OrigamDataTable', slug: 'data-table' },
        { name: 'OrigamDataTableHeaders', slug: 'data-table' },
        { name: 'OrigamDataTableRow', slug: 'data-table-row' },
    ],
    sourceFile: 'packages/ds/src/consts/DataTable/select.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_data_table_show_select_key.example',
            titleFallback: 'Reading the show-select flag inside a custom header slot',
            code: `import { inject } from 'vue'
import { ORIGAM_DATA_TABLE_SHOW_SELECT_KEY } from 'origam'

const showSelect = inject(ORIGAM_DATA_TABLE_SHOW_SELECT_KEY)
// showSelect?.value  → true | false`,
            lang: 'typescript',
        },
    ],
}
