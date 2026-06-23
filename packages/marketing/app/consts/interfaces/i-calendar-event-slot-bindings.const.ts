import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CALENDAR_EVENT_SLOT_BINDINGS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-calendar-event-slot-bindings',
    name: 'ICalendarEventSlotBindings',
    category: 'Calendar',
    descriptionKey: 'interfaces.catalog.i_calendar_event_slot_bindings.description',
    descriptionFallback: 'Slot bindings injected into the #event slot of OrigamCalendar — one set per visible event. Provides the IEvent payload plus temporal context flags (isPast, isToday).',
    definition: `export interface ICalendarEventSlotBindings {
    event: IEvent
    view: TCalendarView
    isPast: boolean
    isToday: boolean
}`,
    extends: [],
    props: [
        { name: 'event', type: 'IEvent', optional: false, descriptionFallback: 'The calendar event data object being rendered.' },
        { name: 'view', type: 'TCalendarView', optional: false, descriptionFallback: 'The active calendar view when this event is rendered (day, week, month, agenda, …).' },
        { name: 'isPast', type: 'boolean', optional: false, descriptionFallback: 'True when the event end time is strictly before the current moment.' },
        { name: 'isToday', type: 'boolean', optional: false, descriptionFallback: 'True when the event falls on today\'s date.' },
    ],
    usedBy: [
        { slug: 'calendar', name: 'OrigamCalendar', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Calendar/calendar.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_calendar_event_slot_bindings.example',
            titleFallback: 'Custom event chip via the #event slot',
            code: `<OrigamCalendar :events="events">
    <template #event="{ event, isPast, isToday }">
        <span :class="{ past: isPast, today: isToday }">
            {{ event.title }}
        </span>
    </template>
</OrigamCalendar>`,
            lang: 'vue',
        },
    ],
}
