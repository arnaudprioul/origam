import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const PIXEL_CEIL_UTIL_DOC: IUtilDoc = {
    slug: 'pixel-ceil',
    name: 'pixelCeil',
    category: 'Commons',
    icon: 'mdi-arrow-up-bold-box-outline',
    descriptionKey: 'utils.catalog.pixel_ceil.description',
    descriptionFallback: 'Ceil a sub-pixel value to the nearest physical pixel boundary using `devicePixelRatio`. Prevents layout rounding errors in high-DPI positioning calculations.',
    signature: `function pixelCeil(val: number): number`,
    params: [
        {
            name: 'val',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.pixel_ceil.param_val',
            descriptionFallback: 'A CSS pixel value (fractional or whole). Multiplied by `devicePixelRatio`, ceiled, then divided back to get the nearest physical-pixel boundary.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.pixel_ceil.returns',
        descriptionFallback: 'The input ceiled to the nearest physical pixel grid line in CSS pixel units.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/location.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.pixel_ceil.example_basic',
            titleFallback: 'Ceil to physical pixel (2x display)',
            code: `import { pixelCeil } from 'origam'

// devicePixelRatio = 2
pixelCeil(10.1)   // → 10.5  (next 0.5-px boundary)
pixelCeil(10.5)   // → 10.5
pixelCeil(10.6)   // → 11`,
            lang: 'typescript',
        },
    ],
    related: ['pixel-round'],
}
