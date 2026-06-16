import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const ENUM_DENSITY_TYPE_DOC: ITypeDoc = {
    slug: 'enum-density',
    name: 'DENSITY',
    kind: 'enum',
    category: 'Enums',
    descriptionKey: 'types.catalog.enum_density.description',
    descriptionFallback: 'TypeScript enum for vertical spacing density (default, compact, comfortable).',
    definition: `export enum DENSITY {
    DEFAULT     = 'default',
    COMPACT     = 'compact',
    COMFORTABLE = 'comfortable',
}`,
    values: [
        { value: 'DENSITY.DEFAULT', descriptionKey: 'types.detail.enum_density.default', descriptionFallback: "Standard padding — balanced for most contexts." },
        { value: 'DENSITY.COMPACT', descriptionKey: 'types.detail.enum_density.compact', descriptionFallback: "Reduced padding — useful in tables and toolbars." },
        { value: 'DENSITY.COMFORTABLE', descriptionKey: 'types.detail.enum_density.comfortable', descriptionFallback: "Increased padding — comfortable for forms and cards." },
    ],
    usedBy: [
        { slug: 'btn', name: 'Btn', propName: 'density' },
        { slug: 'text-field', name: 'TextField', propName: 'density' },
        { slug: 'select', name: 'Select', propName: 'density' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/density.enum.ts',
    examples: [
        {
            titleKey: 'types.detail.enum_density.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { DENSITY } from 'origam'

const myDensity: DENSITY = DENSITY.COMPACT`,
            lang: 'typescript',
        },
    ],
}
