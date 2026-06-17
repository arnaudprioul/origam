import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_TARGET_BOX_UTIL_DOC: IUtilDoc = {
    slug: 'get-target-box',
    name: 'getTargetBox',
    category: 'Commons',
    icon: 'mdi-selection',
    descriptionKey: 'utils.catalog.get_target_box.description',
    descriptionFallback: 'Returns a bounding-box descriptor for an activator. For an HTMLElement it delegates to getBoundingClientRect(); for an [x, y] coordinate pair it returns a zero-size IBox centred on that point.',
    signature: `function getTargetBox(
  target: HTMLElement | [x: number, y: number]
): IBox | DOMRect`,
    params: [
        {
            name: 'target',
            type: 'HTMLElement | [x: number, y: number]',
            required: true,
            descriptionKey: 'utils.detail.get_target_box.param_target',
            descriptionFallback: 'An HTMLElement whose DOMRect is retrieved, or a numeric [x, y] pair for virtual/cursor-based positioning.',
        },
    ],
    returns: {
        type: 'IBox | DOMRect',
        descriptionKey: 'utils.detail.get_target_box.returns',
        descriptionFallback: 'A DOMRect for real elements, or a zero-size IBox with the given x/y for coordinate pairs.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/box.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_target_box.example_basic',
            titleFallback: 'Get bounding box from element and from coordinates',
            code: `import { getTargetBox } from 'origam'

const box = getTargetBox(buttonEl)  // → DOMRect
const virtual = getTargetBox([100, 200])  // → IBox { x: 100, y: 200, width: 0, height: 0 }`,
            lang: 'typescript',
        },
    ],
    related: ['get-target', 'get-target-activator'],
}
