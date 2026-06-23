import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const REGEX_DATE_YYYY_MM_DD_CONST_DOC: IConstDoc = {
    slug: 'regex-date-yyyy-mm-dd',
    name: 'REGEX_DATE_YYYY_MM_DD',
    category: 'Date & Time',
    descriptionKey: 'consts.catalog.regex_date_yyyy_mm_dd.description',
    descriptionFallback: 'Regular expression that validates an ISO 8601 date string in YYYY-MM-DD format (years 1000–2999, months 1–12, days 1–31). Used by date utilities to guard against malformed inputs before parsing.',
    definition: `export const REGEX_DATE_YYYY_MM_DD = /^([12]\\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\\d|3[01]))$/`,
    value: '/^([12]\\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\\d|3[01]))$/',
    usedBy: [
        { name: 'date.util' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/date.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.regex_date_yyyy_mm_dd.example',
            titleFallback: 'Validating a date string before parsing',
            code: `import { REGEX_DATE_YYYY_MM_DD } from 'origam'

const isValid = (s: string) => REGEX_DATE_YYYY_MM_DD.test(s)
isValid('2024-03-15') // true
isValid('24-3-15')    // false`,
            lang: 'typescript',
        },
    ],
}
