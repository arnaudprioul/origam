import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TREEVIEW_NODE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-treeview-node',
    name: 'ITreeviewNode',
    category: 'Data Models',
    descriptionKey: 'interfaces.catalog.i_treeview_node.description',
    descriptionFallback: 'Shape of a single node in the treeview data tree. Supports recursive nesting via the children array, optional icon, custom size, disabled state, and expandability control.',
    definition: `export interface ITreeviewNode {
    id: string
    label: string
    icon?: TIcon
    size?: string
    children?: ITreeviewNode[]
    disabled?: boolean
    expandable?: boolean
}`,
    extends: [],
    props: [
        { name: 'id', type: 'string', optional: false, descriptionFallback: 'Unique identifier for the node. Used as the key for selection and expansion state.' },
        { name: 'label', type: 'string', optional: false, descriptionFallback: 'Display text for the node.' },
        { name: 'icon', type: 'TIcon', optional: true, descriptionFallback: 'MDI icon name rendered before the label.' },
        { name: 'size', type: 'string', optional: true, descriptionFallback: 'Override the icon size for this specific node.' },
        { name: 'children', type: 'ITreeviewNode[]', optional: true, descriptionFallback: 'Nested child nodes. Presence of this field (even empty) marks the node as a branch.' },
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Prevent interaction (selection and expansion) on this node.' },
        { name: 'expandable', type: 'boolean', optional: true, descriptionFallback: 'Show the expand chevron even when children is empty or undefined (useful for lazy-load patterns).' },
    ],
    usedBy: [
        { slug: 'treeview', name: 'Treeview', kind: 'component' },
        { slug: 'treeview-node', name: 'TreeviewNode', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Treeview/treeview.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_treeview_node.example',
            titleFallback: 'Building a file-system treeview tree',
            code: `import type { ITreeviewNode } from 'origam'

const tree: ITreeviewNode[] = [
    {
        id: 'src',
        label: 'src',
        icon: 'mdi-folder',
        children: [
            { id: 'src/main.ts', label: 'main.ts', icon: 'mdi-language-typescript' },
            { id: 'src/app.vue', label: 'App.vue', icon: 'mdi-vuejs' },
        ],
    },
]`,
            lang: 'typescript',
        },
    ],
}
