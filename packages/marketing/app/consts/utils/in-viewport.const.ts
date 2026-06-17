import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IN_VIEWPORT_UTIL_DOC: IUtilDoc = {
    slug: 'in-viewport',
    name: 'inViewport',
    category: 'Commons',
    icon: 'mdi-eye-outline',
    descriptionKey: 'utils.catalog.in_viewport.description',
    descriptionFallback: 'Returns true if a bounding box (IBox or DOMRect) is at least partially visible in the current viewport.',
    signature: 'function inViewport(element: IBox | DOMRect): boolean',
    params: [
        {
            name: 'element',
            type: 'IBox | DOMRect',
            required: true,
            descriptionKey: 'utils.detail.in_viewport.param_element',
            descriptionFallback: 'A bounding box with top, right, bottom, left properties. Typically obtained via element.getBoundingClientRect().',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.in_viewport.returns',
        descriptionFallback: 'true when any part of the box is within the viewport boundaries; false otherwise.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/point.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.in_viewport.example_basic',
            titleFallback: 'Check element visibility on scroll',
            code: `import { inViewport } from 'origam'

const rect = myElement.getBoundingClientRect()
if (inViewport(rect)) {
  console.log('Element is visible')
}`,
            lang: 'typescript',
        },
    ],
    related: ['get-center', 'element-to-viewport'],
}
