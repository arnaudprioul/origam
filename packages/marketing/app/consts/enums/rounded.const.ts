import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const ROUNDED_ENUM_DOC: IEnumDoc = {
    slug: 'rounded',
    name: 'ROUNDED',
    category: 'Shape & Appearance',
    descriptionKey: 'enums.catalog.rounded.description',
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
        { value: 'ROUNDED.X_SMALL', descriptionKey: 'enums.detail.rounded.x_small', descriptionFallback: 'Extra small corner radius (2px).' },
        { value: 'ROUNDED.SMALL', descriptionKey: 'enums.detail.rounded.small', descriptionFallback: 'Small corner radius (4px).' },
        { value: 'ROUNDED.DEFAULT', descriptionKey: 'enums.detail.rounded.default', descriptionFallback: 'Component default radius — resolved from the component token.' },
        { value: 'ROUNDED.MEDIUM', descriptionKey: 'enums.detail.rounded.medium', descriptionFallback: 'Medium corner radius (8px).' },
        { value: 'ROUNDED.LARGE', descriptionKey: 'enums.detail.rounded.large', descriptionFallback: 'Large corner radius (12px).' },
        { value: 'ROUNDED.X_LARGE', descriptionKey: 'enums.detail.rounded.x_large', descriptionFallback: 'Extra large corner radius (16px).' },
        { value: 'ROUNDED.SHAPED', descriptionKey: 'enums.detail.rounded.shaped', descriptionFallback: 'Pill shape — fully rounded left/right ends.' },
        { value: 'ROUNDED.SHAPED_INVERT', descriptionKey: 'enums.detail.rounded.shaped_invert', descriptionFallback: 'Inverted pill — concave corners on the ends.' },
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
            titleKey: 'enums.detail.rounded.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { ROUNDED } from 'origam'

const myRounded: ROUNDED = ROUNDED.SHAPED`,
            lang: 'typescript',
        },
    ],
}
