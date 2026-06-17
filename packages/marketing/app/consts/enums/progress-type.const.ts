import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const PROGRESS_TYPE_ENUM_DOC: IEnumDoc = {
    slug: 'progress-type',
    name: 'PROGRESS_TYPE',
    category: 'Feedback & Status',
    descriptionKey: 'enums.catalog.progress_type.description',
    descriptionFallback: 'TypeScript enum for Progress indicator display type — circular or linear.',
    definition: `export enum PROGRESS_TYPE {
    CIRCULAR = 'circular',
    LINEAR   = 'linear'
}`,
    values: [
        { value: 'PROGRESS_TYPE.CIRCULAR', descriptionKey: 'enums.detail.progress_type.circular', descriptionFallback: 'Renders a spinning ring (spinner) for indeterminate or percentage progress.' },
        { value: 'PROGRESS_TYPE.LINEAR', descriptionKey: 'enums.detail.progress_type.linear', descriptionFallback: 'Renders a horizontal bar filling left-to-right for percentage progress.' },
    ],
    usedBy: [
        { slug: 'progress', name: 'Progress', propName: 'type' },
        { slug: 'btn', name: 'Btn', propName: 'loadingType' },
    ],
    sourceFile: 'packages/ds/src/enums/Progress/progress.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.progress_type.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { PROGRESS_TYPE } from 'origam'

const progressType: PROGRESS_TYPE = PROGRESS_TYPE.CIRCULAR`,
            lang: 'typescript',
        },
    ],
}
