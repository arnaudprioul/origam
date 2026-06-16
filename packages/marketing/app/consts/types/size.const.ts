import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const SIZE_TYPE_DOC: ITypeDoc = {
    slug: 'size',
    name: 'TSize',
    kind: 'type',
    category: 'Layout & Sizing',
    descriptionKey: 'types.catalog.size.description',
    descriptionFallback: 'Component size scale: x-small, small, default, large, x-large.',
    definition: `export type TSize = \`\${SIZES}\`

// Where SIZES is:
export enum SIZES {
    X_SMALL = 'x-small',
    SMALL   = 'small',
    DEFAULT = 'default',
    LARGE   = 'large',
    X_LARGE = 'x-large'
}`,
    values: [
        { value: 'x-small', descriptionKey: 'types.detail.size.x_small', descriptionFallback: 'Extra small — smallest token size rung.' },
        { value: 'small', descriptionKey: 'types.detail.size.small', descriptionFallback: 'Small — reduced footprint for inline contexts.' },
        { value: 'default', descriptionKey: 'types.detail.size.default', descriptionFallback: 'Default — the baseline size for the component.' },
        { value: 'large', descriptionKey: 'types.detail.size.large', descriptionFallback: 'Large — increased surface area.' },
        { value: 'x-large', descriptionKey: 'types.detail.size.x_large', descriptionFallback: 'Extra large — maximum size rung.' },
    ],
    usedBy: [
        { slug: 'btn', name: 'Btn', propName: 'size' },
        { slug: 'chip', name: 'Chip', propName: 'size' },
        { slug: 'avatar', name: 'Avatar', propName: 'size' },
        { slug: 'icon', name: 'Icon', propName: 'size' },
        { slug: 'badge', name: 'Badge', propName: 'size' },
    ],
    sourceFile: 'packages/ds/src/types/Commons/size.type.ts',
    examples: [
        {
            titleKey: 'types.detail.size.example',
            titleFallback: 'Btn size scale',
            code: `<origam-btn size="x-small">XS</origam-btn>
<origam-btn size="small">S</origam-btn>
<origam-btn size="default">Default</origam-btn>
<origam-btn size="large">L</origam-btn>
<origam-btn size="x-large">XL</origam-btn>`,
            lang: 'html',
        },
    ],
}
