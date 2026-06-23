import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_RADIO_BTN_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-radio-btn-emits',
    name: 'IRadioBtnEmits',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_radio_btn_emits.description',
    descriptionFallback: 'Emits contract for <OrigamRadioBtn>. Extends ICommonsComponentEmits, IFocusEmits and IClickLabelEmits. Same surface as the full <OrigamRadio> emit contract.',
    definition: `export interface IRadioBtnEmits extends ICommonsComponentEmits, IFocusEmits, IClickLabelEmits {}`,
    extends: ['ICommonsComponentEmits', 'IFocusEmits', 'IClickLabelEmits'],
    props: [],
    usedBy: [
        { slug: 'radio-btn', name: 'RadioBtn', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Radio/radio-btn.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_radio_btn_emits.example',
            titleFallback: 'Listening to focus and label-click on a radio button',
            code: `<origam-radio-btn
    v-model="selected"
    value="option-a"
    @focus="onFocus"
    @click:label="onLabelClick"
/>`,
            lang: 'html',
        },
    ],
}
