import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const ENUM_ROUNDED_TYPE_DOC: ITypeDoc = {
    slug: 'enum-rounded',
    name: 'ROUNDED',
    kind: 'enum',
    category: 'Enums',
    descriptionKey: 'types.catalog.enum_rounded.description',
    descriptionFallback: 'TypeScript enum for corner radius tokens (x-small through x-large, shaped, shaped-invert).',
    definition: `export enum ROUNDED {
    X_SMALL       = 'x-small',
    SMALL         = 'small',
    DEFAULT       = 'default',
    MEDIUM        = 'medium',
    LARGE         = 'large',
    X_LARGE       = 'x-large',
    SHAPED        = 'shaped',
    SHAPED_INVERT = 'shaped-invert'
}`,
    values: [
        { value: 'ROUNDED.X_SMALL', descriptionKey: 'types.detail.enum_rounded.x_small', descriptionFallback: "Extra small corner radius (2px)." },
        { value: 'ROUNDED.SMALL', descriptionKey: 'types.detail.enum_rounded.small', descriptionFallback: "Small corner radius (4px)." },
        { value: 'ROUNDED.DEFAULT', descriptionKey: 'types.detail.enum_rounded.default', descriptionFallback: "Component default radius — resolved from the component token." },
        { value: 'ROUNDED.MEDIUM', descriptionKey: 'types.detail.enum_rounded.medium', descriptionFallback: "Medium corner radius (8px)." },
        { value: 'ROUNDED.LARGE', descriptionKey: 'types.detail.enum_rounded.large', descriptionFallback: "Large corner radius (12px)." },
        { value: 'ROUNDED.X_LARGE', descriptionKey: 'types.detail.enum_rounded.x_large', descriptionFallback: "Extra large corner radius (16px)." },
        { value: 'ROUNDED.SHAPED', descriptionKey: 'types.detail.enum_rounded.shaped', descriptionFallback: "Pill shape — fully rounded left/right ends." },
        { value: 'ROUNDED.SHAPED_INVERT', descriptionKey: 'types.detail.enum_rounded.shaped_invert', descriptionFallback: "Inverted pill — concave corners on the ends." },
    ],
    usedBy: [
        { slug: 'btn', name: 'Btn', propName: 'rounded' },
        { slug: 'card', name: 'Card', propName: 'rounded' },
        { slug: 'chip', name: 'Chip', propName: 'rounded' },
        { slug: 'avatar', name: 'Avatar', propName: 'rounded' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/rounded.enum.ts',
    examples: [
        {
            titleKey: 'types.detail.enum_rounded.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { ROUNDED } from 'origam'

const myRounded: ROUNDED = ROUNDED.SHAPED`,
            lang: 'typescript',
        },
    ],
}
