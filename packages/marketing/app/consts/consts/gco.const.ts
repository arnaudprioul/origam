import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const GCO_CONST_DOC: IConstDoc = {
    slug: 'gco',
    name: 'GCO',
    category: 'Color',
    descriptionKey: 'consts.catalog.gco.description',
    descriptionFallback: 'Green channel coefficient (0.7151522) used in the luminance formula of the APCA contrast algorithm. One of the three sRGB-to-luminance weights alongside RCO (0.2126729) and BCO (0.0721750).',
    definition: `export const GCO = 0.7151522`,
    value: '0.7151522',
    usedBy: [
        { name: 'useColor' },
        { name: 'useColorEffect' },
        { name: 'v-contrast' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.gco.example',
            titleFallback: 'Computing sRGB luminance with APCA coefficients',
            code: `import { RCO, GCO, BCO } from 'origam'

// sRGB luminance — APCA weighted sum
const luminance = (r: number, g: number, b: number) =>
    RCO * r + GCO * g + BCO * b`,
            lang: 'typescript',
        },
    ],
}
