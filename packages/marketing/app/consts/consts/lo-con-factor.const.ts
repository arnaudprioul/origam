import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const LO_CON_FACTOR_CONST_DOC: IConstDoc = {
    slug: 'lo-con-factor',
    name: 'LO_CON_FACTOR',
    category: 'Internals',
    descriptionKey: 'consts.catalog.lo_con_factor.description',
    descriptionFallback: 'APCA low-contrast region scaling factor (≈ 12.82). Applied in the low-contrast branch of the Lc calculation when the absolute polarity-adjusted contrast falls below LO_CON_THRESH, to linearise the output near zero.',
    definition: `export const LO_CON_FACTOR = 12.82051282051282`,
    value: '12.82051282051282',
    usedBy: [
        { name: 'useColor' },
        { name: 'v-contrast' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.lo_con_factor.example',
            titleFallback: 'Internal APCA usage (informational)',
            code: `import { LO_CON_FACTOR } from 'origam'

// Internal — used inside the APCA Lc computation
const linearisedContrast = (rawLc: number) =>
  (rawLc - LO_CON_OFFSET) * LO_CON_FACTOR`,
            lang: 'typescript',
        },
    ],
}
