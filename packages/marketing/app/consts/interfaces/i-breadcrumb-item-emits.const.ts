import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_BREADCRUMB_ITEM_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-breadcrumb-item-emits',
    name: 'IBreadcrumbItemEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_breadcrumb_item_emits.description',
    descriptionFallback: 'Emit contract for <OrigamBreadcrumbItem> — click events on prepend/append adjacent slots, inherited from IAdjacentEmits.',
    definition: `export interface IBreadcrumbItemEmits extends IAdjacentEmits {}`,
    extends: ['IAdjacentEmits'],
    props: [],
    usedBy: [
        { slug: 'breadcrumb-item', name: 'BreadcrumbItem', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Breadcrumb/breadcrumb-item.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_breadcrumb_item_emits.example',
            titleFallback: 'Listening to adjacent slot clicks',
            code: `<OrigamBreadcrumbItem
  title="Products"
  prepend-icon="mdi-folder"
  @click:prepend="onPrependClick"
  @click:append="onAppendClick"
/>`,
            lang: 'html',
        },
    ],
}
