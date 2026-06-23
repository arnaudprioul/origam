import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const STATUS_POSITION_ENUM_DOC: IEnumDoc = {
    slug: 'status-position',
    name: 'STATUS_POSITION',
    category: 'Feedback & Status',
    descriptionKey: 'enums.catalog.status_position.description',
    descriptionFallback: 'TypeScript enum for the icon placement of a STATUS indicator relative to the content.',
    definition: `export enum STATUS_POSITION {
    PREPEND = 'prepend',
    APPEND  = 'append',
    REPLACE = 'replace',
    BOTH    = 'both',
}`,
    values: [
        { value: 'STATUS_POSITION.PREPEND', descriptionKey: 'enums.detail.status_position.prepend', descriptionFallback: 'Status icon placed before the content (default).' },
        { value: 'STATUS_POSITION.APPEND', descriptionKey: 'enums.detail.status_position.append', descriptionFallback: 'Status icon placed after the content.' },
        { value: 'STATUS_POSITION.REPLACE', descriptionKey: 'enums.detail.status_position.replace', descriptionFallback: 'Status icon replaces the main slot icon entirely.' },
        { value: 'STATUS_POSITION.BOTH', descriptionKey: 'enums.detail.status_position.both', descriptionFallback: 'Status icon appears both before and after the content.' },
    ],
    usedBy: [
        { slug: 'alert', name: 'Alert', propName: 'statusIconPosition' },
        { slug: 'snackbar', name: 'Snackbar', propName: 'statusIconPosition' },
        { slug: 'btn', name: 'Btn', propName: 'statusIconPosition' },
        { slug: 'badge', name: 'Badge', propName: 'statusIconPosition' },
        { slug: 'dialog', name: 'Dialog', propName: 'statusIconPosition' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/status.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.status_position.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { STATUS, STATUS_POSITION } from 'origam'

const status: STATUS = STATUS.WARNING
const position: STATUS_POSITION = STATUS_POSITION.APPEND`,
            lang: 'typescript',
        },
    ],
}
