import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const COLOR_TYPE_DOC: ITypeDoc = {
    slug: 'color',
    name: 'TColor',
    kind: 'type',
    category: 'Color & Intent',
    descriptionKey: 'types.catalog.color.description',
    descriptionFallback: 'Accepted value for color/bgColor/textColor props — intent name, raw CSS color, gradient string or structured gradient object.',
    definition: `export type TColor = string | IGradient | false | null | undefined`,
    values: [],
    usedBy: [
        { slug: 'btn', name: 'Btn', propName: 'color' },
        { slug: 'chip', name: 'Chip', propName: 'color' },
        { slug: 'avatar', name: 'Avatar', propName: 'color' },
        { slug: 'badge', name: 'Badge', propName: 'color' },
        { slug: 'alert', name: 'Alert', propName: 'color' },
        { slug: 'card', name: 'Card', propName: 'color' },
    ],
    sourceFile: 'packages/ds/src/types/Commons/color.type.ts',
    examples: [
        {
            titleKey: 'types.detail.color.example_intent',
            titleFallback: 'Using a semantic intent',
            code: `<origam-btn color="primary">Save</origam-btn>
<origam-btn color="success">Done</origam-btn>
<origam-btn color="danger">Delete</origam-btn>`,
            lang: 'html',
        },
        {
            titleKey: 'types.detail.color.example_raw',
            titleFallback: 'Using a raw CSS color',
            code: `<origam-chip color="#ff6600">Custom</origam-chip>
<origam-chip color="rgb(124, 58, 237)">Purple</origam-chip>`,
            lang: 'html',
        },
    ],
}
