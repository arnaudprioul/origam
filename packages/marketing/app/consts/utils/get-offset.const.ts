import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_OFFSET_UTIL_DOC: IUtilDoc = {
    slug: 'get-offset',
    name: 'getOffset',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_offset.description',
    descriptionFallback: 'Computes the vector difference between two 2-D points (a − b) and returns it as a TOffset {x, y}. Used internally for drag-and-drop and overlay positioning.',
    signature: `function getOffset<T extends TPoint>(a: T, b: T): TOffset`,
    params: [
        {
            name: 'a',
            type: 'T extends TPoint',
            required: true,
            descriptionKey: 'utils.detail.get_offset.param_a',
            descriptionFallback: 'The origin point (minuend). Must have x and y numeric properties.',
        },
        {
            name: 'b',
            type: 'T extends TPoint',
            required: true,
            descriptionKey: 'utils.detail.get_offset.param_b',
            descriptionFallback: 'The reference point (subtrahend). Must have x and y numeric properties.',
        },
    ],
    returns: {
        type: 'TOffset',
        descriptionKey: 'utils.detail.get_offset.returns',
        descriptionFallback: 'A TOffset object { x: a.x − b.x, y: a.y − b.y } describing the displacement from b to a.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/point.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_offset.example_basic',
            titleFallback: 'Compute drag delta between pointer events',
            code: `import { getOffset } from 'origam'

const start = { x: 100, y: 200 }
const end   = { x: 150, y: 180 }

getOffset(end, start) // → { x: 50, y: -20 }`,
            lang: 'typescript',
        },
    ],
    related: ['get-location-offset', 'get-offset-position', 'get-offset-size'],
}
