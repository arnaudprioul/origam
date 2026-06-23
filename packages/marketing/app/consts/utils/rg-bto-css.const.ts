import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const RG_BTO_CSS_UTIL_DOC: IUtilDoc = {
    slug: 'rg-bto-css',
    name: 'RGBtoCSS',
    category: 'Color',
    icon: 'mdi-palette-outline',
    descriptionKey: 'utils.catalog.rg_bto_css.description',
    descriptionFallback: 'Serialize an sRGB object to a CSS rgb() or rgba() string. Emits rgba() only when the alpha property is defined.',
    signature: `function RGBtoCSS({ r, g, b, a }: TRGBA): string`,
    params: [
        {
            name: '{ r, g, b, a }',
            type: 'TRGBA',
            required: true,
            descriptionKey: 'utils.detail.rg_bto_css.param_rgba',
            descriptionFallback: 'sRGB colour object. r, g, b must be integers in [0, 255]. a (optional) is a decimal in [0, 1].',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.rg_bto_css.returns',
        descriptionFallback: '"rgb(r, g, b)" when alpha is undefined; "rgba(r, g, b, a)" when alpha is provided.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.rg_bto_css.example_basic',
            titleFallback: 'Opaque and semi-transparent colours',
            code: `import { RGBtoCSS } from 'origam'

RGBtoCSS({ r: 255, g: 0, b: 0 })
// → 'rgb(255, 0, 0)'

RGBtoCSS({ r: 255, g: 0, b: 0, a: 0.5 })
// → 'rgba(255, 0, 0, 0.5)'`,
            lang: 'typescript',
        },
    ],
    related: ['hs-vto-css', 'rg-bto-hex'],
}
