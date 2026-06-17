import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const COLOR_ACTIVE_MIX_PCT_CONST_DOC: IConstDoc = {
    slug: 'color-active-mix-pct',
    name: 'COLOR_ACTIVE_MIX_PCT',
    category: 'Color',
    descriptionKey: 'consts.catalog.color_active_mix_pct.description',
    descriptionFallback: 'Percentage of black mixed into the rest-state background color to produce the active (pressed) state. Used as a math-fallback when the designer-tuned bgActive token is absent.',
    definition: `export const COLOR_ACTIVE_MIX_PCT = 30`,
    value: '30',
    usedBy: [
        { name: 'useColor' },
        { name: 'useColorEffect' },
        { name: 'useBackgroundColor' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.color_active_mix_pct.example',
            titleFallback: 'Computing the active darken mix manually',
            code: `import { COLOR_ACTIVE_MIX_PCT } from 'origam'

// color-mix fallback when bgActive token is absent
const activeColor = \`color-mix(in srgb, \${baseColor}, black \${COLOR_ACTIVE_MIX_PCT}%)\``,
            lang: 'typescript',
        },
    ],
}
