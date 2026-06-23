import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_CONTRAST_UTIL_DOC: IUtilDoc = {
    slug: 'get-contrast',
    name: 'getContrast',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_contrast.description',
    descriptionFallback: 'Computes the WCAG 2 contrast ratio between two colors. A ratio of 4.5 meets AA for normal text; 3.0 meets AA for large text.',
    signature: `function getContrast(first: TColorType, second: TColorType): number`,
    params: [
        {
            name: 'first',
            type: 'TColorType',
            required: true,
            descriptionKey: 'utils.detail.get_contrast.param_first',
            descriptionFallback: 'The first color — any format accepted by parseColor (#hex, rgb(), hsl(), number, RGBA/HSLA object).',
        },
        {
            name: 'second',
            type: 'TColorType',
            required: true,
            descriptionKey: 'utils.detail.get_contrast.param_second',
            descriptionFallback: 'The second color — same formats as first.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.get_contrast.returns',
        descriptionFallback: 'The WCAG 2 contrast ratio (1–21). Higher is better; 4.5 = AA for normal text, 7 = AAA.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_contrast.example_basic',
            titleFallback: 'Check contrast between two colors',
            code: `import { getContrast } from 'origam'

const ratio = getContrast('#ffffff', '#1a1a2e')
// ratio ≈ 17.5 (AAA)

const poor = getContrast('#aaaaaa', '#bbbbbb')
// poor  ≈ 1.2 (fails AA)`,
            lang: 'typescript',
        },
    ],
    related: ['get-foreground'],
}
