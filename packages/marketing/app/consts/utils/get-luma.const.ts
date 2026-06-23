import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_LUMA_UTIL_DOC: IUtilDoc = {
    slug: 'get-luma',
    name: 'getLuma',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_luma.description',
    descriptionFallback: 'Returns the perceptual luminance (Y channel in CIE XYZ space) of a color. Used internally by the contrast checker to decide foreground colour on coloured surfaces.',
    signature: `function getLuma(color: TColorType): number`,
    params: [
        {
            name: 'color',
            type: 'TColorType',
            required: true,
            descriptionKey: 'utils.detail.get_luma.param_color',
            descriptionFallback: 'The color to evaluate. Accepts any format supported by parseColor (hex, rgb, hsl, named CSS colour).',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.get_luma.returns',
        descriptionFallback: 'The relative luminance as a number between 0 (black) and 1 (white).',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_luma.example_basic',
            titleFallback: 'Check luminance to choose a foreground colour',
            code: `import { getLuma } from 'origam'

const luma = getLuma('#1a73e8')  // → ~0.13

// Dark background → use white text
const fgColor = luma < 0.5 ? '#ffffff' : '#000000'`,
            lang: 'typescript',
        },
    ],
    related: ['get-property-from-item'],
}
