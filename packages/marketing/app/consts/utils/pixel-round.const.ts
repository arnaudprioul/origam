import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const PIXEL_ROUND_UTIL_DOC: IUtilDoc = {
    slug: 'pixel-round',
    name: 'pixelRound',
    category: 'Commons',
    icon: 'mdi-decimal',
    descriptionKey: 'utils.catalog.pixel_round.description',
    descriptionFallback: 'Round a sub-pixel value to the nearest physical pixel boundary using `devicePixelRatio`. Prevents blurry rendering on high-DPI screens when positioning overlays and tooltips.',
    signature: `function pixelRound(val: number): number`,
    params: [
        {
            name: 'val',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.pixel_round.param_val',
            descriptionFallback: 'A CSS pixel value (fractional or whole). Multiplied by `devicePixelRatio`, rounded, then divided back to the nearest physical-pixel boundary.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.pixel_round.returns',
        descriptionFallback: 'The input rounded to the nearest physical pixel grid line in CSS pixel units.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/location.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.pixel_round.example_basic',
            titleFallback: 'Round to physical pixel (2x display)',
            code: `import { pixelRound } from 'origam'

// devicePixelRatio = 2
pixelRound(10.1)   // → 10    (rounds down to 0.5-px grid)
pixelRound(10.3)   // → 10.5  (rounds up)
pixelRound(10.75)  // → 11`,
            lang: 'typescript',
        },
    ],
    related: ['pixel-ceil'],
}
