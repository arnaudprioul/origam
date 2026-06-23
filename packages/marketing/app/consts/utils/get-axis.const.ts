import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_AXIS_UTIL_DOC: IUtilDoc = {
    slug: 'get-axis',
    name: 'getAxis',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_axis.description',
    descriptionFallback: "Return the scroll/layout axis ('x' or 'y') for a parsed anchor object. Block-flow sides (top, bottom) map to the Y axis; inline sides (left, right) map to the X axis.",
    signature: `function getAxis(anchor: TParsedAnchor): 'x' | 'y'`,
    params: [
        {
            name: 'anchor',
            type: 'TParsedAnchor',
            required: true,
            descriptionKey: 'utils.detail.get_axis.param_anchor',
            descriptionFallback: "Parsed anchor object with a 'side' property. Block sides (top/bottom) → 'y'; inline sides (left/right) → 'x'.",
        },
    ],
    returns: {
        type: "'x' | 'y'",
        descriptionKey: 'utils.detail.get_axis.returns',
        descriptionFallback: "The logical axis string: 'y' for vertical (top/bottom), 'x' for horizontal (left/right).",
    },
    sourceFile: 'packages/ds/src/utils/Commons/anchor.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_axis.example_basic',
            titleFallback: 'Determine axis from anchor',
            code: `import { getAxis } from 'origam'

getAxis({ side: 'top', align: 'center' })    // → 'y'
getAxis({ side: 'bottom', align: 'left' })   // → 'y'
getAxis({ side: 'left', align: 'center' })   // → 'x'
getAxis({ side: 'right', align: 'top' })     // → 'x'`,
            lang: 'typescript',
        },
    ],
    related: ['flip-side', 'flip-align', 'flip-corner'],
}
