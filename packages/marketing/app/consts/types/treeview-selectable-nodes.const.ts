import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const TREEVIEW_SELECTABLE_NODES_TYPE_DOC: ITypeDoc = {
    slug: 'treeview-selectable-nodes',
    name: 'TTreeviewSelectableNodes',
    kind: 'type',
    category: 'Data Display',
    descriptionKey: 'types.catalog.treeview_selectable_nodes.description',
    descriptionFallback: 'Which nodes in the OrigamTreeview can receive a selected state — only leaf nodes or every node in the tree.',
    definition: `export type TTreeviewSelectableNodes = 'leaf' | 'all'`,
    values: [
        {
            value: 'leaf',
            descriptionKey: 'types.detail.treeview_selectable_nodes.leaf',
            descriptionFallback: 'Only leaf nodes (nodes with no children) can be selected. Parent nodes act solely as expand/collapse toggles.',
        },
        {
            value: 'all',
            descriptionKey: 'types.detail.treeview_selectable_nodes.all',
            descriptionFallback: 'Both parent and leaf nodes can be selected. Selecting a parent in multiple mode propagates the state to its children (cascade).',
        },
    ],
    usedBy: [
        { slug: 'treeview', name: 'Treeview', propName: 'selectableNodes' },
    ],
    sourceFile: 'packages/ds/src/types/Treeview/treeview.type.ts',
    examples: [
        {
            titleKey: 'types.detail.treeview_selectable_nodes.example',
            titleFallback: 'Leaf-only selection',
            code: `<origam-treeview
  select-mode="multiple"
  selectable-nodes="leaf"
  :items="fileTree"
  v-model:selected="selectedFiles"
/>`,
            lang: 'html',
        },
    ],
}
