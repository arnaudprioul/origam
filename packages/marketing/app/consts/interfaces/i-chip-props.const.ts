import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHIP_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chip-props',
    name: 'IChipProps',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_chip_props.description',
    descriptionFallback: 'Props for <OrigamChip>. A compact interactive element used for tags, filters, selections and actions. Supports close button, drag, filter mode, link navigation, group membership and full visual customisation.',
    definition: `export interface IChipProps extends ICommonsComponentProps, IAdjacentProps, ITagProps, IColorProps, IBgColorProps, IRippleProps, IBorderProps, IRoundedProps, IPaddingProps, IMarginProps, IDensityProps, IGroupItemProps, ILinkProps, ISizeProps, IElevationProps, IActiveProps, IHoverProps {
    closable?: boolean
    closeIcon?: TIcon
    closeLabel?: string
    draggable?: boolean
    filter?: boolean
    filterIcon?: TIcon
    label?: boolean
    link?: boolean
    pill?: boolean
    text?: string
    modelValue?: boolean
}`,
    extends: [
        'ICommonsComponentProps',
        'IAdjacentProps',
        'ITagProps',
        'IColorProps',
        'IBgColorProps',
        'IRippleProps',
        'IBorderProps',
        'IRoundedProps',
        'IPaddingProps',
        'IMarginProps',
        'IDensityProps',
        'IGroupItemProps',
        'ILinkProps',
        'ISizeProps',
        'IElevationProps',
        'IActiveProps',
        'IHoverProps',
    ],
    props: [
        { name: 'closable', type: 'boolean', optional: true, descriptionFallback: 'Show a close/dismiss button inside the chip.' },
        { name: 'closeIcon', type: 'TIcon', optional: true, descriptionFallback: 'Icon for the close button. Defaults to the DS close/cross glyph.' },
        { name: 'closeLabel', type: 'string', optional: true, descriptionFallback: 'Accessible label for the close button (aria-label).' },
        { name: 'draggable', type: 'boolean', optional: true, descriptionFallback: 'Makes the chip draggable (sets the draggable HTML attribute).' },
        { name: 'filter', type: 'boolean', optional: true, descriptionFallback: 'Activates filter mode — renders a check/filter icon when the chip is selected.' },
        { name: 'filterIcon', type: 'TIcon', optional: true, descriptionFallback: 'Override the icon shown in filter mode.' },
        { name: 'label', type: 'boolean', optional: true, descriptionFallback: 'Apply the label shape (square corners on one side) instead of the default pill/rounded shape.' },
        { name: 'link', type: 'boolean', optional: true, descriptionFallback: 'Force link behaviour even when no href/to is provided.' },
        { name: 'pill', type: 'boolean', optional: true, descriptionFallback: 'Apply maximum border-radius to produce a fully rounded pill shape.' },
        { name: 'text', type: 'string', optional: true, descriptionFallback: 'Text content rendered inside the chip (alternative to default slot).' },
        { name: 'modelValue', type: 'boolean', optional: true, descriptionFallback: 'v-model binding for the chip\'s active/selected state. Controls visibility when closable.' },
    ],
    usedBy: [
        { slug: 'chip', name: 'OrigamChip', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chip/chip.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chip_props.example',
            titleFallback: 'Closable pill chip with custom icon',
            code: `<OrigamChip
    v-model="visible"
    text="Vue 3"
    color="primary"
    pill
    closable
    close-icon="mdi:mdi-close-circle"
/>`,
            lang: 'vue',
        },
    ],
}
