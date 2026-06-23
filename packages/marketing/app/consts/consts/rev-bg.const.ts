import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const REV_BG_CONST_DOC: IConstDoc = {
    slug: 'rev-bg',
    name: 'REV_BG',
    category: 'Color & A11y',
    descriptionKey: 'consts.catalog.rev_bg.description',
    descriptionFallback: 'APCA reverse (white-on-dark) background soft-clamp threshold (0.62). Applied in the APCA contrast algorithm when a dark background is paired with a light foreground to normalise the perceptual contrast score.',
    definition: `export const REV_BG = 0.62`,
    value: '0.62',
    usedBy: [
        { name: 'color.util' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.rev_bg.example',
            titleFallback: 'Using the reverse-background threshold in the APCA pipeline',
            code: `import { REV_BG } from 'origam'

// Soft-clamp applied to background luminance in dark-bg / light-text scenarios
const sBg = Math.pow(bg, REV_BG)`,
            lang: 'typescript',
        },
    ],
}
