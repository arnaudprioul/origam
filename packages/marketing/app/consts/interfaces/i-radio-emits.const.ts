import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_RADIO_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-radio-emits',
    name: 'IRadioEmits',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_radio_emits.description',
    descriptionFallback: 'Emits contract for <OrigamRadio> — v-model, focus events and label click. Extends ICommonsComponentEmits, IFocusEmits and IClickLabelEmits.',
    definition: `export interface IRadioEmits extends ICommonsComponentEmits, IFocusEmits, IClickLabelEmits {}`,
    extends: ['ICommonsComponentEmits', 'IFocusEmits', 'IClickLabelEmits'],
    props: [],
    usedBy: [
        { slug: 'radio', name: 'Radio', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Radio/radio.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_radio_emits.example',
            titleFallback: 'Handling focus and label click on a radio',
            code: `<origam-radio
    v-model="selected"
    value="option-b"
    @focus="trackFocus"
    @blur="trackBlur"
    @click:label="onLabelClick"
/>`,
            lang: 'html',
        },
    ],
}
