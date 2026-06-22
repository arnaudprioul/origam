import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TREEVIEW_NODE_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-treeview-node-props',
    name: 'ITreeviewNodeProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_treeview_node_props.description',
    descriptionFallback: 'Props contract for <OrigamTreeviewNode>. Internal component rendering a single tree node. Receives the full ITreeviewNode data object plus its nesting depth for indentation.',
    definition: `export interface ITreeviewNodeProps extends ICommonsComponentProps {
    node: ITreeviewNode
    depth?: number
}`,
    extends: ['ICommonsComponentProps'],
    props: [
        { name: 'node', type: 'ITreeviewNode', optional: false, descriptionFallback: 'The node data object to render (id, label, icon, children, disabled, expandable).' },
        { name: 'depth', type: 'number', optional: true, descriptionFallback: 'Nesting depth starting at 0 for root nodes. Used to compute the left padding indent.' },
    ],
    usedBy: [
        { slug: 'treeview-node', name: 'TreeviewNode', kind: 'component' },
        { slug: 'treeview', name: 'Treeview', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Treeview/treeview.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_treeview_node_props.example',
            titleFallback: 'Direct usage of OrigamTreeviewNode',
            code: `<OrigamTreeviewNode
    :node="{ id: 'root', label: 'src', icon: 'mdi-folder', children: [] }"
    :depth="0"
/>`,
            lang: 'vue',
        },
    ],
}
