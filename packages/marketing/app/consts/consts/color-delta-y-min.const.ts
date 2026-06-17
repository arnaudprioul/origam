import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const COLOR_DELTA_Y_MIN_CONST_DOC: IConstDoc = {
    slug: 'color-delta-y-min',
    name: 'COLOR_DELTA_Y_MIN',
    category: 'Color',
    descriptionKey: 'consts.catalog.color_delta_y_min.description',
    descriptionFallback: 'Minimum luminance delta (Y) for APCA contrast math. Values below this threshold are clamped to avoid division-by-zero in the contrast-ratio pipeline.',
    definition: `export const COLOR_DELTA_Y_MIN = 0.0005`,
    value: '0.0005',
    usedBy: [
        { name: 'useContrast' },
        { name: 'v-contrast' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.color_delta_y_min.example',
            titleFallback: 'Clamping luminance before APCA division',
            code: `import { COLOR_DELTA_Y_MIN } from 'origam'

const safeLuminance = (y: number) =>
  Math.max(y, COLOR_DELTA_Y_MIN)`,
            lang: 'typescript',
        },
    ],
}
