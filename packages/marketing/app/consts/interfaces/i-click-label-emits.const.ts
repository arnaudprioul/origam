import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CLICK_LABEL_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-click-label-emits',
    name: 'IClickLabelEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_click_label_emits.description',
    descriptionFallback: 'Emit contract fired when the user clicks the associated <label> element rather than the input chrome itself. Used by selection controls (Radio, Switch, Checkbox).',
    definition: `export interface IClickLabelEmits {
    (e: 'click:label', event: MouseEvent): void
}`,
    extends: [],
    props: [
        { name: 'click:label', type: '(e: MouseEvent) => void', optional: false, descriptionFallback: 'Emitted when the label associated with the control is clicked. Carries the native MouseEvent.' },
    ],
    usedBy: [
        { slug: 'radio', name: 'Radio', kind: 'component' },
        { slug: 'radio-btn', name: 'RadioBtn', kind: 'component' },
        { slug: 'switch', name: 'Switch', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/commons.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_click_label_emits.example',
            titleFallback: 'Extending IClickLabelEmits on a selection-control emits interface',
            code: `import type { IClickLabelEmits, ICommonsComponentEmits } from 'origam'

interface IMyControlEmits extends ICommonsComponentEmits, IClickLabelEmits {}`,
            lang: 'typescript',
        },
    ],
}
