import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHIP_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chip-emits',
    name: 'IChipEmits',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_chip_emits.description',
    descriptionFallback: 'Emits for <OrigamChip>. Composes ICommonsComponentEmits, IClickEmits (generic click), IClickCloseEmits (close button), IAdjacentEmits (prepend/append icon clicks) and IGroupEmits (group membership changes).',
    definition: `export interface IChipEmits extends ICommonsComponentEmits, IClickEmits, IClickCloseEmits, IAdjacentEmits, IGroupEmits {}`,
    extends: ['ICommonsComponentEmits', 'IClickEmits', 'IClickCloseEmits', 'IAdjacentEmits', 'IGroupEmits'],
    props: [],
    usedBy: [
        { slug: 'chip', name: 'OrigamChip', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chip/chip.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chip_emits.example',
            titleFallback: 'Handling chip click and close',
            code: `<OrigamChip
    v-model="active"
    text="Remove me"
    closable
    @click="onChipClick"
    @click:close="onChipClose"
/>`,
            lang: 'vue',
        },
    ],
}
