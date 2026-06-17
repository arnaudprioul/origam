import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DATE_ADAPTER_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-date-adapter',
    name: 'IDateAdapter',
    category: 'Date & Time',
    descriptionKey: 'interfaces.catalog.i_date_adapter.description',
    descriptionFallback: 'Full date-manipulation adapter contract. Implement this interface to plug any date library (date-fns, Luxon, Day.js, native Date) into Origam date components.',
    definition: `export interface IDateAdapter<T = unknown> {
    date (value?: any): T | null
    format (date: T, formatString: string): string
    toJsDate (value: T): Date
    parseISO (date: string): T
    toISO (date: T): string
    startOfDay (date: T): T
    endOfDay (date: T): T
    startOfWeek (date: T, firstDayOfWeek?: number | string): T
    endOfWeek (date: T): T
    startOfMonth (date: T): T
    endOfMonth (date: T): T
    startOfYear (date: T): T
    endOfYear (date: T): T
    isAfter (date: T, comparing: T): boolean
    isAfterDay (value: T, comparing: T): boolean
    isSameDay (date: T, comparing: T): boolean
    isSameMonth (date: T, comparing: T): boolean
    isSameYear (value: T, comparing: T): boolean
    isBefore (date: T, comparing: T): boolean
    isEqual (date: T, comparing: T): boolean
    isValid (date: any): boolean
    isWithinRange (date: T, range: [T, T]): boolean
    addMinutes (date: T, amount: number): T
    addHours (date: T, amount: number): T
    addDays (date: T, amount: number): T
    addWeeks (date: T, amount: number): T
    addMonths (date: T, amount: number): T
    getYear (date: T): number
    setYear (date: T, year: number): T
    getDiff (date: T, comparing: T | string, unit?: string): number
    getWeekArray (date: T, firstDayOfWeek?: number | string): T[][]
    getWeekdays (firstDayOfWeek?: number | string): string[]
    getMonth (date: T): number
    setMonth (date: T, month: number): T
    getDate (date: T): number
    setDate (date: T, day: number): T
    getNextMonth (date: T): T
    getPreviousMonth (date: T): T
    getHours (date: T): number
    setHours (date: T, hours: number): T
    getMinutes (date: T): number
    setMinutes (date: T, minutes: number): T
}`,
    extends: [],
    props: [
        { name: 'date', type: '(value?: any) => T | null', optional: false, descriptionFallback: 'Creates a date instance from a raw value (string, number, Date, etc.).' },
        { name: 'format', type: '(date: T, formatString: string) => string', optional: false, descriptionFallback: 'Formats a date instance to a display string using an adapter-specific format pattern.' },
        { name: 'toJsDate', type: '(value: T) => Date', optional: false, descriptionFallback: 'Converts an adapter date instance to a native JS Date.' },
        { name: 'parseISO', type: '(date: string) => T', optional: false, descriptionFallback: 'Parses an ISO-8601 string into an adapter date instance.' },
        { name: 'toISO', type: '(date: T) => string', optional: false, descriptionFallback: 'Serialises an adapter date instance to an ISO-8601 string.' },
        { name: 'startOfDay', type: '(date: T) => T', optional: false, descriptionFallback: 'Returns the start of the day (00:00:00) for the given date.' },
        { name: 'endOfDay', type: '(date: T) => T', optional: false, descriptionFallback: 'Returns the end of the day (23:59:59) for the given date.' },
        { name: 'startOfWeek', type: '(date: T, firstDayOfWeek?: number | string) => T', optional: false, descriptionFallback: 'Returns the start of the week containing the given date.' },
        { name: 'endOfWeek', type: '(date: T) => T', optional: false, descriptionFallback: 'Returns the end of the week containing the given date.' },
        { name: 'startOfMonth', type: '(date: T) => T', optional: false, descriptionFallback: 'Returns the first day of the month for the given date.' },
        { name: 'endOfMonth', type: '(date: T) => T', optional: false, descriptionFallback: 'Returns the last day of the month for the given date.' },
        { name: 'startOfYear', type: '(date: T) => T', optional: false, descriptionFallback: 'Returns the first day of the year for the given date.' },
        { name: 'endOfYear', type: '(date: T) => T', optional: false, descriptionFallback: 'Returns the last day of the year for the given date.' },
        { name: 'isAfter', type: '(date: T, comparing: T) => boolean', optional: false, descriptionFallback: 'Returns true if date is strictly after comparing.' },
        { name: 'isAfterDay', type: '(value: T, comparing: T) => boolean', optional: false, descriptionFallback: 'Returns true if value is on a day strictly after comparing.' },
        { name: 'isSameDay', type: '(date: T, comparing: T) => boolean', optional: false, descriptionFallback: 'Returns true if both dates fall on the same calendar day.' },
        { name: 'isSameMonth', type: '(date: T, comparing: T) => boolean', optional: false, descriptionFallback: 'Returns true if both dates fall in the same calendar month.' },
        { name: 'isSameYear', type: '(value: T, comparing: T) => boolean', optional: false, descriptionFallback: 'Returns true if both dates fall in the same calendar year.' },
        { name: 'isBefore', type: '(date: T, comparing: T) => boolean', optional: false, descriptionFallback: 'Returns true if date is strictly before comparing.' },
        { name: 'isEqual', type: '(date: T, comparing: T) => boolean', optional: false, descriptionFallback: 'Returns true if both date instances represent the same instant.' },
        { name: 'isValid', type: '(date: any) => boolean', optional: false, descriptionFallback: 'Returns true if the value is a valid date.' },
        { name: 'isWithinRange', type: '(date: T, range: [T, T]) => boolean', optional: false, descriptionFallback: 'Returns true if date falls within the inclusive [start, end] range.' },
        { name: 'addMinutes', type: '(date: T, amount: number) => T', optional: false, descriptionFallback: 'Returns a new date with amount minutes added.' },
        { name: 'addHours', type: '(date: T, amount: number) => T', optional: false, descriptionFallback: 'Returns a new date with amount hours added.' },
        { name: 'addDays', type: '(date: T, amount: number) => T', optional: false, descriptionFallback: 'Returns a new date with amount days added.' },
        { name: 'addWeeks', type: '(date: T, amount: number) => T', optional: false, descriptionFallback: 'Returns a new date with amount weeks added.' },
        { name: 'addMonths', type: '(date: T, amount: number) => T', optional: false, descriptionFallback: 'Returns a new date with amount months added.' },
        { name: 'getYear', type: '(date: T) => number', optional: false, descriptionFallback: 'Returns the four-digit year of the given date.' },
        { name: 'setYear', type: '(date: T, year: number) => T', optional: false, descriptionFallback: 'Returns a new date with the year set to year.' },
        { name: 'getDiff', type: '(date: T, comparing: T | string, unit?: string) => number', optional: false, descriptionFallback: 'Returns the numeric difference between two dates in the given unit.' },
        { name: 'getWeekArray', type: '(date: T, firstDayOfWeek?: number | string) => T[][]', optional: false, descriptionFallback: 'Returns a 2-D array of dates representing the calendar weeks of the month.' },
        { name: 'getWeekdays', type: '(firstDayOfWeek?: number | string) => string[]', optional: false, descriptionFallback: 'Returns an ordered array of localised weekday names.' },
        { name: 'getMonth', type: '(date: T) => number', optional: false, descriptionFallback: 'Returns the zero-based month index (0 = January).' },
        { name: 'setMonth', type: '(date: T, month: number) => T', optional: false, descriptionFallback: 'Returns a new date with the month set to month (zero-based).' },
        { name: 'getDate', type: '(date: T) => number', optional: false, descriptionFallback: 'Returns the day-of-month (1-based).' },
        { name: 'setDate', type: '(date: T, day: number) => T', optional: false, descriptionFallback: 'Returns a new date with the day-of-month set to day.' },
        { name: 'getNextMonth', type: '(date: T) => T', optional: false, descriptionFallback: 'Returns the first day of the following month.' },
        { name: 'getPreviousMonth', type: '(date: T) => T', optional: false, descriptionFallback: 'Returns the first day of the preceding month.' },
        { name: 'getHours', type: '(date: T) => number', optional: false, descriptionFallback: 'Returns the hour component (0-23) of the given date.' },
        { name: 'setHours', type: '(date: T, hours: number) => T', optional: false, descriptionFallback: 'Returns a new date with the hour component set to hours.' },
        { name: 'getMinutes', type: '(date: T) => number', optional: false, descriptionFallback: 'Returns the minutes component (0-59) of the given date.' },
        { name: 'setMinutes', type: '(date: T, minutes: number) => T', optional: false, descriptionFallback: 'Returns a new date with the minutes component set to minutes.' },
    ],
    usedBy: [
        { slug: 'date-picker', name: 'DatePicker', kind: 'component' },
        { slug: 'calendar', name: 'Calendar', kind: 'component' },
        { slug: 'use-date', name: 'useDate', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/date.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_date_adapter.example',
            titleFallback: 'Implementing a minimal date adapter',
            code: `import type { IDateAdapter } from 'origam'

class MyDateAdapter implements IDateAdapter<Date> {
    date(value?: any) { return value ? new Date(value) : null }
    format(date: Date, fmt: string) { return date.toLocaleDateString() }
    // … implement all other methods
}`,
            lang: 'typescript',
        },
    ],
}
