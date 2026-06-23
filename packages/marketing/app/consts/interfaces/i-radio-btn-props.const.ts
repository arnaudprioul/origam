import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_RADIO_BTN_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-radio-btn-props',
    name: 'IRadioBtnProps',
    category: 'Form & Input',
    descriptionKey: 'interfaces.catalog.i_radio_btn_props.description',
    descriptionFallback: 'Props contract for <OrigamRadioBtn> — the inner clickable dot/control of a radio input. Extends ICommonsComponentProps and ISelectionControlProps.',
    definition: `export interface IRadioBtnProps extends ICommonsComponentProps, ISelectionControlProps {}`,
    extends: ['ICommonsComponentProps', 'ISelectionControlProps'],
    props: [],
    usedBy: [
        { slug: 'radio-btn', name: 'RadioBtn', kind: 'component' },
        { slug: 'radio', name: 'Radio', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Radio/radio-btn.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_radio_btn_props.example',
            titleFallback: 'Using RadioBtn as a controlled selection control',
            code: `<origam-radio-btn
    v-model="selected"
    value="option-a"
    true-value="option-a"
    color="primary"
/>`,
            lang: 'html',
        },
    ],
}
