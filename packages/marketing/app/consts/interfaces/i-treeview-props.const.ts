import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TREEVIEW_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-treeview-props',
    name: 'ITreeviewProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_treeview_props.description',
    descriptionFallback: 'Full props contract for <OrigamTreeview>. Hierarchical tree with multi/single selection, expansion control, line guides, lazy-expand support, and the full color/bgColor/size/density surface.',
    definition: `export interface ITreeviewProps extends ICommonsComponentProps, IColorProps, IBgColorProps, ISizeProps, IDensityProps {
    items: ITreeviewNode[]
    modelValue?: string[] | string
    expandedValue?: string[]
    selectMode?: TTreeviewSelectMode
    selectableNodes?: TTreeviewSelectableNodes
    showLines?: boolean
    expandOnClick?: boolean
}`,
    extends: ['ICommonsComponentProps', 'IColorProps', 'IBgColorProps', 'ISizeProps', 'IDensityProps'],
    props: [
        { name: 'items', type: 'ITreeviewNode[]', optional: false, descriptionFallback: 'Flat or nested array of tree nodes driving the render.' },
        { name: 'modelValue', type: 'string[] | string', optional: true, descriptionFallback: 'Selected node id(s). Array for multi-select, string for single-select. Binds via v-model.' },
        { name: 'expandedValue', type: 'string[]', optional: true, descriptionFallback: 'IDs of currently expanded branch nodes. Controlled via v-model:expandedValue.' },
        { name: 'selectMode', type: 'TTreeviewSelectMode', optional: true, descriptionFallback: 'Selection strategy: none, single, or multiple.' },
        { name: 'selectableNodes', type: 'TTreeviewSelectableNodes', optional: true, descriptionFallback: 'Which node types can be selected: all, leaf, or branch.' },
        { name: 'showLines', type: 'boolean', optional: true, descriptionFallback: 'Render vertical guide lines connecting parent to children.' },
        { name: 'expandOnClick', type: 'boolean', optional: true, descriptionFallback: 'Expand/collapse a branch node when the row label area is clicked (not just the chevron).' },
    ],
    usedBy: [
        { slug: 'treeview', name: 'Treeview', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Treeview/treeview.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_treeview_props.example',
            titleFallback: 'Multi-select treeview with guide lines',
            code: `<OrigamTreeview
    :items="fileTree"
    v-model="selected"
    select-mode="multiple"
    selectable-nodes="leaf"
    :show-lines="true"
/>`,
            lang: 'vue',
        },
    ],
}
