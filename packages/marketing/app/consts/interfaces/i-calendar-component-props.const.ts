import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CALENDAR_COMPONENT_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-calendar-component-props',
    name: 'ICalendarComponentProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_calendar_component_props.description',
    descriptionFallback: 'Props for <OrigamCalendar> — a full-featured calendar with month/week/day/agenda views, event management, drag-select, recurring event expansion, locale support, and the full origam cross-cutting surface.',
    definition: `export interface ICalendarComponentProps extends ICommonsComponentProps, IColorProps, IBgColorProps, IRoundedProps, IElevationProps, IBorderProps, IDensityProps, IDimensionProps, IPaddingProps, IMarginProps {
    view?: TCalendarView
    currentDate?: Date | string
    events?: Array<IEvent>
    firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6
    timeFormat?: TCalendarTimeFormat
    locale?: string
    selectable?: boolean
    eventColorKey?: 'category' | 'color' | string
    categoryColors?: Record<string, TIntent | string>
    weekendHighlight?: boolean
    showWeekNumbers?: boolean
    dayStartHour?: number
    dayEndHour?: number
    slotDuration?: number
    minDate?: Date | string
    maxDate?: Date | string
    disabledDates?: Array<Date | string> | ((d: Date) => boolean)
}`,
    extends: [
        'ICommonsComponentProps',
        'IColorProps',
        'IBgColorProps',
        'IRoundedProps',
        'IElevationProps',
        'IBorderProps',
        'IDensityProps',
        'IDimensionProps',
        'IPaddingProps',
        'IMarginProps',
    ],
    props: [
        { name: 'view', type: 'TCalendarView', optional: true, descriptionFallback: 'Active view mode. Two-way binding via v-model:view.' },
        { name: 'currentDate', type: 'Date | string', optional: true, descriptionFallback: 'Anchor date. Two-way binding via v-model:currentDate.' },
        { name: 'events', type: 'Array<IEvent>', optional: true, descriptionFallback: 'Event list. Recurring events are expanded internally.' },
        { name: 'firstDayOfWeek', type: '0 | 1 | 2 | 3 | 4 | 5 | 6', optional: true, default: '1', descriptionFallback: 'First weekday rendered as the leftmost column. 1 (Monday) for EU/ISO, 0 (Sunday) for US.' },
        { name: 'timeFormat', type: 'TCalendarTimeFormat', optional: true, default: "'24h'", descriptionFallback: 'Clock format for time labels.' },
        { name: 'locale', type: 'string', optional: true, descriptionFallback: 'BCP 47 locale tag — drives weekday and month names.' },
        { name: 'selectable', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Enable drag-select on the grid.' },
        { name: 'eventColorKey', type: "'category' | 'color' | string", optional: true, default: "'category'", descriptionFallback: 'Which property of IEvent to read for colouring.' },
        { name: 'categoryColors', type: 'Record<string, TIntent | string>', optional: true, descriptionFallback: 'Map category string → intent / CSS colour.' },
        { name: 'weekendHighlight', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Tint Saturday + Sunday in month/week views.' },
        { name: 'showWeekNumbers', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Render a leading ISO week-number column.' },
        { name: 'dayStartHour', type: 'number', optional: true, default: '0', descriptionFallback: 'First hour rendered in week/day views.' },
        { name: 'dayEndHour', type: 'number', optional: true, default: '24', descriptionFallback: 'Last hour rendered in week/day views.' },
        { name: 'slotDuration', type: 'number', optional: true, default: '30', descriptionFallback: 'Minutes per row in the timeline. 30 for half-hour granularity, 15 for fine-grained drag-create, 60 for compact.' },
        { name: 'minDate', type: 'Date | string', optional: true, descriptionFallback: 'Lower navigation bound. The toolbar disables < past this.' },
        { name: 'maxDate', type: 'Date | string', optional: true, descriptionFallback: 'Upper navigation bound. The toolbar disables > past this.' },
        { name: 'disabledDates', type: 'Array<Date | string> | ((d: Date) => boolean)', optional: true, descriptionFallback: 'Cells to grey out. Accepts an array (Dates or ISO strings) or a predicate.' },
    ],
    usedBy: [
        { slug: 'calendar', name: 'Calendar', kind: 'component' },
        { slug: 'use-calendar', name: 'useCalendar', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Calendar/calendar.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_calendar_component_props.example',
            titleFallback: 'Calendar with events and week view',
            code: `<OrigamCalendar
  v-model:view="calendarView"
  v-model:current-date="currentDate"
  :events="myEvents"
  :first-day-of-week="1"
  time-format="24h"
  show-week-numbers
  color="primary"
/>`,
            lang: 'html',
        },
    ],
}
