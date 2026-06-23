import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_COMMAND_PALETTE_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-command-palette-slots',
    name: 'ICommandPaletteSlots',
    category: 'Navigation',
    descriptionKey: 'interfaces.catalog.i_command_palette_slots.description',
    descriptionFallback: 'Slot contract of OrigamCommandPalette — provides three override points: a scoped #item slot per result row, a #empty slot for the no-results state, and a #footer slot below the list.',
    definition: `export interface ICommandPaletteSlots {
    item?: (props: ICommandPaletteSlotProps) => any
    empty?: () => any
    footer?: () => any
}`,
    extends: [],
    props: [
        { name: 'item', type: '(props: ICommandPaletteSlotProps) => any', optional: true, descriptionFallback: 'Scoped slot that replaces the default command row. Receives { command, isActive }.' },
        { name: 'empty', type: '() => any', optional: true, descriptionFallback: 'Slot rendered when the query matches zero commands (overrides emptyText).' },
        { name: 'footer', type: '() => any', optional: true, descriptionFallback: 'Slot rendered below the result list — useful for keyboard shortcut hints or a "Create new…" affordance.' },
    ],
    usedBy: [
        { slug: 'command-palette', name: 'CommandPalette', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/CommandPalette/command-palette.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_command_palette_slots.example',
            titleFallback: 'Custom empty state and footer',
            code: `<OrigamCommandPalette v-model="open">
    <template #empty>
        <p>No commands found. Try a different keyword.</p>
    </template>
    <template #footer>
        <span>Press ↑↓ to navigate, Enter to select, Esc to close.</span>
    </template>
</OrigamCommandPalette>`,
            lang: 'vue',
        },
    ],
}
