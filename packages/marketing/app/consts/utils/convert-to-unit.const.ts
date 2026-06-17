import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const CONVERT_TO_UNIT_UTIL_DOC: IUtilDoc = {
    slug: 'convert-to-unit',
    name: 'convertToUnit',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.convert_to_unit.description',
    descriptionFallback: 'Normalise a CSS length value: numbers become "Npx" (or any unit), CSS strings pass through untouched, and null/empty/non-finite inputs return undefined.',
    signature: `function convertToUnit(str: number, unit?: string): string
function convertToUnit(str: string | number | null | undefined, unit?: string): string | undefined
function convertToUnit(str: string | number | null | undefined, unit = 'px'): string | undefined`,
    params: [
        {
            name: 'str',
            type: 'string | number | null | undefined',
            required: true,
            descriptionKey: 'utils.detail.convert_to_unit.param_str',
            descriptionFallback: 'The raw value to convert. A finite number is suffixed with the unit; a string is returned as-is; null, empty string, or a non-finite number returns undefined.',
        },
        {
            name: 'unit',
            type: 'string',
            required: false,
            defaultValue: "'px'",
            descriptionKey: 'utils.detail.convert_to_unit.param_unit',
            descriptionFallback: 'The CSS unit to append when the input is a numeric value.',
        },
    ],
    returns: {
        type: 'string | undefined',
        descriptionKey: 'utils.detail.convert_to_unit.returns',
        descriptionFallback: 'The normalised CSS length, or undefined when the input is null, empty, or non-finite.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.convert_to_unit.example_basic',
            titleFallback: 'Numbers and CSS strings',
            code: `import { convertToUnit } from 'origam'

convertToUnit(16)        // → '16px'
convertToUnit(2, 'rem')  // → '2rem'
convertToUnit('50vh')    // → '50vh'
convertToUnit(null)      // → undefined`,
            lang: 'typescript',
        },
    ],
    related: ['merge-deep'],
}
