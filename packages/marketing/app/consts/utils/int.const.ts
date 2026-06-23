import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const INT_UTIL_DOC: IUtilDoc = {
    slug: 'int',
    name: 'int',
    category: 'Commons',
    icon: 'mdi-numeric',
    descriptionKey: 'utils.catalog.int.description',
    descriptionFallback: 'Thin wrapper around parseInt with a default radix of 10. Accepts both string and number inputs.',
    signature: 'function int(value: string | number, radix: number = 10): number',
    params: [
        {
            name: 'value',
            type: 'string | number',
            required: true,
            descriptionKey: 'utils.detail.int.param_value',
            descriptionFallback: 'The value to parse. Strings are parsed as integers; numbers are passed to parseInt directly.',
        },
        {
            name: 'radix',
            type: 'number',
            required: false,
            defaultValue: '10',
            descriptionKey: 'utils.detail.int.param_radix',
            descriptionFallback: 'The base for the parseInt call. Defaults to 10 (decimal). Use 16 for hex strings.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.int.returns',
        descriptionFallback: 'The parsed integer. Returns NaN for non-numeric input (same as parseInt behaviour).',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.int.example_basic',
            titleFallback: 'Parse integers from strings',
            code: `import { int } from 'origam'

int('42')        // → 42
int('0xff', 16)  // → 255
int(3.9)         // → 3`,
            lang: 'typescript',
        },
    ],
    related: ['get-decimals', 'clamp'],
}
