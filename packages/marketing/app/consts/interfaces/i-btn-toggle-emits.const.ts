import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_BTN_TOGGLE_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-btn-toggle-emits',
    name: 'IBtnToggleEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_btn_toggle_emits.description',
    descriptionFallback: 'Emit contract for <OrigamBtnToggle> — v-model on the active toggle index, inherited from ICommonsComponentEmits.',
    definition: `export interface IBtnToggleEmits extends ICommonsComponentEmits {}`,
    extends: ['ICommonsComponentEmits'],
    props: [],
    usedBy: [
        { slug: 'btn-toggle', name: 'BtnToggle', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Btn/btn-toggle.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_btn_toggle_emits.example',
            titleFallback: 'Two-way binding on BtnToggle',
            code: `<OrigamBtnToggle
  v-model="selectedIndex"
  :items="toggleItems"
  @update:model-value="onToggle"
/>`,
            lang: 'html',
        },
    ],
}
