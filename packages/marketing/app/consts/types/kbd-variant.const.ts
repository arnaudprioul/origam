import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const KBD_VARIANT_TYPE_DOC: ITypeDoc = {
    slug: 'kbd-variant',
    name: 'TKbdVariant',
    kind: 'type',
    category: 'Data Display',
    descriptionKey: 'types.catalog.kbd_variant.description',
    descriptionFallback: 'Visual style of the OrigamKbd keyboard key badge — filled, outlined, or tonal.',
    definition: `export type TKbdVariant = 'filled' | 'outlined' | 'tonal'`,
    values: [
        { value: 'filled', descriptionKey: 'types.detail.kbd_variant.filled', descriptionFallback: 'Solid background key badge — high visual weight, suitable for prominent key combos.' },
        { value: 'outlined', descriptionKey: 'types.detail.kbd_variant.outlined', descriptionFallback: 'Border-only badge with transparent background — lightweight, inline-documentation style.' },
        { value: 'tonal', descriptionKey: 'types.detail.kbd_variant.tonal', descriptionFallback: 'Subtle tinted background at reduced opacity — balanced midpoint between filled and outlined.' },
    ],
    usedBy: [
        { slug: 'kbd', name: 'Kbd', propName: 'variant' },
    ],
    sourceFile: 'packages/ds/src/types/Kbd/kbd.type.ts',
    examples: [
        {
            titleKey: 'types.detail.kbd_variant.example',
            titleFallback: 'Kbd variant comparison',
            code: `<origam-kbd variant="filled">Ctrl</origam-kbd>
<origam-kbd variant="outlined">Ctrl</origam-kbd>
<origam-kbd variant="tonal">Ctrl</origam-kbd>`,
            lang: 'html',
        },
    ],
}
