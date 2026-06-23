import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const ELEMENT_TO_VIEWPORT_UTIL_DOC: IUtilDoc = {
    slug: 'element-to-viewport',
    name: 'elementToViewport',
    category: 'Commons',
    icon: 'mdi-vector-point',
    descriptionKey: 'utils.catalog.element_to_viewport.description',
    descriptionFallback: 'Converts a point in element-local space to viewport space by adding the element\'s bounding-box offset. Inverse of viewportToElement.',
    signature: `function elementToViewport(point: TElementPoint, offset: TOffset | IBox): TViewportPoint`,
    params: [
        {
            name: 'point',
            type: 'TElementPoint',
            required: true,
            descriptionKey: 'utils.detail.element_to_viewport.param_point',
            descriptionFallback: 'A point in element-local coordinates (x, y relative to the element origin).',
        },
        {
            name: 'offset',
            type: 'TOffset | IBox',
            required: true,
            descriptionKey: 'utils.detail.element_to_viewport.param_offset',
            descriptionFallback: 'The element\'s position in the viewport, expressed as a TOffset { x, y } or IBox (DOMRect-like) whose x/y properties are used.',
        },
    ],
    returns: {
        type: 'TViewportPoint',
        descriptionKey: 'utils.detail.element_to_viewport.returns',
        descriptionFallback: 'The equivalent point in viewport coordinates.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/point.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.element_to_viewport.example_basic',
            titleFallback: 'Convert element-local point to viewport',
            code: `import { elementToViewport } from 'origam'

const rect = document.querySelector('.target')!.getBoundingClientRect()
const vpPoint = elementToViewport({ x: 10, y: 20 }, rect)
// vpPoint → { x: rect.x + 10, y: rect.y + 20 }`,
            lang: 'typescript',
        },
    ],
    related: ['element-movement'],
}
