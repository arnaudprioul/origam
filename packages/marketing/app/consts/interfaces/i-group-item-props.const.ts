import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_GROUP_ITEM_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-group-item-props',
    name: 'IGroupItemProps',
    category: 'Group & Selection',
    descriptionKey: 'interfaces.catalog.i_group_item_props.description',
    descriptionFallback: 'Props for an individual item inside a selectable group — its value, disabled state and optional selected class override.',
    definition: `export interface IGroupItemProps {
    value?: any
    disabled?: boolean
    selectedClass?: string
}`,
    extends: [],
    props: [
        { name: 'value', type: 'any', optional: true, descriptionFallback: 'The value represented by this item when selected inside the parent group.' },
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Prevents the item from being selected when true.' },
        { name: 'selectedClass', type: 'string', optional: true, descriptionFallback: 'CSS class applied to this item when it is the selected one, overriding the group-level selectedClass.' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Commons/group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_group_item_props.example',
            titleFallback: 'Extending IGroupItemProps on a tab or chip item',
            code: `import type { IGroupItemProps } from 'origam'

interface ITabProps extends IGroupItemProps {
    label?: string
}`,
            lang: 'typescript',
        },
    ],
}
