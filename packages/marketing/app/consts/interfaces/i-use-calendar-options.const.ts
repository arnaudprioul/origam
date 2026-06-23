import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_USE_CALENDAR_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-use-calendar-options',
    name: 'IUseCalendarOptions',
    category: 'Composable Options',
    descriptionKey: 'interfaces.catalog.i_use_calendar_options.description',
    descriptionFallback: 'Options consumed by the useCalendar composable. All fields are thunks (getter functions) so the composable stays reactive without owning the prop reference directly.',
    definition: `export interface IUseCalendarOptions {
    events: () => Array<IEvent>
    view: () => TCalendarView
    currentDate: () => Date
    firstDayOfWeek: () => number
    slotDuration: () => number
    dayStartHour: () => number
    dayEndHour: () => number
    minDate?: () => Date | null
    maxDate?: () => Date | null
    locale?: () => string
}`,
    extends: [],
    props: [
        { name: 'events', type: '() => Array<IEvent>', optional: false, descriptionFallback: 'Getter returning the current event array. Recurring events are expanded internally by the composable.' },
        { name: 'view', type: '() => TCalendarView', optional: false, descriptionFallback: 'Getter returning the active view mode (month / week / day / agenda).' },
        { name: 'currentDate', type: '() => Date', optional: false, descriptionFallback: 'Getter returning the anchor date for the currently rendered range.' },
        { name: 'firstDayOfWeek', type: '() => number', optional: false, descriptionFallback: 'Getter returning the first weekday column index (0 = Sunday, 1 = Monday).' },
        { name: 'slotDuration', type: '() => number', optional: false, descriptionFallback: 'Getter returning the minutes per time slot row in week/day views (15, 30, or 60).' },
        { name: 'dayStartHour', type: '() => number', optional: false, descriptionFallback: 'Getter returning the first rendered hour in week/day views (0–23).' },
        { name: 'dayEndHour', type: '() => number', optional: false, descriptionFallback: 'Getter returning the last rendered hour in week/day views (1–24).' },
        { name: 'minDate', type: '() => Date | null', optional: true, descriptionFallback: 'Optional getter returning the lower navigation bound. Prev navigation is disabled before this date.' },
        { name: 'maxDate', type: '() => Date | null', optional: true, descriptionFallback: 'Optional getter returning the upper navigation bound. Next navigation is disabled after this date.' },
        { name: 'locale', type: '() => string', optional: true, descriptionFallback: 'Optional getter returning the BCP 47 locale tag for weekday/month name formatting.' },
    ],
    usedBy: [
        { slug: 'use-calendar', name: 'useCalendar', kind: 'composable' },
        { slug: 'calendar', name: 'Calendar', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Calendar/calendar.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_use_calendar_options.example',
            titleFallback: 'Passing options to useCalendar',
            code: `import { useCalendar } from 'origam'
import type { IUseCalendarOptions } from 'origam'

const opts: IUseCalendarOptions = {
    events: () => myEvents.value,
    view: () => activeView.value,
    currentDate: () => today.value,
    firstDayOfWeek: () => 1,
    slotDuration: () => 30,
    dayStartHour: () => 8,
    dayEndHour: () => 20,
}

const { weeks, timeSlots } = useCalendar(opts)`,
            lang: 'typescript',
        },
    ],
}
