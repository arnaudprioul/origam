import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const NULLIFY_TRANSFORMS_UTIL_DOC: IUtilDoc = {
    slug: 'nullify-transforms',
    name: 'nullifyTransforms',
    category: 'Commons',
    icon: 'mdi-axis-arrow',
    descriptionKey: 'utils.catalog.nullify_transforms.description',
    descriptionFallback: 'Returns the bounding rect of an element after undoing its CSS transform (matrix / matrix3d). Used to get the true layout position regardless of applied transforms.',
    signature: `function nullifyTransforms(el: HTMLElement): IBox`,
    params: [
        {
            name: 'el',
            type: 'HTMLElement',
            required: true,
            descriptionKey: 'utils.detail.nullify_transforms.param_el',
            descriptionFallback: 'The element whose transform-corrected bounding rect is computed.',
        },
    ],
    returns: {
        type: 'IBox',
        descriptionKey: 'utils.detail.nullify_transforms.returns',
        descriptionFallback: 'An IBox (top, left, width, height, bottom, right) representing the element\'s position in the viewport as if no transform had been applied.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/animation.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.nullify_transforms.example_basic',
            titleFallback: 'Get layout position ignoring CSS transforms',
            code: `import { nullifyTransforms } from 'origam'

const el = document.querySelector('.scaled-card') as HTMLElement
const box = nullifyTransforms(el)
// box.top / box.left reflect pre-transform position`,
            lang: 'typescript',
        },
    ],
    related: ['get-offset-position', 'element-to-viewport'],
}
