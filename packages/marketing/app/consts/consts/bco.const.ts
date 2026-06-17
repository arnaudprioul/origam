import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const BCO_CONST_DOC: IConstDoc = {
    slug: 'bco',
    name: 'BCO',
    category: 'Color & Contrast',
    descriptionKey: 'consts.catalog.bco.description',
    descriptionFallback: 'Blue channel luminance coefficient used in the WCAG relative-luminance formula (IEC 61966-2-1). Combined with RCO and GCO to compute perceptual luminance from linearised RGB values.',
    definition: `export const BCO = 0.0721750`,
    value: '0.0721750',
    usedBy: [
        { name: 'useColor' },
        { name: 'useContrastRatio' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.bco.example',
            titleFallback: 'Computing WCAG relative luminance',
            code: `import { RCO, GCO, BCO } from 'origam'

// linearR, linearG, linearB are gamma-expanded (0–1)
const luminance = RCO * linearR + GCO * linearG + BCO * linearB`,
            lang: 'typescript',
        },
    ],
}
