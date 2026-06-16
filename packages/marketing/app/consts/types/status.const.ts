import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const STATUS_TYPE_DOC: ITypeDoc = {
    slug: 'status',
    name: 'TStatus',
    kind: 'type',
    category: 'Interaction & State',
    descriptionKey: 'types.catalog.status.description',
    descriptionFallback: 'Feedback status values: success, info, warning, error.',
    definition: `export type TStatus = \`\${STATUS}\`

// Where STATUS is:
export enum STATUS {
    SUCCESS = 'success',
    INFO    = 'info',
    WARNING = 'warning',
    ERROR   = 'error'
}`,
    values: [
        { value: 'success', descriptionKey: 'types.detail.status.success', descriptionFallback: 'Positive confirmation — maps to the success semantic token ramp.' },
        { value: 'info', descriptionKey: 'types.detail.status.info', descriptionFallback: 'Informational message — maps to the info semantic token ramp.' },
        { value: 'warning', descriptionKey: 'types.detail.status.warning', descriptionFallback: 'Caution message — maps to the warning semantic token ramp.' },
        { value: 'error', descriptionKey: 'types.detail.status.error', descriptionFallback: 'Error / failure state — maps to the error / danger token ramp.' },
    ],
    usedBy: [
        { slug: 'alert', name: 'Alert', propName: 'status' },
        { slug: 'text-field', name: 'TextField', propName: 'status' },
        { slug: 'snackbar', name: 'Snackbar', propName: 'status' },
    ],
    sourceFile: 'packages/ds/src/types/Commons/status.type.ts',
    examples: [
        {
            titleKey: 'types.detail.status.example',
            titleFallback: 'Alert status variants',
            code: `<origam-alert status="success">Saved successfully.</origam-alert>
<origam-alert status="info">New version available.</origam-alert>
<origam-alert status="warning">Check your input.</origam-alert>
<origam-alert status="error">Something went wrong.</origam-alert>`,
            lang: 'html',
        },
    ],
}
