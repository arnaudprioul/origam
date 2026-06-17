import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_NUMBER_FORMAT_DOC: IComposableDoc = {
    slug: 'use-number-format',
    name: 'useNumberFormat',
    domain: 'NumberFormat',
    icon: 'mdi-numeric',
    descriptionKey: '',
    descriptionFallback: 'Wraps Intl.NumberFormat with an LRU cache, reactive locale resolution, and high-level format dialects (currency, percent, unit, compact, scientific, engineering). Accepts options as plain objects, refs, or getter functions. Used by OrigamNumberFormat and usable standalone in Pinia stores or server-side rendering contexts.',
    signature: `function useNumberFormat(
  options?: MaybeRefOrGetter<IUseNumberFormatOptions>
): {
  intl: ComputedRef<Intl.NumberFormat>
  format: (value: number | string) => string
  formatToParts: (value: number | string) => Intl.NumberFormatPart[]
}`,
    params: [
        {
            name: 'options',
            type: 'MaybeRefOrGetter<IUseNumberFormatOptions>',
            required: false,
            defaultValue: '{}',
            descriptionKey: '',
            descriptionFallback: 'Formatting options: locale (string | string[] | "auto"), format ("decimal" | "currency" | "percent" | "unit" | "compact" | "scientific" | "engineering"), currency, unit, notation, minimumFractionDigits, maximumFractionDigits, useGrouping, signDisplay, and more. Accepts a plain object, a ref, or a getter.',
        },
    ],
    returns: [
        {
            name: 'intl',
            type: 'ComputedRef<Intl.NumberFormat>',
            descriptionKey: '',
            descriptionFallback: 'The resolved Intl.NumberFormat instance (LRU-cached). Recomputed only when locale or options change.',
        },
        {
            name: 'format',
            type: '(value: number | string) => string',
            descriptionKey: '',
            descriptionFallback: 'Formats a number or numeric string to a localised string. Non-finite strings are coerced to 0 rather than producing "NaN".',
        },
        {
            name: 'formatToParts',
            type: '(value: number | string) => Intl.NumberFormatPart[]',
            descriptionKey: '',
            descriptionFallback: 'Returns the formatted parts array (integer, decimal, fraction, currency, …) for custom rendering, e.g. styling the currency symbol differently.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Currency formatting (French euros)',
            code: `<script setup lang="ts">
import { useNumberFormat } from 'origam'

const { format } = useNumberFormat({
  locale: 'fr-FR',
  format: 'currency',
  currency: 'EUR'
})
</script>

<template>
  <span>{{ format(1234.5) }}</span>
  <!-- → "1 234,50 €" -->
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Reactive compact notation',
            code: `<script setup lang="ts">
import { ref } from 'vue'
import { useNumberFormat } from 'origam'

const locale = ref('en-US')
const { format } = useNumberFormat(() => ({
  locale: locale.value,
  format: 'compact'
}))
</script>

<template>
  <select v-model="locale">
    <option value="en-US">en-US</option>
    <option value="de-DE">de-DE</option>
  </select>
  <span>{{ format(1_500_000) }}</span>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Via OrigamNumberFormat component',
            code: `<origam-number-format
  :value="42000"
  format="currency"
  currency="USD"
  locale="en-US"
/>
<!-- → "$42,000.00" -->`,
            lang: 'vue',
        },
    ],
    related: ['use-date', 'use-display'],
    consumedInterfaces: ['IUseNumberFormatOptions'],
}
