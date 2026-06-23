import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const TREEVIEW_SELECT_MODE_TYPE_DOC: ITypeDoc = {
    slug: 'treeview-select-mode',
    name: 'TTreeviewSelectMode',
    kind: 'type',
    category: 'Data Display',
    descriptionKey: 'types.catalog.treeview_select_mode.description',
    descriptionFallback: 'Selection cardinality of the OrigamTreeview — controls whether zero, one or many nodes can be selected at the same time.',
    definition: `export type TTreeviewSelectMode = 'single' | 'multiple' | 'none'`,
    values: [
        {
            value: 'single',
            descriptionKey: 'types.detail.treeview_select_mode.single',
            descriptionFallback: 'Only one node can be selected at a time. Selecting a new node automatically deselects the previous one.',
        },
        {
            value: 'multiple',
            descriptionKey: 'types.detail.treeview_select_mode.multiple',
            descriptionFallback: 'Multiple nodes can be selected simultaneously. Paired with checkboxes when selectableNodes is set.',
        },
        {
            value: 'none',
            descriptionKey: 'types.detail.treeview_select_mode.none',
            descriptionFallback: 'Selection is disabled. Nodes can still be expanded/collapsed but clicking them produces no selection state change.',
        },
    ],
    usedBy: [
        { slug: 'treeview', name: 'Treeview', propName: 'selectMode' },
    ],
    sourceFile: 'packages/ds/src/types/Treeview/treeview.type.ts',
    examples: [
        {
            titleKey: 'types.detail.treeview_select_mode.example',
            titleFallback: 'Multi-select treeview with checkboxes',
            code: `<origam-treeview
  select-mode="multiple"
  selectable-nodes="leaf"
  :items="tree"
  v-model:selected="selected"
/>`,
            lang: 'html',
        },
    ],
}
