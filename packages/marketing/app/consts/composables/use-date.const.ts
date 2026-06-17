import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_DATE_DOC: IComposableDoc = {
    slug: 'use-date',
    name: 'useDate',
    domain: 'Commons',
    icon: 'mdi-calendar-blank',
    descriptionKey: '',
    descriptionFallback: 'Injects the configured date adapter instance. Reads the date options provided by createOrigam() (or a parent OrigamDateProvider) and returns a ready-to-use adapter that abstracts all date arithmetic. Throws if called outside an app context where date options are not provided.',
    signature: `function useDate(): DateAdapter`,
    params: [],
    returns: [
        {
            name: '(adapter instance)',
            type: 'DateAdapter',
            descriptionKey: '',
            descriptionFallback: 'The configured DateAdapter instance. Exposes methods for date creation, comparison, formatting, arithmetic (addDays, startOfMonth, endOfMonth, …) and locale-aware calendar generation (getWeekArray).',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Format today\'s date',
            code: `<script setup lang="ts">
import { useDate } from 'origam'

const adapter = useDate()
const today = adapter.date()
const formatted = adapter.format(today, 'fullDate')
</script>

<template>
  <p>Today is {{ formatted }}</p>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Compute the week array for the current month',
            code: `<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDate } from 'origam'

const adapter = useDate()
const month = ref(adapter.date())

const weeks = computed(() => adapter.getWeekArray(month.value))
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-date-picker-calendar'],
    consumedInterfaces: ['IDateOptions', 'ILocaleInstance'],
    noteFallback: 'useDate() must be called inside a component tree where date options have been registered (via createOrigam({ date: { adapter: DateAdapter } }) or a parent OrigamDateProvider). It throws with a clear message if the injection key is missing.',
}
