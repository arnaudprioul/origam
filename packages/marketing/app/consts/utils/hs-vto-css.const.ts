import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const HS_VTO_CSS_UTIL_DOC: IUtilDoc = {
    slug: 'hs-vto-css',
    name: 'HSVtoCSS',
    category: 'Color',
    icon: 'mdi-palette-outline',
    descriptionKey: 'utils.catalog.hs_vto_css.description',
    descriptionFallback: 'Convert an HSV colour to a CSS rgb() or rgba() string. Delegates to HSVtoRGB then RGBtoCSS.',
    signature: `function HSVtoCSS(hsva: THSVA): string`,
    params: [
        {
            name: 'hsva',
            type: 'THSVA',
            required: true,
            descriptionKey: 'utils.detail.hs_vto_css.param_hsva',
            descriptionFallback: 'Colour in HSV space with optional alpha. h in [0, 360], s and v in [0, 1], a in [0, 1].',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.hs_vto_css.returns',
        descriptionFallback: 'CSS colour string: "rgb(r, g, b)" when alpha is undefined, "rgba(r, g, b, a)" otherwise.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.hs_vto_css.example_basic',
            titleFallback: 'HSV to CSS string',
            code: `import { HSVtoCSS } from 'origam'

HSVtoCSS({ h: 0, s: 1, v: 1, a: 0.5 })
// → 'rgba(255, 0, 0, 0.5)'`,
            lang: 'typescript',
        },
    ],
    related: ['hs-vto-rgb', 'rg-bto-css'],
}
