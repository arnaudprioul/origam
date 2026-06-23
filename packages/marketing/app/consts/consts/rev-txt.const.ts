import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const REV_TXT_CONST_DOC: IConstDoc = {
    slug: 'rev-txt',
    name: 'REV_TXT',
    category: 'Color & A11y',
    descriptionKey: 'consts.catalog.rev_txt.description',
    descriptionFallback: 'APCA reverse (white-on-dark) text soft-clamp exponent (0.57). Applied in the APCA contrast algorithm to the light foreground luminance when computing contrast against a dark background.',
    definition: `export const REV_TXT = 0.57`,
    value: '0.57',
    usedBy: [
        { name: 'color.util' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.rev_txt.example',
            titleFallback: 'Using the reverse-text exponent in the APCA pipeline',
            code: `import { REV_TXT } from 'origam'

// Soft-clamp applied to text luminance in dark-bg / light-text scenarios
const sTxt = Math.pow(txt, REV_TXT)`,
            lang: 'typescript',
        },
    ],
}
