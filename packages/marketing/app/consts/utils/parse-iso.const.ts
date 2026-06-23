import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const PARSE_ISO_UTIL_DOC: IUtilDoc = {
    slug: 'parse-iso',
    name: 'parseISO',
    category: 'Calendar',
    icon: 'mdi-calendar-import',
    descriptionKey: 'utils.catalog.parse_iso.description',
    descriptionFallback: 'Parse an ISO 8601 date string (`"YYYY-MM-DD"`) into a JavaScript `Date` using local midnight, matching the behaviour of the Origam calendar internals.',
    signature: `function parseISO(value: string): Date`,
    params: [
        {
            name: 'value',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.parse_iso.param_value',
            descriptionFallback: 'An ISO 8601 date string in `YYYY-MM-DD` format.',
        },
    ],
    returns: {
        type: 'Date',
        descriptionKey: 'utils.detail.parse_iso.returns',
        descriptionFallback: 'A `Date` set to local midnight on the parsed date. Note: uses `new Date(year, month - 1, day)` — not UTC.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/date.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.parse_iso.example_basic',
            titleFallback: 'Parse an ISO date string',
            code: `import { parseISO } from 'origam'

const d = parseISO('2025-07-14')
// d.getFullYear() === 2025
// d.getMonth()    === 6  (July, 0-based)
// d.getDate()     === 14`,
            lang: 'typescript',
        },
    ],
    related: ['parse-local-date', 'format-date', 'add-days'],
}
