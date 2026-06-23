import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const VIEWPORT_TO_ELEMENT_UTIL_DOC: IUtilDoc = {
    slug: 'viewport-to-element',
    name: 'viewportToElement',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.viewport_to_element.description',
    descriptionFallback: 'Convert a point expressed in viewport (page) coordinates to the local coordinate space of an element by subtracting the element\'s bounding-box offset.',
    signature: `function viewportToElement(
  point: TViewportPoint,
  offset: TOffset | IBox
): TElementPoint`,
    params: [
        {
            name: 'point',
            type: 'TViewportPoint',
            required: true,
            descriptionKey: 'utils.detail.viewport_to_element.param_point',
            descriptionFallback: 'The { x, y } point in viewport (screen) coordinates, e.g. from a pointer event\'s clientX/clientY.',
        },
        {
            name: 'offset',
            type: 'TOffset | IBox',
            required: true,
            descriptionKey: 'utils.detail.viewport_to_element.param_offset',
            descriptionFallback: 'The element\'s bounding box or a plain { x, y } offset (e.g. from getBoundingClientRect()).',
        },
    ],
    returns: {
        type: 'TElementPoint',
        descriptionKey: 'utils.detail.viewport_to_element.returns',
        descriptionFallback: 'The { x, y } point in the element\'s local coordinate space.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/point.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.viewport_to_element.example_basic',
            titleFallback: 'Translate a click position into element space',
            code: `import { viewportToElement } from 'origam'

el.addEventListener('click', (e) => {
    const box = el.getBoundingClientRect()
    const local = viewportToElement(
        { x: e.clientX, y: e.clientY },
        box
    )
    // local.x / local.y → position relative to el's top-left corner
})`,
            lang: 'typescript',
        },
    ],
    related: ['element-to-viewport', 'get-offset'],
}
