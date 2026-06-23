import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const DATE_UTIL_DOC: IUtilDoc = {
    slug: 'date',
    name: 'date',
    category: 'Commons',
    icon: 'mdi-calendar',
    descriptionKey: 'utils.catalog.date.description',
    descriptionFallback: 'Converts a loose date value (string, Date, or undefined) to a Date object. Accepts ISO 8601 YYYY-MM-DD strings with local-timezone parsing to avoid UTC shift. Returns null for invalid or unrecognisable values.',
    signature: `function date(value?: any): Date | null`,
    params: [
        {
            name: 'value',
            type: 'any',
            required: false,
            descriptionKey: 'utils.detail.date.param_value',
            descriptionFallback: 'The value to convert. When omitted or null, returns the current date (new Date()). A Date instance is returned as-is. A YYYY-MM-DD string is parsed in local time. Any other parseable string is passed to Date.parse.',
        },
    ],
    returns: {
        type: 'Date | null',
        descriptionKey: 'utils.detail.date.returns',
        descriptionFallback: 'A Date object on success, or null when the value cannot be parsed.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.date.example_basic',
            titleFallback: 'Parse various date inputs',
            code: `import { date } from 'origam'

date()               // → new Date() (now)
date('2024-06-01')   // → Date(2024-06-01) in local timezone
date(new Date())     // → same Date instance
date('not-a-date')   // → null`,
            lang: 'typescript',
        },
    ],
    related: ['create-instance'],
}
