import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const BINARY_CLOSEST_UTIL_DOC: IUtilDoc = {
    slug: 'binary-closest',
    name: 'binaryClosest',
    category: 'Commons',
    icon: 'mdi-format-list-numbered',
    descriptionKey: 'utils.catalog.binary_closest.description',
    descriptionFallback: 'Binary search a sorted array of numbers to find the index of the element closest to (but not exceeding) a target value. Used internally by virtual scroll lists.',
    signature: 'function binaryClosest(arr: ArrayLike<number>, val: number): number',
    params: [
        {
            name: 'arr',
            type: 'ArrayLike<number>',
            required: true,
            descriptionKey: 'utils.detail.binary_closest.param_arr',
            descriptionFallback: 'A sorted (ascending) array-like of numbers, e.g. the cumulative heights of virtual list items.',
        },
        {
            name: 'val',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.binary_closest.param_val',
            descriptionFallback: 'The target value to search for. The function returns the last index whose element does not exceed this value.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.binary_closest.returns',
        descriptionFallback: 'Index of the closest element ≤ val, or the last index when val exceeds all elements.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/virtual.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.binary_closest.example_basic',
            titleFallback: 'Find the closest cumulative offset',
            code: `import { binaryClosest } from 'origam'

// Cumulative item heights: [0, 40, 80, 120, 160]
const offsets = [0, 40, 80, 120, 160]
binaryClosest(offsets, 90)  // → 2 (80 ≤ 90)
binaryClosest(offsets, 40)  // → 1
binaryClosest(offsets, 200) // → 4 (last index)`,
            lang: 'typescript',
        },
    ],
    related: ['calculate-updated-target', 'calculate-centered-target'],
}
