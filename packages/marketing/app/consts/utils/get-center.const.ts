import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_CENTER_UTIL_DOC: IUtilDoc = {
    slug: 'get-center',
    name: 'getCenter',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_center.description',
    descriptionFallback: 'Returns the geometric centre point {x, y} of a bounding box or DOMRect. Both coordinates are zero when the element is null.',
    signature: `function getCenter(element: IBox | DOMRect): TPoint`,
    params: [
        {
            name: 'element',
            type: 'IBox | DOMRect',
            required: true,
            descriptionKey: 'utils.detail.get_center.param_element',
            descriptionFallback: 'A bounding-box descriptor (IBox) or a native DOMRect. When falsy, both returned coordinates are 0.',
        },
    ],
    returns: {
        type: 'TPoint',
        descriptionKey: 'utils.detail.get_center.returns',
        descriptionFallback: 'An object { x, y } representing the centre of the element in the same coordinate space as the input.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/point.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_center.example_basic',
            titleFallback: 'Centre of a DOMRect',
            code: `import { getCenter } from 'origam'

const rect = el.getBoundingClientRect()
const center = getCenter(rect)
// center.x === rect.width / 2
// center.y === rect.height / 2`,
            lang: 'typescript',
        },
    ],
    related: ['get-dimensions', 'get-intrinsic-size'],
}
