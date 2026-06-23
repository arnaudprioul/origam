import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const SIZES_ENUM_DOC: IEnumDoc = {
    slug: 'sizes',
    name: 'SIZES',
    category: 'Layout & Sizing',
    descriptionKey: 'enums.catalog.sizes.description',
    descriptionFallback: 'TypeScript enum for component size scale (x-small, small, default, large, x-large).',
    definition: `export enum SIZES {
    X_SMALL = 'x-small',
    SMALL   = 'small',
    DEFAULT = 'default',
    LARGE   = 'large',
    X_LARGE = 'x-large'
}`,
    values: [
        { value: 'SIZES.X_SMALL', descriptionKey: 'enums.detail.sizes.x_small', descriptionFallback: 'Extra small — smallest size token rung.' },
        { value: 'SIZES.SMALL', descriptionKey: 'enums.detail.sizes.small', descriptionFallback: 'Small — reduced footprint for inline contexts.' },
        { value: 'SIZES.DEFAULT', descriptionKey: 'enums.detail.sizes.default', descriptionFallback: 'Default — the baseline size for the component.' },
        { value: 'SIZES.LARGE', descriptionKey: 'enums.detail.sizes.large', descriptionFallback: 'Large — increased surface area.' },
        { value: 'SIZES.X_LARGE', descriptionKey: 'enums.detail.sizes.x_large', descriptionFallback: 'Extra large — maximum size rung.' },
    ],
    usedBy: [
        { slug: 'btn', name: 'Btn', propName: 'size' },
        { slug: 'chip', name: 'Chip', propName: 'size' },
        { slug: 'avatar', name: 'Avatar', propName: 'size' },
        { slug: 'icon', name: 'Icon', propName: 'size' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/size.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.sizes.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { SIZES } from 'origam'

const mySize: SIZES = SIZES.LARGE`,
            lang: 'typescript',
        },
    ],
}
