import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const COLOR_HOVER_MIX_PCT_CONST_DOC: IConstDoc = {
    slug: 'color-hover-mix-pct',
    name: 'COLOR_HOVER_MIX_PCT',
    category: 'Color',
    descriptionKey: 'consts.catalog.color_hover_mix_pct.description',
    descriptionFallback: 'Percentage of black mixed into the rest-state background color to derive the hover surface. Used as math fallback when no designer-tuned bgHover token exists.',
    definition: `export const COLOR_HOVER_MIX_PCT = 20`,
    value: '20',
    usedBy: [
        { name: 'useColorEffect' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.color_hover_mix_pct.example',
            titleFallback: 'Computing a hover color via color-mix fallback',
            code: `import { COLOR_HOVER_MIX_PCT } from 'origam'

// color-mix(in srgb, currentColor \${COLOR_HOVER_MIX_PCT}%, transparent)
const hoverStyle = \`color-mix(in srgb, currentColor \${COLOR_HOVER_MIX_PCT}%, transparent)\``,
            lang: 'typescript',
        },
    ],
}
