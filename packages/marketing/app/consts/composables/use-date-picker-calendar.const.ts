import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_DATE_PICKER_CALENDAR_DOC: IComposableDoc = {
    slug: 'use-date-picker-calendar',
    name: 'useDatePickerCalendar',
    domain: 'Commons',
    icon: 'mdi-calendar-month',
    descriptionKey: '',
    descriptionFallback: 'Calendar computation layer for OrigamDatePicker. Derives all calendar display values (weeks, days, day metadata) from ICalendarProps in a reactive computed graph. Handles adjacent-month days, disabled states, selected ranges, week numbers and the static/dynamic weeks-in-month modes.',
    signature: `function useDatePickerCalendar(props: ICalendarProps): {
  displayValue: ComputedRef<unknown>
  daysInMonth: ComputedRef<IDay[]>
  daysInWeek: ComputedRef<IDay[]>
  genDays: (days: unknown[], today: unknown) => IDay[]
  model: Ref<unknown[]>
  weeksInMonth: ComputedRef<unknown[][]>
  weekDays: ComputedRef<number[] | undefined>
  weekNumbers: ComputedRef<(number | null)[]>
}`,
    params: [
        {
            name: 'props',
            type: 'ICalendarProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Calendar props including date, month, year, firstDayOfWeek, weekdays, weeksInMonth, showAdjacentMonths, min, max, allowedDates and disabled.',
        },
    ],
    returns: [
        {
            name: 'displayValue',
            type: 'ComputedRef<unknown>',
            descriptionKey: '',
            descriptionFallback: 'The date used as the calendar pivot. Resolves in order: displayValue prop, first selected date, min, first allowedDate, or today.',
        },
        {
            name: 'daysInMonth',
            type: 'ComputedRef<IDay[]>',
            descriptionKey: '',
            descriptionFallback: 'Flat array of IDay objects for every visible day in the current month view, including adjacent-month days. Each entry carries isToday, isSelected, isDisabled, isAdjacent, isStart, isEnd, isWeekStart, isWeekEnd and formatted fields.',
        },
        {
            name: 'daysInWeek',
            type: 'ComputedRef<IDay[]>',
            descriptionKey: '',
            descriptionFallback: 'IDay objects for the 7 days of the week containing displayValue. Used by the week-view variant of the picker.',
        },
        {
            name: 'genDays',
            type: '(days: unknown[], today: unknown) => IDay[]',
            descriptionKey: '',
            descriptionFallback: 'Internal factory that maps raw date objects to IDay descriptors. Exposed so consumers can generate day metadata for custom views.',
        },
        {
            name: 'model',
            type: 'Ref<unknown[]>',
            descriptionKey: '',
            descriptionFallback: 'Reactive two-way model for the selected dates array (wraps the date prop via useVModel).',
        },
        {
            name: 'weeksInMonth',
            type: 'ComputedRef<unknown[][]>',
            descriptionKey: '',
            descriptionFallback: 'Array of week arrays for the current month view. In static mode, always 6 weeks.',
        },
        {
            name: 'weekDays',
            type: 'ComputedRef<number[] | undefined>',
            descriptionKey: '',
            descriptionFallback: 'Visible weekday indices, shifted by firstDayOfWeek.',
        },
        {
            name: 'weekNumbers',
            type: 'ComputedRef<(number | null)[]>',
            descriptionKey: '',
            descriptionFallback: 'ISO week number for each row in weeksInMonth. Null for empty rows.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Render a month grid',
            code: `<script setup lang="ts">
import { reactive } from 'vue'
import { useDatePickerCalendar } from 'origam'

const props = reactive({
  date: new Date(),
  firstDayOfWeek: 1,
  weeksInMonth: 'dynamic',
  showAdjacentMonths: true,
  weekdays: [0, 1, 2, 3, 4, 5, 6]
})

const { daysInMonth, weeksInMonth } = useDatePickerCalendar(props)
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-date', 'use-v-model'],
    consumedInterfaces: ['ICalendarProps', 'IDay'],
}
