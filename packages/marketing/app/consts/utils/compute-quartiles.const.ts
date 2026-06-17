import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const COMPUTE_QUARTILES_UTIL_DOC: IUtilDoc = {
    slug: 'compute-quartiles',
    name: 'computeQuartiles',
    category: 'Chart',
    icon: 'mdi-chart-box-outline',
    descriptionKey: 'utils.catalog.compute_quartiles.description',
    descriptionFallback: 'Computes the five-number Tukey summary (min, Q1, median, Q3, max) plus IQR and outlier list for a sample array. Non-finite values are filtered out before computation.',
    signature: `function computeQuartiles(samples: Array<number>): IBoxPlotStats`,
    params: [
        {
            name: 'samples',
            type: 'Array<number>',
            required: true,
            descriptionKey: 'utils.detail.compute_quartiles.param_samples',
            descriptionFallback: 'Array of numeric observations. Need not be pre-sorted; may be empty. Non-finite values (NaN, Infinity) are ignored.',
        },
    ],
    returns: {
        type: 'IBoxPlotStats',
        descriptionKey: 'utils.detail.compute_quartiles.returns',
        descriptionFallback: 'An object with min, q1, median, q3, max, iqr, and outliers. Returns all-zero stats when the filtered sample set is empty.',
    },
    sourceFile: 'packages/ds/src/utils/Chart/box-plot.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.compute_quartiles.example_basic',
            titleFallback: 'Box-plot stats for a dataset',
            code: `import { computeQuartiles } from 'origam'

const stats = computeQuartiles([1, 2, 3, 4, 5, 100])
// stats.median → 3.5
// stats.outliers → [100]`,
            lang: 'typescript',
        },
    ],
    related: [],
}
