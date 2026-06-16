import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const DENSITY_TYPE_DOC: ITypeDoc = {
    slug: 'density',
    name: 'TDensity',
    kind: 'type',
    category: 'Layout & Sizing',
    descriptionKey: 'types.catalog.density.description',
    descriptionFallback: 'Vertical spacing density: default, compact, comfortable.',
    definition: `export type TDensity = \`\${DENSITY}\`

// Where DENSITY is:
export enum DENSITY {
    DEFAULT     = 'default',
    COMPACT     = 'compact',
    COMFORTABLE = 'comfortable',
}`,
    values: [
        { value: 'default', descriptionKey: 'types.detail.density.default', descriptionFallback: 'Standard vertical padding — balanced for most contexts.' },
        { value: 'compact', descriptionKey: 'types.detail.density.compact', descriptionFallback: 'Reduced vertical padding — useful in data tables and toolbars.' },
        { value: 'comfortable', descriptionKey: 'types.detail.density.comfortable', descriptionFallback: 'Increased vertical padding — comfortable for forms and cards.' },
    ],
    usedBy: [
        { slug: 'btn', name: 'Btn', propName: 'density' },
        { slug: 'text-field', name: 'TextField', propName: 'density' },
        { slug: 'select', name: 'Select', propName: 'density' },
        { slug: 'checkbox', name: 'Checkbox', propName: 'density' },
        { slug: 'radio', name: 'Radio', propName: 'density' },
    ],
    sourceFile: 'packages/ds/src/types/Commons/density.type.ts',
    examples: [
        {
            titleKey: 'types.detail.density.example',
            titleFallback: 'TextField density comparison',
            code: `<origam-text-field density="comfortable" label="Comfortable" />
<origam-text-field density="default"     label="Default"     />
<origam-text-field density="compact"     label="Compact"     />`,
            lang: 'html',
        },
    ],
}
