import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const SKELETON_VARIANT_TYPE_DOC: ITypeDoc = {
    slug: 'skeleton-variant',
    name: 'TSkeletonVariant',
    kind: 'type',
    category: 'Feedback & Status',
    descriptionKey: 'types.catalog.skeleton_variant.description',
    descriptionFallback: 'Shape preset for OrigamSkeleton loading placeholders — selects a predefined animated outline that mirrors the content it replaces.',
    definition: `export type TSkeletonVariant = 'text' | 'rectangular' | 'circular' | 'card' | 'list-item'`,
    values: [
        { value: 'text', descriptionKey: 'types.detail.skeleton_variant.text', descriptionFallback: 'Short horizontal bar — placeholder for a line of text, title, or label.' },
        { value: 'rectangular', descriptionKey: 'types.detail.skeleton_variant.rectangular', descriptionFallback: 'Solid rectangle — placeholder for images, video thumbnails, or block content.' },
        { value: 'circular', descriptionKey: 'types.detail.skeleton_variant.circular', descriptionFallback: 'Circle — placeholder for avatars, icon buttons, or badge shapes.' },
        { value: 'card', descriptionKey: 'types.detail.skeleton_variant.card', descriptionFallback: 'Card-shaped composite placeholder with a rectangular media area and stacked text lines below.' },
        { value: 'list-item', descriptionKey: 'types.detail.skeleton_variant.list_item', descriptionFallback: 'List item composite — avatar circle on the left with two text lines on the right.' },
    ],
    usedBy: [
        { slug: 'skeleton', name: 'Skeleton', propName: 'variant' },
    ],
    sourceFile: 'packages/ds/src/types/Skeleton/skeleton.type.ts',
    examples: [
        {
            titleKey: 'types.detail.skeleton_variant.example',
            titleFallback: 'Skeleton variant showcase',
            code: `<origam-skeleton variant="text" width="200px" />
<origam-skeleton variant="rectangular" width="100%" height="180px" />
<origam-skeleton variant="circular" width="48px" height="48px" />
<origam-skeleton variant="card" />
<origam-skeleton variant="list-item" />`,
            lang: 'html',
        },
    ],
}
