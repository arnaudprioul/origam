import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const SIZES_ARRAY_CONST_DOC: IConstDoc = {
    slug: 'sizes-array',
    name: 'SIZES_ARRAY',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.sizes_array.description',
    descriptionFallback: 'Ordered list of the five standard size values (x-small → x-large) used by the `size` prop across components. Useful for iterating the complete size matrix in stories and validation helpers.',
    definition: `export const SIZES_ARRAY: Array<TSize> = [
    SIZES.X_SMALL,
    SIZES.SMALL,
    SIZES.DEFAULT,
    SIZES.LARGE,
    SIZES.X_LARGE
]`,
    values: [
        { value: 'SIZES.X_SMALL', descriptionKey: 'consts.detail.sizes_array.x_small', descriptionFallback: 'Extra-small size.' },
        { value: 'SIZES.SMALL', descriptionKey: 'consts.detail.sizes_array.small', descriptionFallback: 'Small size.' },
        { value: 'SIZES.DEFAULT', descriptionKey: 'consts.detail.sizes_array.default', descriptionFallback: 'Default / medium size.' },
        { value: 'SIZES.LARGE', descriptionKey: 'consts.detail.sizes_array.large', descriptionFallback: 'Large size.' },
        { value: 'SIZES.X_LARGE', descriptionKey: 'consts.detail.sizes_array.x_large', descriptionFallback: 'Extra-large size.' },
    ],
    usedBy: [
        { name: 'useSize' },
        { name: 'OrigamSvgIcon' },
        { name: 'OrigamClassIcon' },
        { name: 'OrigamLigatureIcon' },
        { name: 'OrigamComponentIcon' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/size.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.sizes_array.example',
            titleFallback: 'Validating a size value',
            code: `import { SIZES_ARRAY } from 'origam'

const isValidSize = (value: string) =>
  SIZES_ARRAY.includes(value as never)`,
            lang: 'typescript',
        },
    ],
}
