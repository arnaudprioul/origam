import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const TAB_VARIANT_ENUM_DOC: IEnumDoc = {
    slug: 'tab-variant',
    name: 'TAB_VARIANT',
    category: 'Navigation',
    descriptionKey: 'enums.catalog.tab_variant.description',
    descriptionFallback: 'TypeScript enum for the visual variant of the Tabs component — default, pills, underline.',
    definition: `export enum TAB_VARIANT {
    DEFAULT   = 'default',
    PILLS     = 'pills',
    UNDERLINE = 'underline',
}`,
    values: [
        { value: 'TAB_VARIANT.DEFAULT', descriptionKey: 'enums.detail.tab_variant.default', descriptionFallback: 'Standard tab appearance — active tab uses the primary surface treatment.' },
        { value: 'TAB_VARIANT.PILLS', descriptionKey: 'enums.detail.tab_variant.pills', descriptionFallback: 'Pill-shaped tabs — each tab is a rounded chip, active tab fills with the primary colour.' },
        { value: 'TAB_VARIANT.UNDERLINE', descriptionKey: 'enums.detail.tab_variant.underline', descriptionFallback: 'Minimalist style — active tab is indicated by an underline border only.' },
    ],
    usedBy: [
        { slug: 'tabs', name: 'Tabs', propName: 'variant' },
    ],
    sourceFile: 'packages/ds/src/enums/Tabs/tab-variant.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.tab_variant.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { TAB_VARIANT } from 'origam'

const tabVariant: TAB_VARIANT = TAB_VARIANT.PILLS`,
            lang: 'typescript',
        },
    ],
}
