import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_CHIP_GROUP_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-chip-group-key',
    name: 'ORIGAM_CHIP_GROUP_KEY',
    category: 'Component Internals',
    descriptionKey: 'consts.catalog.origam_chip_group_key.description',
    descriptionFallback: "Symbol-based Vue injection key used by OrigamChipGroup to provide group context to its OrigamChip children. Created with Symbol.for('origam:chip-group') so the key is globally unique and stable across module copies.",
    definition: `export const ORIGAM_CHIP_GROUP_KEY = Symbol.for('origam:chip-group')`,
    value: "Symbol.for('origam:chip-group')",
    usedBy: [
        { name: 'OrigamChipGroup', slug: 'chip-group' },
        { name: 'OrigamChip', slug: 'chip' },
    ],
    sourceFile: 'packages/ds/src/consts/Chip/chip-group.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_chip_group_key.example',
            titleFallback: 'Injecting the ChipGroup context in a Chip',
            code: `import { inject } from 'vue'
import { ORIGAM_CHIP_GROUP_KEY } from 'origam'

// Inside OrigamChip (child of OrigamChipGroup)
const group = inject(ORIGAM_CHIP_GROUP_KEY)
const isSelected = computed(() =>
  group?.isSelected(props.value) ?? false
)`,
            lang: 'typescript',
        },
    ],
}
