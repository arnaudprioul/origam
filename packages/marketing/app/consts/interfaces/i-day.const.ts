import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DAY_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-day',
    name: 'IDay',
    category: 'Date & Time',
    descriptionKey: 'interfaces.catalog.i_day.description',
    descriptionFallback: 'Data shape for a single day cell in the Calendar grid. Carries display strings, boolean flags for all calendar states (selected, disabled, adjacent, etc.) and the raw adapter date value.',
    definition: `export interface IDay {
    date: unknown
    isoDate: string
    formatted: string
    year: number
    month: number
    isDisabled: boolean
    isWeekStart: boolean
    isWeekEnd: boolean
    isToday: boolean
    isAdjacent: boolean
    isHidden: boolean
    isStart: boolean
    isSelected: boolean
    isEnd: boolean
    isSame: boolean
    localized: string
}`,
    extends: [],
    props: [
        { name: 'date', type: 'unknown', optional: false, descriptionFallback: 'Raw adapter date value for this cell.' },
        { name: 'isoDate', type: 'string', optional: false, descriptionFallback: 'ISO-8601 date string (YYYY-MM-DD) for this cell.' },
        { name: 'formatted', type: 'string', optional: false, descriptionFallback: 'Adapter-formatted display string for the day number.' },
        { name: 'year', type: 'number', optional: false, descriptionFallback: 'Four-digit year of this cell.' },
        { name: 'month', type: 'number', optional: false, descriptionFallback: 'Zero-based month index of this cell.' },
        { name: 'isDisabled', type: 'boolean', optional: false, descriptionFallback: 'True when the day is outside the allowed date range.' },
        { name: 'isWeekStart', type: 'boolean', optional: false, descriptionFallback: 'True when the day is the first day of a week row.' },
        { name: 'isWeekEnd', type: 'boolean', optional: false, descriptionFallback: 'True when the day is the last day of a week row.' },
        { name: 'isToday', type: 'boolean', optional: false, descriptionFallback: 'True when the day corresponds to today\'s date.' },
        { name: 'isAdjacent', type: 'boolean', optional: false, descriptionFallback: 'True when the day belongs to the previous or next month (overflow cell).' },
        { name: 'isHidden', type: 'boolean', optional: false, descriptionFallback: 'True when the cell should be visually hidden.' },
        { name: 'isStart', type: 'boolean', optional: false, descriptionFallback: 'True when the day is the start of a selected range.' },
        { name: 'isSelected', type: 'boolean', optional: false, descriptionFallback: 'True when the day is the selected date or within a selected range.' },
        { name: 'isEnd', type: 'boolean', optional: false, descriptionFallback: 'True when the day is the end of a selected range.' },
        { name: 'isSame', type: 'boolean', optional: false, descriptionFallback: 'True when start and end of the range land on the same day.' },
        { name: 'localized', type: 'string', optional: false, descriptionFallback: 'Locale-aware display string for the day number (e.g. "١" in Arabic).' },
    ],
    usedBy: [
        { slug: 'calendar', name: 'Calendar', kind: 'component' },
        { slug: 'date-picker', name: 'DatePicker', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/calendar.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_day.example',
            titleFallback: 'Consuming IDay in a calendar slot',
            code: `import type { IDay } from 'origam'

function renderDay(day: IDay) {
    return day.isSelected ? \`[\${day.formatted}]\` : day.formatted
}`,
            lang: 'typescript',
        },
    ],
}
