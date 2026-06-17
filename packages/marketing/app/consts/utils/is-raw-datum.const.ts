import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_RAW_DATUM_UTIL_DOC: IUtilDoc = {
    slug: 'is-raw-datum',
    name: 'isRawDatum',
    category: 'Chart',
    icon: 'mdi-chart-box-outline',
    descriptionKey: 'utils.catalog.is_raw_datum.description',
    descriptionFallback: 'Type guard for the OrigamBoxPlot chart that returns true when a datum carries a raw samples array (unaggregated) rather than pre-computed box-plot statistics (min, q1, median, q3, max).',
    signature: `function isRawDatum(datum: unknown): datum is { category: string, samples: Array<number>, color?: string }`,
    params: [
        {
            name: 'datum',
            type: 'unknown',
            required: true,
            descriptionKey: 'utils.detail.is_raw_datum.param_datum',
            descriptionFallback: 'The data point to inspect. A raw datum must be an object with a samples property that is an Array. Pre-aggregated box-plot objects (with min/q1/median/q3/max fields instead) return false.',
        },
    ],
    returns: {
        type: 'datum is { category: string, samples: Array<number>, color?: string }',
        descriptionKey: 'utils.detail.is_raw_datum.returns',
        descriptionFallback: 'true and narrows the type to the raw-datum shape when the datum has a samples array; false for pre-aggregated or unrecognised data.',
    },
    sourceFile: 'packages/ds/src/utils/Chart/box-plot.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_raw_datum.example_basic',
            titleFallback: 'Branching on raw vs pre-aggregated box-plot data',
            code: `import { isRawDatum } from 'origam'

const raw = { category: 'A', samples: [1, 2, 3, 4, 5] }
const agg = { category: 'B', min: 1, q1: 2, median: 3, q3: 4, max: 5 }

isRawDatum(raw) // → true
isRawDatum(agg) // → false (no samples array)
isRawDatum(null) // → false`,
            lang: 'typescript',
        },
    ],
    related: [],
}
