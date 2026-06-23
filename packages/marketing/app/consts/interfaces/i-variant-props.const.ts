import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_VARIANT_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-variant-props',
    name: 'IVariantProps',
    category: 'Design & Variants',
    descriptionKey: 'interfaces.catalog.i_variant_props.description',
    descriptionFallback: 'Visual variant contract — accepts both action-style (text/flat/elevated/tonal/outlined/plain) and input-style (solo/filled/underlined/…) variants so a single prop type fits every consumer.',
    definition: `export interface IVariantProps {
    variant?: TVariant | TVariantInput
}`,
    extends: [],
    props: [
        { name: 'variant', type: 'TVariant | TVariantInput', optional: true, descriptionFallback: 'Visual rendering style — action variants (text, flat, elevated, tonal, outlined, plain) or input variants (solo, filled, underlined, solo-filled, solo-inverted).' },
    ],
    usedBy: [
        { slug: 'btn', name: 'Btn', kind: 'component' },
        { slug: 'chip', name: 'Chip', kind: 'component' },
        { slug: 'text-field', name: 'TextField', kind: 'component' },
        { slug: 'select', name: 'Select', kind: 'component' },
        { slug: 'use-variant', name: 'useVariant', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/variant.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_variant_props.example',
            titleFallback: 'Extending IVariantProps on a custom button',
            code: `import type { IVariantProps } from 'origam'

interface IMyButtonProps extends IVariantProps {
    label: string
}

// Usage
// <MyButton variant="tonal" label="Save" />`,
            lang: 'typescript',
        },
    ],
}
