import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CALENDAR_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-calendar-slots',
    name: 'ICalendarSlots',
    category: 'Calendar',
    descriptionKey: 'interfaces.catalog.i_calendar_slots.description',
    descriptionFallback: 'Slot signatures exposed by OrigamCalendar. The default toolbar can be replaced wholesale via #header, individual events via #event, day cells via #day, day column headers via #dayHeader, and empty-agenda state via #empty.',
    definition: `export interface ICalendarSlots {
    header?: (bindings: ICalendarHeaderSlotBindings) => any
    event?: (bindings: ICalendarEventSlotBindings) => any
    day?: (bindings: ICalendarDaySlotBindings) => any
    dayHeader?: (bindings: { date: Date }) => any
    empty?: (bindings: { view: TCalendarView }) => any
}`,
    extends: [],
    props: [
        { name: 'header', type: '(bindings: ICalendarHeaderSlotBindings) => any', optional: true, descriptionFallback: 'Full toolbar replacement. Receives view, title, canPrev, canNext, navigate and setView.' },
        { name: 'event', type: '(bindings: ICalendarEventSlotBindings) => any', optional: true, descriptionFallback: 'Custom event chip renderer. Receives the IEvent object plus isPast and isToday context flags.' },
        { name: 'day', type: '(bindings: ICalendarDaySlotBindings) => any', optional: true, descriptionFallback: 'Custom day cell renderer (month view). Receives date, events array, isToday, isPast, isOutside, isWeekend, isDisabled.' },
        { name: 'dayHeader', type: '(bindings: { date: Date }) => any', optional: true, descriptionFallback: 'Custom day column header (week / day views). Receives the column Date.' },
        { name: 'empty', type: '(bindings: { view: TCalendarView }) => any', optional: true, descriptionFallback: 'Rendered in agenda view when no events are present for the current period.' },
    ],
    usedBy: [
        { slug: 'calendar', name: 'OrigamCalendar', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Calendar/calendar.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_calendar_slots.example',
            titleFallback: 'Using the #day slot to add custom content in month cells',
            code: `<OrigamCalendar :events="events">
    <template #day="{ date, events, isToday }">
        <div :class="{ today: isToday }">
            <span>{{ date.getDate() }}</span>
            <span v-if="events.length">{{ events.length }} events</span>
        </div>
    </template>
</OrigamCalendar>`,
            lang: 'vue',
        },
    ],
}
