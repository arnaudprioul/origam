import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHIP_GROUP_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chip-group-emits',
    name: 'IChipGroupEmits',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_chip_group_emits.description',
    descriptionFallback: 'Emits for <OrigamChipGroup>. Extends ICommonsComponentEmits — the group selection changes are propagated via the IGroupProps v-model (update:modelValue) inherited from the shared group composable.',
    definition: `export interface IChipGroupEmits extends ICommonsComponentEmits {}`,
    extends: ['ICommonsComponentEmits'],
    props: [],
    usedBy: [
        { slug: 'chip-group', name: 'OrigamChipGroup', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chip/chip-group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chip_group_emits.example',
            titleFallback: 'Listening to chip group selection changes',
            code: `<OrigamChipGroup v-model="selected" @update:model-value="onSelectionChange">
    <OrigamChip value="a" text="Option A" />
    <OrigamChip value="b" text="Option B" />
</OrigamChipGroup>`,
            lang: 'vue',
        },
    ],
}
