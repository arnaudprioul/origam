import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const ROUNDED_TYPE_DOC: ITypeDoc = {
    slug: 'rounded',
    name: 'TRounded',
    kind: 'type',
    category: 'Shape & Appearance',
    descriptionKey: 'types.catalog.rounded.description',
    descriptionFallback: 'Corner-radius variant tokens — x-small through x-large plus shaped and shaped-invert.',
    definition: `export type TRounded = \`\${ROUNDED}\`

// Where ROUNDED is:
export enum ROUNDED {
    X_SMALL      = 'x-small',
    SMALL        = 'small',
    DEFAULT      = 'default',
    MEDIUM       = 'medium',
    LARGE        = 'large',
    X_LARGE      = 'x-large',
    SHAPED       = 'shaped',
    SHAPED_INVERT = 'shaped-invert'
}`,
    values: [
        { value: 'x-small', descriptionKey: 'types.detail.rounded.x_small', descriptionFallback: 'Extra small corner radius (2px).' },
        { value: 'small', descriptionKey: 'types.detail.rounded.small', descriptionFallback: 'Small corner radius (4px).' },
        { value: 'default', descriptionKey: 'types.detail.rounded.default', descriptionFallback: 'Default corner radius defined by the component token.' },
        { value: 'medium', descriptionKey: 'types.detail.rounded.medium', descriptionFallback: 'Medium corner radius (8px).' },
        { value: 'large', descriptionKey: 'types.detail.rounded.large', descriptionFallback: 'Large corner radius (12px).' },
        { value: 'x-large', descriptionKey: 'types.detail.rounded.x_large', descriptionFallback: 'Extra large corner radius (16px).' },
        { value: 'shaped', descriptionKey: 'types.detail.rounded.shaped', descriptionFallback: 'Pill-like shape — fully rounded left/right ends.' },
        { value: 'shaped-invert', descriptionKey: 'types.detail.rounded.shaped_invert', descriptionFallback: 'Inverted pill shape — concave corners on the ends.' },
    ],
    usedBy: [
        { slug: 'btn', name: 'Btn', propName: 'rounded' },
        { slug: 'card', name: 'Card', propName: 'rounded' },
        { slug: 'chip', name: 'Chip', propName: 'rounded' },
        { slug: 'avatar', name: 'Avatar', propName: 'rounded' },
        { slug: 'text-field', name: 'TextField', propName: 'rounded' },
    ],
    sourceFile: 'packages/ds/src/types/Commons/rounded.type.ts',
    examples: [
        {
            titleKey: 'types.detail.rounded.example',
            titleFallback: 'Card with various radius tokens',
            code: `<origam-card rounded="small">Small</origam-card>
<origam-card rounded="large">Large</origam-card>
<origam-card rounded="shaped">Shaped</origam-card>`,
            lang: 'html',
        },
    ],
}
