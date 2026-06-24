import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const PREDEFINED_DENSITY_CONST_DOC: IConstDoc = {
    slug: 'predefined-density',
    name: 'PREDEFINED_DENSITY',
    category: 'Commons',
    descriptionKey: '',
    descriptionFallback: '',
    definition: `export const PREDEFINED_DENSITY: Array<TDensity> = [
    DENSITY.DEFAULT,
    DENSITY.COMPACT,
    DENSITY.COMFORTABLE
];`,
    values: [
        { value: 'DENSITY.DEFAULT', descriptionKey: '', descriptionFallback: '' },
        { value: 'DENSITY.COMPACT', descriptionKey: '', descriptionFallback: '' },
        { value: 'DENSITY.COMFORTABLE', descriptionKey: '', descriptionFallback: '' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/consts/Commons/density.const.ts',
    examples: [],
}
