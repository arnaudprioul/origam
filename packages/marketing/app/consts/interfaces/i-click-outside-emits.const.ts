import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CLICK_OUTSIDE_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-click-outside-emits',
    name: 'IClickOutsideEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_click_outside_emits.description',
    descriptionFallback: 'Emit contract fired when a pointer-down event lands outside the component root. Used by overlay-based surfaces (Dialog, Drawer, Overlay).',
    definition: `export interface IClickOutsideEmits {
    (e: 'click:outside', event: MouseEvent): void
}`,
    extends: [],
    props: [
        { name: 'click:outside', type: '(e: MouseEvent) => void', optional: false, descriptionFallback: 'Emitted when the user clicks outside the component boundary. Carries the native MouseEvent.' },
    ],
    usedBy: [
        { slug: 'dialog', name: 'Dialog', kind: 'component' },
        { slug: 'overlay', name: 'Overlay', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/clickOutside.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_click_outside_emits.example',
            titleFallback: 'Extending IClickOutsideEmits on a dialog emits interface',
            code: `import type { IClickOutsideEmits, ICommonsComponentEmits } from 'origam'

interface IDialogEmits extends ICommonsComponentEmits, IClickOutsideEmits {}`,
            lang: 'typescript',
        },
    ],
}
