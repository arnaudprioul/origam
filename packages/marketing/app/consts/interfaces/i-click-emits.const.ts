import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CLICK_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-click-emits',
    name: 'IClickEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_click_emits.description',
    descriptionFallback: 'Generic click emit contract — bubbles the native MouseEvent from any interactive surface.',
    definition: `export interface IClickEmits {
    (e: 'click', event: MouseEvent): void
}`,
    extends: [],
    props: [
        { name: 'click', type: '(e: MouseEvent) => void', optional: false, descriptionFallback: 'Emitted when the component is clicked. Carries the native MouseEvent.' },
    ],
    usedBy: [
        { slug: 'chip', name: 'Chip', kind: 'component' },
        { slug: 'list-item', name: 'ListItem', kind: 'component' },
        { slug: 'rating-field-item', name: 'RatingFieldItem', kind: 'component' },
        { slug: 'overlay-scrim', name: 'OverlayScrim', kind: 'component' },
        { slug: 'date-picker-header', name: 'DatePickerHeader', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/commons.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_click_emits.example',
            titleFallback: 'Extending IClickEmits on a component emits interface',
            code: `import type { IClickEmits } from 'origam'

interface IMyComponentEmits extends IClickEmits {}`,
            lang: 'typescript',
        },
    ],
}
