import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_GROUP_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-group-props',
    name: 'IGroupProps',
    category: 'Group & Selection',
    descriptionKey: 'interfaces.catalog.i_group_props.description',
    descriptionFallback: 'Props for a selectable group container — controls the v-model, multiplicity, mandatory selection and the selected-class propagated to items.',
    definition: `export interface IGroupProps {
    disabled?: boolean
    modelValue?: any
    multiple?: boolean
    mandatory?: boolean
    max?: number
    selectedClass?: string
}`,
    extends: [],
    props: [
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'When true, disables all items in the group preventing any selection change.' },
        { name: 'modelValue', type: 'any', optional: true, descriptionFallback: 'The current selection — a single value or an array in multiple mode.' },
        { name: 'multiple', type: 'boolean', optional: true, descriptionFallback: 'Allows more than one item to be selected at the same time.' },
        { name: 'mandatory', type: 'boolean', optional: true, descriptionFallback: 'Enforces that at least one item is always selected; deselecting the last item is blocked.' },
        { name: 'max', type: 'number', optional: true, descriptionFallback: 'Maximum number of items that can be selected simultaneously (only meaningful in multiple mode).' },
        { name: 'selectedClass', type: 'string', optional: true, descriptionFallback: 'CSS class propagated to every selected item, overridable per-item via IGroupItemProps.selectedClass.' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Commons/group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_group_props.example',
            titleFallback: 'Extending IGroupProps on a tab bar',
            code: `import type { IGroupProps } from 'origam'

interface ITabBarProps extends IGroupProps {
    grow?: boolean
}`,
            lang: 'typescript',
        },
    ],
}
