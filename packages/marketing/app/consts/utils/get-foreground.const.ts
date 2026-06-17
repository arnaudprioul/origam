import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_FOREGROUND_UTIL_DOC: IUtilDoc = {
    slug: 'get-foreground',
    name: 'getForeground',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_foreground.description',
    descriptionFallback: 'Returns "#fff" or "#000" depending on which foreground color produces the best APCA contrast against the given background. Prefers white when both reach the 50 Lc threshold.',
    signature: `function getForeground(color: TColorType): '#fff' | '#000'`,
    params: [
        {
            name: 'color',
            type: 'TColorType',
            required: true,
            descriptionKey: 'utils.detail.get_foreground.param_color',
            descriptionFallback: 'The background color in any format accepted by parseColor (#hex, rgb(), hsl(), RGBA/HSLA object, or number).',
        },
    ],
    returns: {
        type: "'#fff' | '#000'",
        descriptionKey: 'utils.detail.get_foreground.returns',
        descriptionFallback: '"#fff" when white text yields sufficient APCA contrast (Lc ≥ 50) or beats black contrast; "#000" otherwise.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/color.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_foreground.example_basic',
            titleFallback: 'Pick a readable text color',
            code: `import { getForeground } from 'origam'

getForeground('#1a1a2e')  // → '#fff' (dark background)
getForeground('#f5f5f5')  // → '#000' (light background)`,
            lang: 'typescript',
        },
    ],
    related: ['get-contrast'],
}
