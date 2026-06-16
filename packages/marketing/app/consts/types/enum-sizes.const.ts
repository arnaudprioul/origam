import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const ENUM_SIZES_TYPE_DOC: ITypeDoc = {
    slug: 'enum-sizes',
    name: 'SIZES',
    kind: 'enum',
    category: 'Enums',
    descriptionKey: 'types.catalog.enum_sizes.description',
    descriptionFallback: 'TypeScript enum for component size scale (x-small, small, default, large, x-large).',
    definition: `export enum SIZES {
    X_SMALL = 'x-small',
    SMALL   = 'small',
    DEFAULT = 'default',
    LARGE   = 'large',
    X_LARGE = 'x-large'
}`,
    values: [
        { value: 'SIZES.X_SMALL', descriptionKey: 'types.detail.enum_sizes.x_small', descriptionFallback: "Extra small — smallest size token rung." },
        { value: 'SIZES.SMALL', descriptionKey: 'types.detail.enum_sizes.small', descriptionFallback: "Small — reduced footprint for inline contexts." },
        { value: 'SIZES.DEFAULT', descriptionKey: 'types.detail.enum_sizes.default', descriptionFallback: "Default — the baseline size for the component." },
        { value: 'SIZES.LARGE', descriptionKey: 'types.detail.enum_sizes.large', descriptionFallback: "Large — increased surface area." },
        { value: 'SIZES.X_LARGE', descriptionKey: 'types.detail.enum_sizes.x_large', descriptionFallback: "Extra large — maximum size rung." },
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
            titleKey: 'types.detail.enum_sizes.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { SIZES } from 'origam'

const mySize: SIZES = SIZES.LARGE`,
            lang: 'typescript',
        },
    ],
}
