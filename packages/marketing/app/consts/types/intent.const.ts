import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const INTENT_TYPE_DOC: ITypeDoc = {
    slug: 'intent',
    name: 'TIntent',
    kind: 'type',
    category: 'Color & Intent',
    descriptionKey: 'types.catalog.intent.description',
    descriptionFallback: 'Semantic intent values: neutral, primary, secondary, ghost, success, warning, danger, info.',
    definition: `export type TIntent =
    | 'neutral'
    | 'primary'
    | 'secondary'
    | 'ghost'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'`,
    values: [
        { value: 'neutral', descriptionKey: 'types.detail.intent.neutral', descriptionFallback: 'Neutral / no semantic color — inherits from surface tokens.' },
        { value: 'primary', descriptionKey: 'types.detail.intent.primary', descriptionFallback: 'Primary brand color — maps to --origam-color__action--primary---* tokens.' },
        { value: 'secondary', descriptionKey: 'types.detail.intent.secondary', descriptionFallback: 'Secondary accent color — a complementary brand rung.' },
        { value: 'ghost', descriptionKey: 'types.detail.intent.ghost', descriptionFallback: 'Transparent / ghost surface — used for low-emphasis actions.' },
        { value: 'success', descriptionKey: 'types.detail.intent.success', descriptionFallback: 'Positive confirmation intent (green ramp).' },
        { value: 'warning', descriptionKey: 'types.detail.intent.warning', descriptionFallback: 'Caution / attention intent (amber ramp).' },
        { value: 'danger', descriptionKey: 'types.detail.intent.danger', descriptionFallback: 'Destructive / error intent (red ramp).' },
        { value: 'info', descriptionKey: 'types.detail.intent.info', descriptionFallback: 'Informational intent (blue ramp).' },
    ],
    usedBy: [
        { slug: 'btn', name: 'Btn', propName: 'color' },
        { slug: 'chip', name: 'Chip', propName: 'color' },
        { slug: 'alert', name: 'Alert', propName: 'color' },
        { slug: 'badge', name: 'Badge', propName: 'color' },
        { slug: 'avatar', name: 'Avatar', propName: 'color' },
    ],
    sourceFile: 'packages/ds/src/types/Commons/intent.type.ts',
    examples: [
        {
            titleKey: 'types.detail.intent.example_btn',
            titleFallback: 'Buttons with each intent',
            code: `<origam-btn color="primary">Primary</origam-btn>
<origam-btn color="success">Success</origam-btn>
<origam-btn color="warning">Warning</origam-btn>
<origam-btn color="danger">Danger</origam-btn>
<origam-btn color="info">Info</origam-btn>`,
            lang: 'html',
        },
    ],
}
