import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const DENSITY_ENUM_DOC: IEnumDoc = {
    slug: 'density',
    name: 'DENSITY',
    category: 'Layout & Sizing',
    descriptionKey: 'enums.catalog.density.description',
    descriptionFallback: 'TypeScript enum for vertical spacing density (default, compact, comfortable).',
    definition: `export enum DENSITY {
    DEFAULT     = 'default',
    COMPACT     = 'compact',
    COMFORTABLE = 'comfortable',
}`,
    values: [
        { value: 'DENSITY.DEFAULT', descriptionKey: 'enums.detail.density.default', descriptionFallback: 'Standard padding — balanced for most contexts.' },
        { value: 'DENSITY.COMPACT', descriptionKey: 'enums.detail.density.compact', descriptionFallback: 'Reduced padding — useful in tables and toolbars.' },
        { value: 'DENSITY.COMFORTABLE', descriptionKey: 'enums.detail.density.comfortable', descriptionFallback: 'Increased padding — comfortable for forms and cards.' },
    ],
    usedBy: [
        { slug: 'btn', name: 'Btn', propName: 'density' },
        { slug: 'text-field', name: 'TextField', propName: 'density' },
        { slug: 'select', name: 'Select', propName: 'density' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/density.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.density.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { DENSITY } from 'origam'

const myDensity: DENSITY = DENSITY.COMPACT`,
            lang: 'typescript',
        },
    ],
}
