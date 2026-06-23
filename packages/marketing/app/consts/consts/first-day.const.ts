import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const FIRST_DAY_CONST_DOC: IConstDoc = {
    slug: 'first-day',
    name: 'FIRST_DAY',
    category: 'Date & Time',
    descriptionKey: 'consts.catalog.first_day.description',
    descriptionFallback: 'CLDR-derived map of ISO 3166-1 country/region codes to their locale-specific first day of the week (0 = Sunday, 1 = Monday, 5 = Friday, 6 = Saturday). Used by the date adapter to initialise calendar grids correctly. Contains ~90 entries.',
    definition: `export const FIRST_DAY: Record<string, number> = {
    '001': 1, AD: 1, AE: 6, AF: 6, AG: 0,
    // … ~90 entries total …
    ZA: 0, ZW: 0
}`,
    values: [
        { value: '0 — Sunday', descriptionKey: 'consts.detail.first_day.sunday', descriptionFallback: 'Week starts on Sunday (US, CA, JP, MX, BR, etc.).' },
        { value: '1 — Monday', descriptionKey: 'consts.detail.first_day.monday', descriptionFallback: 'Week starts on Monday (most of Europe, AU, etc.).' },
        { value: '5 — Friday', descriptionKey: 'consts.detail.first_day.friday', descriptionFallback: 'Week starts on Friday (MV — Maldives).' },
        { value: '6 — Saturday', descriptionKey: 'consts.detail.first_day.saturday', descriptionFallback: 'Week starts on Saturday (AE, AF, BH, DJ, DZ, EG, IQ, IR, JO, KW, LY, OM, QA, SA, SD, SY).' },
    ],
    usedBy: [
        { name: 'useDateAdapter' },
        { name: 'OrigamDatePicker', slug: 'date-picker' },
        { name: 'OrigamCalendar', slug: 'calendar' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/date.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.first_day.example',
            titleFallback: 'Looking up the first day for a locale',
            code: `import { FIRST_DAY } from 'origam'

const locale = navigator.language.split('-')[1]?.toUpperCase() ?? '001'
const firstDay = FIRST_DAY[locale] ?? FIRST_DAY['001']
// 0 = Sunday, 1 = Monday, 5 = Friday, 6 = Saturday`,
            lang: 'typescript',
        },
    ],
}
