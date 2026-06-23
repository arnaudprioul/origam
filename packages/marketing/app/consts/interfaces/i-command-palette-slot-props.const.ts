import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_COMMAND_PALETTE_SLOT_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-command-palette-slot-props',
    name: 'ICommandPaletteSlotProps',
    category: 'Navigation',
    descriptionKey: 'interfaces.catalog.i_command_palette_slot_props.description',
    descriptionFallback: 'Scoped slot data injected into the #item slot of OrigamCommandPalette — provides the ICommand data and a boolean indicating whether the row is currently highlighted.',
    definition: `export interface ICommandPaletteSlotProps {
    command: ICommand
    isActive: boolean
}`,
    extends: [],
    props: [
        { name: 'command', type: 'ICommand', optional: false, descriptionFallback: 'The command data for the current row (id, label, description, icon, kbd, group, …).' },
        { name: 'isActive', type: 'boolean', optional: false, descriptionFallback: 'Whether this row is currently highlighted (keyboard navigation or hover). Use to apply a custom active style.' },
    ],
    usedBy: [
        { slug: 'command-palette', name: 'CommandPalette', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/CommandPalette/command-palette.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_command_palette_slot_props.example',
            titleFallback: 'Custom item slot with scoped props',
            code: `<OrigamCommandPalette v-model="open">
    <template #item="{ command, isActive }">
        <span :class="{ 'is-active': isActive }">
            {{ command.label }}
        </span>
    </template>
</OrigamCommandPalette>`,
            lang: 'vue',
        },
    ],
}
