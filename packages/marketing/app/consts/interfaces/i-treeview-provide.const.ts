import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TREEVIEW_PROVIDE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-treeview-provide',
    name: 'ITreeviewProvide',
    category: 'Component Context',
    descriptionKey: 'interfaces.catalog.i_treeview_provide.description',
    descriptionFallback: 'Context object provided by OrigamTreeview to all descendant OrigamTreeviewNode components via Vue inject. Exposes reactive state accessors and mutation handlers without prop-drilling.',
    definition: `export interface ITreeviewProvide {
    toggleExpanded: (id: string) => void
    toggleSelected: (id: string) => void
    isExpanded: (id: string) => boolean
    isSelected: (id: string) => boolean
    selectMode: ComputedRef<TTreeviewSelectMode>
    selectableNodes: ComputedRef<TTreeviewSelectableNodes>
    showLines: ComputedRef<boolean>
    expandOnClick: ComputedRef<boolean>
    color: ComputedRef<string | undefined>
}`,
    extends: [],
    props: [
        { name: 'toggleExpanded', type: '(id: string) => void', optional: false, descriptionFallback: 'Expand or collapse the branch node with the given id.' },
        { name: 'toggleSelected', type: '(id: string) => void', optional: false, descriptionFallback: 'Select or deselect the node with the given id according to the current selectMode.' },
        { name: 'isExpanded', type: '(id: string) => boolean', optional: false, descriptionFallback: 'Returns true if the branch node with the given id is currently expanded.' },
        { name: 'isSelected', type: '(id: string) => boolean', optional: false, descriptionFallback: 'Returns true if the node with the given id is currently selected.' },
        { name: 'selectMode', type: 'ComputedRef<TTreeviewSelectMode>', optional: false, descriptionFallback: 'Reactive selection strategy (none / single / multiple) forwarded from ITreeviewProps.' },
        { name: 'selectableNodes', type: 'ComputedRef<TTreeviewSelectableNodes>', optional: false, descriptionFallback: 'Reactive filter controlling which node types (all / leaf / branch) can be selected.' },
        { name: 'showLines', type: 'ComputedRef<boolean>', optional: false, descriptionFallback: 'Reactive flag controlling whether vertical guide lines are rendered.' },
        { name: 'expandOnClick', type: 'ComputedRef<boolean>', optional: false, descriptionFallback: 'Reactive flag controlling whether a row click expands/collapses the branch.' },
        { name: 'color', type: 'ComputedRef<string | undefined>', optional: false, descriptionFallback: 'Reactive color intent forwarded to child nodes for consistent selection highlight.' },
    ],
    usedBy: [
        { slug: 'treeview', name: 'Treeview', kind: 'component' },
        { slug: 'treeview-node', name: 'TreeviewNode', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Treeview/treeview.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_treeview_provide.example',
            titleFallback: 'Injecting the treeview context in a custom node renderer',
            code: `import { inject } from 'vue'
import { TREEVIEW_PROVIDE_KEY } from 'origam/consts'
import type { ITreeviewProvide } from 'origam'

const ctx = inject<ITreeviewProvide>(TREEVIEW_PROVIDE_KEY)`,
            lang: 'typescript',
        },
    ],
}
