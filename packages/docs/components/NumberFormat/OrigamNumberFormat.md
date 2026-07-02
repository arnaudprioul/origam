# OrigamNumberFormat

i18n number formatting on top of the native
[`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
API — zero external dependencies. The component is a pure-display
wrapper: it transforms `value` through a locale-aware formatter and
renders the result inside a `<tag>` (default `<span>`). For full
control over the rendered markup, the scoped `#default` slot exposes
the structured `Intl.NumberFormatPart[]` so consumers can paint the
currency symbol, decimal separator or grouping segment independently.

## Quick start

```vue
<template>
    <origam-number-format
        :value="1234567.89"
        format="currency"
        currency="EUR"
        locale="fr-FR"
    />
    <!-- Renders: "1 234 567,89 €" -->

    <origam-number-format
        :value="0.875"
        format="percent"
        locale="en-US"
    />
    <!-- Renders: "87.5%" -->

    <origam-number-format
        :value="2500000"
        format="compact"
        locale="en-US"
    />
    <!-- Renders: "2.5M" — aria-label="2.5 million" -->

    <origam-number-format
        :value="42"
        format="unit"
        unit="kilometer-per-hour"
        locale="fr-FR"
    />
    <!-- Renders: "42 km/h" -->
</template>
```

## Props

| Prop                       | Type                                                  | Default     | Notes                                                                                          |
|----------------------------|-------------------------------------------------------|-------------|------------------------------------------------------------------------------------------------|
| `value`                    | `number \| string`                                    | required    | String input is parsed via `Number()` — bigints lose precision through this path.              |
| `format`                   | `TNumberFormatFormat`                                 | `'decimal'` | High-level dialect — see the format matrix below.                                              |
| `locale`                   | `string \| string[]`                                  | `'auto'`    | BCP-47 tag(s). `'auto'` reads `<html lang>` → `navigator.language` → `'en-US'`.                |
| `currency`                 | `string`                                              | `'USD'`     | ISO 4217 code. Only honoured when `format === 'currency'`.                                     |
| `currencyDisplay`          | `'symbol' \| 'narrowSymbol' \| 'code' \| 'name'`      | `'symbol'`  | Currency-glyph rendering.                                                                      |
| `unit`                     | `string`                                              | —           | Required when `format === 'unit'` (e.g. `'kilometer-per-hour'`).                               |
| `unitDisplay`              | `'short' \| 'long' \| 'narrow'`                       | `'short'`   | `'short'` = `km/h`, `'long'` = `kilometers per hour`, `'narrow'` = `kph`.                      |
| `notation`                 | `'standard' \| 'compact' \| 'scientific' \| 'engineering'` | —      | Auto-set by `format`; explicit values still win.                                               |
| `compactDisplay`           | `'short' \| 'long'`                                   | `'short'`   | `'1M'` vs `'1 million'`.                                                                       |
| `minimumFractionDigits`    | `number`                                              | —           |                                                                                                |
| `maximumFractionDigits`    | `number`                                              | —           |                                                                                                |
| `minimumSignificantDigits` | `number`                                              | —           | Mutually exclusive with fraction digits.                                                       |
| `maximumSignificantDigits` | `number`                                              | —           | Mutually exclusive with fraction digits.                                                       |
| `useGrouping`              | `boolean \| 'always' \| 'auto' \| 'min2'`             | `true`      | Thousands-separator behaviour.                                                                 |
| `signDisplay`              | `'auto' \| 'always' \| 'except-zero' \| 'negative' \| 'never'` | `'auto'` | Sign-rendering strategy.                                                                  |
| `tag`                      | `string`                                              | `'span'`    | Root element tag.                                                                              |
| `class`                    | `string \| array \| object`                           | —           |                                                                                                |
| `style`                    | `string \| array \| object`                           | —           |                                                                                                |

### Format matrix

| `format`      | Underlying `Intl.NumberFormat` options                | Output (en-US, value=1234567.89)  |
|---------------|--------------------------------------------------------|-----------------------------------|
| `decimal`     | `style: 'decimal'`                                    | `1,234,567.89`                    |
| `currency`    | `style: 'currency'`, `currency: 'USD'`                | `$1,234,567.89`                   |
| `percent`     | `style: 'percent'`                                    | `123,456,789%`                    |
| `unit`        | `style: 'unit'`, `unit: '<sanctioned>'`               | depends on `unit`                 |
| `compact`     | `style: 'decimal'`, `notation: 'compact'`             | `1.2M`                            |
| `scientific`  | `style: 'decimal'`, `notation: 'scientific'`          | `1.235E6`                         |
| `engineering` | `style: 'decimal'`, `notation: 'engineering'`         | `1.235E6`                         |

## Supported units

The ECMAScript-sanctioned unit list is exposed at runtime via
[`Intl.supportedValuesOf('unit')`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/supportedValuesOf).
Common values: `kilometer-per-hour`, `celsius`, `liter`, `gigabyte`,
`hour`, `meter`, `degree`, `percent`. The full spec list lives in
[ECMA-402 § Table of Sanctioned Units](https://tc39.es/ecma402/#table-sanctioned-single-unit-identifiers).

Compound units (e.g. `meter-per-second`) are formed by combining two
sanctioned identifiers with `-per-`. Anything outside the spec list
throws a `RangeError` at construction time — the composable forwards
the throw to the caller.

## Locale auto-resolution

`locale="auto"` (the default) resolves at format time:

1. **Client** — read `document.documentElement.lang`.
2. **Client (no html lang)** — read `navigator.language`.
3. **SSR** — fall back to `'en-US'`.

The resolution is **not reactive to `<html lang>` mutations**. If the
host app toggles the language at runtime, pass the new tag through the
`locale` prop explicitly (or feed it from `useLocale()` and `<html
lang>` will follow your i18n source).

## Scoped slot

```vue
<origam-number-format
    :value="1234567.89"
    format="currency"
    currency="EUR"
    locale="fr-FR"
>
    <template #default="{ formatted, parts, value }">
        <span
            v-for="(part, index) in parts"
            :key="index"
            :class="`np-${part.type}`"
        >{{ part.value }}</span>
    </template>
</origam-number-format>
```

Bindings:

| Binding     | Type                          | Description                                |
|-------------|-------------------------------|--------------------------------------------|
| `formatted` | `string`                      | Locale-formatted string, ready to render.  |
| `parts`     | `Intl.NumberFormatPart[]`     | Structured segments (currency / integer / decimal / fraction / group / literal / unit / percentSign / minusSign / plusSign / nan / infinity / …). |
| `value`     | `number`                      | The numeric value after coercion.          |

## ARIA

For non-compact formats the visible text is already self-describing
and we emit no `aria-label`. For `format="compact"` / `notation="compact"`
the visible glyph (`1.2M`) elides information that a screen reader
cannot infer — we emit the long-form expansion (`1.2 million`) into
`aria-label` so SR users hear the full value while sighted users still
see the compact glyph.

## Examples

### Composable (no SFC)

```ts
import { useNumberFormat } from '@origam/composables'

const { format, formatToParts, intl } = useNumberFormat({
    locale: 'fr-FR',
    format: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
})

format(1234.5)         // → "1 234,50 €"
formatToParts(1234.5)  // → [{ type: 'integer', value: '1' }, …]
intl.value             // → Intl.NumberFormat — direct API access
```

A module-level LRU (16 entries) caches `Intl.NumberFormat` instances
keyed on the serialised options — repeated calls with the same locale
/ format are free.

### Reactive options (Vue refs)

```ts
const locale = ref<'fr-FR' | 'en-US'>('fr-FR')
const { format } = useNumberFormat(computed(() => ({
    locale: locale.value,
    format: 'currency',
    currency: 'EUR'
})))

// `format()` re-resolves the Intl instance when `locale` mutates.
```

## i18n notes

- `Intl.NumberFormat` ships with every modern browser (Chrome 24+,
  Firefox 29+, Safari 10+, Node 13+) — no polyfill required.
- Whitespace varies across engines: NBSP (`U+00A0`) and NNBSP
  (`U+202F`) are common between the integer and currency / unit
  segments. Avoid asserting on raw glyphs in tests — normalise
  whitespace to ASCII space first.
- The `useGrouping` string variants (`'always'` / `'auto'` / `'min2'`)
  require Chrome 106+, Firefox 110+, Safari 16.4+. Older engines fall
  back to the boolean meaning of "any truthy value enables grouping".
