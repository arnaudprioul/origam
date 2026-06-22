import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CALENDAR_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-calendar-emits',
    name: 'ICalendarEmits',
    category: 'Calendar',
    descriptionKey: 'interfaces.catalog.i_calendar_emits.description',
    descriptionFallback: 'Emit signatures fired by OrigamCalendar — covers v-model sync (view, currentDate), user interaction (event-click, date-click, range-select, create-event-request) and navigation signals (view-change, navigate).',
    definition: `export interface ICalendarEmits {
    (e: 'update:view', view: TCalendarView): void
    (e: 'update:currentDate', date: Date): void
    (e: 'event-click', event: IEvent, originalDOMEvent: MouseEvent): void
    (e: 'date-click', date: Date): void
    (e: 'range-select', start: Date, end: Date): void
    (e: 'create-event-request', start: Date, end: Date): void
    (e: 'view-change', view: TCalendarView): void
    (e: 'navigate', direction: TCalendarNavigate): void
}`,
    extends: [],
    props: [
        { name: 'update:view', type: '(view: TCalendarView) => void', optional: false, descriptionFallback: 'Fired when the active view mode changes. Use with v-model:view.' },
        { name: 'update:currentDate', type: '(date: Date) => void', optional: false, descriptionFallback: 'Fired when the anchor date changes. Use with v-model:currentDate.' },
        { name: 'event-click', type: '(event: IEvent, originalDOMEvent: MouseEvent) => void', optional: false, descriptionFallback: 'Fired when a calendar event chip is clicked. Payload includes the IEvent and the original DOM event.' },
        { name: 'date-click', type: '(date: Date) => void', optional: false, descriptionFallback: 'Fired when the user clicks on an empty date cell.' },
        { name: 'range-select', type: '(start: Date, end: Date) => void', optional: false, descriptionFallback: 'Fired after the user drag-selects a time range on the grid.' },
        { name: 'create-event-request', type: '(start: Date, end: Date) => void', optional: false, descriptionFallback: 'Fired when the user signals intent to create a new event (double-click or drag-create gesture).' },
        { name: 'view-change', type: '(view: TCalendarView) => void', optional: false, descriptionFallback: 'Fired whenever the rendered view mode transitions (day → week → month, etc.).' },
        { name: 'navigate', type: '(direction: TCalendarNavigate) => void', optional: false, descriptionFallback: 'Fired when the user clicks the prev / next navigation controls in the toolbar.' },
    ],
    usedBy: [
        { slug: 'calendar', name: 'OrigamCalendar', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Calendar/calendar.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_calendar_emits.example',
            titleFallback: 'Listening to calendar emits',
            code: `<OrigamCalendar
    v-model:view="view"
    v-model:current-date="currentDate"
    @event-click="onEventClick"
    @range-select="onRangeSelect"
/>`,
            lang: 'vue',
        },
    ],
}
