import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_BTN_TOGGLE_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-btn-toggle-props',
    name: 'IBtnToggleProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_btn_toggle_props.description',
    descriptionFallback: 'Props for <OrigamBtnToggle> — a grouped toggle control built on BtnGroup. Adds group selection management (IGroupProps) on top of the full BtnGroup visual surface.',
    definition: `export interface IBtnToggleProps extends IBtnGroupProps, IGroupProps {}`,
    extends: ['IBtnGroupProps', 'IGroupProps'],
    props: [],
    usedBy: [
        { slug: 'btn-toggle', name: 'BtnToggle', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Btn/btn-toggle.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_btn_toggle_props.example',
            titleFallback: 'Text alignment toggle',
            code: `<OrigamBtnToggle
  v-model="align"
  :items="[
    { icon: 'mdi-format-align-left', value: 'left' },
    { icon: 'mdi-format-align-center', value: 'center' },
    { icon: 'mdi-format-align-right', value: 'right' },
  ]"
  color="primary"
  rounded="md"
/>`,
            lang: 'html',
        },
    ],
}
