import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const STRIP_ALPHA_UTIL_DOC: IUtilDoc = {
    slug: 'strip-alpha',
    name: 'stripAlpha',
    category: 'ColorPicker',
    icon: 'mdi-palette-outline',
    descriptionKey: 'utils.catalog.strip_alpha.description',
    descriptionFallback: 'Remove the alpha channel from a colour object when the stripAlpha flag is true. Returns the original object unchanged when the flag is false.',
    signature: `function stripAlpha(color: any, stripAlpha: boolean): any`,
    params: [
        {
            name: 'color',
            type: 'any',
            required: true,
            descriptionKey: 'utils.detail.strip_alpha.param_color',
            descriptionFallback: 'A colour object such as THSVA, TRGBA or THSLA. The function shallow-clones it before deleting the `a` property so the original is not mutated.',
        },
        {
            name: 'stripAlpha',
            type: 'boolean',
            required: true,
            descriptionKey: 'utils.detail.strip_alpha.param_strip_alpha',
            descriptionFallback: 'When true the `a` key is removed from the cloned colour. When false the original colour is returned as-is.',
        },
    ],
    returns: {
        type: 'any',
        descriptionKey: 'utils.detail.strip_alpha.returns',
        descriptionFallback: 'A shallow clone of the colour without the `a` property (stripAlpha=true), or the unchanged colour object (stripAlpha=false).',
    },
    sourceFile: 'packages/ds/src/utils/ColorPicker/color-picker.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.strip_alpha.example_basic',
            titleFallback: 'Stripping alpha from an HSV colour',
            code: `import { stripAlpha } from 'origam'

const hsva = { h: 210, s: 0.8, v: 0.9, a: 0.5 }

stripAlpha(hsva, true)   // → { h: 210, s: 0.8, v: 0.9 }
stripAlpha(hsva, false)  // → { h: 210, s: 0.8, v: 0.9, a: 0.5 }`,
            lang: 'typescript',
        },
    ],
    related: ['extract-color', 'to-hex'],
}
