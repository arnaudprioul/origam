import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const PREDEFINED_DENSITY_CONST_DOC: IConstDoc = {
    slug: 'predefined-density',
    name: 'PREDEFINED_DENSITY',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.predefined_density.description',
    descriptionFallback: 'The list of allowed density values (default, compact, comfortable) used to validate and iterate the density prop across components.',
    definition: `export const PREDEFINED_DENSITY: Array<TDensity> = [
    DENSITY.DEFAULT,
    DENSITY.COMPACT,
    DENSITY.COMFORTABLE
];`,
    values: [
        { value: 'DENSITY.DEFAULT', descriptionKey: 'consts.detail.predefined_density.default', descriptionFallback: 'Standard padding — balanced for most contexts.' },
        { value: 'DENSITY.COMPACT', descriptionKey: 'consts.detail.predefined_density.compact', descriptionFallback: 'Reduced padding — useful in tables and toolbars.' },
        { value: 'DENSITY.COMFORTABLE', descriptionKey: 'consts.detail.predefined_density.comfortable', descriptionFallback: 'Increased padding — comfortable for forms and cards.' },
    ],
    usedBy: [
        { name: 'useDensity' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/density.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.predefined_density.example',
            titleFallback: 'Validating a density value',
            code: `import { PREDEFINED_DENSITY } from 'origam'

const isValid = (value: string) =>
  PREDEFINED_DENSITY.includes(value as never)`,
            lang: 'typescript',
        },
    ],
}
