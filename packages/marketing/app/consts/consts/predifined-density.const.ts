import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const PREDIFINED_DENSITY_CONST_DOC: IConstDoc = {
    slug: 'predifined-density',
    name: 'PREDIFINED_DENSITY',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.predifined_density.description',
    descriptionFallback: 'The list of allowed density values (default, compact, comfortable) used to validate and iterate the density prop across components.',
    definition: `export const PREDIFINED_DENSITY: Array<TDensity> = [
    DENSITY.DEFAULT,
    DENSITY.COMPACT,
    DENSITY.COMFORTABLE
]`,
    values: [
        { value: 'DENSITY.DEFAULT', descriptionKey: 'consts.detail.predifined_density.default', descriptionFallback: 'Standard padding — balanced for most contexts.' },
        { value: 'DENSITY.COMPACT', descriptionKey: 'consts.detail.predifined_density.compact', descriptionFallback: 'Reduced padding — useful in tables and toolbars.' },
        { value: 'DENSITY.COMFORTABLE', descriptionKey: 'consts.detail.predifined_density.comfortable', descriptionFallback: 'Increased padding — comfortable for forms and cards.' },
    ],
    usedBy: [
        { name: 'useDensity' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/density.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.predifined_density.example',
            titleFallback: 'Validating a density value',
            code: `import { PREDIFINED_DENSITY } from 'origam'

const isValid = (value: string) =>
  PREDIFINED_DENSITY.includes(value as never)`,
            lang: 'typescript',
        },
    ],
}
