import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CALENDAR_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-calendar-props',
    name: 'ICalendarProps',
    category: 'Data & Items',
    descriptionKey: 'interfaces.catalog.i_calendar_props.description',
    descriptionFallback: 'Props for calendar grid components — controls the visible month/year, selected dates, allowed-dates predicate, min/max bounds, weekday layout and adjacent-month visibility.',
    definition: `export interface ICalendarProps {
    allowedDates?: Array<unknown> | ((date: unknown) => boolean)
    disabled?: boolean
    displayValue?: unknown
    date?: Array<unknown>
    month: number
    max?: unknown
    min?: unknown
    showAdjacentMonths?: boolean
    year: number
    weekdays?: Array<number>
    weeksInMonth?: TCalendarStrategy
    firstDayOfWeek?: number
}`,
    extends: [],
    props: [
        { name: 'allowedDates', type: 'Array<unknown> | ((date: unknown) => boolean)', optional: true, descriptionFallback: 'An array of allowed date values, or a function returning true for dates that should be selectable.' },
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Disables all date interactions.' },
        { name: 'displayValue', type: 'unknown', optional: true, descriptionFallback: 'The date value used for display purposes (e.g. hover highlight).' },
        { name: 'date', type: 'Array<unknown>', optional: true, descriptionFallback: 'Currently selected date(s).' },
        { name: 'month', type: 'number', optional: false, descriptionFallback: 'The month currently displayed (0-indexed).' },
        { name: 'max', type: 'unknown', optional: true, descriptionFallback: 'The maximum selectable date.' },
        { name: 'min', type: 'unknown', optional: true, descriptionFallback: 'The minimum selectable date.' },
        { name: 'showAdjacentMonths', type: 'boolean', optional: true, descriptionFallback: 'Show days from the previous and next months in the current grid.' },
        { name: 'year', type: 'number', optional: false, descriptionFallback: 'The year currently displayed.' },
        { name: 'weekdays', type: 'Array<number>', optional: true, descriptionFallback: 'Array of weekday indices to display (0 = Sunday … 6 = Saturday).' },
        { name: 'weeksInMonth', type: 'TCalendarStrategy', optional: true, descriptionFallback: 'Strategy for computing the number of week rows in the month view.' },
        { name: 'firstDayOfWeek', type: 'number', optional: true, descriptionFallback: 'Index of the first day of the week (0 = Sunday, 1 = Monday…).' },
    ],
    usedBy: [
        { slug: 'date-picker', name: 'DatePicker', kind: 'component' },
        { slug: 'calendar', name: 'Calendar', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/calendar.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_calendar_props.example',
            titleFallback: 'Basic date picker with min/max',
            code: `<OrigamDatePicker
    :month="currentMonth"
    :year="currentYear"
    min="2024-01-01"
    max="2024-12-31"
    show-adjacent-months
/>`,
            lang: 'vue',
        },
    ],
}
