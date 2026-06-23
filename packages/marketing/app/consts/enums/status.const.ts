import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const STATUS_ENUM_DOC: IEnumDoc = {
    slug: 'status',
    name: 'STATUS',
    category: 'Feedback & Status',
    descriptionKey: 'enums.catalog.status.description',
    descriptionFallback: 'TypeScript enum for semantic feedback status — success, info, warning, error.',
    definition: `export enum STATUS {
    SUCCESS = 'success',
    INFO    = 'info',
    WARNING = 'warning',
    ERROR   = 'error',
}`,
    values: [
        { value: 'STATUS.SUCCESS', descriptionKey: 'enums.detail.status.success', descriptionFallback: 'Positive outcome — maps to the success intent colour.' },
        { value: 'STATUS.INFO', descriptionKey: 'enums.detail.status.info', descriptionFallback: 'Neutral informational message — maps to the info intent colour.' },
        { value: 'STATUS.WARNING', descriptionKey: 'enums.detail.status.warning', descriptionFallback: 'Caution state — maps to the warning intent colour.' },
        { value: 'STATUS.ERROR', descriptionKey: 'enums.detail.status.error', descriptionFallback: 'Failure or danger state — maps to the danger intent colour.' },
    ],
    usedBy: [
        { slug: 'alert', name: 'Alert', propName: 'status' },
        { slug: 'snackbar', name: 'Snackbar', propName: 'status' },
        { slug: 'btn', name: 'Btn', propName: 'status' },
        { slug: 'badge', name: 'Badge', propName: 'status' },
        { slug: 'dialog', name: 'Dialog', propName: 'status' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/status.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.status.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { STATUS } from 'origam'

const myStatus: STATUS = STATUS.SUCCESS`,
            lang: 'typescript',
        },
    ],
}
