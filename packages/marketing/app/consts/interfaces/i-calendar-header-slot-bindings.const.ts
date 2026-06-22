import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CALENDAR_HEADER_SLOT_BINDINGS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-calendar-header-slot-bindings',
    name: 'ICalendarHeaderSlotBindings',
    category: 'Calendar',
    descriptionKey: 'interfaces.catalog.i_calendar_header_slot_bindings.description',
    descriptionFallback: 'Slot bindings injected into the #header slot of OrigamCalendar for a full toolbar replacement. Exposes view state, navigation guards and imperative callbacks so the custom header drives the calendar without extra wiring.',
    definition: `export interface ICalendarHeaderSlotBindings {
    view: TCalendarView
    title: string
    canPrev: boolean
    canNext: boolean
    setView: (next: TCalendarView) => void
    navigate: (direction: TCalendarNavigate) => void
}`,
    extends: [],
    props: [
        { name: 'view', type: 'TCalendarView', optional: false, descriptionFallback: 'The currently active view mode.' },
        { name: 'title', type: 'string', optional: false, descriptionFallback: 'Human-readable label for the visible period (e.g. "June 2026" or "Jun 15 – 21, 2026").' },
        { name: 'canPrev', type: 'boolean', optional: false, descriptionFallback: 'False when the previous navigation step would exceed minDate.' },
        { name: 'canNext', type: 'boolean', optional: false, descriptionFallback: 'False when the next navigation step would exceed maxDate.' },
        { name: 'setView', type: '(next: TCalendarView) => void', optional: false, descriptionFallback: 'Imperatively switch the calendar to a different view mode.' },
        { name: 'navigate', type: '(direction: TCalendarNavigate) => void', optional: false, descriptionFallback: 'Imperatively move the calendar forward or backward by one period.' },
    ],
    usedBy: [
        { slug: 'calendar', name: 'OrigamCalendar', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Calendar/calendar.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_calendar_header_slot_bindings.example',
            titleFallback: 'Custom toolbar via the #header slot',
            code: `<OrigamCalendar :events="events">
    <template #header="{ title, canPrev, canNext, navigate, setView }">
        <div class="my-toolbar">
            <button :disabled="!canPrev" @click="navigate('prev')">‹</button>
            <strong>{{ title }}</strong>
            <button :disabled="!canNext" @click="navigate('next')">›</button>
            <button @click="setView('month')">Month</button>
        </div>
    </template>
</OrigamCalendar>`,
            lang: 'vue',
        },
    ],
}
