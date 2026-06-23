import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_CALENDAR_DOC: IComposableDoc = {
    slug: 'use-calendar',
    name: 'useCalendar',
    domain: 'Calendar',
    icon: 'mdi-calendar',
    descriptionKey: '',
    descriptionFallback: 'Stateless calendar engine powering <OrigamCalendar>. Computes the visible date range for month/week/day/agenda views, expands recurring events (RRULE), and provides pure grid-builder functions for month, week, and day layouts. Navigation mutates the current date via optional callbacks so the composable can be driven from props, a store, or a local ref without re-instantiation.',
    signature: `function useCalendar(
  options: IUseCalendarOptions,
  setView?: (view: TCalendarView) => void,
  setCurrentDate?: (date: Date) => void
): {
  visibleDateRange: ComputedRef<{ start: Date; end: Date }>
  expandedEvents: ComputedRef<Array<IEvent>>
  navigate: (direction: TCalendarNavigate) => void
  setView: (view: TCalendarView) => void
  buildMonthGrid: (date: Date) => Array<Array<Date>>
  buildWeekGrid: (date: Date) => Array<Array<ICalendarTimeSlot>>
  buildDayGrid: (date: Date) => Array<ICalendarTimeSlot>
  buildAgenda: (range?: { start: Date; end: Date }) => Array<ICalendarAgendaEntry>
  eventsOnDay: (day: Date) => Array<IEvent>
  positionEvent: (event: IEvent, dayStart: Date, pxPerMin: number) => { top: number; height: number } | null
  helpers: { isSameDay, isSameMonth, startOfDay, startOfMonth, endOfMonth, addDays, addMonths, addWeeks, diffMinutes, toDate }
}`,
    params: [
        {
            name: 'options',
            type: 'IUseCalendarOptions',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Configuration thunks. All fields are getter functions so the composable reacts to reactive sources without re-instantiation. Includes events, view, currentDate, firstDayOfWeek, slotDuration, dayStartHour, dayEndHour, and optional minDate/maxDate/locale.',
        },
        {
            name: 'setView',
            type: '(view: TCalendarView) => void',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Optional callback invoked by the returned setView proxy. Bind to a v-model:view setter to keep the parent state in sync when the calendar switches views.',
        },
        {
            name: 'setCurrentDate',
            type: '(date: Date) => void',
            required: false,
            descriptionKey: '',
            descriptionFallback: 'Optional callback invoked by navigate(). Bind to a v-model:currentDate setter. If omitted, navigation calls have no effect on the parent state.',
        },
    ],
    returns: [
        {
            name: 'visibleDateRange',
            type: 'ComputedRef<{ start: Date; end: Date }>',
            descriptionKey: '',
            descriptionFallback: 'Start and end dates of the currently visible window. Month/agenda views span a full 6-week grid; week view spans Sun–Sat (or Mon–Sun); day view spans a single calendar day.',
        },
        {
            name: 'expandedEvents',
            type: 'ComputedRef<Array<IEvent>>',
            descriptionKey: '',
            descriptionFallback: 'Events filtered and expanded via RRULE to the visible date range, sorted by start date ascending. Recurring events appear as individual occurrences.',
        },
        {
            name: 'navigate',
            type: '(direction: TCalendarNavigate) => void',
            descriptionKey: '',
            descriptionFallback: 'Move the calendar forward ("next"), backward ("prev"), or to today ("today"). Clamps to minDate/maxDate when provided and calls setCurrentDate with the new date.',
        },
        {
            name: 'buildMonthGrid',
            type: '(date: Date) => Array<Array<Date>>',
            descriptionKey: '',
            descriptionFallback: 'Returns a 6×7 matrix of midnight-local Date objects for the month view. Each inner array is one week row.',
        },
        {
            name: 'buildWeekGrid',
            type: '(date: Date) => Array<Array<ICalendarTimeSlot>>',
            descriptionKey: '',
            descriptionFallback: 'Returns 7 columns (one per day) each containing an array of time-slot descriptors for the week timeline view.',
        },
        {
            name: 'buildDayGrid',
            type: '(date: Date) => Array<ICalendarTimeSlot>',
            descriptionKey: '',
            descriptionFallback: 'Returns the time-slot array for a single day, from dayStartHour to dayEndHour at slotDuration-minute intervals.',
        },
        {
            name: 'buildAgenda',
            type: '(range?: { start: Date; end: Date }) => Array<ICalendarAgendaEntry>',
            descriptionKey: '',
            descriptionFallback: 'Groups events by day for the agenda view. Returns an array of { date, events } objects, one per day that has at least one event in the range.',
        },
        {
            name: 'eventsOnDay',
            type: '(day: Date) => Array<IEvent>',
            descriptionKey: '',
            descriptionFallback: 'Filter expanded events to those that intersect a given day. Used by the month grid chip list and the day/week positioning layer.',
        },
        {
            name: 'positionEvent',
            type: '(event: IEvent, dayStart: Date, pxPerMin: number) => { top: number; height: number } | null',
            descriptionKey: '',
            descriptionFallback: 'Compute top and height pixel values for an event on the day/week timeline. pxPerMin is the CSS-driven slot height divided by slotDuration so the layout stays responsive without JS ResizeObservers.',
        },
        {
            name: 'helpers',
            type: 'object',
            descriptionKey: '',
            descriptionFallback: 'Re-exported date utility functions (isSameDay, isSameMonth, startOfDay, startOfMonth, endOfMonth, addDays, addMonths, addWeeks, diffMinutes, toDate). Exposed so consumers can extend calendar UIs without a separate import.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Month grid driven from props',
            code: `<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCalendar } from 'origam'
import type { IEvent } from 'origam'

const events = ref<IEvent[]>([])
const currentDate = ref(new Date())
const view = ref<'month' | 'week' | 'day' | 'agenda'>('month')

const { visibleDateRange, buildMonthGrid, expandedEvents, navigate } = useCalendar(
  {
    events: () => events.value,
    view: () => view.value,
    currentDate: () => currentDate.value,
    firstDayOfWeek: () => 1,
    slotDuration: () => 30,
    dayStartHour: () => 8,
    dayEndHour: () => 20,
  },
  (v) => { view.value = v },
  (d) => { currentDate.value = d }
)

const weeks = computed(() => buildMonthGrid(currentDate.value))
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-date', 'use-date-picker-calendar'],
    consumedInterfaces: ['IUseCalendarOptions', 'IEvent'],
}
