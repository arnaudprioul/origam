import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CALENDAR_DAY_SLOT_BINDINGS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-calendar-day-slot-bindings',
    name: 'ICalendarDaySlotBindings',
    category: 'Slots',
    descriptionKey: 'interfaces.catalog.i_calendar_day_slot_bindings.description',
    descriptionFallback: 'Bindings handed to the #day slot of <OrigamCalendar> — one object per cell in month view, providing the date and its contextual flags (today, past, outside month, weekend, disabled).',
    definition: `export interface ICalendarDaySlotBindings {
    date: Date
    events: Array<IEvent>
    isToday: boolean
    isPast: boolean
    isOutside: boolean
    isWeekend: boolean
    isDisabled: boolean
}`,
    extends: [],
    props: [
        { name: 'date', type: 'Date', optional: false, descriptionFallback: 'The Date object this cell represents.' },
        { name: 'events', type: 'Array<IEvent>', optional: false, descriptionFallback: 'Events that fall on this date.' },
        { name: 'isToday', type: 'boolean', optional: false, descriptionFallback: 'True when the cell represents today.' },
        { name: 'isPast', type: 'boolean', optional: false, descriptionFallback: 'True when the date is in the past relative to today.' },
        { name: 'isOutside', type: 'boolean', optional: false, descriptionFallback: 'True when the cell is outside the currently displayed month (leading/trailing filler days).' },
        { name: 'isWeekend', type: 'boolean', optional: false, descriptionFallback: 'True when the day is Saturday or Sunday.' },
        { name: 'isDisabled', type: 'boolean', optional: false, descriptionFallback: 'True when the date matches a disabledDates rule.' },
    ],
    usedBy: [
        { slug: 'calendar', name: 'Calendar', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Calendar/calendar.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_calendar_day_slot_bindings.example',
            titleFallback: 'Custom day cell in month view',
            code: `<OrigamCalendar :events="events">
  <template #day="{ date, events, isToday, isOutside }">
    <div :class="{ today: isToday, filler: isOutside }">
      {{ date.getDate() }}
      <span v-if="events.length">{{ events.length }} events</span>
    </div>
  </template>
</OrigamCalendar>`,
            lang: 'html',
        },
    ],
}
