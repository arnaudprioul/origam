import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const NUMBER_FORMAT_DEFAULT_CURRENCY_CONST_DOC: IConstDoc = {
    slug: 'number-format-default-currency',
    name: 'NUMBER_FORMAT_DEFAULT_CURRENCY',
    category: 'Internationalisation',
    descriptionKey: 'consts.catalog.number_format_default_currency.description',
    descriptionFallback: "Default currency code (ISO 4217) used by OrigamNumberFormat when format='currency' and the consumer omits the currency prop. Defaulting to 'USD' rather than throwing keeps story controls forgiving.",
    definition: `export const NUMBER_FORMAT_DEFAULT_CURRENCY = 'USD'`,
    value: "'USD'",
    usedBy: [
        { name: 'OrigamNumberFormat', slug: 'number-format' },
        { name: 'useNumberFormat' },
    ],
    sourceFile: 'packages/ds/src/consts/NumberFormat/number-format.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.number_format_default_currency.example',
            titleFallback: 'Falling back to the default currency',
            code: `import { NUMBER_FORMAT_DEFAULT_CURRENCY } from 'origam'

// When currency prop is not provided:
const currency = props.currency ?? NUMBER_FORMAT_DEFAULT_CURRENCY // 'USD'

// <origam-number-format :value="1234" format="currency" />
// → "$1,234.00" (without explicit currency prop)`,
            lang: 'typescript',
        },
    ],
}
