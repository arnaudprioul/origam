import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_NUMBER_FORMAT_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-number-format-props',
    name: 'INumberFormatProps',
    category: 'NumberFormat',
    descriptionKey: '',
    descriptionFallback: `Props for \`<OrigamNumberFormat>\` — pure-display i18n number renderer
powered by \`Intl.NumberFormat\` (zero external dep).

The component owns NO state: it transforms \`value\` through the
resolved \`Intl\` instance and emits the result into a \`<tag>\` element
(default \`<span>\`). Consumers who want to override the rendering
granularly use the scoped \`#default\` slot which exposes
\`{ formatted, parts, value }\`.`,
    definition: `export interface INumberFormatProps extends ICommonsComponentProps, ITagProps {
    value: number | string;
    format?: TNumberFormatFormat;
    locale?: TNumberFormatLocale;
    currency?: string;
    currencyDisplay?: TNumberFormatCurrencyDisplay;
    unit?: string;
    unitDisplay?: TNumberFormatUnitDisplay;
    notation?: TNumberFormatNotation;
    compactDisplay?: TNumberFormatCompactDisplay;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    minimumSignificantDigits?: number;
    maximumSignificantDigits?: number;
    useGrouping?: TNumberFormatUseGrouping;
    signDisplay?: TNumberFormatSignDisplay;
}`,
    extends: ['ICommonsComponentProps', 'ITagProps'],
    props: [
        { name: 'value', type: 'number | string', optional: false, descriptionFallback: `Number to render. Strings are parsed via \`Number()\` — callers can
pass a stringified BigInt-like to preserve precision before
coercion (the actual formatting still goes through \`Number\`, so
values beyond \`Number.MAX_SAFE_INTEGER\` may lose accuracy).` },
        { name: 'format', type: 'TNumberFormatFormat', optional: true, descriptionFallback: 'High-level format dialect — see `TNumberFormatFormat`.' },
        { name: 'locale', type: 'TNumberFormatLocale', optional: true, descriptionFallback: `BCP-47 locale tag (or array, for fallback chains). The literal
string \`'auto'\` triggers the runtime resolution chain (\`<html
lang>\` → \`navigator.language\` → \`'en-US'\`).` },
        { name: 'currency', type: 'string', optional: true, descriptionFallback: `ISO 4217 currency code. Required when \`format === 'currency'\`; we
fall back to \`'USD'\` rather than throwing so storybook controls
remain forgiving.` },
        { name: 'currencyDisplay', type: 'TNumberFormatCurrencyDisplay', optional: true, descriptionFallback: `Currency-symbol rendering — \`'symbol'\` (\`$\`), \`'narrowSymbol'\`
(\`$\` instead of \`US$\`), \`'code'\` (\`USD\`) or \`'name'\`
(\`US dollar\`).` },
        { name: 'unit', type: 'string', optional: true, descriptionFallback: `Sanctioned unit identifier (e.g. \`'kilometer-per-hour'\`,
\`'celsius'\`, \`'liter'\`). Required when \`format === 'unit'\`. The
full ECMAScript-sanctioned list is exposed under
\`Intl.supportedValuesOf('unit')\` at runtime.` },
        { name: 'unitDisplay', type: 'TNumberFormatUnitDisplay', optional: true, descriptionFallback: `Unit-label rendering — \`'short'\` (\`km/h\`), \`'long'\`
(\`kilometers per hour\`) or \`'narrow'\` (\`kph\`).` },
        { name: 'notation', type: 'TNumberFormatNotation', optional: true, descriptionFallback: `Raw \`notation\` override. Auto-set to \`'compact'\` when \`format ===
'compact'\`, to \`'scientific'\` / \`'engineering'\` for the matching
formats. Explicit values still win — useful for \`format:
'decimal'\` with \`notation: 'scientific'\`.` },
        { name: 'compactDisplay', type: 'TNumberFormatCompactDisplay', optional: true, descriptionFallback: `Compact-notation rendering — \`'short'\` (\`1M\`) or \`'long'\`
(\`1 million\`). Only honoured when \`notation === 'compact'\`.` },
        { name: 'minimumFractionDigits', type: 'number', optional: true, descriptionFallback: 'Minimum digits after the decimal point.' },
        { name: 'maximumFractionDigits', type: 'number', optional: true, descriptionFallback: 'Maximum digits after the decimal point.' },
        { name: 'minimumSignificantDigits', type: 'number', optional: true, descriptionFallback: 'Minimum significant digits (mutually exclusive with fraction digits).' },
        { name: 'maximumSignificantDigits', type: 'number', optional: true, descriptionFallback: 'Maximum significant digits (mutually exclusive with fraction digits).' },
        { name: 'useGrouping', type: 'TNumberFormatUseGrouping', optional: true, descriptionFallback: `Thousands-separator behaviour. \`true\` / \`'auto'\` keep the locale
default, \`false\` removes them, \`'always'\` forces them on, \`'min2'\`
only renders them when the integer part has at least 2 groups.` },
        { name: 'signDisplay', type: 'TNumberFormatSignDisplay', optional: true, descriptionFallback: `Sign-display strategy. \`'auto'\` (default — only negatives),
\`'always'\`, \`'except-zero'\`, \`'negative'\`, \`'never'\`.` },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/NumberFormat/number-format.interface.ts',
    examples: [],
}
