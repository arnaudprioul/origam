import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const COLOR_DELTA_CONST_DOC: IConstDoc = {
    slug: 'color-delta',
    name: 'COLOR_DELTA',
    category: 'Color',
    descriptionKey: 'consts.catalog.color_delta.description',
    descriptionFallback: 'CIE delta constant (6÷29 ≈ 0.2069) used as the threshold and scaling factor in CIELAB_FORWARD_TRANSFORM and CIELAB_REVERSE_TRANSFORM. Derived from the 6/29 ratio defined in the CIE 1976 standard.',
    definition: `export const COLOR_DELTA = 0.20689655172413793 // 6÷29`,
    value: '0.20689655172413793',
    usedBy: [
        { name: 'CIELAB_FORWARD_TRANSFORM' },
        { name: 'CIELAB_REVERSE_TRANSFORM' },
        { name: 'useColor' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.color_delta.example',
            titleFallback: 'Using COLOR_DELTA as the CIE Lab threshold',
            code: `import { COLOR_DELTA } from 'origam'

// Reproduce the forward piecewise function
const f = (t: number) =>
  t > COLOR_DELTA ** 3 ? Math.cbrt(t) : t / (3 * COLOR_DELTA ** 2) + 4 / 29`,
            lang: 'typescript',
        },
    ],
}
