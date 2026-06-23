import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_RESOLVED_CALENDAR_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-resolved-calendar-options',
    name: 'IResolvedCalendarOptions',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_resolved_calendar_options.description',
    descriptionFallback: 'Resolved, fully-defaulted option object produced by the useCalendar composable after normalising ICalendarComponentProps. Every field is non-optional at this layer — the composable guarantees a concrete value for each, so downstream rendering logic never has to guard against undefined.',
    definition: `export interface IResolvedCalendarOptions {
    view: TCalendarView
    currentDate: Date
    events: Array<IEvent>
    firstDayOfWeek: number
    timeFormat: TCalendarTimeFormat
    locale: string
    selectable: boolean
    eventColorKey: string
    categoryColors: Record<string, TIntent | string>
    weekendHighlight: boolean
    showWeekNumbers: boolean
    dayStartHour: number
    dayEndHour: number
    slotDuration: number
    minDate: Date | null
    maxDate: Date | null
    disabledDatesPredicate: (date: Date) => boolean
}`,
    extends: [],
    props: [
        { name: 'view', type: 'TCalendarView', optional: false, descriptionFallback: 'Active view mode — month, week, day, or agenda.' },
        { name: 'currentDate', type: 'Date', optional: false, descriptionFallback: 'Anchor date driving the currently rendered period.' },
        { name: 'events', type: 'Array<IEvent>', optional: false, descriptionFallback: 'Expanded event list; recurring events have been unwrapped into concrete occurrences.' },
        { name: 'firstDayOfWeek', type: 'number', optional: false, descriptionFallback: 'Weekday index (0=Sunday, 1=Monday) for the leftmost column header.' },
        { name: 'timeFormat', type: 'TCalendarTimeFormat', optional: false, descriptionFallback: 'Clock display format — "12h" or "24h".' },
        { name: 'locale', type: 'string', optional: false, descriptionFallback: 'BCP 47 locale tag used for weekday and month name rendering.' },
        { name: 'selectable', type: 'boolean', optional: false, descriptionFallback: 'Whether drag-select on the grid is enabled.' },
        { name: 'eventColorKey', type: 'string', optional: false, descriptionFallback: 'Property name read from IEvent for colour resolution ("category" or "color").' },
        { name: 'categoryColors', type: 'Record<string, TIntent | string>', optional: false, descriptionFallback: 'Map from category string to intent token or raw CSS colour.' },
        { name: 'weekendHighlight', type: 'boolean', optional: false, descriptionFallback: 'Whether Saturday and Sunday receive a tinted background in month/week views.' },
        { name: 'showWeekNumbers', type: 'boolean', optional: false, descriptionFallback: 'Whether an ISO week-number column is prepended in week/month views.' },
        { name: 'dayStartHour', type: 'number', optional: false, descriptionFallback: 'First hour rendered in the timeline for week and day views.' },
        { name: 'dayEndHour', type: 'number', optional: false, descriptionFallback: 'Last hour rendered in the timeline for week and day views.' },
        { name: 'slotDuration', type: 'number', optional: false, descriptionFallback: 'Minutes per timeline row — 15, 30, or 60.' },
        { name: 'minDate', type: 'Date | null', optional: false, descriptionFallback: 'Lower navigation bound; null means no lower limit.' },
        { name: 'maxDate', type: 'Date | null', optional: false, descriptionFallback: 'Upper navigation bound; null means no upper limit.' },
        { name: 'disabledDatesPredicate', type: '(date: Date) => boolean', optional: false, descriptionFallback: 'Compiled predicate derived from the disabledDates prop — always a function at this layer.' },
    ],
    usedBy: [
        { slug: 'calendar', name: 'Calendar', kind: 'component' },
        { slug: 'use-calendar', name: 'useCalendar', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Calendar/calendar.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_resolved_calendar_options.example',
            titleFallback: 'Consuming resolved options in a custom calendar composable',
            code: `import type { IResolvedCalendarOptions } from 'origam'

function renderGrid(opts: IResolvedCalendarOptions) {
    // opts.view, opts.firstDayOfWeek etc. are guaranteed non-undefined
    const start = startOfMonth(opts.currentDate)
}`,
            lang: 'typescript',
        },
    ],
}
