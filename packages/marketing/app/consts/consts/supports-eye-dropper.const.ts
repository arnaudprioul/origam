import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const SUPPORTS_EYE_DROPPER_CONST_DOC: IConstDoc = {
    slug: 'supports-eye-dropper',
    name: 'SUPPORTS_EYE_DROPPER',
    category: 'Feature Detection',
    descriptionKey: 'consts.catalog.supports_eye_dropper.description',
    descriptionFallback: 'Boolean feature-detection flag that is `true` when the runtime is a browser AND the `EyeDropper` API is available in `window`. Evaluated once at module initialisation. Used by the color-picker components to conditionally render the eye-dropper button.',
    definition: `export const SUPPORTS_EYE_DROPPER = IN_BROWSER && 'EyeDropper' in window`,
    value: 'boolean (runtime)',
    usedBy: [
        { name: 'OrigamColorPickerPreview' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/commons.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.supports_eye_dropper.example',
            titleFallback: 'Conditionally showing the eye-dropper trigger',
            code: `import { SUPPORTS_EYE_DROPPER } from 'origam'

if (SUPPORTS_EYE_DROPPER) {
  // show eye-dropper button
}`,
            lang: 'typescript',
        },
    ],
}
