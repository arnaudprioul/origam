import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHIP_GROUP_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chip-group-props',
    name: 'IChipGroupProps',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_chip_group_props.description',
    descriptionFallback: 'Props for <OrigamChipGroup>. A container that manages selection state across its child <OrigamChip> elements. Supports single and multiple selection, horizontal scrolling (slide group), column wrapping and filter mode.',
    definition: `export interface IChipGroupProps extends ICommonsComponentProps, ITagProps, IGroupProps, IColorProps, IBgColorProps, IMarginProps, IPaddingProps, IBorderProps, IRoundedProps, ISlideGroupProps {
    column?: boolean
    filter?: boolean
    valueComparator?: (a: any, b: any) => boolean
}`,
    extends: [
        'ICommonsComponentProps',
        'ITagProps',
        'IGroupProps',
        'IColorProps',
        'IBgColorProps',
        'IMarginProps',
        'IPaddingProps',
        'IBorderProps',
        'IRoundedProps',
        'ISlideGroupProps',
    ],
    props: [
        { name: 'column', type: 'boolean', optional: true, descriptionFallback: 'Wrap chips across multiple rows instead of scrolling horizontally.' },
        { name: 'filter', type: 'boolean', optional: true, descriptionFallback: 'Propagates filter mode to all child chips — they show a check icon when selected.' },
        { name: 'valueComparator', type: '(a: any, b: any) => boolean', optional: true, descriptionFallback: 'Custom equality function used when comparing chip values for selection state.' },
    ],
    usedBy: [
        { slug: 'chip-group', name: 'OrigamChipGroup', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chip/chip-group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chip_group_props.example',
            titleFallback: 'Multi-select filter chip group',
            code: `<OrigamChipGroup v-model="selectedTags" multiple filter>
    <OrigamChip v-for="tag in tags" :key="tag" :value="tag" :text="tag" />
</OrigamChipGroup>`,
            lang: 'vue',
        },
    ],
}
