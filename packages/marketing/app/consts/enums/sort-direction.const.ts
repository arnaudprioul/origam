import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const SORT_DIRECTION_ENUM_DOC: IEnumDoc = {
    slug: 'sort-direction',
    name: 'SORT_DIRECTION',
    category: 'Data Display',
    descriptionKey: 'enums.catalog.sort_direction.description',
    descriptionFallback: 'TypeScript enum for column sort order — ascending or descending.',
    definition: `export enum SORT_DIRECTION {
    ASC  = 'asc',
    DESC = 'desc'
}`,
    values: [
        { value: 'SORT_DIRECTION.ASC', descriptionKey: 'enums.detail.sort_direction.asc', descriptionFallback: 'Ascending order — smallest/earliest/alphabetically first values appear at the top.' },
        { value: 'SORT_DIRECTION.DESC', descriptionKey: 'enums.detail.sort_direction.desc', descriptionFallback: 'Descending order — largest/latest/alphabetically last values appear at the top.' },
    ],
    usedBy: [
        { slug: 'data-table', name: 'DataTable', propName: 'sortBy[].order' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/sort.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.sort_direction.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { SORT_DIRECTION } from 'origam'

const dir: SORT_DIRECTION = SORT_DIRECTION.ASC`,
            lang: 'typescript',
        },
    ],
}
