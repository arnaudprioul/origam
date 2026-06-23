import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const MAIN_TRC_CONST_DOC: IConstDoc = {
    slug: 'main-trc',
    name: 'MAIN_TRC',
    category: 'Color & Contrast',
    descriptionKey: 'consts.catalog.main_trc.description',
    descriptionFallback: 'Gamma exponent (Tone Response Curve) for the sRGB linearisation used in APCA contrast calculations. The value 2.4 is the IEC 61966-2-1 standard exponent for sRGB.',
    definition: `export const MAIN_TRC = 2.4`,
    value: '2.4',
    usedBy: [
        { name: 'useContrast' },
        { name: 'useColor' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.main_trc.example',
            titleFallback: 'sRGB linearisation with MAIN_TRC',
            code: `import { MAIN_TRC } from 'origam'

// Convert an sRGB 0–255 channel to a linear light value
const linearise = (channel: number) => {
  const c = channel / 255
  return c <= 0.04045
    ? c / 12.92
    : ((c + 0.055) / 1.055) ** MAIN_TRC
}`,
            lang: 'typescript',
        },
    ],
}
