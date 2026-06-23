import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const ANCHOR_TO_POINT_UTIL_DOC: IUtilDoc = {
    slug: 'anchor-to-point',
    name: 'anchorToPoint',
    category: 'Commons',
    icon: 'mdi-map-marker-outline',
    descriptionKey: 'utils.catalog.anchor_to_point.description',
    descriptionFallback: 'Convert a parsed anchor descriptor (side + align) into an absolute viewport-space point relative to the given bounding box.',
    signature: 'function anchorToPoint(anchor: TParsedAnchor, box: IBox): TViewportPoint',
    params: [
        {
            name: 'anchor',
            type: 'TParsedAnchor',
            required: true,
            descriptionKey: 'utils.detail.anchor_to_point.param_anchor',
            descriptionFallback: 'A parsed anchor object with a side (top | bottom | left | right) and an align value specifying the cross-axis position.',
        },
        {
            name: 'box',
            type: 'IBox',
            required: true,
            descriptionKey: 'utils.detail.anchor_to_point.param_box',
            descriptionFallback: 'The bounding box (x, y, width, height) of the reference element.',
        },
    ],
    returns: {
        type: 'TViewportPoint',
        descriptionKey: 'utils.detail.anchor_to_point.returns',
        descriptionFallback: 'A viewport-space {x, y} coordinate at the computed anchor position on the bounding box.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/point.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.anchor_to_point.example_basic',
            titleFallback: 'Convert a top-center anchor to a point',
            code: `import { anchorToPoint } from 'origam'

const box = { x: 100, y: 50, width: 200, height: 40 }
const anchor = { side: 'top', align: 'center' }
anchorToPoint(anchor, box)
// → { x: 200, y: 50 }  (center-top in viewport space)`,
            lang: 'typescript',
        },
    ],
    related: ['calculate-centered-target', 'calculate-updated-target'],
}
