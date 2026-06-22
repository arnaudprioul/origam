import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_USE_NUMBER_FORMAT_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-use-number-format-options',
    name: 'IUseNumberFormatOptions',
    category: 'Composable Options',
    descriptionKey: 'interfaces.catalog.i_use_number_format_options.description',
    descriptionFallback: 'Options accepted by useNumberFormat. Mirrors the public props of OrigamNumberFormat minus the wiring concerns (tag, class, style), forwarded directly to Intl.NumberFormat.',
    definition: `export interface IUseNumberFormatOptions {
    format?: TNumberFormatFormat
    locale?: TNumberFormatLocale
    currency?: string
    currencyDisplay?: TNumberFormatCurrencyDisplay
    unit?: string
    unitDisplay?: TNumberFormatUnitDisplay
    notation?: TNumberFormatNotation
    compactDisplay?: TNumberFormatCompactDisplay
    minimumFractionDigits?: number
    maximumFractionDigits?: number
    minimumSignificantDigits?: number
    maximumSignificantDigits?: number
    useGrouping?: TNumberFormatUseGrouping
    signDisplay?: TNumberFormatSignDisplay
}`,
    extends: [],
    props: [
        { name: 'format', type: 'TNumberFormatFormat', optional: true, default: "'decimal'", descriptionFallback: 'High-level format dialect: decimal, currency, unit, percent, compact, scientific, engineering.' },
        { name: 'locale', type: 'TNumberFormatLocale', optional: true, default: "'auto'", descriptionFallback: 'BCP-47 locale tag (or array for fallback chains). The literal string "auto" triggers runtime resolution.' },
        { name: 'currency', type: 'string', optional: true, descriptionFallback: 'ISO 4217 currency code. Required when format === "currency".' },
        { name: 'currencyDisplay', type: 'TNumberFormatCurrencyDisplay', optional: true, default: "'symbol'", descriptionFallback: 'Currency-symbol rendering: symbol, narrowSymbol, code, or name.' },
        { name: 'unit', type: 'string', optional: true, descriptionFallback: 'ECMAScript-sanctioned unit identifier. Required when format === "unit".' },
        { name: 'unitDisplay', type: 'TNumberFormatUnitDisplay', optional: true, default: "'short'", descriptionFallback: 'Unit-label rendering: short, long, or narrow.' },
        { name: 'notation', type: 'TNumberFormatNotation', optional: true, descriptionFallback: 'Raw notation override: standard, scientific, engineering, compact.' },
        { name: 'compactDisplay', type: 'TNumberFormatCompactDisplay', optional: true, default: "'short'", descriptionFallback: 'Compact-notation rendering: short or long. Only honoured when notation === "compact".' },
        { name: 'minimumFractionDigits', type: 'number', optional: true, descriptionFallback: 'Minimum digits after the decimal point.' },
        { name: 'maximumFractionDigits', type: 'number', optional: true, descriptionFallback: 'Maximum digits after the decimal point.' },
        { name: 'minimumSignificantDigits', type: 'number', optional: true, descriptionFallback: 'Minimum significant digits (mutually exclusive with fraction digits).' },
        { name: 'maximumSignificantDigits', type: 'number', optional: true, descriptionFallback: 'Maximum significant digits (mutually exclusive with fraction digits).' },
        { name: 'useGrouping', type: 'TNumberFormatUseGrouping', optional: true, default: 'true', descriptionFallback: 'Thousands-separator behaviour: true/auto, false, always, min2.' },
        { name: 'signDisplay', type: 'TNumberFormatSignDisplay', optional: true, default: "'auto'", descriptionFallback: 'Sign-display strategy: auto, always, except-zero, negative, never.' },
    ],
    usedBy: [
        { slug: 'use-number-format', name: 'useNumberFormat', kind: 'composable' },
        { slug: 'number-format', name: 'NumberFormat', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/NumberFormat/number-format.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_use_number_format_options.example',
            titleFallback: 'Formatting a currency value with useNumberFormat',
            code: `const { formatted } = useNumberFormat(1234567.89, {
    format: 'currency',
    currency: 'EUR',
    locale: 'fr-FR',
})`,
            lang: 'typescript',
        },
    ],
}
