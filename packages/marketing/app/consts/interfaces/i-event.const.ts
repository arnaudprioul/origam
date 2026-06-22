import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_EVENT_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-event',
    name: 'IEvent',
    category: 'Calendar',
    descriptionKey: 'interfaces.catalog.i_event.description',
    descriptionFallback: 'Public event data shape consumed by OrigamCalendar and useCalendar. Supports single-day, multi-day, all-day and recurring events (RRULE subset: FREQ/INTERVAL/COUNT/UNTIL/BYDAY). start/end accept ISO-8601 strings, Date objects or epoch numbers.',
    definition: `export interface IEvent {
    id: string | number
    title: string
    description?: string
    start: string | Date
    end?: string | Date
    allDay?: boolean
    category?: string
    color?: TIntent | string
    rrule?: string
    metadata?: Record<string, unknown>
}`,
    extends: [],
    props: [
        { name: 'id', type: 'string | number', optional: false, descriptionFallback: 'Stable identifier used as :key and for click-target wiring.' },
        { name: 'title', type: 'string', optional: false, descriptionFallback: 'Displayed event title — also used as the default aria-label.' },
        { name: 'description', type: 'string', optional: true, descriptionFallback: 'Optional long-form description surfaced in the agenda view.' },
        { name: 'start', type: 'string | Date', optional: false, descriptionFallback: 'Start instant. Accepts ISO-8601 strings, Date objects or epoch numbers.' },
        { name: 'end', type: 'string | Date', optional: true, descriptionFallback: 'End instant. Omit for all-day events or point-in-time events.' },
        { name: 'allDay', type: 'boolean', optional: true, descriptionFallback: 'Render in the all-day band above the time grid (week/day views). No effect in month view.' },
        { name: 'category', type: 'string', optional: true, descriptionFallback: 'Free-form category string — lookup key for categoryColors on the calendar.' },
        { name: 'color', type: 'TIntent | string', optional: true, descriptionFallback: 'Direct color override. Wins over category. Accepts a TIntent value or any CSS color string.' },
        { name: 'rrule', type: 'string', optional: true, descriptionFallback: 'RRULE subset string (FREQ=DAILY|WEEKLY|MONTHLY + INTERVAL/COUNT/UNTIL/BYDAY). The calendar expands recurrences at render time.' },
        { name: 'metadata', type: 'Record<string, unknown>', optional: true, descriptionFallback: 'Free-form payload passed through to the event-click handler.' },
    ],
    usedBy: [
        { slug: 'calendar', name: 'OrigamCalendar', kind: 'component' },
        { slug: 'use-calendar', name: 'useCalendar', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Calendar/event.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_event.example',
            titleFallback: 'Weekly recurring meeting event',
            code: `import type { IEvent } from 'origam'

const standup: IEvent = {
    id: 'standup-1',
    title: 'Daily standup',
    start: '2025-06-02T09:00:00',
    end:   '2025-06-02T09:15:00',
    color: 'primary',
    rrule: 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR',
}`,
            lang: 'typescript',
        },
    ],
}
