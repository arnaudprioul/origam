import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_BTN_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-btn-emits',
    name: 'IBtnEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_btn_emits.description',
    descriptionFallback: 'Emit contract for <OrigamBtn> — click events on prepend/append adjacent slots and group-membership lifecycle events.',
    definition: `export interface IBtnEmits extends IAdjacentEmits, IGroupEmits {}`,
    extends: ['IAdjacentEmits', 'IGroupEmits'],
    props: [],
    usedBy: [
        { slug: 'btn', name: 'Btn', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Btn/btn.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_btn_emits.example',
            titleFallback: 'Listening to Btn emits',
            code: `<OrigamBtn
  prepend-icon="mdi-arrow-left"
  @click:prepend="onPrependClick"
  @group:selected="onGroupSelected"
>
  Save
</OrigamBtn>`,
            lang: 'html',
        },
    ],
}
