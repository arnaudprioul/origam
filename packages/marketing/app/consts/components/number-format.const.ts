/**
 * /components/number-format — full documentation data for OrigamNumberFormat.
 *
 * SOURCE OF TRUTH: packages/ds/src/interfaces/NumberFormat/number-format.interface.ts
 * cross-checked against packages/ds/src/components/NumberFormat/OrigamNumberFormat.vue.
 */
import type { IComponentDoc } from '~/interfaces/components-catalog.interface'

export const NUMBER_FORMAT_DOC: IComponentDoc = {
    slug: 'number-format',
    name: 'NumberFormat',
    tag: 'origam-number-format',
    icon: 'mdi-numeric',
    category: 'Data Display',
    descriptionKey: 'components.catalog.number_format.description',
    descriptionFallback: 'Locale-aware number, currency and percentage formatter.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-numberformat--design',
    docUrl: 'http://localhost:4000/components/NumberFormat/OrigamNumberFormat',

    family: [],

    props: [
        {
            name: 'value',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            required: true,
            descriptionKey: 'components.number_format.props.value.description',
            descriptionFallback: 'Number to format and render. String values are coerced via Number().'
        },
        {
            name: 'format',
            type: { label: "'decimal' | 'currency' | 'percent' | 'unit' | 'compact' | 'scientific' | 'engineering'", slug: '', kind: 'primitive' },
            defaultValue: "'decimal'",
            descriptionKey: 'components.number_format.props.format.description',
            descriptionFallback: 'High-level format dialect controlling how the number is rendered.'
        },
        {
            name: 'locale',
            type: { label: "string | string[] | 'auto'", slug: '', kind: 'primitive' },
            defaultValue: "'auto'",
            descriptionKey: 'components.number_format.props.locale.description',
            descriptionFallback: "BCP-47 locale tag or 'auto' to resolve from the document or navigator."
        },
        {
            name: 'currency',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'USD'",
            descriptionKey: 'components.number_format.props.currency.description',
            descriptionFallback: "ISO 4217 currency code. Required when format === 'currency'."
        },
        {
            name: 'currencyDisplay',
            type: { label: "'symbol' | 'narrowSymbol' | 'code' | 'name'", slug: '', kind: 'primitive' },
            defaultValue: "'symbol'",
            descriptionKey: 'components.number_format.props.currency_display.description',
            descriptionFallback: "Controls how the currency symbol is rendered ($, USD, US dollar…)."
        },
        {
            name: 'unit',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.number_format.props.unit.description',
            descriptionFallback: "ECMAScript-sanctioned unit identifier (e.g. 'kilometer-per-hour'). Required when format === 'unit'."
        },
        {
            name: 'unitDisplay',
            type: { label: "'short' | 'long' | 'narrow'", slug: '', kind: 'primitive' },
            defaultValue: "'short'",
            descriptionKey: 'components.number_format.props.unit_display.description',
            descriptionFallback: 'Unit label verbosity (short: km/h, long: kilometers per hour, narrow: kph).'
        },
        {
            name: 'notation',
            type: { label: "'standard' | 'scientific' | 'engineering' | 'compact'", slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.number_format.props.notation.description',
            descriptionFallback: 'Raw notation override for Intl.NumberFormat. Auto-set from format when relevant.'
        },
        {
            name: 'compactDisplay',
            type: { label: "'short' | 'long'", slug: '', kind: 'primitive' },
            defaultValue: "'short'",
            descriptionKey: 'components.number_format.props.compact_display.description',
            descriptionFallback: "Compact notation display: 'short' (1M) or 'long' (1 million). Only when notation='compact'."
        },
        {
            name: 'minimumFractionDigits',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.number_format.props.minimum_fraction_digits.description',
            descriptionFallback: 'Minimum digits after the decimal point.'
        },
        {
            name: 'maximumFractionDigits',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.number_format.props.maximum_fraction_digits.description',
            descriptionFallback: 'Maximum digits after the decimal point.'
        },
        {
            name: 'minimumSignificantDigits',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.number_format.props.minimum_significant_digits.description',
            descriptionFallback: 'Minimum significant digits. Mutually exclusive with fraction digit props.'
        },
        {
            name: 'maximumSignificantDigits',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.number_format.props.maximum_significant_digits.description',
            descriptionFallback: 'Maximum significant digits. Mutually exclusive with fraction digit props.'
        },
        {
            name: 'useGrouping',
            type: { label: "boolean | 'auto' | 'always' | 'min2'", slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.number_format.props.use_grouping.description',
            descriptionFallback: "Thousands-separator behaviour. true/'auto' = locale default, false = none, 'always' forces separators, 'min2' only when ≥2 groups."
        },
        {
            name: 'signDisplay',
            type: { label: "'auto' | 'always' | 'except-zero' | 'negative' | 'never'", slug: '', kind: 'primitive' },
            defaultValue: "'auto'",
            descriptionKey: 'components.number_format.props.sign_display.description',
            descriptionFallback: "Sign display strategy. 'auto' = only negatives get the sign."
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'span'",
            descriptionKey: 'components.number_format.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root. Defaults to span.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '{ formatted, parts, value }',
            descriptionKey: 'components.number_format.slots.default.description',
            descriptionFallback: 'Custom render override. Receives the formatted string, Intl parts, and numeric value.'
        }
    ],

    examples: [
        {
            titleKey: 'components.number_format.examples.formats.title',
            titleFallback: 'Format variants',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; flex-direction: column; gap: 0.5rem;">
    <origam-number-format :value="1234567.89" format="decimal" />
    <origam-number-format :value="1234567.89" format="currency" currency="EUR" />
    <origam-number-format :value="0.875" format="percent" />
    <origam-number-format :value="1234567" format="compact" />
    <origam-number-format :value="120" format="unit" unit="kilometer-per-hour" />
  </div>
</template>`
        },
        {
            titleKey: 'components.number_format.examples.locale.title',
            titleFallback: 'Locale & grouping',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; flex-direction: column; gap: 0.5rem;">
    <origam-number-format :value="1234567.89" locale="fr-FR" format="currency" currency="EUR" />
    <origam-number-format :value="1234567.89" locale="ja-JP" format="currency" currency="JPY" />
    <origam-number-format :value="1234567" :use-grouping="false" />
  </div>
</template>`
        },
        {
            titleKey: 'components.number_format.examples.slot.title',
            titleFallback: 'Custom slot',
            lang: 'vue',
            code: `<template>
  <origam-number-format :value="42000" format="currency" currency="USD">
    <template #default="{ formatted, parts }">
      <strong>{{ formatted }}</strong>
      <small>({{ parts.length }} parts)</small>
    </template>
  </origam-number-format>
</template>`
        }
    ]
}
