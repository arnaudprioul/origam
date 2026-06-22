import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SELECT_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-select-emits',
    name: 'ISelectEmits',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_select_emits.description',
    descriptionFallback: 'Emit signature for <OrigamSelect>. Extends the commons, focus, adjacent, and adjacent-inner emit contracts with three select-specific events: click:control (pointer click on the control surface), mousedown:control (mousedown before the dropdown opens), and update:menu (v-model:menu synchronisation).',
    definition: `export interface ISelectEmits extends ICommonsComponentEmits, IFocusEmits, IAdjacentEmits, IAdjacentInnerEmits {
    (e: 'click:control', event: MouseEvent): void
    (e: 'mousedown:control', event: MouseEvent): void
    (e: 'update:menu', value: boolean): void
}`,
    extends: [
        'ICommonsComponentEmits',
        'IFocusEmits',
        'IAdjacentEmits',
        'IAdjacentInnerEmits',
    ],
    props: [
        { name: 'click:control', type: '(event: MouseEvent) => void', optional: false, descriptionFallback: 'Fired when the user clicks anywhere on the select control surface (not inside the dropdown list).' },
        { name: 'mousedown:control', type: '(event: MouseEvent) => void', optional: false, descriptionFallback: 'Fired on mousedown before the dropdown opens — useful to prevent focus stealing on certain custom UIs.' },
        { name: 'update:menu', type: '(value: boolean) => void', optional: false, descriptionFallback: 'v-model:menu companion — emitted whenever the dropdown opens or closes.' },
    ],
    usedBy: [
        { slug: 'select', name: 'Select', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Select/select.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_select_emits.example',
            titleFallback: 'Tracking menu open/close state',
            code: `<OrigamSelect
    v-model="selected"
    v-model:menu="isOpen"
    @click:control="onControlClick"
    @update:menu="onMenuChange"
/>`,
            lang: 'html',
        },
    ],
}
