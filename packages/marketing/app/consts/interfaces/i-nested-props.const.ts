import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_NESTED_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-nested-props',
    name: 'INestedProps',
    category: 'Data & State',
    descriptionKey: 'interfaces.catalog.i_nested_props.description',
    descriptionFallback: 'Selection and open-state contract for tree-like and nested list components — governs item selection strategy, expand/collapse strategy, current selection and opened nodes.',
    definition: `export interface INestedProps {
    selectStrategy?: TSelectStrategy | TSelectStrategyFn
    openStrategy?: TOpenStrategy | TOpenStrategyFns
    selected?: Array<unknown>
    opened?: Array<unknown>
    mandatory?: boolean
}`,
    extends: [],
    props: [
        { name: 'selectStrategy', type: 'TSelectStrategy | TSelectStrategyFn', optional: true, descriptionFallback: 'Named selection strategy ("single-leaf", "leaf", "independent", "classic") or a custom function that determines which nodes are selectable and how selection propagates through the tree.' },
        { name: 'openStrategy', type: 'TOpenStrategy | TOpenStrategyFns', optional: true, descriptionFallback: 'Named open/expand strategy ("single", "multiple", "list") or a set of custom handler functions that control which nodes can be open simultaneously.' },
        { name: 'selected', type: 'Array<unknown>', optional: true, descriptionFallback: 'Array of currently selected node values. Drives v-model:selected on tree and list components.' },
        { name: 'opened', type: 'Array<unknown>', optional: true, descriptionFallback: 'Array of currently expanded node values. Drives v-model:opened on tree and list components.' },
        { name: 'mandatory', type: 'boolean', optional: true, descriptionFallback: 'When true, at least one item must remain selected at all times — deselecting the last item is prevented.' },
    ],
    usedBy: [
        { slug: 'list', name: 'List', kind: 'component' },
        { slug: 'tree-view', name: 'TreeView', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/nested.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_nested_props.example',
            titleFallback: 'Extending the interface for a tree component',
            code: `import type { INestedProps } from 'origam'

interface ITreeViewProps extends INestedProps {
    items?: unknown[]
}`,
            lang: 'typescript',
        },
    ],
}
